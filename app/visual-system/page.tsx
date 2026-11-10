import Image from "next/image";
import Link from "next/link";
import { AnalyticsEvents } from "@/components/experience/analytics-events";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { CinematicBackground } from "@/components/experience/cinematic-background";
import { KaiAssistant } from "@/components/experience/kai-assistant";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import { createFaqEntity, siteEntityGraph } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Healthcare search visibility for UK private clinics",
  description:
    "Founder-led healthcare SEO for UK private clinics that want stronger visibility across Google Search and Maps and a clearer route from treatment search to enquiry.",
  path: "/visual-system",
  noIndex: true,
});

const faqs = [
  {
    question: "Why choose a specialist healthcare SEO agency?",
    answer:
      "Healthcare search has a higher trust burden than ordinary service marketing. A useful strategy has to connect technical SEO, local visibility, patient intent and clear clinical ownership without turning unqualified marketing copy into medical advice.",
  },
  {
    question: "What does KaiRank help private clinics with?",
    answer:
      "KaiRank helps private clinics improve how patients discover and evaluate priority treatments across Google Search and Maps. The work can include technical SEO, local SEO, treatment-page strategy, internal linking and measurement of qualified patient actions.",
  },
  {
    question: "What happens in a clinic visibility review?",
    answer:
      "We look at your website, location and priority treatments, then identify the clearest visibility constraint and the most useful next step. You will not be pushed into a pre-set package.",
  },
  {
    question: "How is success measured?",
    answer:
      "Visibility, organic visits, enquiries and completed bookings are different signals and should be reported separately. KaiRank does not guarantee rankings, enquiries or AI citations, because those outcomes depend on third-party systems and factors no agency controls.",
  },
] as const;

