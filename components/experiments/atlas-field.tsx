"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

type Lens = "google" | "maps" | "ai";

const lenses: Record<Lens, { label: string; note: string; nodes: [string, string, string, string] }> = {
  google: {
    label: "Google",
    note: "Pages, relevance and result-entry pathways across the same search territory.",
    nodes: ["Service page", "Query relevance", "Authority signal", "Result entry"],
  },
  maps: {
    label: "Maps",
    note: "Location, proximity and local evidence interpreted without implying a live Maps position.",
    nodes: ["Clinic location", "Proximity field", "Local evidence", "Service area"],
  },
  ai: {
    label: "AI",
    note: "Service, expertise and evidence relationships—not an unverified citation claim.",
    nodes: ["Service entity", "Expertise", "Evidence", "Location entity"],
  },
};

const lensOrder = Object.keys(lenses) as Lens[];

export function AtlasField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<Lens>("google");

  function selectLens(next: Lens) {
    setLens(next);
  }

  function moveLens(event: KeyboardEvent<HTMLButtonElement>, current: Lens) {
    const index = lensOrder.indexOf(current);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % lensOrder.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + lensOrder.length) % lensOrder.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = lensOrder.length - 1;
    else return;
    event.preventDefault();
    const value = lensOrder[next];
    setLens(value);
    window.requestAnimationFrame(() => document.getElementById(`atlas-lens-${value}`)?.focus());
  }

  function scan(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const field = fieldRef.current;
    if (!field) return;
    const bounds = field.getBoundingClientRect();
    field.style.setProperty("--atlas-x", `${event.clientX - bounds.left}px`);
    field.style.setProperty("--atlas-y", `${event.clientY - bounds.top}px`);
    field.style.setProperty("--atlas-nx", (((event.clientX - bounds.left) / bounds.width - 0.5) * 2).toFixed(4));
    field.style.setProperty("--atlas-ny", (((event.clientY - bounds.top) / bounds.height - 0.5) * 2).toFixed(4));
  }

  return (
    <div className={`atlas-field is-${lens}`} onPointerMove={scan} ref={fieldRef}>
      <div className="atlas-field__meta">
        <span>52.4862° N</span>
        <span>1.8904° W</span>
        <span>BHM / 028</span>
      </div>

      <div className="atlas-field__query">
        <span>Patient query / coordinate</span>
        <strong>deep tissue massage Birmingham</strong>
        <i aria-hidden="true" />
      </div>

      <svg className="atlas-field__contours" viewBox="0 0 700 680" aria-hidden="true">
        <g className="atlas-contour atlas-contour--outer">
          <path d="M-30 130C69 45 202 29 304 72c107 45 149 0 258 26 105 25 160 103 128 186-34 89-133 97-186 181-51 81-47 171-154 191-114 22-166-70-266-71-83-1-165-44-159-129 7-93 109-119 119-207 7-63-130-39-74-119Z" />
          <path d="M4 155C84 83 199 62 291 98c103 40 150 9 247 31 92 20 135 84 108 151-30 75-120 87-166 159-45 70-44 145-139 164-101 20-148-58-237-62-75-3-145-39-137-111 10-76 94-104 105-178 8-56-116-33-68-97Z" />
        </g>
        <g className="atlas-contour atlas-contour--middle">
          <path d="M69 178C128 126 213 103 286 130c87 31 134 17 213 34 75 16 106 66 82 118-27 61-99 73-137 132-37 58-39 117-119 135-84 19-127-42-203-47-63-4-118-32-108-89 11-60 76-88 88-147 9-46-74-36-33-88Z" />
          <path d="M124 204c42-39 105-58 162-39 68 23 110 24 170 34 59 10 80 48 58 88-24 45-79 58-108 102-30 44-37 88-100 105-66 17-102-28-163-34-49-5-88-26-77-68 12-45 59-70 71-115 10-35-45-32-13-73Z" />
        </g>
        <path className="atlas-field__route" pathLength="1" d="M625 87C552 153 529 228 450 272S289 321 254 407 128 515 52 585" />
        <path className="atlas-field__axis" d="M350 36v600M36 340h628" />
      </svg>

      <div className="atlas-field__scanner" aria-hidden="true" />
      <div className="atlas-field__crosshair" aria-hidden="true"><i /><i /></div>

      {lenses[lens].nodes.map((node, index) => (
        <span className={`atlas-node atlas-node--${index + 1}`} key={node}>
          <i aria-hidden="true" />
          <b>{String(index + 1).padStart(2, "0")}</b>
          <em>{node}</em>
        </span>
      ))}

      <div className="atlas-field__lenses" role="tablist" aria-label="Search visibility lenses">
        {lensOrder.map((item, index) => (
          <button
            aria-controls="atlas-lens-note"
            aria-selected={lens === item}
            id={`atlas-lens-${item}`}
            key={item}
            onClick={() => selectLens(item)}
            onKeyDown={(event) => moveLens(event, item)}
            role="tab"
            tabIndex={lens === item ? 0 : -1}
            type="button"
          >
            <span>0{index + 1}</span>{lenses[item].label}
          </button>
        ))}
      </div>
      <p className="atlas-field__note" id="atlas-lens-note" role="tabpanel" aria-labelledby={`atlas-lens-${lens}`} aria-live="polite">
        <strong>{lenses[lens].label} lens</strong>
        {lenses[lens].note}
      </p>
    </div>
  );
}
