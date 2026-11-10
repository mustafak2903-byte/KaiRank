import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { EvidenceSignalInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { caseStudies } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Verified healthcare SEO case studies",
  description: "Verified clinic and hospital search-visibility case studies with source-specific metrics, methods and limitations.",
  path: "/case-studies",
});

export default function CaseStudiesIndex() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/case-studies#page`,
    name: "Verified healthcare SEO case studies",
    description: "Clinic and hospital search case studies with source-specific metrics, methods and limitations.",
    url: `${siteConfig.url}/case-studies`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${study.title} ${study.accent}`,
        url: `${siteConfig.url}/case-studies/${study.slug}`,
      })),
    },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-index-hero evidence-index-hero observatory-hero" aria-labelledby="case-index-title">
        <div className="container observatory-hero__grid">
          <div className="observatory-hero__copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }]} />
            <span className="data-label">Verified project evidence</span>
            <h1 id="case-index-title">Results with the<br /><em>boundaries attached.</em></h1>
            <p>Every headline metric is separated by source, period and meaning. Traffic estimates are not analytics. Booking-intent clicks are not appointments. Rankings are time-sensitive.</p>
            <a className="observatory-hero__jump" href="#case-evidence">Inspect the evidence <span aria-hidden="true">↓</span></a>
          </div>
          <EvidenceSignalInstrument studies={caseStudies} />
        </div>
      </section>
      <section className="case-index" id="case-evidence" aria-label="KaiRank case studies">
        <div className="container">
          {caseStudies.map((study, index) => (
            <article key={study.slug}>
              <div className="case-index__meta"><span className="data-label">0{index + 1} / {study.period}</span><span className="data-label">{study.market}</span></div>
              <div className="case-index__body"><div><p>{study.client}</p><h2>{study.title}<br /><em>{study.accent}</em></h2></div><p>{study.description}</p></div>
              <dl>{study.metrics.slice(0, 3).map((metric) => <div key={metric.label}><dt>{metric.value}</dt><dd>{metric.label}</dd></div>)}</dl>
              <Link href={`/case-studies/${study.slug}`}>Read the evidence ledger <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="marketing-conversion" aria-labelledby="case-conversion-title" data-kai-avoid>
        <div className="container marketing-conversion__inner"><span className="data-label">Apply the evidence to your clinic</span><h2 id="case-conversion-title">Find the first visibility constraint worth fixing.</h2><p>Bring one treatment, location and website to a focused clinic visibility review.</p><div className="v3-actions"><BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="case-studies-final" /><Link className="v3-action v3-action--text" href="/services">Explore healthcare SEO services <span aria-hidden="true">↗</span></Link></div></div>
      </section>
    </MarketingShell>
  );
}
