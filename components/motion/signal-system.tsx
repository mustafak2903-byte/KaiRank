"use client";

import { useState } from "react";

const signalModes = [
  {
    label: "Local intent",
    query: "private clinic near me",
    surfaces: ["Google", "Maps", "AI answer"],
  },
  {
    label: "Specialist intent",
    query: "best recovery clinic",
    surfaces: ["Google", "Entity", "Citation"],
  },
  {
    label: "Research intent",
    query: "technical SEO consultant",
    surfaces: ["Index", "Ranking", "AI answer"],
  },
] as const;

export function SignalSystem() {
  const [active, setActive] = useState(0);
  const mode = signalModes[active];

  return (
    <div className="signal-system">
      <div className="signal-system__header">
        <div>
          <span className="data-label">SIGNAL / query pathway</span>
          <h2>One query. Multiple surfaces of discovery.</h2>
        </div>
        <span className="signal-system__reading data-label">
          Signal {String(active + 1).padStart(2, "0")} / 03
        </span>
      </div>

      <div className="signal-system__stage" key={mode.query}>
        <div className="signal-system__coordinates data-label" aria-hidden="true">
          <span>51°30′N</span><span>QRY / 001</span><span>VIS / ACTIVE</span>
        </div>
        <svg viewBox="0 0 960 430" role="img" aria-labelledby="signal-title signal-description">
          <title id="signal-title">A query travelling through search systems</title>
          <desc id="signal-description">The query {mode.query} branches into {mode.surfaces.join(", ")} visibility surfaces.</desc>
          <g className="signal-system__grid" aria-hidden="true">
            {Array.from({ length: 13 }, (_, index) => <path d={`M${80 * index} 0V430`} key={`v-${index}`} />)}
            {Array.from({ length: 7 }, (_, index) => <path d={`M0 ${72 * index}H960`} key={`h-${index}`} />)}
          </g>
          <path className="signal-system__route signal-system__route--main" pathLength="1" d="M70 215H300C365 215 360 104 430 104H720" />
          <path className="signal-system__route" pathLength="1" d="M300 215C365 215 360 215 430 215H720" />
          <path className="signal-system__route" pathLength="1" d="M300 215C365 215 360 326 430 326H720" />
          <g className="signal-system__source">
            <rect x="50" y="175" width="250" height="80" rx="4" />
            <text x="72" y="202">QUERY RECEIVED</text>
            <text className="signal-system__query" x="72" y="231">{mode.query}</text>
          </g>
          {mode.surfaces.map((surface, index) => {
            const y = 104 + index * 111;
            return (
              <g className="signal-system__destination" key={surface}>
                <circle cx="740" cy={y} r="6" />
                <circle className="signal-system__destination-ring" cx="740" cy={y} r="18" />
                <text x="778" y={y - 4}>{surface.toUpperCase()}</text>
                <text className="signal-system__state" x="778" y={y + 18}>DISCOVERABLE</text>
              </g>
            );
          })}
          <circle className="signal-system__pulse signal-system__pulse--one" r="5">
            <animateMotion dur="2.8s" repeatCount="indefinite" path="M70 215H300C365 215 360 104 430 104H720" />
          </circle>
          <circle className="signal-system__pulse signal-system__pulse--two" r="5">
            <animateMotion begin=".45s" dur="2.8s" repeatCount="indefinite" path="M70 215H300C365 215 360 215 430 215H720" />
          </circle>
          <circle className="signal-system__pulse signal-system__pulse--three" r="5">
            <animateMotion begin=".9s" dur="2.8s" repeatCount="indefinite" path="M70 215H300C365 215 360 326 430 326H720" />
          </circle>
        </svg>
      </div>

      <div className="signal-system__controls" role="group" aria-label="Choose a query pathway">
        {signalModes.map((item, index) => (
          <button
            type="button"
            className={index === active ? "is-active" : ""}
            aria-pressed={index === active}
            onClick={() => setActive(index)}
            key={item.label}
          >
            <span className="data-label">0{index + 1}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
