"use client";

import { useEffect, useRef } from "react";

const moments = [
  {
    index: "01",
    label: "Surface area",
    value: "+808%",
    title: "More searches could see the clinic.",
    body: "Search impressions expanded as technical access and treatment relevance improved.",
  },
  {
    index: "02",
    label: "Qualified discovery",
    value: "+354%",
    title: "Visibility became visits.",
    body: "Organic clicks grew with demand-led pages and a clearer route from search to service.",
  },
  {
    index: "03",
    label: "Commercial intent",
    value: "#1",
    title: "A valuable treatment search was won.",
    body: "The clinic reached first position for “deep tissue massage Birmingham”.",
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
          <details>
            <summary>Evidence and context <span aria-hidden="true">+</span></summary>
            <div>
              <p>Verified portfolio case-study data. The source repository includes a report link but no analytics screenshots, so this page does not fabricate one.</p>
              <a href="https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing" target="_blank" rel="noreferrer">Open evidence report <span aria-hidden="true">↗</span></a>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
