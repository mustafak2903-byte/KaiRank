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
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-process-step]");
      gsap.fromTo(
        items,
        { opacity: 0.35, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: { trigger: root, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        ".v8-process-flow__progress i",
        { scaleX: 0 },
        { scaleX: 1, duration: 1.35, ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 74%", once: true } },
      );
    }, root);
    return () => context.revert();
  }, []);

  return (
    <div className="v8-process-flow" ref={rootRef}>
      <div className="v8-process-flow__progress" aria-hidden="true"><i /></div>
      <ol>
        {steps.map((step) => (
          <li data-process-step key={step.index}>
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
