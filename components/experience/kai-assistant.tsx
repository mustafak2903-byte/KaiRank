"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { trackEvent } from "@/lib/analytics";

type Mode = "straight" | "explain" | "humour" | "facts";
type Topic = "about" | "diagnostic" | "results" | "local" | "ai" | "compare" | "next" | "talk";
type Context = "hero" | "journey" | "services" | "proof" | "diagnostic" | "final";

const modes: Array<{ id: Mode; label: string; note: string }> = [
  { id: "straight", label: "Straight to it", note: "The shortest useful answer." },
  { id: "explain", label: "Explain it", note: "Add the reasoning." },
  { id: "humour", label: "Add a little humour", note: "Search jokes. Carefully." },
  { id: "facts", label: "Give me facts", note: "One precise search fact." },
];

const topics: Array<{ id: Topic; label: string; href?: string }> = [
  { id: "about", label: "What does KaiRank do?", href: "#services" },
  { id: "diagnostic", label: "What does the diagnostic check?", href: "#audit" },
  { id: "results", label: "Show me verified results", href: "#proof" },
  { id: "local", label: "What is Local SEO?", href: "#services" },
  { id: "ai", label: "What is AI Search Optimisation?", href: "#services" },
  { id: "compare", label: "Can you compare my clinic?", href: "#audit" },
  { id: "next", label: "What happens after the diagnostic?", href: "#process" },
  { id: "talk", label: "Can I talk to someone?", href: "#contact" },
];

const answers: Record<Topic, string> = {
  about: "KaiRank finds and repairs the search constraints that stop private clinics being discovered across Google, Maps and AI search.",
  diagnostic: "It checks the public response, HTTPS, redirects, page fundamentals, indexation signals, structured data, mobile setup and optional PageSpeed data. It does not claim to check rankings.",
  results: "The Recovery Room and South City Hospital figures come from verified project evidence. Both source links are available in the results section.",
  local: "Local SEO connects services, locations and trusted evidence so nearby patients and search systems can understand when a clinic is relevant.",
  ai: "AI Search Optimisation clarifies services, locations, expertise and evidence for emerging search systems. It cannot guarantee a citation.",
  compare: "Yes—when live provider data is available or through a deeper review. KaiRank never invents nearby businesses, positions or citations.",
  next: "KaiRank adds your location and priority treatment, reviews the competitive landscape, then turns the clearest constraint into an ordered plan.",
  talk: "Use the strategy link near the final call to action, or email hello@kairank.com.",
};

const facts: Record<Topic, string> = {
  about: "Clinic search usually combines treatment intent, location context and trust evidence.",
  diagnostic: "A canonical helps search engines identify the preferred version of a page.",
  results: "A booking-intent click is a tracked action—not proof of a completed booking.",
  local: "Local visibility depends on relevance and consistent evidence as well as proximity.",
  ai: "Connected entities help conventional and emerging search systems interpret a clinic.",
  compare: "Nearby-business ordering should never be relabelled as a Google Maps ranking.",
  next: "Technical access can change quickly; authority and competitive relevance compound over time.",
  talk: "A useful strategy conversation starts with the constraint, not a pre-filled deliverables list.",
};

const contextPrompts: Record<Context, string> = {
  hero: "A patient query has to find a credible route to your clinic.",
  journey: "If the clinic never surfaces, quality never enters the decision.",
  services: "Different visibility constraints need different engineering.",
  proof: "These numbers have receipts.",
  diagnostic: "The first check reads public technical signals only.",
  final: "Start with the website, location and priority treatment.",
};

