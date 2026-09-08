"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stages = [
  { index: "01", title: "Patient intent", note: "Treatment + location" },
  { index: "02", title: "Search systems", note: "Google · Maps · AI" },
  { index: "03", title: "Signals assessed", note: "Access · relevance · evidence" },
  { index: "04", title: "Clinic shortlist", note: "Visible clinics enter consideration" },
] as const;

const phaseNotes = [
  "A patient expresses a specific treatment need in a specific place.",
  "Search systems translate that need into different result surfaces.",
  "Each surface tests whether the clinic is accessible, relevant and credible.",
  "Only clinics that surface can be evaluated, compared and chosen.",
] as const;

export function ProblemJourney() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastPhase = -1;
    if (reduceMotion || window.matchMedia("(max-width: 768px)").matches) {
      root.dataset.phase = "3";
      root.style.setProperty("--journey-progress", "1");
      return;
    }

    const context = gsap.context(() => {
      const scene = root.querySelector<HTMLElement>(".v8-journey__scene");
      const token = root.querySelector<HTMLElement>(".v6-query-token");
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: ({ progress }) => {
          const phase = Math.min(3, Math.floor(progress * 4));
          gsap.set(root, { "--journey-progress": progress });
          if (scene && token) {
            const travel = Math.max(0, Math.min(scene.clientWidth * 0.49, scene.clientWidth - token.offsetWidth - 32));
            gsap.set(token, { x: progress * travel, y: progress * 108, rotate: progress * -1.2 });
          }
          if (phase !== lastPhase) {
            root.dataset.phase = String(phase);
            lastPhase = phase;
          }
        },
      });
    }, root);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className="problem-journey v6-journey v8-journey" id="problem" aria-labelledby="problem-title" data-phase="0" ref={rootRef}>
      <div className="problem-journey__sticky">
        <div className="container">
          <div className="v3-section-index data-label"><span>Patient decision</span><span>One query · one shortlist</span></div>
          <div className="v6-journey__heading">
            <h2 id="problem-title">You can’t be chosen if you never enter the shortlist.</h2>
            <p>If your clinic does not enter the shortlist, clinical quality never gets the chance to matter.</p>
          </div>

          <div className="v6-journey__scene v8-journey__scene" aria-label="A patient query moves through search environments and forms a clinic shortlist">
            <div className="v8-journey__phase-note" aria-live="polite">
              {phaseNotes.map((note, index) => <p data-stage={index} key={note}>{note}</p>)}
            </div>

            <ol className="v6-journey__stages v8-journey__stages">
              {stages.map((stage, index) => (
                <li data-stage={index} key={stage.title}>
                  <span className="data-label">{stage.index}</span><strong>{stage.title}</strong><small>{stage.note}</small><i aria-hidden="true" />
                </li>
              ))}
            </ol>

            <div className="v8-journey__route" aria-hidden="true"><i /></div>

            <div className="v6-query-token">
              <span className="data-label">Patient query</span>
              <strong>deep tissue massage Birmingham</strong>
              <i aria-hidden="true" />
            </div>

            <div className="v6-journey__surfaces" aria-hidden="true">
              <span>G</span><span>M</span><span>AI</span>
            </div>

            <div className="v8-journey__signals" aria-hidden="true">
              <span>Accessible</span><span>Relevant</span><span>Evidenced</span>
            </div>

            <div className="v6-journey__shortlist">
              <span className="data-label">Clinic shortlist</span>
              <div><i>01</i><strong>Relevant clinic</strong><small>Visible · evidenced</small></div>
              <div><i>02</i><strong>Nearby clinic</strong><small>Visible · trusted</small></div>
              <div className="is-missing"><i>—</i><strong>Your clinic</strong><small>Not surfaced</small></div>
            </div>

            <div className="v6-journey__outcome">
              <span className="data-label">Lost before comparison</span><strong>Your clinic</strong><em>Not surfaced</em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
