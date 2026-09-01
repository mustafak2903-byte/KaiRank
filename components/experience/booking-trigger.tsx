"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";

type CalEvent = CustomEvent<{ type?: string; data?: Record<string, unknown>; namespace?: string }>;
type CalApi = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[][];
};

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

const calNamespace = "kairank";
const calLink = new URL(siteConfig.bookingUrl).pathname.replace(/^\//, "").replace(/\/$/, "");
let calLoader: Promise<CalApi> | null = null;
let calPrepared = false;
let listenersReady = false;
let escapeListenerReady = false;
let activeBookingSource = "unknown";
let activeBookingTrigger: HTMLButtonElement | null = null;
let calInstance: CalApi | null = null;
let modalCloseObserver: MutationObserver | null = null;
let modalCloseTimer: number | null = null;

function isCalModalOpen() {
  return [...document.querySelectorAll<HTMLElement>("cal-modal-box")].some((modal) => {
    const style = window.getComputedStyle(modal);
    const state = modal.getAttribute("state");
    return (state === "loaded" || state === "reopened") && style.visibility !== "hidden" && style.display !== "none";
  });
}

function createCalBootstrap() {
  if (window.Cal) {
    calInstance = window.Cal;
    return window.Cal;
  }

  const enqueue = (api: CalApi, args: unknown[]) => {
    api.q = api.q ?? [];
    api.q.push(args);
  };
  const cal: CalApi = (...args: unknown[]) => {
    if (!cal.loaded) {
      const script = document.createElement("script");
      script.src = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.dataset.kairankCal = "true";
      calLoader = new Promise<CalApi>((resolve, reject) => {
        script.addEventListener("load", () => resolve(window.Cal ?? cal), { once: true });
        script.addEventListener("error", () => reject(new Error("Cal.com embed could not load.")), { once: true });
      });
      document.head.appendChild(script);
      cal.loaded = true;
    }

    if (args[0] === "init" && typeof args[1] === "string") {
      const namespace = args[1];
      const namespacedApi: CalApi = (...namespacedArgs: unknown[]) => enqueue(namespacedApi, namespacedArgs);
      namespacedApi.q = [];
      cal.ns = cal.ns ?? {};
      cal.ns[namespace] = namespacedApi;
      enqueue(namespacedApi, args);
      return;
    }
    enqueue(cal, args);
  };
  cal.ns = {};
  cal.q = [];
  window.Cal = cal;
  calInstance = cal;
  return cal;
}

function attributionConfig(prefill?: { name?: string; email?: string }) {
  const params = new URLSearchParams(window.location.search);
  const config: Record<string, string> = { theme: "dark" };
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const value = params.get(key);
    if (value) config[key] = value;
  });
  if (prefill?.name?.trim()) config.name = prefill.name.trim();
  if (prefill?.email?.trim()) config.email = prefill.email.trim();
  return config;
}

function prepareCal(cal: CalApi) {
  cal("init", calNamespace, { origin: "https://cal.com" });
  const api = cal.ns?.[calNamespace] ?? cal;
  api("ui", {
    theme: "dark",
    cssVarsPerTheme: {
      light: { "cal-brand": "#6e84ff" },
      dark: { "cal-brand": "#aab7ff" },
    },
    styles: {
      body: { background: "#080b10" },
      eventTypeListItem: { background: "#10141b" },
    },
  });
  api("preload", { calLink });

  if (!listenersReady) {
    api("on", {
      action: "bookingSuccessfulV2",
      callback: (event: CalEvent) => {
        const data = event.detail?.data ?? {};
        trackEvent("booking_completed", { source: "cal-embed", uid: typeof data.uid === "string" ? data.uid : null });
      },
    });
    api("on", {
      action: "linkFailed",
      callback: () => {
        window.dispatchEvent(new CustomEvent("kairank:cal-link-failed", { detail: { source: activeBookingSource } }));
      },
    });
    listenersReady = true;
  }

  if (!escapeListenerReady) {
    window.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const liveCal = window.Cal ?? calInstance;
      if (!isCalModalOpen() || !liveCal) return;
      const closeApi = liveCal.ns?.[calNamespace] ?? liveCal;
      closeApi("closeModal");
      window.requestAnimationFrame(() => activeBookingTrigger?.focus());
      window.setTimeout(() => {
        if (!isCalModalOpen()) document.body.style.overflow = "";
      }, 80);
    });
    escapeListenerReady = true;
  }
}

