"use client";

import { useEffect, useRef } from "react";

const stages = [
  ["01", "Demand exists", "A patient searches for a treatment, location or answer with real intent."],
  ["02", "Your clinic is absent", "The expertise may be excellent. The result still belongs to someone else."],
  ["03", "Trust forms elsewhere", "Another provider supplies the relevance, proof and next action first."],
  ["04", "The enquiry disappears", "No click. No call. No attribution—just opportunity that never reached the clinic."],
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
              <ol>
                {stages.map(([index, title, body], phase) => (
                  <li key={index} data-stage={phase}>
                    <span className="data-label">{index}</span>
                    <div><strong>{title}</strong><p>{body}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="problem-journey__visual" aria-hidden="true">
              <div className="problem-search">
                <span className="data-label">Patient search / Birmingham</span>
                <strong>private back pain clinic near me</strong>
                <i />
              </div>
              <div className="problem-results">
                <div><span>01</span><strong>Competitor clinic</strong><small>Relevant · nearby · evidenced</small></div>
                <div className="is-missing"><span>—</span><strong>Your clinic</strong><small>Signal incomplete</small></div>
                <div><span>02</span><strong>Directory result</strong><small>Available now</small></div>
              </div>
              <div className="problem-loss"><span className="data-label">Opportunity state</span><strong>Enquiry routed elsewhere</strong><i /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
