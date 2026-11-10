import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { ServiceSignalInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { insights } from "@/lib/insights-content";
import { caseStudies, services, type ServiceDefinition } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";
import { createFaqEntity } from "@/lib/structured-data";

export function ServicePage({ service }: { service: ServiceDefinition }) {
  const url = `${siteConfig.url}/${service.slug}`;
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const featuredCaseStudy = service.slug === "ai-search-optimisation"
    ? caseStudies.find((item) => item.slug === "south-city-hospital")
    : caseStudies.find((item) => item.slug === "the-recovery-room");
  const flowLabels: Record<string, readonly [string, string, string]> = {
    "technical-seo": ["Patient demand", "Reachable page", "Search discovery"],
    "local-seo": ["Nearby need", "Location evidence", "Clinic consideration"],
    "ai-search-optimisation": ["Real expertise", "Entity clarity", "Retrievable evidence"],
    "healthcare-seo": ["Treatment search", "Trusted journey", "Qualified enquiry"],
  };
  const proofFlow = flowLabels[service.slug] ?? ["Patient demand", "Search evidence", "Qualified action"];
  const directInsights = [...insights]
    .filter((insight) => insight.serviceSlug === service.slug)
    .sort((a, b) => b.published.localeCompare(a.published));
  const relatedInsights = (directInsights.length ? directInsights : [...insights].sort((a, b) => b.published.localeCompare(a.published))).slice(0, 2);
  const serviceEntity = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.navLabel,
    serviceType: service.primaryTopic,
    description: service.description,
    ...(service.verifiedKeywordCluster.length ? { keywords: service.verifiedKeywordCluster.join(", ") } : {}),
    url,
    provider: { "@id": `${siteConfig.url}/#organisation` },
    areaServed: siteConfig.serviceMarkets.map((market) => ({ "@type": "Country", name: market })),
    audience: {
      "@type": "Audience",
      audienceType: "Private clinics and healthcare organisations in the United Kingdom",
    },
  };
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [serviceEntity, createFaqEntity(url, service.faqs)],
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className={`marketing-hero service-hero service-hero--${service.slug}`} aria-labelledby="marketing-title">
        <div className="marketing-hero__grid" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <div className="marketing-hero__copy" data-reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.navLabel, href: `/${service.slug}` }]} />
            <span className="data-label">{service.eyebrow}</span>
            <h1 id="marketing-title">{service.title}<br /><em>{service.accent}</em></h1>
            <p>{service.description}</p>
            <div className="v3-actions">
              <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source={`${service.slug}-hero`} />
              <Link className="v3-action v3-action--text" href="/case-studies">See verified clinic results <span aria-hidden="true">↘</span></Link>
            </div>
          </div>
          <ServiceSignalInstrument service={service} />
        </div>
      </section>

      <section className="marketing-thesis" aria-labelledby="thesis-title">
        <div className="container marketing-thesis__grid">
          <div><span className="data-label">The operating principle</span><h2 id="thesis-title">{service.headings.principle}</h2></div>
          <p>{service.promise}</p>
        </div>
      </section>

      <section className="marketing-section marketing-section--paper" aria-labelledby="symptoms-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>When to look closer</span><span>Observable symptoms</span></div>
          <div className="marketing-symptoms">
            <h2 id="symptoms-title">{service.headings.symptoms}</h2>
            <ol>
              {service.symptoms.map((symptom, index) => <li key={symptom}><span className="data-label">0{index + 1}</span><p>{symptom}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="work-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>How the work moves</span><span>Evidence at each stage</span></div>
          <div className="marketing-section__lead"><h2 id="work-title">{service.headings.work}</h2><p>{service.headings.workIntro}</p></div>
          <ol className="marketing-work">
            {service.work.map((step) => (
              <li key={step.index}>
                <header><span className="data-label">{step.index}</span><strong>{step.title}</strong></header>
                <p>{step.body}</p>
                <footer><span className="data-label">Output</span><strong>{step.output}</strong></footer>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="marketing-section marketing-section--signal" aria-labelledby="measurement-title">
        <div className="container marketing-measurement">
          <div><span className="data-label">Measurement</span><h2 id="measurement-title">{service.headings.measurement}</h2></div>
          <dl>{service.measures.map((measure) => <div key={measure.label}><dt>{measure.label}</dt><dd>{measure.value}</dd></div>)}</dl>
        </div>
      </section>

      {featuredCaseStudy ? (
        <section className="services-proof" aria-labelledby="service-proof-title">
          <div className="container services-proof__grid">
            <div><span className="data-label">Evidence under real conditions</span><h2 id="service-proof-title">See this work in practice.</h2><p>Read the methods, source labels and limitations behind a relevant healthcare search programme.</p></div>
            <div>
              <figure className="service-proof-flow" aria-label={`${service.navLabel} connects ${proofFlow.join(" to ")}`} data-interactive-surface>
                <figcaption><span className="data-label">Visibility system trace</span><strong>{service.navLabel}</strong></figcaption>
                <ol>{proofFlow.map((label, index) => <li key={label}><i aria-hidden="true" /><span className="data-label">0{index + 1}</span><strong>{label}</strong></li>)}</ol>
                <span className="service-proof-flow__signal" aria-hidden="true" />
              </figure>
              <Link href={`/case-studies/${featuredCaseStudy.slug}`}><span>{featuredCaseStudy.client}</span><strong>{featuredCaseStudy.title} {featuredCaseStudy.accent}</strong><i aria-hidden="true">↗</i></Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="service-insights" aria-labelledby="service-insights-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>Search intelligence</span><span>Supporting field notes</span></div>
          <div className="service-insights__grid">
            <div><h2 id="service-insights-title">{service.headings.insights}</h2><p>{service.headings.insightsIntro}</p><Link href="/insights">Explore the healthcare SEO blog <span aria-hidden="true">↗</span></Link></div>
            <ol>{relatedInsights.map((insight, index) => <li key={insight.slug}><Link href={`/insights/${insight.slug}`}><span className="data-label">0{index + 1} / {insight.category}</span><strong>{insight.title} {insight.accent}</strong><small>{insight.readTime}</small><i aria-hidden="true">↗</i></Link></li>)}</ol>
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-faq" aria-labelledby="service-faq-title" data-kai-avoid>
        <div className="container marketing-faq__grid">
          <div><span className="data-label">Before we look closer</span><h2 id="service-faq-title">Useful answers.</h2></div>
          <div>{service.faqs.map((faq) => <details key={faq.question}><summary data-event="faq_opened" data-event-label={`${service.slug}: ${faq.question}`}><strong>{faq.question}</strong><i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="service-related" aria-labelledby="service-related-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>Connected search system</span><span>Related services</span></div>
          <div className="service-related__intro"><h2 id="service-related-title">The constraint may sit in the next layer.</h2><Link href="/services">View all services <span aria-hidden="true">↗</span></Link></div>
          <div className="service-related__links">{relatedServices.map((item) => <Link href={`/${item.slug}`} key={item.slug}><span className="data-label">{item.eyebrow}</span><strong>{item.navLabel}</strong><p>{item.diagnosticQuestion}</p><i aria-hidden="true">↗</i></Link>)}</div>
        </div>
      </section>

      <section className="marketing-conversion" aria-labelledby="service-conversion-title" data-kai-avoid>
        <div className="container marketing-conversion__inner">
          <span className="data-label">Start with one treatment and location</span>
          <h2 id="service-conversion-title">Find the first constraint worth fixing.</h2>
          <p>Run the public technical check, or bring one priority treatment and location to a focused strategy conversation.</p>
          <div className="v3-actions">
            <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source={`${service.slug}-final`} />
            <Link className="v3-action v3-action--text" data-event="diagnostic_clicked" data-event-label={`${service.slug}: final health check`} data-event-source="service-final" href="/search-visibility-diagnostic">Run the free website health check <span aria-hidden="true">↗</span></Link>
          </div>
          <small>Bring your website, location and priority treatment. The first conversation starts with the constraint—not a pre-filled deliverables list.</small>
        </div>
      </section>
    </MarketingShell>
  );
}
