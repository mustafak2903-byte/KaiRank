"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const stages = [
  {
    date: "Jul 2025",
    label: "Baseline",
    value: "~250",
    detail: "ranking keywords",
    note: "A large hospital estate with far more clinical expertise than search visibility.",
  },
  {
    date: "Dec 2025",
    label: "Early traction",
    value: "400+",
    detail: "top-10 terms",
    note: "Doctor, service and technical signals began resolving into visible search positions.",
  },
  {
    date: "Apr 2026",
    label: "Compounding",
    value: "~800",
    detail: "top-10 terms",
    note: "The system scaled across profiles, clinical topics and high-intent discovery paths.",
  },
  {
    date: "May 2026",
    label: "Result",
    value: "3,900",
    detail: "total ranking keywords",
    note: "The domain reached an all-time visibility high, with 573 top-10 and 272 top-three terms.",
  },
] as const;

export function SouthCityProgress() {
  const section = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const target = section.current;
    if (!target) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const reducedFrame = window.requestAnimationFrame(() => {
        setProgress(1);
        setActive(stages.length - 1);
      });
      return () => window.cancelAnimationFrame(reducedFrame);
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = target.getBoundingClientRect();
      const distance = Math.max(1, target.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, -bounds.top / distance));
      setProgress(next);
      setActive(Math.min(stages.length - 1, Math.floor(next * stages.length)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const style = { "--case-progress": progress } as CSSProperties;

  return (
    <div className="south-city-progress" ref={section} style={style}>
      <div className="south-city-progress__sticky">
        <div className="south-city-progress__reading">
          <div className="data-label">
            <span>South City Hospital</span>
            <span>{stages[active].date}</span>
          </div>
          <div className="south-city-progress__value" aria-hidden="true">
            <span>{stages[active].value}</span>
            <small>{stages[active].detail}</small>
          </div>

          <svg viewBox="0 0 720 320" role="img" aria-labelledby="south-city-title south-city-desc">
            <title id="south-city-title">South City Hospital search visibility progression</title>
            <desc id="south-city-desc">Ranking keywords grew from about 250 in July 2025 to 3,900 in May 2026.</desc>
            <defs>
              <linearGradient id="south-city-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--color-signal)" stopOpacity=".26" />
                <stop offset="1" stopColor="var(--color-signal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="south-city-progress__grid" aria-hidden="true">
              <path d="M38 42H682M38 151H682M38 264H682" />
              <path d="M38 28V264M253 28V264M468 28V264M682 28V264" />
            </g>
            <path className="south-city-progress__area" d="M38 260L180 247L330 201L506 127L682 38L682 264L38 264Z" />
            <path className="south-city-progress__line" pathLength="1" d="M38 260L180 247L330 201L506 127L682 38" />
            {[{ x: 38, y: 260 }, { x: 180, y: 247 }, { x: 330, y: 201 }, { x: 506, y: 127 }, { x: 682, y: 38 }].map((point, index) => (
              <g className={`south-city-progress__point${progress >= index / 4 ? " is-active" : ""}`} key={`${point.x}-${point.y}`}>
                <circle cx={point.x} cy={point.y} r="5" />
                <circle cx={point.x} cy={point.y} r="12" />
              </g>
            ))}
          </svg>

          <div className="south-city-progress__axis data-label" aria-hidden="true">
            <span>Jul 25</span><span>Dec 25</span><span>Mar 26</span><span>Apr 26</span><span>May 26</span>
          </div>
        </div>

        <ol className="south-city-progress__stages">
          {stages.map((stage, index) => (
            <li className={active === index ? "is-active" : ""} key={stage.label}>
              <span className="data-label">0{index + 1} / {stage.label}</span>
              <strong>{stage.date}</strong>
              <p>{stage.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
