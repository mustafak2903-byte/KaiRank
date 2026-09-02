"use client";

import { useRef, useState, type PointerEvent } from "react";

type Surface = "google" | "maps" | "ai";

const surfaces: Record<Surface, { label: string; signals: string }> = {
  google: { label: "Google", signals: "Relevance · authority · pages" },
  maps: { label: "Maps", signals: "Location · proximity · local signals" },
  ai: { label: "AI", signals: "Entity · service · evidence clarity" },
};

export function PrismField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Surface>("google");

  function refract(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const field = fieldRef.current;
    if (!field) return;
    const bounds = field.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    field.style.setProperty("--prism-x", `${x.toFixed(4)}`);
    field.style.setProperty("--prism-y", `${y.toFixed(4)}`);
    field.style.setProperty("--prism-google", Math.max(0.28, 1 - Math.abs(y - 0.31) * 2.5).toFixed(3));
    field.style.setProperty("--prism-maps", Math.max(0.28, 1 - Math.abs(y - 0.5) * 2.5).toFixed(3));
    field.style.setProperty("--prism-ai", Math.max(0.28, 1 - Math.abs(y - 0.69) * 2.5).toFixed(3));
  }

  function resetRefraction() {
    const field = fieldRef.current;
    field?.style.setProperty("--prism-google", "0.72");
    field?.style.setProperty("--prism-maps", "0.72");
    field?.style.setProperty("--prism-ai", "0.72");
  }

  return (
    <div className={`prism-field is-${active}`} onPointerLeave={resetRefraction} onPointerMove={refract} ref={fieldRef}>
      <div className="prism-field__coordinate">
        <span>Patient intent / 01</span>
        <strong>deep tissue massage Birmingham</strong>
      </div>

      <svg className="prism-field__paths" viewBox="0 0 920 560" role="img" aria-label="One patient query splitting across Google, Maps and AI search before converging on clinic discovery">
        <defs>
          <linearGradient id="prism-line" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#8fcdb5" />
            <stop offset="0.42" stopColor="#7185ff" />
            <stop offset="1" stopColor="#c4cdff" />
          </linearGradient>
        </defs>
        <path className="prism-path prism-path--entry" pathLength="1" d="M20 280H245" />
        <path className="prism-path prism-path--google" pathLength="1" d="M245 280C333 280 330 138 445 138H678C744 138 761 280 884 280" />
        <path className="prism-path prism-path--maps" pathLength="1" d="M245 280H884" />
        <path className="prism-path prism-path--ai" pathLength="1" d="M245 280C333 280 330 422 445 422H678C744 422 761 280 884 280" />
        <path className="prism-path prism-path--outcome" pathLength="1" d="M884 280H918" />
        <g className="prism-field__aperture">
          <path d="m210 210 92 70-92 70Z" />
          <circle cx="884" cy="280" r="28" />
          <circle cx="884" cy="280" r="7" />
        </g>
        <g className="prism-field__ticks">
          <path d="M445 126v24M520 126v24M595 126v24M670 126v24M445 268v24M520 268v24M595 268v24M670 268v24M445 410v24M520 410v24M595 410v24M670 410v24" />
        </g>
      </svg>

      <div className="prism-field__surfaces" aria-label="Search surfaces">
        {(Object.keys(surfaces) as Surface[]).map((surface, index) => (
          <button
            aria-pressed={active === surface}
            className={`prism-surface prism-surface--${surface}`}
            key={surface}
            onClick={() => setActive(surface)}
            type="button"
          >
            <span>0{index + 1}</span>
            <strong>{surfaces[surface].label}</strong>
            <small>{surfaces[surface].signals}</small>
          </button>
        ))}
      </div>

      <div className="prism-field__outcome">
        <span>One outcome</span>
        <strong>Clinic<br />discovery</strong>
      </div>
      <p className="prism-field__truth">Conceptual search-surface model. No ranking or citation claim.</p>
    </div>
  );
}
