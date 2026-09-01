"use client";

import { useEffect, useRef } from "react";

const stages = ["Patient need", "Search", "Google · Maps · AI", "Competitors surface", "Shortlist"] as const;

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
      const phase = reduceMotion ? 4 : Math.min(4, Math.floor(progress * 5));
      const scene = root.querySelector<HTMLElement>(".v6-journey__scene");
      const token = root.querySelector<HTMLElement>(".v6-query-token");
      if (scene && token) {
        const mobile = window.innerWidth <= 768;
        const available = Math.max(0, scene.clientWidth - token.offsetWidth - 24);
        const travel = Math.min(available, scene.clientWidth * (mobile ? 0.22 : 0.5));
        root.style.setProperty("--journey-x", `${reduceMotion ? travel : progress * travel}px`);
        root.style.setProperty("--journey-y", `${reduceMotion ? (mobile ? 88 : 112) : progress * (mobile ? 88 : 112)}px`);
      }
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
    <section className="problem-journey v6-journey" id="problem" aria-labelledby="problem-title" data-phase="0" ref={rootRef}>
      <div className="problem-journey__sticky">
        <div className="container">
          <div className="v3-section-index data-label"><span>02 / Patient search journey</span><span>One query · one decision</span></div>
          <div className="v6-journey__heading">
            <h2 id="problem-title">You can’t be chosen if you never enter the shortlist.</h2>
            <p>A patient’s need becomes somebody else’s opportunity before your clinic is considered.</p>
          </div>

          <div className="v6-journey__scene" aria-label="A patient query moves through search environments and forms a clinic shortlist">
            <ol className="v6-journey__stages">
              {stages.map((stage, index) => (
                <li data-stage={index} key={stage}>
                  <span className="data-label">0{index + 1}</span><strong>{stage}</strong><i aria-hidden="true" />
                </li>
              ))}
            </ol>

            <div className="v6-query-token">
              <span className="data-label">Patient query</span>
              <strong>deep tissue massage Birmingham</strong>
              <i aria-hidden="true" />
            </div>

            <div className="v6-journey__surfaces" aria-hidden="true">
              <span>G</span><span>M</span><span>AI</span>
            </div>

            <div className="v6-journey__shortlist">
              <span className="data-label">Clinic shortlist</span>
              <div><i>01</i><strong>Relevant clinic</strong><small>Visible · evidenced</small></div>
              <div><i>02</i><strong>Nearby clinic</strong><small>Visible · trusted</small></div>
              <div className="is-missing"><i>—</i><strong>Your clinic</strong><small>Not surfaced</small></div>
            </div>

            <div className="v6-journey__outcome">
              <span className="data-label">Decision point</span><strong>Your clinic</strong><em>Not surfaced</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
