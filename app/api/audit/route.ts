import { NextRequest, NextResponse } from "next/server";
import {
  assertPublicDestination,
  AuditError,
  normalizeAuditUrl,
  normalizePageSpeedPayload,
  runFastCheck,
  type PageSpeedPayload,
} from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AuditLevel = "fast" | "pagespeed";

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;

function clientKey(request: NextRequest, level: AuditLevel) {
  const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  return `${client}:${level}`;
}

function isRateLimited(key: string, limit: number) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > limit;
}

function json(payload: unknown, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function unavailable(reason: string) {
  return json({
    kind: "visibility-diagnostic",
    level: "pagespeed",
    generatedAt: new Date().toISOString(),
    pageSpeed: {
      status: "unavailable",
      reason,
    },
  });
}

async function runPageSpeed(url: string) {
  await assertPublicDestination(url);
  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  ["performance", "seo", "accessibility"].forEach((category) => endpoint.searchParams.append("category", category));
  if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const payload = (await response.json()) as PageSpeedPayload;

    if (response.status === 429 || payload.error?.status === "RESOURCE_EXHAUSTED") {
      return unavailable("Fast Check complete. Google’s performance quota is temporarily busy.");
    }
    if (!response.ok || payload.error) {
      return unavailable("Fast Check complete. Google could not return performance data for this page.");
    }

    return json({
      kind: "visibility-diagnostic",
      level: "pagespeed",
      generatedAt: new Date().toISOString(),
      pageSpeed: normalizePageSpeedPayload(payload, url),
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return unavailable(
      timedOut
        ? "Fast Check complete. Performance data took too long to respond."
        : "Fast Check complete. Performance data is unavailable right now.",
    );
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: NextRequest) {
  let url: string;
  let level: AuditLevel;

  try {
    const body = (await request.json()) as { url?: unknown; level?: unknown };
    url = normalizeAuditUrl(body.url);
    level = body.level === "pagespeed" ? "pagespeed" : "fast";
  } catch (error) {
    const auditError = error instanceof AuditError ? error : new AuditError("invalid_request", "Add a valid website address.");
    return json({ code: auditError.code, message: auditError.message }, auditError.status);
  }

  if (isRateLimited(clientKey(request, level), level === "fast" ? 10 : 6)) {
    return json(
      { code: "rate_limited", message: "Too many checks were requested from this connection. Try again in a few minutes." },
      429,
    );
  }

  if (level === "pagespeed") return runPageSpeed(url);

  try {
    const fast = await runFastCheck(url);
    return json({
      kind: "visibility-diagnostic",
      level: "fast",
      generatedAt: new Date().toISOString(),
      requestedUrl: url,
      fast,
      pageSpeed: { status: "not-requested" },
      note: "The Fast Check reads the public technical surface. It is not a complete SEO, local-search or AI-visibility audit.",
    });
  } catch (error) {
    const auditError = error instanceof AuditError
      ? error
      : new AuditError("diagnostic_failure", "The Fast Check could not be completed.", 502);
    return json({ code: auditError.code, message: auditError.message }, auditError.status);
  }
}
