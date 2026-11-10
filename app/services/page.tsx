import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { SearchSystemInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { services } from "@/lib/marketing-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { createFaqEntity } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Healthcare Search Services for Private Clinics",
  description: "Compare technical SEO, local SEO, healthcare SEO and AI-search support for UK private clinics by the constraint each service solves.",
  path: "/services",
});

const serviceRoles: Record<string, string> = {
  "technical-seo": "Restore access and indexation",
  "local-seo": "Strengthen location relevance",
  "ai-search-optimisation": "Clarify entities and evidence",
  "healthcare-seo": "Build trust into discovery",
};

const serviceFaqs = [
  {
    question: "Which healthcare SEO service should a private clinic start with?",
    answer: "Start with the constraint, not a package. If important pages cannot be crawled or indexed, begin with technical SEO. If location relevance is weak, begin with local SEO. If the wider search system is unclear, a clinic visibility review can identify the first priority before work is scoped.",
  },
  {
    question: "Can KaiRank work with an existing developer, writer or agency?",
    answer: "Yes. KaiRank can lead diagnosis, priorities and measurement while your existing team implements the work, or support delivery directly where that is more practical.",
  },
  {
    question: "How is healthcare SEO performance measured?",
    answer: "Visibility, relevant organic visits, enquiries and booking-intent actions are measured separately. Clicks to a booking platform are not presented as completed appointments, and third-party estimates are labelled rather than blended with first-party analytics.",
  },
] as const;

export default function ServicesPage() {
  const collectionEntity = {
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [collectionEntity, createFaqEntity(`${siteConfig.url}/services`, serviceFaqs)],
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-index-hero services-index-hero observatory-hero" aria-labelledby="services-index-title">
        <div className="container observatory-hero__grid">
          <div className="observatory-hero__copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }]} />
            <span className="data-label">One search system · four points of intervention</span>
            <h1 id="services-index-title">Choose the right search intervention.<br /><em>Fix the first constraint.</em></h1>
            <p>KaiRank’s connected search services do not begin with a standard deliverables list. The work starts by locating where a private clinic is losing discoverability, patient confidence or a measurable route to action.</p>
            <div className="v3-actions"><Link className="v3-action v3-action--solid" href="#service-map">Explore the service system <span aria-hidden="true">↓</span></Link><Link className="v3-action v3-action--text" href="/case-studies">See verified clinic results <span aria-hidden="true">↗</span></Link></div>
          </div>
          <SearchSystemInstrument />
        </div>
      </section>

      <section className="service-map" id="service-map" aria-labelledby="service-map-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>Service architecture</span><span>Choose by constraint—not trend</span></div>
          <div className="service-map__intro">
            <h2 id="service-map-title">Four services.<br />One connected diagnosis.</h2>
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
            <p>Bring your website, location and priority treatment. The review identifies whether the first constraint is technical access, local relevance, healthcare trust or emerging-search clarity.</p>
            <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="services-hub" />
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

      <section className="marketing-section marketing-faq" aria-labelledby="services-faq-title" data-kai-avoid>
        <div className="container marketing-faq__grid">
          <div><span className="data-label">Choosing the right starting point</span><h2 id="services-faq-title">Which healthcare SEO service should your clinic start with?</h2></div>
          <div>{serviceFaqs.map((faq) => <details key={faq.question}><summary data-event="faq_opened" data-event-label={`services: ${faq.question}`}><strong>{faq.question}</strong><i aria-hidden="true">+</i></summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="marketing-conversion" aria-labelledby="services-conversion-title" data-kai-avoid>
        <div className="container marketing-conversion__inner">
          <span className="data-label">Bring one treatment and location</span>
          <h2 id="services-conversion-title">Find the first constraint worth fixing.</h2>
          <p>Start with public evidence, or bring the clinic’s priority search opportunity to a focused strategy conversation.</p>
          <div className="v3-actions">
            <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="services-final" />
            <Link className="v3-action v3-action--text" data-event="diagnostic_clicked" data-event-label="Services final: health check" data-event-source="services-final" href="/search-visibility-diagnostic">Run the free website health check <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
