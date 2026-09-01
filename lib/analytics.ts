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
  | "kai_dragged"
  | "kai_thrown"
  | "kai_action"
  | "kai_voice_played"
  | "full_review_requested"
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
  analyticsWindow.dataLayer?.push(detail);
}
