"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    index: "01",
    verb: "Diagnose",
    title: "Locate the lost demand.",
    body: "Trace technical access, treatment intent, local relevance and authority evidence until the primary constraint is clear.",
    output: "Constraint map",
    signals: ["Crawl", "Demand", "Local", "Entity"],
  },
  {
    index: "02",
    verb: "Engineer",
    title: "Repair the route to consideration.",
    body: "Fix the layer suppressing discovery, then connect pages, locations, clinicians and proof around the searches that matter.",
    output: "Prioritised build",
    signals: ["Access", "Relevance", "Evidence"],
  },
  {
    index: "03",
    verb: "Compound",
    title: "Strengthen what earns visibility.",
    body: "Measure what surfaces and creates qualified action, then apply the learning to the next highest-leverage constraint.",
    output: "Measured growth loop",
    signals: ["Surface", "Action", "Learn", "Repeat"],
  },
] as const;

export function ProcessFlow() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      root.dataset.activeStep = String(steps.length - 1);
      root.style.setProperty("--process-progress", "1");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      let activeStep = -1;
      ScrollTrigger.create({
        trigger: root,
        start: "top 72%",
        end: "bottom 38%",
        scrub: 0.35,
        onUpdate: ({ progress }) => {
          const nextStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));
          gsap.set(root, { "--process-progress": progress });
          if (nextStep !== activeStep) {
            root.dataset.activeStep = String(nextStep);
            activeStep = nextStep;
          }
        },
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div className="v8-process-flow" data-active-step="0" ref={rootRef}>
      <aside className="v8-process-flow__rail" aria-hidden="true">
        <div className="v8-process-flow__query">
          <span className="data-label">Patient query</span>
          <strong>deep tissue massage Birmingham</strong>
          <small>One demand signal / three decisions</small>
        </div>
        <div className="v8-process-flow__journey">
          <i className="v8-process-flow__track" />
          <i className="v8-process-flow__progress" />
          <b className="v8-process-flow__cursor" />
          {steps.map((step, index) => (
            <span className="v8-process-flow__node" data-step={index} key={step.index}>
              <i /><small>{step.verb}</small>
            </span>
          ))}
        </div>
      </aside>
      <ol>
        {steps.map((step, index) => (
          <li data-process-step data-step={index} key={step.index}>
            <header><span className="data-label">{step.index}</span><strong>{step.verb}</strong></header>
            <div className="v8-process-flow__signal" aria-hidden="true">
              {step.signals.map((signal) => <span key={signal}>{signal}</span>)}
            </div>
            <div className="v8-process-flow__copy"><h3>{step.title}</h3><p>{step.body}</p></div>
            <footer><span className="data-label">Output</span><strong>{step.output}</strong></footer>
          </li>
        ))}
      </ol>
    </div>
  );
}
