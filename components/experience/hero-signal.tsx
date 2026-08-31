"use client";

import { useState } from "react";

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

export function HeroSignal() {
  const [channel, setChannel] = useState<Channel>("search");
  const active = channels[channel];

  return (
    <div className={`hero-signal is-${channel}`} data-reveal>
      <div className="hero-signal__header data-label">
        <span>Live patient intent</span>
        <span>Signal / 01</span>
      </div>

      <div className="hero-signal__query">
        <span className="data-label">Patient query</span>
        <strong>{active.query}</strong>
        <small>{active.detail}</small>
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
        <span className="data-label">Clinic surfaced</span>
        <strong>{active.result}</strong>
        <small>{active.position}</small>
      </div>

      <div className="hero-signal__tabs" role="tablist" aria-label="Search discovery channels">
        {(Object.keys(channels) as Channel[]).map((key, index) => (
          <button
            aria-controls={`signal-${key}`}
            aria-selected={channel === key}
            id={`signal-tab-${key}`}
            key={key}
            onClick={() => setChannel(key)}
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
