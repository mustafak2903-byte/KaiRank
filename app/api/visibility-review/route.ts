import { NextRequest, NextResponse } from "next/server";
import { normalizeAuditUrl } from "@/lib/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const locationOptions = new Set(["", "1", "2-5", "6-20", "21+"]);

type ReviewPayload = {
  website?: unknown;
  location?: unknown;
  priorityService?: unknown;
  email?: unknown;
  businessName?: unknown;
  numberOfLocations?: unknown;
  auditResults?: unknown;
};

export async function POST(request: NextRequest) {
  let payload: ReviewPayload;
  try {
    payload = (await request.json()) as typeof payload;
  } catch {
    return NextResponse.json({ message: "The request could not be read." }, { status: 400 });
  }

  let website: string;
  try {
    website = normalizeAuditUrl(payload.website);
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Add a valid website address." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const businessName = typeof payload.businessName === "string" ? payload.businessName.trim().slice(0, 160) : "";
  const location = typeof payload.location === "string" ? payload.location.trim().slice(0, 160) : "";
  const priorityService = typeof payload.priorityService === "string" ? payload.priorityService.trim().slice(0, 160) : "";
  const numberOfLocations = typeof payload.numberOfLocations === "string" ? payload.numberOfLocations.trim() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ message: "Check the email address and try again." }, { status: 400 });
  }
  if (!location || !priorityService) {
    return NextResponse.json({ message: "Add the clinic location and priority treatment or service." }, { status: 400 });
  }
  if (!locationOptions.has(numberOfLocations)) {
    return NextResponse.json({ message: "Choose a valid number of locations." }, { status: 400 });
  }

  const rawAudit = payload.auditResults && typeof payload.auditResults === "object"
    ? payload.auditResults as { statusCode?: unknown; responseMs?: unknown; checks?: unknown }
    : null;
  const auditResults = rawAudit ? {
    statusCode: typeof rawAudit.statusCode === "number" ? rawAudit.statusCode : null,
    responseMs: typeof rawAudit.responseMs === "number" ? rawAudit.responseMs : null,
    checks: Array.isArray(rawAudit.checks)
      ? rawAudit.checks.slice(0, 20).map((check) => {
          const item = check && typeof check === "object" ? check as { id?: unknown; status?: unknown } : {};
          return {
            id: typeof item.id === "string" ? item.id.slice(0, 60) : "unknown",
            status: typeof item.status === "string" ? item.status.slice(0, 24) : "unknown",
          };
        })
      : [],
  } : null;

  const webhook = process.env.AUDIT_LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { message: "The review-request channel is not configured in this preview. Email hello@kairank.com to request the full review." },
      { status: 503 },
    );
  }

  let endpoint: URL;
  try {
    endpoint = new URL(webhook);
    if (endpoint.protocol !== "https:") throw new Error("Webhook must use HTTPS");
  } catch {
    return NextResponse.json({ message: "The review-request channel is not configured correctly." }, { status: 503 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(process.env.AUDIT_LEAD_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.AUDIT_LEAD_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        email,
        website,
        location,
        priorityService,
        businessName: businessName || null,
        numberOfLocations: numberOfLocations || null,
        auditResults,
        source: "kairank-visibility-diagnostic",
        createdAt: new Date().toISOString(),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "The request was not confirmed by the receiving service. Nothing has been marked as sent." },
        { status: 502 },
      );
    }

    return NextResponse.json({ confirmed: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json(
      { message: "The request could not be confirmed. Nothing has been marked as sent—try again or email hello@kairank.com." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
