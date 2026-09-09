import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { services, type ServiceDefinition } from "@/lib/marketing-content";
import { siteConfig } from "@/lib/site";

export function ServicePage({ service }: { service: ServiceDefinition }) {
  const url = `${siteConfig.url}/${service.slug}`;
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.navLabel,
    serviceType: service.navLabel,
    description: service.description,
    url,
    provider: { "@id": `${siteConfig.url}/#organisation` },
    audience: { "@type": "Audience", audienceType: "Private clinics and high-consideration healthcare businesses" },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-hero" aria-labelledby="marketing-title">
        <div className="marketing-hero__grid" aria-hidden="true" />
        <div className="container marketing-hero__inner">
          <div className="marketing-hero__copy" data-reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.navLabel, href: `/${service.slug}` }]} />
            <span className="data-label">{service.eyebrow}</span>
            <h1 id="marketing-title">{service.title}<br /><em>{service.accent}</em></h1>
            <p>{service.description}</p>
            <div className="v3-actions">
              <Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label={`${service.slug}: diagnostic`} data-event-source="service-hero" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↘</span></Link>
              <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source={`${service.slug}-hero`} />
            </div>
          </div>
          <aside className="marketing-hero__instrument" aria-label="The diagnostic question">
            <span className="data-label">Diagnostic question</span>
            <strong>{service.diagnosticQuestion}</strong>
            <div aria-hidden="true"><i /><i /><i /></div>
          </aside>
        </div>
      </section>

      <section className="marketing-thesis" aria-labelledby="thesis-title">
        <div className="container marketing-thesis__grid">
          <div><span className="data-label">The operating principle</span><h2 id="thesis-title">Constraint first.<br /><em>Activity second.</em></h2></div>
          <p>{service.promise}</p>
        </div>
      </section>

      <section className="marketing-section marketing-section--paper" aria-labelledby="symptoms-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>When to look closer</span><span>Observable symptoms</span></div>
          <div className="marketing-symptoms">
            <h2 id="symptoms-title">The signals that usually precede the diagnosis.</h2>
            <ol>
              {service.symptoms.map((symptom, index) => <li key={symptom}><span className="data-label">0{index + 1}</span><p>{symptom}</p></li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="marketing-section" aria-labelledby="work-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>How the work moves</span><span>Evidence at each stage</span></div>
          <div className="marketing-section__lead"><h2 id="work-title">A sequence your team can inspect.</h2><p>Every stage ends with a defined output. Strategy stays connected to implementation and measurement.</p></div>
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
          <div><span className="data-label">Measurement</span><h2 id="measurement-title">Visibility is separated from meaningful action.</h2></div>
          <dl>{service.measures.map((measure) => <div key={measure.label}><dt>{measure.label}</dt><dd>{measure.value}</dd></div>)}</dl>
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
            <Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label={`${service.slug}: final diagnostic`} data-event-source="service-final" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↗</span></Link>
            <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source={`${service.slug}-final`} />
          </div>
          <small>Bring your website, location and priority treatment. The first conversation starts with the constraint—not a pre-filled deliverables list.</small>
        </div>
      </section>
    </MarketingShell>
  );
}
