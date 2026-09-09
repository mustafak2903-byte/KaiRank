import Link from "next/link";
import { AnalyticsEvents } from "@/components/experience/analytics-events";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { CapabilityStage } from "@/components/experience/capability-stage";
import { CinematicBackground } from "@/components/experience/cinematic-background";
import { HeroSignal } from "@/components/experience/hero-signal";
import { KaiAssistant } from "@/components/experience/kai-assistant";
import { ProblemJourney } from "@/components/experience/problem-journey";
import { ProcessFlow } from "@/components/experience/process-flow";
import { RecoveryProgress } from "@/components/experience/recovery-progress";
import { SearchSignalField } from "@/components/experience/search-signal-field";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Search visibility for private clinics",
  description:
    "KaiRank helps private clinics improve discovery across Google, Maps and AI search through technical SEO, local SEO, search strategy, content and AI-search optimisation.",
  path: "/visual-system",
  noIndex: true,
});

const faqs = [
  {
    question: "What will the Search Visibility Diagnostic show me?",
    answer:
      "It checks the public response, redirects, HTTPS, page fundamentals, indexation signals, structured data, mobile setup and optional PageSpeed data. It does not claim to measure rankings.",
  },
  {
    question: "What happens after I run the diagnostic?",
    answer:
      "You’ll see the public technical signals KaiRank can verify immediately. Add a location and priority treatment if you want a deeper competitive review; nothing is sent unless you request it.",
  },
  {
    question: "Which clinics are the best fit for KaiRank?",
    answer:
      "Private clinics with valuable treatments, defined service areas and a genuine need to improve how patients discover and evaluate them. Similar high-consideration healthcare businesses may also be a fit.",
  },
  {
    question: "How quickly can search visibility change?",
    answer:
      "Technical access can improve quickly. Competitive treatment and local visibility usually compound over months, depending on the starting point and market.",
  },
  {
    question: "Can KaiRank work with our current team or agency?",
    answer:
      "Yes. KaiRank can lead delivery or provide the diagnosis, priorities and measurement layer for your developers, writers or existing agency.",
  },
  {
    question: "Do you guarantee rankings or AI citations?",
    answer:
      "No. KaiRank improves the signals search systems use, but rankings, Maps visibility and AI citations remain decisions made by third-party platforms.",
  },
  {
    question: "What happens in the first strategy conversation?",
    answer:
      "We start with one website, location and priority treatment, identify the constraint that most needs evidence and decide whether a focused review, implementation sequence or no further work is the right next step.",
  },
  {
    question: "How is an engagement scoped?",
    answer:
      "Scope follows the diagnosis. KaiRank defines the priority pages, technical repairs, local evidence or measurement work required before agreeing deliverables, ownership and timing with your team.",
  },
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organisation`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/icon.svg`,
      email: siteConfig.contact.email,
      description: siteConfig.description,
      founder: { "@id": `${siteConfig.url}/#founder` },
      knowsAbout: ["Technical SEO", "Search strategy", "Local SEO", "Healthcare SEO", "AI search optimisation"],
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#founder`,
      name: siteConfig.founder.name,
      jobTitle: "Founder and search strategist",
      url: `${siteConfig.url}/about`,
      sameAs: [siteConfig.founder.linkedIn],
      worksFor: { "@id": `${siteConfig.url}/#organisation` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: { "@id": `${siteConfig.url}/#organisation` },
      audience: { "@type": "Audience", audienceType: "Private clinics and healthcare businesses" },
    },
  ],
};

