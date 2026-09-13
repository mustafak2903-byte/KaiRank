import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { SearchSystemInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Healthcare SEO Services for Private Clinics",
  description: "Explore SEO for clinics, technical SEO audits, local SEO for medical practices and AI search optimisation for healthcare.",
  path: "/services",
});

const serviceRoles: Record<string, string> = {
  seo: "Connect the full search system",
  "technical-seo": "Restore access and indexation",
  "local-seo": "Strengthen location relevance",
  "ai-search-optimisation": "Clarify entities and evidence",
  "healthcare-seo": "Build trust into discovery",
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/services#page`,
    name: "KaiRank healthcare search services",
    description: "Search visibility services for private clinics across Google, Maps and AI search.",
    url: `${siteConfig.url}/services`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.navLabel,
        url: `${siteConfig.url}/${service.slug}`,
      })),
    },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-index-hero services-index-hero observatory-hero" aria-labelledby="services-index-title">
        <div className="container observatory-hero__grid">
          <div className="observatory-hero__copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
            <span className="data-label">One search system · five points of intervention</span>
            <h1 id="services-index-title">Fix the constraint.<br /><em>Then compound visibility.</em></h1>
            <p>KaiRank’s healthcare SEO services do not begin with a standard deliverables list. The work starts by locating where a private clinic is losing discoverability, patient confidence or a measurable route to action.</p>
            <div className="v3-actions"><Link className="v3-action v3-action--solid" href="#service-map">Explore the service system <span aria-hidden="true">↓</span></Link><Link className="v3-action v3-action--text" href="/search-visibility-diagnostic">Start with my clinic <span aria-hidden="true">↗</span></Link></div>
          </div>
          <SearchSystemInstrument />
        </div>
      </section>

      <section className="service-map" id="service-map" aria-labelledby="service-map-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>Service architecture</span><span>Choose by constraint—not trend</span></div>
          <div className="service-map__intro">
            <h2 id="service-map-title">Five services.<br />One connected diagnosis.</h2>
            <p>Each service owns a distinct problem. They can operate independently, but they are measured against the same commercial journey: discovery, evaluation and qualified action.</p>
          </div>
          <ol className="service-map__list">
            {services.map((service, index) => (
              <li key={service.slug} data-reveal>
                <Link href={`/${service.slug}`}>
                  <span className="service-map__index data-label">0{index + 1}</span>
                  <span className="service-map__role data-label">{serviceRoles[service.slug]}</span>
                  <h2>{service.navLabel}</h2>
                  <p>{service.description}</p>
                  <span className="service-map__question">{service.diagnosticQuestion}</span>
                  <span className="service-map__link">Explore this service <i aria-hidden="true">↗</i></span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="service-decision" aria-labelledby="service-decision-title">
        <div className="container service-decision__grid">
          <div>
            <span className="data-label">If the starting point is unclear</span>
            <h2 id="service-decision-title">Do not choose a service yet.</h2>
          </div>
          <div>
            <p>Run the Search Visibility Diagnostic first. It reads the clinic’s public technical surface, then lets you add the location and priority treatment that make the commercial context useful.</p>
            <Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="Services hub: diagnostic" data-event-source="services-hub" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↘</span></Link>
          </div>
        </div>
      </section>

      <section className="services-proof" aria-labelledby="services-proof-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>Verified evidence</span><span>Clinic and hospital systems</span></div>
          <div className="services-proof__grid">
            <div><h2 id="services-proof-title">See the work under real conditions.</h2><p>The case studies separate first-party analytics, third-party estimates and booking-intent signals so each result can be evaluated accurately.</p></div>
            <div>
              <Link href="/case-studies/the-recovery-room"><span>The Recovery Room</span><strong>Private-clinic visibility and treatment demand</strong><i aria-hidden="true">↗</i></Link>
              <Link href="/case-studies/south-city-hospital"><span>South City Hospital</span><strong>Healthcare architecture at multi-specialty scale</strong><i aria-hidden="true">↗</i></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="marketing-conversion" aria-labelledby="services-conversion-title" data-kai-avoid>
        <div className="container marketing-conversion__inner">
          <span className="data-label">Bring one treatment and location</span>
          <h2 id="services-conversion-title">Find the first constraint worth fixing.</h2>
          <p>Start with public evidence, or bring the clinic’s priority search opportunity to a focused strategy conversation.</p>
          <div className="v3-actions">
            <Link className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="Services final: diagnostic" data-event-source="services-final" href="/search-visibility-diagnostic">Check my clinic <span aria-hidden="true">↗</span></Link>
            <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source="services-final" />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
