import { track as trackVercelEvent } from "@vercel/analytics";

export type AnalyticsEventName =
  | "diagnostic_started"
  | "diagnostic_completed"
  | "diagnostic_partial"
  | "visibility_gap_started"
  | "visibility_gap_completed"
  | "search_surface_changed"
  | "service_selected"
  | "evidence_opened"
  | "kai_opened"
  | "kai_mode_selected"
  | "kai_action"
  | "kai_voice_played"
  | "primary_cta_clicked"
  | "full_review_requested"
  | "full_review_confirmed"
  | "full_review_failed"
  | "booking_opened"
  | "booking_clicked"
  | "booking_completed"
  | "faq_opened";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  const detail = { event: name, ...payload };
  window.dispatchEvent(new CustomEvent("kairank:analytics", { detail }));

  const analyticsWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer ?? [];
  analyticsWindow.dataLayer.push(detail);

  const eventData = Object.fromEntries(
    Object.entries(payload)
      .filter((entry): entry is [string, string | number | boolean | null] => entry[1] !== undefined)
      .slice(0, 2)
      .map(([key, value]) => [key, typeof value === "string" ? value.slice(0, 255) : value]),
  );
  try {
    trackVercelEvent(name, eventData);
  } catch {
    // The local data layer remains available when Vercel Analytics is disabled.
  }
}
