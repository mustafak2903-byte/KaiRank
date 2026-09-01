"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

export function AnalyticsEvents() {
  useEffect(() => {
    const record = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-event]") : null;
      const name = target?.dataset.event as AnalyticsEventName | undefined;
      if (!target || !name) return;
      trackEvent(name, { label: target.dataset.eventLabel ?? target.textContent?.trim().slice(0, 80) });
    };

    document.addEventListener("click", record);
    return () => document.removeEventListener("click", record);
  }, []);

  return null;
}