async function waitForCalClickHandler() {
  const startedAt = performance.now();
  while (!document.querySelector('iframe[src*="preload=true"]') && performance.now() - startedAt < 4000) {
    await new Promise((resolve) => window.setTimeout(resolve, 50));
  }
  await new Promise((resolve) => window.setTimeout(resolve, 150));
}

async function loadCalEmbed() {
  const cal = createCalBootstrap();
  if (!calPrepared) {
    prepareCal(cal);
    calPrepared = true;
  }
  const loadedCal = await (calLoader ?? Promise.resolve(cal));
  calInstance = loadedCal;
  await waitForCalClickHandler();
  return loadedCal;
}

function trackWhenModalOpens(source: string) {
  const startedAt = performance.now();
  const check = () => {
    if (isCalModalOpen()) {
      trackEvent("booking_opened", { source, experience: "cal-popup" });
      const modal = document.querySelector<HTMLElement>("cal-modal-box");
      modalCloseObserver?.disconnect();
      if (modal) {
        const restoreAfterClose = () => {
          modalCloseObserver?.disconnect();
          modalCloseObserver = null;
          if (modalCloseTimer !== null) window.clearTimeout(modalCloseTimer);
          modalCloseTimer = null;
          document.body.style.overflow = "";
          window.requestAnimationFrame(() => activeBookingTrigger?.focus());
        };
        modal.addEventListener("close", restoreAfterClose, { once: true });
        modalCloseObserver = new MutationObserver(() => {
          if (isCalModalOpen()) return;
          restoreAfterClose();
        });
        modalCloseObserver.observe(modal, { attributes: true, attributeFilter: ["state", "style"] });
        const checkForClose = () => {
          if (!isCalModalOpen()) {
            restoreAfterClose();
            return;
          }
          modalCloseTimer = window.setTimeout(checkForClose, 120);
        };
        modalCloseTimer = window.setTimeout(checkForClose, 120);
      }
      return;
    }
    if (performance.now() - startedAt < 5000) window.requestAnimationFrame(check);
  };
  window.requestAnimationFrame(check);
}

function openCalModal(config: Record<string, string>) {
  if (!calInstance) throw new Error("Cal.com embed is not ready.");
  const retainedModal = document.querySelector<HTMLElement>("cal-modal-box");
  if (retainedModal && !isCalModalOpen()) {
    retainedModal.setAttribute("state", "reopened");
    retainedModal.style.visibility = "visible";
    const retainedFrame = retainedModal.querySelector<HTMLIFrameElement>("iframe");
    if (retainedFrame) {
      retainedFrame.style.display = "";
      retainedFrame.style.visibility = "visible";
    }
    return;
  }
  const modalApi = calInstance.ns?.[calNamespace] ?? calInstance;
  modalApi("modal", { calLink, config });
}

export function BookingTrigger({
  label,
  source,
  className = "",
  tabIndex,
  prefill,
}: {
  label: string;
  source: string;
  className?: string;
  tabIndex?: number;
  prefill?: { name?: string; email?: string };
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const readyRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const handleFailure = (event: Event) => {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      if (detail?.source === source) setFailed(true);
    };
    window.addEventListener("kairank:cal-link-failed", handleFailure);
    return () => window.removeEventListener("kairank:cal-link-failed", handleFailure);
  }, [source]);

  async function openBooking(event: MouseEvent<HTMLButtonElement>) {
    const config = attributionConfig(prefill);
    buttonRef.current?.setAttribute("data-cal-config", JSON.stringify(config));
    event.preventDefault();
    event.stopPropagation();
    activeBookingSource = source;
    activeBookingTrigger = buttonRef.current;
    trackEvent("booking_clicked", { source });
    if (readyRef.current) {
      openCalModal(config);
      trackWhenModalOpens(source);
      return;
    }

    if (loading) return;
    setLoading(true);
    setFailed(false);
    try {
      await loadCalEmbed();
      readyRef.current = true;
      setLoading(false);
      openCalModal(config);
      trackWhenModalOpens(source);
    } catch {
      setLoading(false);
      setFailed(true);
    }
  }

  return (
    <span className={`booking-trigger-wrap${failed ? " is-failed" : ""}`}>
      <button
        className={className}
        data-cal-config='{"theme":"dark"}'
        data-cal-link={calLink}
        data-cal-namespace={calNamespace}
        disabled={loading}
        onClick={openBooking}
        ref={buttonRef}
        tabIndex={tabIndex}
        type="button"
      >
        {loading ? "Opening calendar…" : label} <span aria-hidden="true">↗</span>
      </button>
      {failed ? <a className="booking-trigger__fallback" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Calendar unavailable here. Open Cal.com instead ↗</a> : null}
    </span>
  );
}
