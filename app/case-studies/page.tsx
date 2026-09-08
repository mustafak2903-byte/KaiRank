import Link from "next/link";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { caseStudies } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Verified healthcare SEO case studies",
  description: "Verified clinic and hospital search-visibility case studies with source-specific metrics, methods and limitations.",
  path: "/case-studies/",
});

export default function CaseStudiesIndex() {
  return (
    <MarketingShell>
      <section className="marketing-index-hero" aria-labelledby="case-index-title">
        <div className="container">
          <span className="data-label">Verified project evidence</span>
          <h1 id="case-index-title">Results with the<br /><em>boundaries attached.</em></h1>
          <p>Every headline metric is separated by source, period and meaning. Traffic estimates are not analytics. Booking-intent clicks are not appointments. Rankings are time-sensitive.</p>
        </div>
      </section>
      <section className="case-index" aria-label="KaiRank case studies">
        <div className="container">
          {caseStudies.map((study, index) => (
            <article key={study.slug}>
              <div className="case-index__meta"><span className="data-label">0{index + 1} / {study.period}</span><span className="data-label">{study.market}</span></div>
              <div className="case-index__body"><div><p>{study.client}</p><h2>{study.title}<br /><em>{study.accent}</em></h2></div><p>{study.description}</p></div>
              <dl>{study.metrics.slice(0, 3).map((metric) => <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}</dl>
              <Link href={`/case-studies/${study.slug}/`}>Read the evidence ledger <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