export default function VisualSystemPage() {
  return (
    <div className="v3-experience v6-experience v7-experience v8-experience">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollExperience />
      <AnalyticsEvents />
      <SiteHeader />

      <main id="main-content">
        <section className="v3-hero v7-hero" id="home" aria-labelledby="hero-title" data-kai-avoid>
          <CinematicBackground />
          <div className="container v7-hero__inner">
            <div className="v7-hero__copy" data-reveal>
              <p className="v3-eyebrow"><i aria-hidden="true" /> Search visibility for private clinics</p>
              <h1 id="hero-title">
                <span>Be the clinic</span>
                <span>patients find</span>
                <em>before they choose.</em>
              </h1>
              <p className="v3-hero__lead">
                KaiRank finds and fixes the technical, local and authority gaps keeping private clinics out of the shortlist across Google, Maps and AI search.
              </p>
              <div className="v3-actions">
                <a className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="Hero: check my clinic" data-event-source="hero" href="#audit">Check my clinic <span aria-hidden="true">↘</span></a>
                <a className="v3-action v3-action--text" href="#proof">See verified clinic results <span aria-hidden="true">↓</span></a>
              </div>
            </div>

            <div className="v7-hero__evidence" aria-label="Verified Recovery Room case-study evidence" data-reveal>
              <span className="data-label">Verified clinic case study · source linked</span>
              <dl>
                <div><dt>+808%</dt><dd>Search impressions</dd></div>
                <div><dt>+354%</dt><dd>Organic clicks</dd></div>
                <div><dt>#1</dt><dd>Treatment query</dd></div>
              </dl>
            </div>

            <a className="v7-hero__scroll data-label" href="#surface-model">
              <span>Follow one patient query</span><i aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="v7-surfaces" id="surface-model" aria-labelledby="surface-model-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>Search surface</span><span>One query · three systems</span></div>
            <div className="v7-surfaces__intro" data-reveal>
              <h2 id="surface-model-title">Patients search once.<br /><em>Discovery fragments.</em></h2>
              <p>Google, Maps and AI evaluate different signals. A clinic can be credible in one surface and absent from another. KaiRank connects the technical, local and authority signals that help it enter consideration.</p>
            </div>
            <HeroSignal />
          </div>
        </section>

        <ProblemJourney />

        <section className="v3-capabilities" id="services" aria-labelledby="capabilities-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>What we fix</span><span>Constraint first</span></div>
            <div className="v3-capabilities__intro" data-reveal>
              <h2 id="capabilities-title">Fix the layer costing you visibility.</h2>
              <p>Not every clinic needs more content. Some need technical repairs. Others need clearer treatment pages, stronger local evidence or better-connected authority signals. The work starts where the loss begins.</p>
            </div>
            <CapabilityStage />
          </div>
        </section>

        <section className="v9-outcomes" aria-labelledby="outcomes-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>From visibility to action</span><span>Three distinct outcomes</span></div>
            <div className="v9-outcomes__intro" data-reveal>
              <h2 id="outcomes-title">Visibility only matters when it creates <em>a credible route to action.</em></h2>
              <p>KaiRank keeps discovery, evaluation and patient intent separate—so the work is judged by what changed, not by one inflated number.</p>
            </div>
            <ol className="v9-outcomes__grid">
              <li data-reveal><span className="data-label">01 / Discovered</span><strong>Enter the shortlist.</strong><p>Earn visibility for priority treatments in the locations and search surfaces that matter.</p><small>Measured with impressions, rankings and local discovery.</small></li>
              <li data-reveal><span className="data-label">02 / Evaluated</span><strong>Make the decision easier.</strong><p>Give patients and search systems clear services, clinicians, locations and trustworthy evidence.</p><small>Measured with qualified landing-page and evidence engagement.</small></li>
              <li data-reveal><span className="data-label">03 / Action</span><strong>Connect demand to the clinic.</strong><p>Build an observable route from organic discovery to calls, enquiries and booking intent.</p><small>Measured as actions—not automatically relabelled as patients or revenue.</small></li>
            </ol>
          </div>
        </section>

        <section className="v3-proof" id="proof" aria-labelledby="proof-title" data-kai-avoid>
          <div className="container">
            <div className="v3-section-index data-label"><span>Verified outcome</span><span>Evidence attached</span></div>
            <div className="v3-proof__intro" data-reveal>
              <p className="v3-eyebrow">The Recovery Room · Birmingham</p>
              <h2 id="proof-title">One clinic. A much larger search surface.</h2>
            </div>
            <p className="v7-proof-context data-label">Verified project evidence · comparison period documented in the linked source</p>
            <RecoveryProgress />

            <div className="v3-south-city" data-reveal>
              <div>
                <span className="data-label">Supporting proof / South City Hospital</span>
                <h3>Scale without losing clinical structure.</h3>
                <p>From roughly 250 ranking keywords in July 2025 to 3,900 in May 2026, a connected service-and-doctor architecture expanded discovery across specialties, services and individual doctor profiles.</p>
                <Link data-event="evidence_opened" data-event-label="South City Hospital case study" href="/case-studies/south-city-hospital">Read verified case study <span aria-hidden="true">↗</span></Link>
              </div>
              <dl>
                <div><dt>46K+</dt><dd>monthly organic visits</dd></div>
                <div><dt>3,900</dt><dd>ranking keywords</dd></div>
                <div><dt>194</dt><dd>doctor profiles in the top 10</dd></div>
                <div><dt>8,076</dt><dd>Google profile call actions · one month</dd></div>
              </dl>
            </div>

            <div className="v7-proof-bridge" data-reveal>
              <div><span className="data-label">Apply the evidence</span><strong>Want to see which constraint applies to your clinic?</strong></div>
              <a className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="Proof: check my clinic" data-event-source="proof" href="#audit">Check my clinic <span aria-hidden="true">↘</span></a>
            </div>
          </div>
        </section>

        <section className="v7-founder" id="founder" aria-labelledby="founder-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>Accountable specialist</span><span>One clear owner</span></div>
            <div className="v7-founder__grid v8-founder__grid" data-reveal>
              <div>
                <span className="data-label">{siteConfig.founder.role}</span>
                <h2 id="founder-title">Specialist diagnosis.<br /><em>Accountable delivery.</em></h2>
              </div>
              <div className="v7-founder__statement">
                <p>Every engagement has a clear owner. {siteConfig.founder.name} leads the diagnosis, priorities and search strategy—working with your developers, writers or existing agency where needed.</p>
                <a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">View founder profile <span aria-hidden="true">↗</span></a>
              </div>
              <div className="v8-founder__dossier" aria-label={`Founder profile for ${siteConfig.founder.name}`}>
                <div aria-hidden="true"><span>MK</span><i /></div>
                <p><span className="data-label">Your accountable lead</span><strong>{siteConfig.founder.name}</strong><small>Diagnosis, prioritisation and search strategy stay founder-led from first review to delivery.</small></p>
              </div>
              <ul aria-label="KaiRank working principles">
                <li><span>01</span><strong>Evidence before activity</strong></li>
                <li><span>02</span><strong>Priority before volume</strong></li>
                <li><span>03</span><strong>No ranking guarantees</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="v3-process" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>How we work</span><span>Three decisive stages</span></div>
            <div className="v3-process__intro" data-reveal>
              <h2 id="process-title">Diagnose. Engineer. Compound.</h2>
              <p>One constraint at a time. Each stage produces a clear output before the next begins.</p>
            </div>
            <ProcessFlow />
          </div>
        </section>

        <div className="v6-diagnostic" aria-label="Clinic search visibility diagnostic" data-kai-avoid>
          <SearchSignalField />
          <div className="container">
            <div className="v3-section-index data-label"><span>Search visibility diagnostic</span><span>Start with public evidence</span></div>
            <VisibilityAudit />
          </div>
        </div>

        <section className="v3-faq" id="faq" aria-labelledby="faq-title" data-kai-avoid>
          <div className="container v3-faq__grid">
            <div data-reveal>
              <span className="data-label">Useful answers</span>
              <h2 id="faq-title">Questions before we look closer.</h2>
            </div>
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

        <section className="v3-conversion" id="contact" aria-labelledby="conversion-title" data-kai-avoid>
          <div className="v3-conversion__signal" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="container v3-conversion__inner" data-reveal>
            <span className="data-label">Start with evidence</span>
            <h2 id="conversion-title">Find the gap between your clinic and the shortlist.</h2>
            <p>Bring your website, location and priority treatment. The first conversation starts with the constraint—not a pre-filled deliverables list.</p>
            <div className="v3-actions">
              <a className="v3-action v3-action--solid" data-event="primary_cta_clicked" data-event-label="Final: check my clinic" data-event-source="final-cta" href="#audit">Check my clinic <span aria-hidden="true">↗</span></a>
              <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source="final-cta" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <KaiAssistant />
    </div>
  );
}
