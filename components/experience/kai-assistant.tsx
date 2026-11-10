"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Mode = "straight" | "explain" | "facts";
type Topic = "booking" | "results" | "diagnostic";
type Context = "hero" | "journey" | "services" | "proof" | "diagnostic" | "final";

const modes: Array<{ id: Mode; label: string; note: string }> = [
  { id: "straight", label: "Quick answer", note: "The shortest useful answer." },
  { id: "explain", label: "Explain the reasoning", note: "Add the strategic context." },
  { id: "facts", label: "Evidence first", note: "One precise search fact." },
];

const topics: Array<{ id: Topic; label: string; href?: string }> = [
  { id: "booking", label: "Book a visibility review", href: "/contact" },
  { id: "results", label: "See client results", href: "/#proof" },
  { id: "diagnostic", label: "Run website health check", href: "/search-visibility-diagnostic" },
];

const answers: Record<Topic, string> = {
  booking: "A clinic visibility review starts with your website, location and one priority treatment. We identify the clearest opportunity and decide whether a focused next step makes sense.",
  results: "The Recovery Room and South City Hospital figures come from verified project evidence. Both source links are available in the results section.",
  diagnostic: "The free website health check reviews observable public signals: response, HTTPS, page fundamentals, crawl directives, JSON-LD syntax, the mobile viewport declaration and optional PageSpeed lab data. It cannot confirm Search Console coverage, rankings, traffic or conversions.",
};

const facts: Record<Topic, string> = {
  booking: "A useful first conversation starts with the clinic, location and treatment—not a pre-filled package.",
  results: "A booking-intent click is a tracked action—not proof of a completed booking.",
  diagnostic: "A canonical helps search engines identify the preferred version of a page.",
};

const contextPrompts: Record<Context, string> = {
  hero: "A patient query has to find a credible route to your clinic.",
  journey: "If the clinic never surfaces, quality never enters the decision.",
  services: "Different visibility constraints need different engineering.",
  proof: "These numbers have receipts.",
  diagnostic: "The first check reads public technical signals only.",
  final: "Start with the website, location and priority treatment.",
};

export function KaiRobot({ waving, surprised }: { waving: boolean; surprised: boolean }) {
  return (
    <svg className={`kai-robot${waving ? " is-waving" : ""}${surprised ? " is-surprised" : ""}`} viewBox="0 0 92 104" aria-hidden="true">
      <defs>
        <linearGradient id="kai-shell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9EAEFF" /><stop offset="0.52" stopColor="#6078F0" /><stop offset="1" stopColor="#33449D" /></linearGradient>
        <linearGradient id="kai-glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#19275B" /><stop offset="1" stopColor="#0A1028" /></linearGradient>
      </defs>
      <g className="kai-robot__antenna"><path d="M46 17V8" /><circle cx="46" cy="6" r="4" /></g>
      <g className="kai-robot__shadow"><ellipse cx="46" cy="96" rx="26" ry="5" /></g>
      <g className="kai-robot__body">
        <rect x="24" y="56" width="44" height="34" rx="15" fill="url(#kai-shell)" />
        <path d="M34 67h24" /><circle cx="46" cy="77" r="5" />
        <path className="kai-robot__arm kai-robot__arm--left" d="M25 63c-10 4-12 12-8 18" />
        <path className="kai-robot__arm kai-robot__arm--right" d="M67 63c10 4 12 12 8 18" />
      </g>
      <g className="kai-robot__head">
        <rect x="12" y="18" width="68" height="48" rx="21" fill="url(#kai-shell)" />
        <rect x="19" y="25" width="54" height="34" rx="15" fill="url(#kai-glass)" />
        <g className="kai-robot__eyes"><ellipse cx="35" cy="42" rx="5" ry="6" /><ellipse cx="57" cy="42" rx="5" ry="6" /></g>
        <path className="kai-robot__mouth" d="M39 52c4 3 10 3 14 0" />
      </g>
    </svg>
  );
}

