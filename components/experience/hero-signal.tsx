"use client";

import { useEffect, useState, type KeyboardEvent } from "react";

const channels = {
  search: {
    label: "Search",
    query: "deep tissue massage birmingham",
    detail: "Treatment intent · local modifier",
    result: "The Recovery Room",
    position: "Position 01",
  },
  maps: {
    label: "Maps",
    query: "sports massage near me",
    detail: "Proximity · relevance · trust",
    result: "The Recovery Room",
    position: "Local result",
  },
  ai: {
    label: "AI",
    query: "best massage for a tight lower back",
    detail: "Question · expertise · evidence",
    result: "Clinic entity understood",
    position: "Retrieval ready",
  },
} as const;

type Channel = keyof typeof channels;

type DiagnosticContext = {
  website: string;
  location: string;
  priorityService: string;
};

export function HeroSignal() {
  const [channel, setChannel] = useState<Channel>("search");
  const [context, setContext] = useState<DiagnosticContext>({ website: "", location: "", priorityService: "" });
  const active = channels[channel];
  const hasContext = Boolean(context.website || context.location || context.priorityService);
  const contextualQuery = [context.priorityService, context.location].filter(Boolean).join(" · ") || active.query;
  const contextualTarget = context.website
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "") || "Your clinic website";

  useEffect(() => {
    const update = (event: Event) => setContext((event as CustomEvent<DiagnosticContext>).detail);
    window.addEventListener("kairank:diagnostic-context", update);
    return () => window.removeEventListener("kairank:diagnostic-context", update);
  }, []);

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, key: Channel) {
    const keys = Object.keys(channels) as Channel[];
    const current = keys.indexOf(key);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % keys.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + keys.length) % keys.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = keys.length - 1;
    else return;
    event.preventDefault();
    setChannel(keys[next]);
    window.requestAnimationFrame(() => document.getElementById(`signal-tab-${keys[next]}`)?.focus());
  }

  return (
    <div className={`hero-signal is-${channel}`} data-reveal>
      <div className="hero-signal__header data-label">
        <span>Live patient intent</span>
        <span>Signal / 01</span>
      </div>

      <div className="hero-signal__query">
        <span className="data-label">{hasContext ? "Your diagnostic context" : "Patient query"}</span>
        <strong>{hasContext ? contextualQuery : active.query}</strong>
        <small>{hasContext ? "Clinic-supplied · not live ranking data" : active.detail}</small>
      </div>

      <svg className="hero-signal__routes" viewBox="0 0 680 280" role="img" aria-label={`${active.label} signal connecting a patient query to a clinic result`}>
        <path className="route route--search" d="M56 140 C170 140 190 42 330 42 S520 68 624 68" />
        <path className="route route--maps" d="M56 140 C180 140 210 140 330 140 S514 140 624 140" />
        <path className="route route--ai" d="M56 140 C170 140 190 238 330 238 S520 212 624 212" />
        <circle className="route-node route-node--source" cx="56" cy="140" r="7" />
        <circle className="route-node route-node--search" cx="330" cy="42" r="7" />
        <circle className="route-node route-node--maps" cx="330" cy="140" r="7" />
        <circle className="route-node route-node--ai" cx="330" cy="238" r="7" />
        <circle className="route-node route-node--search" cx="624" cy="68" r="7" />
        <circle className="route-node route-node--maps" cx="624" cy="140" r="7" />
        <circle className="route-node route-node--ai" cx="624" cy="212" r="7" />
      </svg>

      <div className="hero-signal__result">
        <span className="data-label">{hasContext ? "Diagnostic target" : "Clinic surfaced"}</span>
        <strong>{hasContext ? contextualTarget : active.result}</strong>
        <small>{hasContext ? "Technical surface only" : active.position}</small>
      </div>

      <div className="hero-signal__tabs" role="tablist" aria-label="Search discovery channels">
        {(Object.keys(channels) as Channel[]).map((key, index) => (
          <button
            aria-controls={`signal-${key}`}
            aria-selected={channel === key}
            id={`signal-tab-${key}`}
            key={key}
            onClick={() => setChannel(key)}
            onKeyDown={(event) => moveTab(event, key)}
            role="tab"
            tabIndex={channel === key ? 0 : -1}
            type="button"
          >
            <span className="data-label">0{index + 1}</span>
            {channels[key].label}
          </button>
        ))}
      </div>
      <div id={`signal-${channel}`} role="tabpanel" aria-labelledby={`signal-tab-${channel}`} className="sr-only">
        {active.label} discovery path selected.
      </div>
    </div>
  );
}