type Point = { x: number; y: number };

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
  const positionRef = useRef<Point>({ x: 0, y: 0 });
  const physicsRef = useRef<number | null>(null);
  const reactionTimerRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const dragRef = useRef({ active: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0, lastX: 0, lastY: 0, lastTime: 0, vx: 0, vy: 0 });
  const [open, setOpen] = useState(false);
  const [intro, setIntro] = useState(false);
  const [waving, setWaving] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [surprised, setSurprised] = useState(false);
  const [reaction, setReaction] = useState("");
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === "undefined") return "straight";
    const saved = window.localStorage.getItem("kairank-kai-mode") as Mode | null;
    return saved && modes.some((item) => item.id === saved) ? saved : "straight";
  });
  const [topic, setTopic] = useState<Topic>("about");
  const [context, setContext] = useState<Context>("hero");
  const [voiceSupported, setVoiceSupported] = useState(false);

  const answer = useMemo(() => {
    if (mode === "facts") return facts[topic];
    const base = answers[topic];
    if (mode === "explain") return `${base} The useful next step is to inspect the evidence behind the status before turning it into a plan.`;
    if (mode === "humour") {
      const ending = topic === "diagnostic"
        ? " The robots can keep their paperwork."
        : topic === "results"
          ? " Evidence first; victory lap second."
          : " Search engines are remarkably fond of tidy explanations.";
      return `${base}${ending}`;
    }
    return base;
  }, [mode, topic]);

  const activeTopic = topics.find((item) => item.id === topic) ?? topics[0];

  function setMascotPosition(point: Point) {
    positionRef.current = point;
    mascotRef.current?.style.setProperty("--kai-x", `${point.x}px`);
    mascotRef.current?.style.setProperty("--kai-y", `${point.y}px`);
  }

  function getBounds() {
    const node = mascotRef.current;
    const width = node?.offsetWidth ?? 76;
    const height = node?.offsetHeight ?? 88;
    const inset = 24;
    const baseX = window.innerWidth - inset - width;
    const baseY = window.innerHeight - inset - height;
    return { minX: 8 - baseX, maxX: window.innerWidth - 8 - width - baseX, minY: 76 - baseY, maxY: window.innerHeight - 8 - height - baseY };
  }

  function clampPoint(point: Point) {
    const bounds = getBounds();
    return { x: Math.min(bounds.maxX, Math.max(bounds.minX, point.x)), y: Math.min(bounds.maxY, Math.max(bounds.minY, point.y)) };
  }

  function stopPhysics() {
    if (physicsRef.current !== null) window.cancelAnimationFrame(physicsRef.current);
    physicsRef.current = null;
  }

  function showReaction(message: string, duration = 2600) {
    setReaction(message);
    if (reactionTimerRef.current !== null) window.clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = window.setTimeout(() => setReaction(""), duration);
  }

  function releaseMascot() {
    const drag = dragRef.current;
    if (!drag.active) return;
    drag.active = false;
    setDragging(false);
    if (!drag.moved) return;

    suppressClickRef.current = true;
    trackEvent("kai_dragged", { x: Math.round(positionRef.current.x), y: Math.round(positionRef.current.y) });

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const speed = Math.hypot(drag.vx, drag.vy);
    if (reduceMotion || speed < 1.1) return;

    trackEvent("kai_thrown", { speed: Math.round(speed * 10) / 10 });
    setSurprised(true);
    let velocityX = drag.vx;
    let velocityY = drag.vy;
    let bounces = 0;
    const tick = () => {
      const bounds = getBounds();
      const next = { x: positionRef.current.x + velocityX, y: positionRef.current.y + velocityY };
      if (next.x <= bounds.minX || next.x >= bounds.maxX) { velocityX *= -0.54; next.x = Math.min(bounds.maxX, Math.max(bounds.minX, next.x)); bounces += 1; }
      if (next.y <= bounds.minY || next.y >= bounds.maxY) { velocityY *= -0.54; next.y = Math.min(bounds.maxY, Math.max(bounds.minY, next.y)); bounces += 1; }
      velocityX *= 0.955;
      velocityY *= 0.955;
      setMascotPosition(next);
      if (Math.hypot(velocityX, velocityY) > 0.16) physicsRef.current = window.requestAnimationFrame(tick);
      else {
        physicsRef.current = null;
        setSurprised(false);
        const throwCount = Number(window.sessionStorage.getItem("kairank-kai-throws") ?? "0") + 1;
        window.sessionStorage.setItem("kairank-kai-throws", String(throwCount));
        if (throwCount % 4 === 0 || bounces > 3) showReaction(throwCount % 8 === 0 ? "Google has been less hostile." : "Interesting CRO strategy.");
      }
    };
    physicsRef.current = window.requestAnimationFrame(tick);
  }

  function pointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return;
    stopPhysics();
    const now = performance.now();
    dragRef.current = { active: true, moved: false, startX: event.clientX, startY: event.clientY, originX: positionRef.current.x, originY: positionRef.current.y, lastX: event.clientX, lastY: event.clientY, lastTime: now, vx: 0, vy: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function pointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current;
    if (!drag.active) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 4) drag.moved = true;
    const now = performance.now();
    const elapsed = Math.max(4, now - drag.lastTime);
    drag.vx = ((event.clientX - drag.lastX) / elapsed) * 16.67;
    drag.vy = ((event.clientY - drag.lastY) / elapsed) * 16.67;
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    drag.lastTime = now;
    setMascotPosition(clampPoint({ x: drag.originX + dx, y: drag.originY + dy }));
  }

  useEffect(() => {
    const supportFrame = window.requestAnimationFrame(() => setVoiceSupported("speechSynthesis" in window && "SpeechSynthesisUtterance" in window));
    const seen = window.sessionStorage.getItem("kairank-kai-intro-v6") === "seen";
    const timer = seen ? null : window.setTimeout(() => {
      setIntro(true);
      setWaving(true);
      window.sessionStorage.setItem("kairank-kai-intro-v6", "seen");
      window.setTimeout(() => setWaving(false), 1200);
    }, 2200);
    return () => {
      window.cancelAnimationFrame(supportFrame);
      if (timer !== null) window.clearTimeout(timer);
      stopPhysics();
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
    const onResize = () => {
      const node = mascotRef.current;
      if (!node) return;
      const inset = 24;
      const baseX = window.innerWidth - inset - node.offsetWidth;
      const baseY = window.innerHeight - inset - node.offsetHeight;
      const next = {
        x: Math.min(window.innerWidth - 8 - node.offsetWidth - baseX, Math.max(8 - baseX, positionRef.current.x)),
        y: Math.min(window.innerHeight - 8 - node.offsetHeight - baseY, Math.max(76 - baseY, positionRef.current.y)),
      };
      positionRef.current = next;
      node.style.setProperty("--kai-x", `${next.x}px`);
      node.style.setProperty("--kai-y", `${next.y}px`);
    };
    const onPointerProximity = (event: PointerEvent) => {
      if (dragRef.current.active || !mascotRef.current) return;
      const rect = mascotRef.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const distance = Math.hypot(dx, dy);
      const strength = distance < 180 ? 1 - distance / 180 : 0;
      mascotRef.current.style.setProperty("--kai-look-x", `${Math.max(-3, Math.min(3, dx / 30)) * strength}px`);
      mascotRef.current.style.setProperty("--kai-look-y", `${Math.max(-2, Math.min(2, dy / 35)) * strength}px`);
    };
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("pointermove", onPointerProximity, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
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
    register("#home", "hero"); register("#problem", "journey"); register("#services", "services"); register("#proof", "proof"); register("#audit", "diagnostic"); register("#contact", "final");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setContext(sectionMap.get(visible.target) ?? "hero");
    }, { rootMargin: "-25% 0px -55%", threshold: [0, 0.2, 0.5] });
    sectionMap.forEach((_, element) => observer.observe(element));

    const onService = (event: Event) => {
      const service = (event as CustomEvent<{ service: string }>).detail.service;
      const message = service === "technical" ? "Tiny wrench. Large consequences." : service === "local" ? "Location signal acquired." : service === "content" ? "Those nodes are finally talking." : service === "entity" ? "Antenna up. Entity connected." : "Useful demand beats noisy demand.";
      showReaction(message);
    };
    const onSuccess = (event: Event) => {
      const checks = (event as CustomEvent<{ checks: Array<{ id: string; status: string }> }>).detail.checks;
      const robots = checks.some((check) => check.id === "robots" && check.status === "pass");
      const sitemap = checks.some((check) => check.id === "sitemap" && check.status === "pass");
      showReaction(robots && sitemap ? "The robots have paperwork. Google has directions." : "Well. That was suspiciously tidy.", 3400);
    };
    const onError = () => showReaction("Found something. I knew I wasn’t here just for decoration.", 3400);
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

  function toggle() {
    if (suppressClickRef.current) { suppressClickRef.current = false; return; }
    setOpen((current) => {
      const next = !current;
      if (next) trackEvent("kai_opened", { context });
      return next;
    });
    setIntro(false);
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

  function goTo(selector: string) {
    setIntro(false);
    document.querySelector(selector)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
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
    <div className={`kai-assistant kai-assistant--v6${open ? " is-open" : ""}`}>
      {intro && !open ? (
        <aside className="kai-intro-v6" aria-label="Introduction from Kai">
          <strong>Hi — I’m Kai.</strong>
          <p>I find search problems for a living.</p>
          <span>Want me to check yours?</span>
          <div><button type="button" onClick={() => goTo("#audit")}>Check my clinic</button><button type="button" onClick={() => goTo("#proof")}>Show me proof</button><button type="button" onClick={toggle}>What can you do?</button></div>
        </aside>
      ) : null}

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
              {voiceSupported ? <button type="button" onClick={speak}>Speak answer <span aria-hidden="true">◖</span></button> : null}
            </div>
          </div>
          <p className="kai-panel__boundary">Search guidance only. Kai does not offer medical advice or live ranking claims.</p>
        </aside>
      ) : null}

      <button
        className={`kai-mascot${dragging ? " is-dragging" : ""}`}
        ref={mascotRef}
        type="button"
        aria-label="Open Kai search assistant. Drag Kai around the screen on desktop."
        aria-expanded={open}
        aria-controls="kai-panel"
        onClick={toggle}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={releaseMascot}
        onPointerCancel={releaseMascot}
      >
        <KaiRobot waving={waving} surprised={surprised} />
        <span className="kai-mascot__name">KAI</span>
      </button>
    </div>
  );
}
