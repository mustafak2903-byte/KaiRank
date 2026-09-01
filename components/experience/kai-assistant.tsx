"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Mode = "focused" | "curious" | "humour" | "facts";
type Topic = "diagnostic" | "results" | "compare" | "clinics" | "local" | "ai" | "timing" | "next" | "talk";
type Context = "hero" | "diagnostic" | "gap" | "proof" | "final";

const modes: Array<{ id: Mode; label: string; note: string }> = [
  { id: "focused", label: "Focused", note: "Just the useful stuff." },
  { id: "curious", label: "Curious", note: "Explain the signals." },
  { id: "humour", label: "Light humour", note: "Useful, lightly." },
  { id: "facts", label: "Quick facts", note: "Short search facts." },
];

const topics: Array<{ id: Topic; label: string; href?: string }> = [
  { id: "diagnostic", label: "What does the diagnostic check?", href: "#audit" },
  { id: "results", label: "Show me verified results", href: "#proof" },
  { id: "compare", label: "Can you compare my clinic?", href: "#audit" },
  { id: "clinics", label: "Do you work with clinics like mine?" },
  { id: "local", label: "What is Local SEO?", href: "#services" },
  { id: "ai", label: "What is AI Search Optimisation?", href: "#services" },
  { id: "timing", label: "How long does SEO take?", href: "#faq" },
  { id: "next", label: "What happens next?", href: "#process" },
  { id: "talk", label: "Can I talk to someone?", href: "#contact" },
];

const focusedAnswers: Record<Topic, string> = {
  diagnostic: "It checks the public response, HTTPS, redirects, page fundamentals, indexation signals, structured data, mobile setup and optional PageSpeed data. It is not a complete SEO audit.",
  results: "The Recovery Room and South City Hospital figures come from current portfolio case-study evidence. Source reports are linked in the results section.",
  compare: "The free snapshot can compare observable website signals. Competitor discovery needs a configured provider or manual review, so KaiRank never invents businesses or positions.",
  clinics: "Yes. KaiRank is built around private clinics and healthcare search, with experience spanning a Birmingham clinic and a large hospital search architecture.",
  local: "Local SEO makes a clinic easier to understand and discover around relevant locations through consistent services, profiles, website evidence and local signals.",
  ai: "It clarifies your clinic’s services, locations, expertise and evidence so emerging search systems can interpret the entity more reliably. It cannot guarantee citations.",
  timing: "Technical access can improve quickly. Competitive treatment and local visibility usually compound over months, depending on the starting point and market.",
  next: "KaiRank diagnoses the constraint, engineers the highest-value fixes, then measures and compounds what works.",
  talk: "Use the strategy link near the final call to action to book a verified Cal.com slot, or email hello@kairank.com.",
};

const quickFacts: Record<Topic, string> = {
  diagnostic: "A canonical helps search engines identify the preferred version of a page.",
  results: "A booking-intent click is a tracked action—not proof of a completed booking.",
  compare: "A fair competitor comparison labels its data source and never calls nearby-business ordering a Google ranking.",
  clinics: "Clinic discovery often combines treatment intent, location context and trust evidence.",
  local: "Local visibility depends on more than proximity; relevance and consistent evidence matter too.",
  ai: "Clear entities and connected evidence help both conventional and emerging search systems interpret a clinic.",
  timing: "Fast technical fixes and long-term authority work operate on different timelines.",
  next: "Measurement is useful when it connects visibility to meaningful actions, not just traffic volume.",
  talk: "A good strategy conversation starts with the current constraint, not a pre-filled deliverables list.",
};

const contextPrompts: Record<Context, string> = {
  hero: "Want to check your clinic?",
  diagnostic: "Your public technical signals are checked. Want to look at the deeper visibility gap?",
  gap: "Want to see where the biggest observable gap appears?",
  proof: "These figures come from verified project evidence. You can inspect the source context.",
  final: "Ready to check your own search landscape?",
};

function KaiMark({ waving = false }: { waving?: boolean }) {
  return (
    <svg className={waving ? "is-waving" : ""} viewBox="0 0 64 64" aria-hidden="true">
      <path className="kai-mark__orbit" d="M9 35C9 18 20 9 34 9c13 0 22 8 22 20 0 13-10 24-25 24-8 0-14-3-18-8" />
      <rect className="kai-mark__face" x="16" y="17" width="34" height="30" rx="10" />
      <path className="kai-mark__signal" d="M23 31h5l3-5 4 10 3-5h5" />
      <circle className="kai-mark__node" cx="50" cy="17" r="3" />
      <path className="kai-mark__wave" d="M49 38c6-5 8-1 5 2 5-2 6 2 2 5" />
    </svg>
  );
}

