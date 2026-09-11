import type { InsightDefinition } from "@/lib/insights-content";
import type { CaseStudyDefinition, ServiceDefinition } from "@/lib/marketing-content";

const serviceSignals: Record<string, readonly [string, string][]> = {
  seo: [["Discover", "Demand"], ["Evaluate", "Evidence"], ["Act", "Enquiry"]],
  "technical-seo": [["Access", "Crawl"], ["Select", "Canonical"], ["Experience", "Stable"]],
  "local-seo": [["Place", "Location"], ["Proximity", "Relevance"], ["Action", "Directions"]],
  "ai-search-optimisation": [["Entity", "Clarity"], ["Evidence", "Retrieval"], ["Source", "Citation"]],
  "healthcare-seo": [["Expertise", "Trust"], ["Treatment", "Intent"], ["Patient", "Decision"]],
};

export function SearchSystemInstrument() {
  return (
    <aside className="hero-instrument hero-instrument--system" aria-label="KaiRank search visibility system">
      <header><span className="data-label">Visibility system</span><span className="hero-instrument__status"><i />Connected</span></header>
      <div className="system-query">
        <span className="data-label">Patient query</span>
        <strong>“specialist clinic near me”</strong>
      </div>
      <div className="system-orbit" aria-hidden="true">
        <span className="system-orbit__core">KR</span>
        <i className="system-orbit__beam" />
        <span className="system-orbit__node system-orbit__node--one">Crawl</span>
        <span className="system-orbit__node system-orbit__node--two">Local</span>
        <span className="system-orbit__node system-orbit__node--three">Trust</span>
        <span className="system-orbit__node system-orbit__node--four">AI</span>
      </div>
      <footer><span>One diagnosis</span><strong>Five intervention points</strong></footer>
    </aside>
  );
}

export function ServiceSignalInstrument({ service }: { service: ServiceDefinition }) {
  const signals = serviceSignals[service.slug] ?? serviceSignals.seo;
  return (
    <aside className="hero-instrument hero-instrument--service" aria-label={`${service.navLabel} diagnostic model`}>
      <header><span className="data-label">Diagnostic lens</span><span className="hero-instrument__status"><i />Signal tracing</span></header>
      <div className="service-signal__question">
        <span className="data-label">Question under review</span>
        <strong>{service.diagnosticQuestion}</strong>
      </div>
      <ol className="service-signal__path">
        {signals.map(([label, value], index) => <li key={label}><span>0{index + 1}</span><small>{label}</small><strong>{value}</strong><i aria-hidden="true" /></li>)}
      </ol>
      <footer><span>Priority model</span><strong>Loss × confidence × dependency</strong></footer>
    </aside>
  );
}

export function InsightSignalInstrument({ insights }: { insights: readonly InsightDefinition[] }) {
  return (
    <aside className="hero-instrument hero-instrument--notes" aria-label="Latest KaiRank field notes">
      <header><span className="data-label">Research register</span><span className="hero-instrument__status"><i />Current</span></header>
      <div className="notes-signal__scope"><span className="data-label">Editorial filter</span><strong>Evidence with a decision attached.</strong></div>
      <ol className="notes-signal__list">
        {insights.map((insight, index) => <li key={insight.slug}><span>0{index + 1}</span><div><small>{insight.category}</small><strong>{insight.readTime}</strong></div><i aria-hidden="true">↗</i></li>)}
      </ol>
      <footer><span>Publishing rule</span><strong>Useful before frequent</strong></footer>
    </aside>
  );
}

export function DiagnosticSignalInstrument() {
  return (
    <aside className="hero-instrument hero-instrument--diagnostic" aria-label="Search Visibility Diagnostic stages">
      <header><span className="data-label">Public signal scan</span><span className="hero-instrument__status"><i />Ready</span></header>
      <div className="diagnostic-scan" aria-hidden="true"><i /><span>URL</span><span>Index</span><span>Mobile</span><span>Schema</span></div>
      <ol className="diagnostic-signal__steps">
        <li><span>01</span><div><small>Technical surface</small><strong>Access, selection and mobile signals</strong></div></li>
        <li><span>02</span><div><small>Search context</small><strong>One location and priority treatment</strong></div></li>
        <li><span>03</span><div><small>Deeper review</small><strong>Requested only when you choose</strong></div></li>
      </ol>
      <footer><span>Access required</span><strong>Public website only</strong></footer>
    </aside>
  );
}

export function EvidenceSignalInstrument({ studies }: { studies: readonly CaseStudyDefinition[] }) {
  return (
    <aside className="hero-instrument hero-instrument--evidence" aria-label="Case study evidence register">
      <header><span className="data-label">Evidence register</span><span className="hero-instrument__status"><i />Source labelled</span></header>
      <div className="evidence-signal__headline"><span className="data-label">Reporting boundary</span><strong>Observation is not attribution.</strong></div>
      <ol className="evidence-signal__studies">
        {studies.map((study, index) => <li key={study.slug}><span>0{index + 1}</span><div><small>{study.client}</small><strong>{study.metrics[0].value}</strong><em>{study.metrics[0].label}</em></div></li>)}
      </ol>
      <footer><span>Every result includes</span><strong>Source · period · limitation</strong></footer>
    </aside>
  );
}
