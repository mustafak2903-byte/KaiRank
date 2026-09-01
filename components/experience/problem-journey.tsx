"use client";

import { useEffect, useRef } from "react";

const stages = [
  ["01", "Search"],
  ["02", "Maps"],
  ["03", "AI"],
  ["04", "Shortlist"],
] as const;

export function ProblemJourney() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastPhase = -1;

    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const phase = reduceMotion ? 3 : Math.min(3, Math.floor(progress * 4));
      root.style.setProperty("--journey-progress", progress.toFixed(4));
      if (phase !== lastPhase) {
        root.dataset.phase = String(phase);
        lastPhase = phase;
      }
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

  return (
    <section className="problem-journey" id="problem" aria-labelledby="problem-title" data-phase="0" ref={rootRef}>
      <div className="problem-journey__sticky">
        <div className="container">
          <div className="v3-section-index data-label"><span>01 / The cost of invisibility</span><span>Scroll the decision path</span></div>
          <div className="problem-journey__grid">
            <div className="problem-journey__copy">
              <p className="v3-eyebrow">Search demand does not wait</p>
              <h2 id="problem-title">Being good is not the same as being found.</h2>
              <p className="problem-journey__support">A patient searches with intent. If your clinic never enters the result set, your quality never gets considered.</p>
              <ol>
                {stages.map(([index, title], phase) => (
                  <li key={index} data-stage={phase}>
                    <span className="data-label">{index}</span>
                    <div><strong>{title}</strong></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="problem-journey__visual" aria-hidden="true">
              <div className="problem-search">
                <span className="data-label">Patient query / Birmingham</span>
                <strong>deep tissue massage Birmingham</strong>
                <i />
              </div>
              <div className="problem-path">
                {stages.map(([index, title], phase) => (
                  <div data-stage={phase} key={index}><span>{index}</span><strong>{title}</strong><i /></div>
                ))}
              </div>
              <div className="problem-shortlist">
                <span className="data-label">Clinic shortlist</span>
                <div><strong>Relevant clinic</strong><small>Visible · evidenced</small></div>
                <div><strong>Nearby clinic</strong><small>Visible · trusted</small></div>
                <div className="is-missing"><strong>Your clinic</strong><small>Not surfaced</small></div>
              </div>
              <div className="problem-loss"><span className="data-label">End state</span><strong>Your clinic · not surfaced</strong><i /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