export function KaiAssistant() {
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [mode, setMode] = useState<Mode>("focused");
  const [topic, setTopic] = useState<Topic>("diagnostic");
  const [context, setContext] = useState<Context>("hero");
  const [voiceSupported, setVoiceSupported] = useState(false);

  const answer = useMemo(() => {
    if (mode === "facts") return quickFacts[topic];
    const base = focusedAnswers[topic];
    if (mode === "curious") return `${base} Ask KaiRank to inspect the evidence behind any status before treating it as a strategic conclusion.`;
    if (mode === "humour") {
      const note = topic === "diagnostic"
        ? " Robots.txt found? The robots can stand down."
        : topic === "results"
          ? " Evidence first; victory lap second."
          : " Search engines enjoy clarity almost as much as consultants enjoy a tidy crawl.";
      return `${base}${note}`;
    }
    return base;
  }, [mode, topic]);

  const activeTopic = topics.find((item) => item.id === topic) ?? topics[0];

  useEffect(() => {
    const supportFrame = window.requestAnimationFrame(() => {
      setVoiceSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    });
    const seen = window.sessionStorage.getItem("kairank-kai-intro") === "seen";
    const timer = seen ? null : window.setTimeout(() => {
      setIntro(true);
      window.sessionStorage.setItem("kairank-kai-intro", "seen");
    }, 2800);
    return () => {
      window.cancelAnimationFrame(supportFrame);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) closePanel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLButtonElement>(".kai-panel__header > button")?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    const sectionMap = new Map<Element, Context>();
    const register = (selector: string, value: Context) => {
      const element = document.querySelector(selector);
      if (element) sectionMap.set(element, value);
    };
    register("#home", "hero");
    register("#audit", "diagnostic");
    register("#proof", "proof");
    register("#contact", "final");

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setContext(sectionMap.get(visible.target) ?? "hero");
    }, { rootMargin: "-25% 0px -55%", threshold: [0, 0.2, 0.5] });
    sectionMap.forEach((_, element) => observer.observe(element));

    const onDiagnosticState = (event: Event) => {
      const state = (event as CustomEvent<{ gapReady?: boolean }>).detail;
      setContext(state.gapReady ? "gap" : "diagnostic");
    };
    window.addEventListener("kairank:diagnostic-state", onDiagnosticState);
    return () => {
      observer.disconnect();
      window.removeEventListener("kairank:diagnostic-state", onDiagnosticState);
    };
  }, []);

  function toggle() {
    setOpen((current) => {
      const next = !current;
      if (next) trackEvent("kai_opened", { context });
      return next;
    });
    setIntro(false);
  }

  function closePanel() {
    setOpen(false);
    window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".kai-trigger")?.focus());
  }

  function selectMode(next: Mode) {
    setMode(next);
    trackEvent("kai_mode_selected", { mode: next });
  }

  function selectTopic(next: Topic) {
    setTopic(next);
    trackEvent("kai_action", { action: next, mode });
  }

  function speak() {
    if (!voiceSupported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(answer);
    utterance.lang = "en-GB";
    window.speechSynthesis.speak(utterance);
    trackEvent("kai_voice_played", { topic, mode });
  }

  return (
    <div className={`kai-assistant${open ? " is-open" : ""}`}>
      {intro && !open ? (
        <button className="kai-intro" type="button" onClick={toggle}>
          <strong>Hi — I’m Kai.</strong>
          <span>I can check your clinic, explain a signal or show you the proof.</span>
        </button>
      ) : null}

      {open ? (
        <aside className="kai-panel" role="dialog" aria-modal="false" aria-labelledby="kai-title">
          <div className="kai-panel__header">
            <div><KaiMark /><span><strong id="kai-title">KAI</strong><small>Search signal assistant</small></span></div>
            <button type="button" onClick={closePanel} aria-label="Close Kai assistant">×</button>
          </div>
          <p className="kai-panel__context">{contextPrompts[context]}</p>

          <fieldset className="kai-modes">
            <legend>How should I help?</legend>
            <div>
              {modes.map((item) => (
                <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => selectMode(item.id)}>
                  <strong>{item.label}</strong><small>{item.note}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="kai-topics" aria-label="Kai questions">
            {topics.map((item) => (
              <button key={item.id} type="button" aria-pressed={topic === item.id} onClick={() => selectTopic(item.id)}>{item.label}</button>
            ))}
          </div>

          <div className="kai-answer" aria-live="polite">
            <span className="data-label">Kai / {modes.find((item) => item.id === mode)?.label}</span>
            <p>{answer}</p>
            <div>
              {activeTopic.href ? <a href={activeTopic.href} onClick={() => setOpen(false)}>Go there <span aria-hidden="true">↗</span></a> : null}
              {voiceSupported ? <button type="button" onClick={speak}>Speak answer <span aria-hidden="true">◖</span></button> : null}
            </div>
          </div>
          <p className="kai-panel__boundary">Deterministic site guidance · no medical advice · no live ranking claims</p>
        </aside>
      ) : null}

      {!open ? (
        <button className="kai-trigger" type="button" aria-label="Open Kai assistant" aria-expanded="false" onClick={toggle}>
          <KaiMark waving={intro} /><span>Ask Kai</span>
        </button>
      ) : null}
    </div>
  );
}
