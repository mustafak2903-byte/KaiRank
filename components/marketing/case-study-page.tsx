import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { services, type CaseStudyDefinition, type ServiceDefinition } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export function CaseStudyPage({ study }: { study: CaseStudyDefinition }) {
  const url = `${siteConfig.url}/case-studies/${study.slug}`;
  const relatedSlugs = study.slug === "the-recovery-room"
    ? ["technical-seo", "local-seo", "seo"]
    : ["healthcare-seo", "technical-seo", "ai-search-optimisation"];
  const relatedServices = relatedSlugs.map((slug) => services.find((service) => service.slug === slug)).filter((service): service is ServiceDefinition => Boolean(service));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#case-study`,
    headline: `${study.client}: ${study.title} ${study.accent}`,
    description: study.description,
    url,
    datePublished: "2026-09-06",
    dateModified: "2026-09-06",
    author: { "@id": `${siteConfig.url}/#founder` },
    publisher: { "@id": `${siteConfig.url}/#organisation` },
    about: { "@type": "Thing", name: "Healthcare search visibility" },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <article className="case-study">
        <header className="case-hero">
          <div className="case-hero__grid" aria-hidden="true" />
          <div className="container case-hero__inner">
            <div className="case-hero__copy" data-reveal>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Case Studies", href: "/case-studies" }, { label: study.client, href: `/case-studies/${study.slug}` }]} />
              <span className="data-label">Verified case study · {study.period}</span>
              <p className="case-hero__client">{study.client} · {study.market}</p>
              <h1>{study.title}<br /><em>{study.accent}</em></h1>
              <p>{study.description}</p>
              <a className="case-source" data-event="evidence_opened" data-event-label={`${study.client}: source report`} href={study.sourceUrl} target="_blank" rel="noreferrer">{study.sourceLabel} <span aria-hidden="true">↗</span></a>
            </div>
            <dl className="case-hero__ledger">
              {study.metrics.map((metric, index) => <div key={metric.label}><span className="data-label">0{index + 1}</span><dt>{metric.value}</dt><dd><strong>{metric.label}</strong><small>{metric.note}</small></dd></div>)}
            </dl>
          </div>
        </header>

        <section className="case-section case-section--paper" aria-labelledby="challenge-title">
          <div className="container case-section__split"><div><span className="data-label">The constraint</span><h2 id="challenge-title">What the search surface was losing.</h2></div><p>{study.challenge}</p></div>
        </section>

        <section className="case-section" aria-labelledby="case-work-title">
          <div className="container">
            <div className="marketing-section__index data-label"><span>The work</span><span>{study.period}</span></div>
            <h2 id="case-work-title">A connected system, built in sequence.</h2>
            <ol className="case-work">{study.work.map((step) => <li key={step.index}><span className="data-label">{step.index}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol>
          </div>
        </section>

        <section className="case-section case-section--evidence" aria-labelledby="evidence-title">
          <div className="container">
            <div className="marketing-section__index data-label"><span>Evidence ledger</span><span>Source-specific definitions</span></div>
            <h2 id="evidence-title">What changed—and how it was measured.</h2>
            <div className="case-evidence">{study.evidence.map((item) => <article key={item.title}><span className="data-label">{item.source}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
          </div>
        </section>

        <section className="case-section case-limitations" aria-labelledby="limits-title">
          <div className="container case-limitations__grid">
            <div><span className="data-label">Read the result accurately</span><h2 id="limits-title">Boundaries matter.</h2></div>
            <ul>{study.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
          </div>
        </section>

        <section className="case-services" aria-labelledby="case-services-title">
          <div className="container">
            <div className="marketing-section__index data-label"><span>Relevant capability</span><span>Follow the work behind the result</span></div>
            <h2 id="case-services-title">Explore the connected service layers.</h2>
            <div>{relatedServices.map((service) => <Link href={`/${service.slug}`} key={service.slug}><span className="data-label">{service.eyebrow}</span><strong>{service.navLabel}</strong><i aria-hidden="true">↗</i></Link>)}</div>
          </div>
        </section>

        <section className="marketing-conversion" aria-labelledby="case-conversion-title" data-kai-avoid>
          <div className="container marketing-conversion__inner">
            <span className="data-label">Apply the evidence</span>
            <h2 id="case-conversion-title">Which constraint is limiting your clinic?</h2>
            <p>Start with public technical evidence, or talk through one priority treatment and location.</p>
            <div className="v3-actions"><Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label={`${study.slug}: diagnostic`} data-event-source="case-study-final" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↗</span></Link><BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source={`${study.slug}-final`} /></div>
          </div>
        </section>
      </article>
    </MarketingShell>
  );
}