const structuredData = {
  ...siteEntityGraph,
  "@graph": [
    ...siteEntityGraph["@graph"],
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      name: "Healthcare Search Visibility for UK Private Clinics",
      description: siteConfig.description,
      url: siteConfig.url,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organisation` },
      inLanguage: "en-GB",
    },
    createFaqEntity(siteConfig.url, faqs),
  ],
};

const visibilityGaps = [
  {
    index: "01",
    title: "Invisible treatments",
    body: "Priority services never reach the shortlist.",
  },
  {
    index: "02",
    title: "Weak local signals",
    body: "Nearby patients see a clearer competitor first.",
  },
  {
    index: "03",
    title: "Decision friction",
    body: "The page leaves questions unanswered.",
  },
] as const;

const outcomes = [
  {
    index: "01",
    title: "Treatment discovery",
    body: "Be present for the services patients are actively seeking.",
    href: "/healthcare-seo",
    link: "Explore healthcare SEO",
  },
  {
    index: "02",
    title: "Local consideration",
    body: "Become a credible nearby option across Search and Maps.",
    href: "/local-seo",
    link: "Explore local SEO",
  },
  {
    index: "03",
    title: "Confident enquiry",
    body: "Make evidence, answers and the next step easy to act on.",
    href: "/services",
    link: "Explore the connected service system",
  },
] as const;

const process = [
  {
    index: "01",
    title: "Diagnose",
    body: "Find the constraint between patient demand and your clinic.",
    output: "Clear diagnosis",
  },
  {
    index: "02",
    title: "Prioritise",
    body: "Order the work by commercial value, effort and evidence.",
    output: "Focused roadmap",
  },
  {
    index: "03",
    title: "Improve",
    body: "Measure visibility, engagement and patient actions separately.",
    output: "Measured progress",
  },
] as const;

export default function VisualSystemPage() {
  return (
    <div className="v3-experience v6-experience v7-experience v8-experience refinement-experience">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollExperience />
      <AnalyticsEvents />
      <SiteHeader />

      <main id="main-content">
        <section className="v3-hero v7-hero refinement-hero" id="home" aria-labelledby="hero-title" data-kai-avoid data-scroll-scene>
          <CinematicBackground />
          <div className="container refinement-hero__inner">
            <div className="refinement-hero__copy" data-reveal>
              <p className="v3-eyebrow"><i aria-hidden="true" /> Healthcare SEO for private clinics</p>
              <h1 id="hero-title"><span>Help more patients</span><em>find your clinic.</em></h1>
              <p>Founder-led healthcare SEO for UK private clinics that need stronger visibility across Google Search and Maps—and a clearer path from treatment search to enquiry.</p>
              <div className="v3-actions">
                <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="hero" />
                <a className="v3-action v3-action--text" href="#visibility-gap">See where clinics lose visibility <span aria-hidden="true">↓</span></a>
              </div>
            </div>

            <div className="refinement-hero__signal" aria-label="A patient journey from treatment need to clinic enquiry" data-interactive-surface data-reveal>
              <div className="refinement-hero__signal-copy"><span>Patient decision path</span><strong>Treatment need.<br />Local search.<br />Confident enquiry.</strong></div>
              <div className="refinement-hero__route" aria-hidden="true">
                <span className="refinement-hero__route-line"><i /></span>
                <ol><li><i />Need</li><li><i />Search + Maps</li><li><i />Clinic</li></ol>
              </div>
              <p>KaiRank strengthens the route between what a patient needs and why your clinic becomes a credible choice.</p>
            </div>
          </div>
        </section>

        <section className="refinement-gap" id="visibility-gap" aria-labelledby="gap-title" data-scroll-scene>
          <div className="container">
            <div className="v3-section-index data-label"><span>The visibility gap</span><span>Why good clinics get overlooked</span></div>
            <div className="refinement-gap__stage">
              <div className="refinement-section-lead refinement-section-lead--stacked" data-reveal>
                <h2 id="gap-title">The patient has a need.<br /><em>Your clinic is missing.</em></h2>
                <p>Search decisions happen before the phone call. KaiRank repairs the moments where discovery, trust or action breaks.</p>
              </div>
              <div className="refinement-decision-map" data-interactive-surface data-reveal>
                <div className="refinement-decision-map__route" aria-hidden="true"><i /><span /></div>
                <ol>
                  {visibilityGaps.map((item) => (
                    <li key={item.index}>
                      <span className="data-label">{item.index}</span>
                      <div><h3>{item.title}</h3><p>{item.body}</p></div>
                      <i aria-hidden="true" />
                    </li>
                  ))}
                </ol>
                <div className="refinement-decision-map__target" aria-hidden="true"><span>Clinic</span><strong>?</strong><i /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="refinement-outcomes" id="services" aria-labelledby="outcomes-title" data-scroll-scene>
          <div className="container">
            <div className="v3-section-index data-label"><span>The KaiRank system</span><span>Search → trust → enquiry</span></div>
            <div className="refinement-section-lead" data-reveal>
              <h2 id="outcomes-title">Make your clinic the <em>clear next step.</em></h2>
              <p>One connected system for technical access, treatment intent, local relevance and measurable action.</p>
            </div>
            <div className="refinement-outcomes__stage">
              <div className="refinement-visibility-orbit" aria-label="KaiRank connects treatment demand, Google Search, Maps and clinic trust" data-interactive-surface data-reveal>
                <span className="refinement-visibility-orbit__ring refinement-visibility-orbit__ring--one" aria-hidden="true" />
                <span className="refinement-visibility-orbit__ring refinement-visibility-orbit__ring--two" aria-hidden="true" />
                <div className="refinement-visibility-orbit__core"><small>KaiRank</small><strong>Clinic<br />visibility</strong></div>
                <span className="refinement-visibility-orbit__node refinement-visibility-orbit__node--search">Search</span>
                <span className="refinement-visibility-orbit__node refinement-visibility-orbit__node--maps">Maps</span>
                <span className="refinement-visibility-orbit__node refinement-visibility-orbit__node--trust">Trust</span>
                <span className="refinement-visibility-orbit__pulse" aria-hidden="true" />
              </div>
              <ol className="refinement-outcomes__grid">
                {outcomes.map((item) => (
                  <li key={item.index} data-interactive-surface data-reveal>
                    <span className="data-label">{item.index}</span>
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                    <Link href={item.href} aria-label={item.link}><span aria-hidden="true">↗</span></Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="refinement-proof" id="proof" aria-labelledby="proof-title" data-kai-avoid data-scroll-scene>
          <div className="container">
            <div className="v3-section-index data-label"><span>Proof without the theatre</span><span>The Recovery Room · Birmingham</span></div>
            <div className="refinement-proof__intro" data-reveal>
              <div><p className="v3-eyebrow">Verified clinic evidence</p><h2 id="proof-title">Proof you can <em>inspect.</em></h2></div>
              <p>A Birmingham clinic moved from an indexing barrier to measurable discovery and booking intent. Sources, periods and limits stay attached.</p>
            </div>
            <Link className="refinement-proof__story" href="/case-studies/the-recovery-room" data-interactive-surface data-reveal>
              <div className="refinement-proof__metric"><span className="data-label">Google Search Console · 6 months</span><strong>180K</strong><small>search impressions</small></div>
              <div className="refinement-proof__flow" aria-hidden="true"><span>Indexing barrier</span><i /><span>Priority intent</span><i /><span>Measured action</span></div>
              <div className="refinement-proof__result"><span className="data-label">Commercial result</span><strong>#1</strong><small>“deep tissue massage Birmingham”</small></div>
              <span className="refinement-proof__link">Open the evidence ledger <i aria-hidden="true">↗</i></span>
            </Link>
            <ul className="refinement-proof__standards" aria-label="KaiRank evidence standards" data-reveal>
              <li><span className="data-label">Source</span><strong>Attached</strong></li>
              <li><span className="data-label">Period</span><strong>Stated</strong></li>
              <li><span className="data-label">Limits</span><strong>Visible</strong></li>
            </ul>
          </div>
        </section>

        <section className="refinement-process" id="process" aria-labelledby="process-title" data-scroll-scene>
          <div className="container">
            <div className="v3-section-index data-label"><span>How the work moves</span><span>Three decisions, one accountable lead</span></div>
            <div className="refinement-section-lead" data-reveal>
              <h2 id="process-title">Clarity before <em>activity.</em></h2>
              <p>Find the constraint. Choose the priority. Measure what changed.</p>
            </div>
            <div className="refinement-process__stage">
              <div className="refinement-process__scanner" aria-hidden="true" data-reveal><span /><i /><b /></div>
              <ol className="refinement-process__grid">
                {process.map((item) => (
                  <li key={item.index} data-interactive-surface data-reveal>
                    <span className="data-label">{item.index}</span>
                    <div><h3>{item.title}</h3><p>{item.body}</p></div>
                    <small>{item.output}</small>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="refinement-founder" id="founder" aria-labelledby="founder-title" data-scroll-scene>
          <div className="container refinement-founder__grid" data-reveal>
            <div><span className="data-label">Founder-led healthcare SEO</span><h2 id="founder-title">Senior strategy stays close to the work.</h2></div>
            <figure className="refinement-founder__profile" data-interactive-surface>
              <div>
                <Image src={siteConfig.founder.portraitUrl} alt="Muhammad Mustafa Khan, founder and search strategist at KaiRank" width={560} height={700} sizes="(max-width: 992px) 18rem, 22vw" quality={92} />
                <span aria-hidden="true">Founder / 01</span>
              </div>
              <figcaption><strong>{siteConfig.founder.name}</strong><small>{siteConfig.founder.role}</small></figcaption>
            </figure>
            <div className="refinement-founder__copy">
              <p>Mustafa leads the diagnosis, priorities and measurement. When delivery needs specialist support, he works directly with your developers, writers, clinicians or existing agency—without a sales-to-junior hand-off.</p>
              <a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">View Mustafa’s LinkedIn profile <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="v3-faq refinement-faq" id="faq" aria-labelledby="faq-title" data-kai-avoid data-scroll-scene>
          <div className="container v3-faq__grid">
            <div data-reveal><span className="data-label">Useful answers</span><h2 id="faq-title">What clinic leaders usually need to know.</h2></div>
            <div className="v3-faq__list">
              {faqs.map((faq, index) => (
                <details key={faq.question} data-reveal>
                  <summary data-event="faq_opened" data-event-label={faq.question}><span className="data-label">0{index + 1}</span><strong>{faq.question}</strong><i aria-hidden="true">+</i></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="refinement-conversion" id="contact" aria-labelledby="conversion-title" data-kai-avoid data-scroll-scene>
          <div className="container refinement-conversion__inner" data-reveal>
            <span className="data-label">A practical first conversation</span>
            <h2 id="conversion-title">Find the clearest route to more <em>qualified patient enquiries.</em></h2>
            <p>A focused review for UK private clinics—not a generic sales call.</p>
            <ol className="refinement-conversion__brief" aria-label="What to expect from the clinic visibility review">
              <li><span className="data-label">Best fit</span><strong>Private clinics with one priority treatment or location</strong></li>
              <li><span className="data-label">Bring</span><strong>Your website, target area and priority service</strong></li>
              <li><span className="data-label">Leave with</span><strong>The clearest opportunity and an honest next move</strong></li>
            </ol>
            <div className="v3-actions">
              <BookingTrigger className="v3-action v3-action--solid" label="Book a clinic visibility review" source="final-cta" />
              <Link className="v3-action v3-action--text" data-event="diagnostic_clicked" data-event-label="final: website health check" data-event-source="final-cta" href="/search-visibility-diagnostic">Check my website first <span aria-hidden="true">↗</span></Link>
            </div>
            <small>No obligation. No ranking guarantees. The calendar loads only when you choose to open it. Prefer a written introduction? <Link href="/contact">See contact options.</Link></small>
          </div>
        </section>

      </main>

      <SiteFooter />
      <KaiAssistant />
    </div>
  );
}
