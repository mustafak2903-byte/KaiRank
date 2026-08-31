import { NextRequest, NextResponse } from "next/server";
import { normalizeAuditUrl, normalizePageSpeedPayload, type PageSpeedPayload } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const REQUEST_LIMIT = 5;

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > REQUEST_LIMIT;
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientKey(request))) {
    return NextResponse.json(
      { code: "rate_limited", message: "Too many diagnostics were requested from this connection. Try again in a few minutes." },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  let url: string;
  try {
    const body = (await request.json()) as { url?: unknown };
    url = normalizeAuditUrl(body.url);
  } catch (error) {
    return NextResponse.json(
      { code: "invalid_url", message: error instanceof Error ? error.message : "Add a valid website address." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  endpoint.searchParams.set("url", url);
  endpoint.searchParams.set("strategy", "mobile");
  ["performance", "seo", "accessibility"].forEach((category) => endpoint.searchParams.append("category", category));
  if (process.env.PAGESPEED_API_KEY) endpoint.searchParams.set("key", process.env.PAGESPEED_API_KEY);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25_000);

  try {
    const response = await fetch(endpoint, {
      signal: controller.signal,
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    const payload = (await response.json()) as PageSpeedPayload;

    if (response.status === 429 || payload.error?.status === "RESOURCE_EXHAUSTED") {
      return NextResponse.json(
        { code: "quota_limited", message: "Google’s diagnostic quota is temporarily busy. Wait a few minutes and run the check again." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    if (!response.ok || payload.error) {
      return NextResponse.json(
        { code: "upstream_failure", message: "Google could not complete the diagnostic for that address. Check that the site is public and try again." },
        { status: 502, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(normalizePageSpeedPayload(payload, url), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        code: timedOut ? "timeout" : "diagnostic_failure",
        message: timedOut
          ? "The diagnostic took too long to respond. The site may be slow or blocking automated checks."
          : "The diagnostic service is unavailable right now. Try again shortly.",
      },
      { status: timedOut ? 504 : 502, headers: { "Cache-Control": "no-store" } },
    );
  } finally {
    clearTimeout(timeout);
  }
}
