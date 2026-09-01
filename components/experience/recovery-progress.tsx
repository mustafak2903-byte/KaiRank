"use client";

import { useEffect, useRef } from "react";

const moments = [
  {
    index: "01",
    label: "Surface area",
    value: "+808%",
    title: "Search impressions",
    body: "A much larger set of relevant searches could find the clinic.",
  },
  {
    index: "02",
    label: "Organic discovery",
    value: "+354%",
    title: "Organic clicks",
    body: "Expanded visibility became measurable organic visits.",
  },
  {
    index: "03",
    label: "Commercial intent",
    value: "#1",
    title: "High-intent treatment search",
    body: "“Deep tissue massage Birmingham” reached first position.",
  },
] as const;

export function RecoveryProgress() {
  const rootRef = useRef<HTMLDivElement>(null);

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
      const phase = reduceMotion ? 2 : Math.min(2, Math.floor(progress * 3));
      root.style.setProperty("--case-progress", progress.toFixed(4));
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
    <div className="recovery-progress" data-phase="0" ref={rootRef}>
      <div className="recovery-progress__sticky">
        <div className="recovery-progress__narrative">
          {moments.map((moment, phase) => (
            <article data-stage={phase} key={moment.index}>
              <div><span className="data-label">{moment.index} / {moment.label}</span><strong>{moment.value}</strong></div>
              <div><h3>{moment.title}</h3><p>{moment.body}</p></div>
            </article>
          ))}
          <div className="recovery-progress__rail" aria-hidden="true"><i /></div>
        </div>

        <div className="recovery-progress__evidence">
          <div className="recovery-query"><span className="data-label">High-intent query</span><strong>deep tissue massage birmingham</strong></div>
          <div className="recovery-result"><span>01</span><div><strong>The Recovery Room</strong><small>Organic result · Birmingham</small></div><i /></div>
          <dl>
            <div><dt>1.86K</dt><dd>organic clicks</dd></div>
            <div><dt>120K</dt><dd>search impressions</dd></div>
            <div><dt>214</dt><dd>booking-intent clicks / 28 days</dd></div>
          </dl>
          <details className="recovery-evidence-drawer">
            <summary data-event="evidence_opened" data-event-label="The Recovery Room case study">View verified case study <span aria-hidden="true">↗</span></summary>
            <div>
              <p>Technical SEO, local search and treatment-page architecture turned a constrained search foundation into broader, measurable discovery. Booking-intent clicks record tracked actions—not completed bookings.</p>
            </div>
          </details>
          <a className="recovery-source-link" data-event="evidence_opened" data-event-label="The Recovery Room source evidence" href="https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing" target="_blank" rel="noreferrer">View source evidence <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  );
}
