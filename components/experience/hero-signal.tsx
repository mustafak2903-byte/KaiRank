"use client";

import { useState, type KeyboardEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const surfaces = {
  google: { label: "Google", note: "Relevant pages enter the result set" },
  maps: { label: "Maps", note: "Location signals shape nearby discovery" },
  ai: { label: "AI", note: "Connected evidence clarifies the clinic entity" },
} as const;

type Surface = keyof typeof surfaces;

export function HeroSignal() {
  const [surface, setSurface] = useState<Surface>("google");

  function selectSurface(next: Surface) {
    setSurface(next);
    trackEvent("search_surface_changed", { surface: next });
    window.dispatchEvent(new CustomEvent("kairank:search-surface", { detail: { surface: next } }));
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, key: Surface) {
    const keys = Object.keys(surfaces) as Surface[];
    const current = keys.indexOf(key);
    let next = current;
    if (event.key === "ArrowRight") next = (current + 1) % keys.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + keys.length) % keys.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = keys.length - 1;
    else return;
    event.preventDefault();
    selectSurface(keys[next]);
    window.requestAnimationFrame(() => document.getElementById(`surface-tab-${keys[next]}`)?.focus());
  }

  return (
    <div className={`hero-signal hero-surface is-${surface}`}>
      <div className="hero-surface__topline">
        <span className="data-label">Patient query</span>
        <i aria-hidden="true" />
        <span className="data-label">Birmingham / UK</span>
      </div>

      <div className="hero-surface__query">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
        <strong>deep tissue massage Birmingham</strong>
        <span aria-hidden="true">↵</span>
      </div>

      <div className="hero-surface__tabs" role="tablist" aria-label="Search environments">
        {(Object.keys(surfaces) as Surface[]).map((key, index) => (
          <button
            aria-controls={`surface-panel-${key}`}
            aria-selected={surface === key}
            id={`surface-tab-${key}`}
            key={key}
            onClick={() => selectSurface(key)}
            onKeyDown={(event) => moveTab(event, key)}
            role="tab"
            tabIndex={surface === key ? 0 : -1}
            type="button"
          >
            <span className="data-label">0{index + 1}</span>{surfaces[key].label}
          </button>
        ))}
      </div>

      <div className="hero-surface__viewport">
        <div className="hero-surface__scan" aria-hidden="true" />

        <div className="surface-scene surface-scene--google" id="surface-panel-google" role="tabpanel" aria-labelledby="surface-tab-google" aria-hidden={surface !== "google"}>
          <span className="surface-scene__label data-label">Verified case-study query / demonstration</span>
          <div className="surface-google__result is-primary">
            <span>01</span><div><strong>The Recovery Room</strong><small>Deep tissue massage · Birmingham</small></div><i />
          </div>
          <div className="surface-google__result"><span>02</span><div><strong>Relevant clinic</strong><small>Treatment page · local context</small></div></div>
          <div className="surface-google__result"><span>03</span><div><strong>Nearby clinic</strong><small>Service evidence · location</small></div></div>
        </div>

        <div className="surface-scene surface-scene--maps" id="surface-panel-maps" role="tabpanel" aria-labelledby="surface-tab-maps" aria-hidden={surface !== "maps"}>
          <span className="surface-scene__label data-label">Nearby discovery / conceptual view</span>
          <svg viewBox="0 0 620 320" role="img" aria-label="Location grid and proximity signals around a clinic">
            <path className="map-road" d="M-20 80C120 92 184 45 310 70s198 102 350 74M84-20c8 104 84 151 66 356M480-20c-22 110-102 190-72 356M-20 264c124-42 215-26 328-2s196 16 338-30" />
            <circle className="map-radius map-radius--outer" cx="330" cy="162" r="118" />
            <circle className="map-radius map-radius--inner" cx="330" cy="162" r="70" />
            <circle className="map-point" cx="122" cy="101" r="6" /><circle className="map-point" cx="508" cy="234" r="6" /><circle className="map-point" cx="203" cy="252" r="6" />
            <path className="map-pin" d="M330 113c-27 0-48 20-48 46 0 34 48 78 48 78s48-44 48-78c0-26-21-46-48-46Zm0 67a20 20 0 1 1 0-40 20 20 0 0 1 0 40Z" />
          </svg>
          <div className="surface-maps__legend"><strong>Clinic location</strong><small>Proximity · relevance · evidence</small></div>
          <span className="surface-scene__truth data-label">No Maps position implied</span>
        </div>

        <div className="surface-scene surface-scene--ai" id="surface-panel-ai" role="tabpanel" aria-labelledby="surface-tab-ai" aria-hidden={surface !== "ai"}>
          <span className="surface-scene__label data-label">Entity understanding / conceptual view</span>
          <svg viewBox="0 0 620 320" role="img" aria-label="Clinic entity connected to services, location, expertise and evidence">
            <path d="M310 160 116 78M310 160 114 244M310 160 506 78M310 160 508 244" />
            <circle className="ai-core" cx="310" cy="160" r="54" />
            <circle className="ai-node" cx="116" cy="78" r="30" /><circle className="ai-node" cx="114" cy="244" r="30" /><circle className="ai-node" cx="506" cy="78" r="30" /><circle className="ai-node" cx="508" cy="244" r="30" />
          </svg>
          <strong className="ai-label ai-label--core">Clinic</strong><span className="ai-label ai-label--service">Service</span><span className="ai-label ai-label--location">Location</span><span className="ai-label ai-label--expertise">Expertise</span><span className="ai-label ai-label--evidence">Evidence</span>
          <span className="surface-scene__truth data-label">No AI citation implied</span>
        </div>
      </div>

      <div className="hero-surface__footer">
        <span className="data-label">{surfaces[surface].label} surface</span>
        <p>{surfaces[surface].note}</p>
        <i aria-hidden="true" />
      </div>
    </div>
  );
}