export function KaiAssistant() {
  const mascotRef = useRef<HTMLButtonElement>(null);
  const reactionTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [reaction, setReaction] = useState("");
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "straight";
    const saved = window.localStorage.getItem("kairank-kai-mode") as Mode | null;
    return saved && modes.some((item) => item.id === saved) ? saved : "straight";
  });
  const [topic, setTopic] = useState<Topic>("booking");
  const [context, setContext] = useState<Context>("hero");
  const [cleared, setCleared] = useState(false);

  const answer = useMemo(() => {
    if (mode === "facts") return facts[topic];
    const base = answers[topic];
    if (mode === "explain") return `${base} The useful next step is to inspect the evidence behind the status before turning it into a plan.`;
    return base;
  }, [mode, topic]);

  const activeTopic = topics.find((item) => item.id === topic) ?? topics[0];

  function showReaction(message: string, duration = 2600) {
    setReaction(message);
    if (reactionTimerRef.current !== null) window.clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = window.setTimeout(() => setReaction(""), duration);
  }

  useEffect(() => {
    const revealAfterIntent = () => {
      if (window.scrollY > window.innerHeight * 0.7) setRevealed(true);
    };
    revealAfterIntent();
    window.addEventListener("scroll", revealAfterIntent, { passive: true });
    const revealTimer = window.setTimeout(() => setRevealed(true), 12000);
    return () => {
      window.removeEventListener("scroll", revealAfterIntent);
      window.clearTimeout(revealTimer);
      if (reactionTimerRef.current !== null) window.clearTimeout(reactionTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        window.requestAnimationFrame(() => mascotRef.current?.focus());
      }
    };
    const onPointerProximity = (event: PointerEvent) => {
      if (!mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const strength = distance < 180 ? 1 - distance / 180 : 0;
      mascotRef.current.style.setProperty("--kai-look-x", `${Math.max(-3, Math.min(3, dx / 30)) * strength}px`);
      mascotRef.current.style.setProperty("--kai-look-y", `${Math.max(-2, Math.min(2, dy / 35)) * strength}px`);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerProximity, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerProximity);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".kai-panel__header > button")?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const sectionMap = new Map<Element, Context>();
    const register = (selector: string, value: Context) => { const element = document.querySelector(selector); if (element) sectionMap.set(element, value); };
    register("#home", "hero"); register("#visibility-gap", "journey"); register("#services", "services"); register("#proof", "proof"); register("#audit", "diagnostic"); register("#contact", "final");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setContext(sectionMap.get(visible.target) ?? "hero");
    }, { rootMargin: "-25% 0px -55%", threshold: [0, 0.2, 0.5] });
    sectionMap.forEach((_, element) => observer.observe(element));

    const onService = (event: Event) => {
      const service = (event as CustomEvent<{ service: string }>).detail.service;
      const message = service === "technical" ? "Technical access is the active layer." : service === "local" ? "Local relevance is the active layer." : service === "content" ? "Authority evidence is the active layer." : service === "entity" ? "Entity clarity is the active layer." : "Qualified search demand is the active layer.";
      showReaction(message);
    };
    const onSuccess = (event: Event) => {
      const checks = (event as CustomEvent<{ checks: Array<{ id: string; status: string }> }>).detail.checks;
      const robots = checks.some((check) => check.id === "robots" && check.status === "pass");
      const sitemap = checks.some((check) => check.id === "sitemap" && check.status === "pass");
      showReaction(robots && sitemap ? "Public crawl signals are in place. Review the remaining evidence." : "The public scan is complete. Review the signals below.", 3400);
    };
    const onError = () => showReaction("The public scan could not complete. Check the address or try again.", 3400);
    window.addEventListener("kairank:service-context", onService);
    window.addEventListener("kairank:diagnostic-complete", onSuccess);
    window.addEventListener("kairank:diagnostic-error", onError);
    return () => {
      observer.disconnect();
      window.removeEventListener("kairank:service-context", onService);
      window.removeEventListener("kairank:diagnostic-complete", onSuccess);
      window.removeEventListener("kairank:diagnostic-error", onError);
    };
  }, []);

  useEffect(() => {
    const targets = [...document.querySelectorAll("[data-kai-avoid]")];
    if (!targets.length || !("IntersectionObserver" in window)) return;
    const visible = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      setCleared([...visible.values()].some(Boolean));
    }, { threshold: 0 });
    targets.forEach((target) => {
      visible.set(target, false);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    setOpen((current) => {
      const next = !current;
      if (next) trackEvent("kai_opened", { context });
      return next;
    });
  }

  function closePanel() {
    setOpen(false);
    window.requestAnimationFrame(() => mascotRef.current?.focus());
  }

  function selectMode(next: Mode) {
    setMode(next);
    window.localStorage.setItem("kairank-kai-mode", next);
    trackEvent("kai_mode_selected", { mode: next });
  }

  function selectTopic(next: Topic) {
    setTopic(next);
    trackEvent("kai_action", { action: next, mode });
  }

  return (
    <div className={`kai-assistant kai-assistant--v6${open ? " is-open" : ""}${revealed ? " is-revealed" : ""}${cleared ? " is-cleared" : ""}`}>
      {reaction && !open ? <div className="kai-reaction" role="status">{reaction}</div> : null}

      {open ? (
        <aside className="kai-panel" id="kai-panel" role="dialog" aria-modal="false" aria-labelledby="kai-title">
          <div className="kai-panel__header">
            <div><KaiRobot waving={false} surprised={false} /><span><strong id="kai-title">KAI</strong><small>Search visibility guide</small></span></div>
            <button type="button" onClick={closePanel} aria-label="Close Kai assistant">×</button>
          </div>
          <p className="kai-panel__context">{contextPrompts[context]}</p>

          <details className="kai-personality">
            <summary>How do you want me today? <span aria-hidden="true">+</span></summary>
            <div>
              {modes.map((item) => <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => selectMode(item.id)}><strong>{item.label}</strong><small>{item.note}</small></button>)}
            </div>
          </details>

          <div className="kai-topics" aria-label="Questions for Kai">
            {topics.map((item) => <button key={item.id} type="button" aria-pressed={topic === item.id} onClick={() => selectTopic(item.id)}>{item.label}</button>)}
          </div>

          <div className="kai-answer" aria-live="polite">
            <span className="data-label">Kai / {modes.find((item) => item.id === mode)?.label}</span>
            <p>{answer}</p>
            <div>
              {activeTopic.href ? <a href={activeTopic.href} onClick={() => setOpen(false)}>Go there <span aria-hidden="true">↗</span></a> : null}
            </div>
          </div>
          <p className="kai-panel__boundary">Search guidance only. Kai does not offer medical advice or live ranking claims.</p>
        </aside>
      ) : null}

      <button
        className="kai-mascot"
        ref={mascotRef}
        type="button"
        aria-label="Open Kai search assistant"
        aria-expanded={open}
        aria-controls={open ? "kai-panel" : undefined}
        onClick={toggle}
      >
        <span className="kai-launcher-signal" aria-hidden="true"><i /><i /><b /></span>
        <span className="kai-mascot__name">KAI</span>
      </button>
    </div>
  );
}
