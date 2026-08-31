"use client";

import { useState } from "react";

const capabilities = [
  {
    id: "technical",
    index: "01",
    title: "Technical access",
    label: "Unblock the path",
    body: "Remove crawl, render, indexation and performance barriers before strong clinical content is asked to compete.",
  },
  {
    id: "intent",
    index: "02",
    title: "Search demand",
    label: "Filter for value",
    body: "Separate broad traffic from treatment, condition, practitioner and location searches with a credible route to enquiry.",
  },
  {
    id: "local",
    index: "03",
    title: "Local visibility",
    label: "Clarify the map",
    body: "Align locations, services, profiles, reviews and on-site evidence around how nearby patients actually choose.",
  },
  {
    id: "content",
    index: "04",
    title: "Content authority",
    label: "Make expertise cohere",
    body: "Connect treatments, clinicians, questions and evidence so each page strengthens the wider clinical subject.",
  },
  {
    id: "entity",
    index: "05",
    title: "AI entity clarity",
    label: "Join the evidence graph",
    body: "Give answer engines consistent information about what the clinic does, where it operates and why it is credible.",
  },
] as const;

type Capability = (typeof capabilities)[number];

function CapabilityVisual({ capability }: { capability: Capability }) {
  if (capability.id === "technical") {
    return (
      <div className="capability-visual capability-visual--technical" aria-label="A blocked crawl path opening into an indexed page">
        <span>Request</span><i /><span className="is-blocked">Blocked</span><i /><span>Indexed</span>
        <small className="data-label">Obstruction isolated / route restored</small>
      </div>
    );
  }

  if (capability.id === "intent") {
    return (
      <div className="capability-visual capability-visual--intent" aria-label="Search queries filtered by patient intent">
        <span>back pain</span><span className="is-kept">private back pain clinic</span><span>what is pain</span><span className="is-kept">sports massage Birmingham</span><span>jobs</span>
        <small className="data-label">High-intent demand retained</small>
      </div>
    );
  }

  if (capability.id === "local") {
    return (
      <div className="capability-visual capability-visual--local" aria-label="Local map signals converging on a clinic">
        <div className="local-map"><i /><i /><i /><i className="is-clinic" /><span className="local-map__road local-map__road--one" /><span className="local-map__road local-map__road--two" /></div>
        <strong>Clinic / 1.8 mi</strong><small className="data-label">Relevant · nearby · trusted</small>
      </div>
    );
  }

  if (capability.id === "content") {
    return (
      <div className="capability-visual capability-visual--content" aria-label="Clinical content topics joining into one authority cluster">
        <div><span>Treatment</span><span>Clinician</span><span>Condition</span><span>Evidence</span></div>
        <i /><strong>Back pain expertise</strong>
        <small className="data-label">Four pages / one coherent subject</small>
      </div>
    );
  }

  return (
    <div className="capability-visual capability-visual--entity" aria-label="Clinic entity connected to services, location, expertise and evidence">
      <svg viewBox="0 0 520 260" aria-hidden="true">
        <path d="M260 130 L84 48 M260 130 L84 212 M260 130 L436 48 M260 130 L436 212" />
        <circle cx="260" cy="130" r="42" /><circle cx="84" cy="48" r="24" /><circle cx="84" cy="212" r="24" /><circle cx="436" cy="48" r="24" /><circle cx="436" cy="212" r="24" />
      </svg>
      <strong>Clinic entity</strong><span>Services</span><span>Location</span><span>Expertise</span><span>Evidence</span>
      <small className="data-label">Consistent enough to retrieve</small>
    </div>
  );
}

export function CapabilityStage() {
  const [activeId, setActiveId] = useState<Capability["id"]>("technical");
  const active = capabilities.find((item) => item.id === activeId) ?? capabilities[0];

  return (
    <div className="capability-stage" data-reveal>
      <div className="capability-stage__tabs" role="tablist" aria-label="KaiRank capabilities">
        {capabilities.map((capability) => (
          <button
            aria-controls={`capability-${capability.id}`}
            aria-selected={activeId === capability.id}
            id={`capability-tab-${capability.id}`}
            key={capability.id}
            onClick={() => setActiveId(capability.id)}
            role="tab"
            tabIndex={activeId === capability.id ? 0 : -1}
            type="button"
          >
            <span className="data-label">{capability.index}</span>
            <strong>{capability.title}</strong>
            <small>{capability.label}</small>
          </button>
        ))}
      </div>
      <div className="capability-stage__panel" id={`capability-${active.id}`} role="tabpanel" aria-labelledby={`capability-tab-${active.id}`}>
        <div className="capability-stage__copy">
          <span className="data-label">Constraint / {active.index}</span>
          <h3>{active.label}</h3>
          <p>{active.body}</p>
        </div>
        <CapabilityVisual capability={active} />
      </div>
    </div>
  );
}
