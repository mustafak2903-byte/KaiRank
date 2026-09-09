"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { trackEvent } from "@/lib/analytics";

const capabilities = [
  {
    id: "technical",
    href: "/technical-seo",
    index: "01",
    title: "Technical SEO",
    label: "Make every important page discoverable.",
    body: "Make important pages discoverable, renderable and indexable before asking stronger content to compete.",
  },
  {
    id: "intent",
    href: "/seo",
    index: "02",
    title: "Search strategy & on-page SEO",
    label: "Target searches capable of creating meaningful demand.",
    body: "Align treatment, service and location pages with the searches most likely to create qualified patient demand.",
  },
  {
    id: "local",
    href: "/local-seo",
    index: "03",
    title: "Local SEO",
    label: "Help nearby patients find and evaluate the clinic.",
    body: "Strengthen location, relevance and trust signals that support discovery in local search.",
  },
  {
    id: "content",
    href: "/healthcare-seo",
    index: "04",
    title: "Content & authority",
    label: "Turn clinical expertise into evidence.",
    body: "Build treatment, clinician and patient-focused content that search systems can understand and people can trust.",
  },
  {
    id: "entity",
    href: "/ai-search-optimisation",
    index: "05",
    title: "AI search optimisation",
    label: "Clarify the clinic for emerging search systems.",
    body: "Connect services, clinicians, locations and evidence clearly—without pretending citations can be guaranteed.",
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
  const environmentRef = useRef<HTMLDivElement>(null);
  const active = capabilities.find((item) => item.id === activeId) ?? capabilities[0];

  function selectCapability(id: Capability["id"]) {
    setActiveId(id);
    trackEvent("service_selected", { service: id });
    window.dispatchEvent(new CustomEvent("kairank:service-context", { detail: { service: id } }));
  }

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, id: Capability["id"]) {
    const current = capabilities.findIndex((item) => item.id === id);
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % capabilities.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + capabilities.length) % capabilities.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = capabilities.length - 1;
    else return;
    event.preventDefault();
    const nextCapability = capabilities[next];
    selectCapability(nextCapability.id);
    window.requestAnimationFrame(() => document.getElementById(`capability-tab-${nextCapability.id}`)?.focus());
  }

  function moveSpotlight(event: PointerEvent<HTMLDivElement>) {
    const node = environmentRef.current;
    if (!node || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <div className="capability-stage">
      <div className="capability-stage__tabs" role="tablist" aria-label="KaiRank capabilities">
        {capabilities.map((capability) => (
          <button
            aria-controls={`capability-${capability.id}`}
            aria-selected={activeId === capability.id}
            id={`capability-tab-${capability.id}`}
            key={capability.id}
            onClick={() => selectCapability(capability.id)}
            onKeyDown={(event) => moveTab(event, capability.id)}
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
          <span className="data-label">Active search constraint / {active.index}</span>
          <h3>{active.label}</h3>
          <p>{active.body}</p>
        </div>
        <div className="capability-stage__environment" aria-live="polite" onPointerMove={moveSpotlight} ref={environmentRef}>
          {capabilities.map((capability) => (
            <div className={`capability-scene${active.id === capability.id ? " is-active" : ""}`} key={capability.id} aria-hidden={active.id !== capability.id}>
              <CapabilityVisual capability={capability} />
            </div>
          ))}
        </div>
      </div>
      <div className="capability-stage__mobile" aria-label="KaiRank capabilities">
        {capabilities.map((capability) => {
          const selected = activeId === capability.id;
          return (
            <div className={selected ? "is-active" : ""} key={capability.id}>
              <button
                aria-controls={`capability-mobile-${capability.id}`}
                aria-expanded={selected}
                onClick={() => selectCapability(capability.id)}
                type="button"
              >
                <span className="data-label">{capability.index}</span>
                <strong>{capability.title}</strong>
                <i aria-hidden="true">+</i>
              </button>
              {selected ? (
                <div className="capability-stage__mobile-panel" id={`capability-mobile-${capability.id}`}>
                  <div className="capability-stage__copy">
                    <span className="data-label">Active search constraint / {capability.index}</span>
                    <h3>{capability.label}</h3>
                    <p>{capability.body}</p>
                  </div>
                  <div className="capability-stage__environment">
                    <div className="capability-scene is-active"><CapabilityVisual capability={capability} /></div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <nav className="capability-stage__routes" aria-label="Explore KaiRank services">
        {capabilities.map((capability) => <Link href={capability.href} key={capability.href}><span>{capability.title}</span><i aria-hidden="true">↗</i></Link>)}
        <Link className="capability-stage__routes-all" href="/services"><span>View all services</span><i aria-hidden="true">↗</i></Link>
      </nav>
    </div>
  );
}
