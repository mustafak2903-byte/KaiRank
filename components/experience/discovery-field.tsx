"use client";

import { useRef, useState, type PointerEvent } from "react";

const surfaces = [
  {
    label: "Search",
    query: "sports massage birmingham",
    context: "A treatment-led search. The patient is comparing relevance, trust and proximity before contacting anyone.",
    result: "Recovery clinic / Birmingham",
    state: "Position 03 · visible",
  },
  {
    label: "Maps",
    query: "physiotherapist near me",
    context: "Local intent compresses the decision. Location, reviews, services and entity consistency decide who enters the shortlist.",
    result: "Clinic entity / local pack",
    state: "Map surface · eligible",
  },
  {
    label: "AI",
    query: "who treats shoulder pain nearby?",
    context: "Answer engines need enough structured clarity and evidence to understand which provider is relevant—without a guarantee of citation.",
    result: "Service + expertise + location",
    state: "Retrieval layer · understood",
  },
] as const;

export function DiscoveryField() {
  const [active, setActive] = useState(0);
  const field = useRef<HTMLDivElement>(null);
  const surface = surfaces[active];

  function trackPointer(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    field.current?.style.setProperty("--pointer-x", `${x.toFixed(1)}%`);
    field.current?.style.setProperty("--pointer-y", `${y.toFixed(1)}%`);
  }

  return (
    <div className="discovery-field" ref={field} onPointerMove={trackPointer}>
      <div className="discovery-field__topline data-label">
        <span>Live intent model</span>
        <span>Signal / {String(active + 1).padStart(2, "0")}</span>
      </div>

      <div className="discovery-field__query" key={surface.query}>
        <span className="data-label">Patient query</span>
        <strong>{surface.query}</strong>
        <span className="discovery-field__cursor" aria-hidden="true" />
      </div>

      <div className="discovery-field__route" aria-hidden="true">
        <span className="discovery-field__route-line" />
        <i className="discovery-field__route-node discovery-field__route-node--one" />
        <i className="discovery-field__route-node discovery-field__route-node--two" />
        <i className="discovery-field__route-node discovery-field__route-node--three" />
      </div>

      <div className="discovery-field__result" key={surface.result}>
        <div>
          <span className="data-label">Provider surfaced</span>
          <strong>{surface.result}</strong>
        </div>
        <span className="data-label discovery-field__state">{surface.state}</span>
      </div>

      <p>{surface.context}</p>

      <div className="discovery-field__controls" role="group" aria-label="Compare discovery surfaces">
        {surfaces.map((item, index) => (
          <button
            type="button"
            aria-pressed={active === index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            key={item.label}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
