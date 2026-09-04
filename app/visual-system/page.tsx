import { Wordmark } from "@/components/brand/wordmark";
import { AnalyticsEvents } from "@/components/experience/analytics-events";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { CapabilityStage } from "@/components/experience/capability-stage";
import { CinematicBackground } from "@/components/experience/cinematic-background";
import { HeroSignal } from "@/components/experience/hero-signal";
import { KaiAssistant } from "@/components/experience/kai-assistant";
import { ProblemJourney } from "@/components/experience/problem-journey";
import { RecoveryProgress } from "@/components/experience/recovery-progress";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Search visibility for private clinics",
  description:
    "KaiRank helps private clinics improve discovery across Google, Maps and AI search through technical SEO, local SEO, search strategy, content and AI-search optimisation.",
  path: "/visual-system/",
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
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organisation`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      founder: {
        "@type": "Person",
        name: siteConfig.founder.name,
        sameAs: siteConfig.founder.linkedIn,
      },
      knowsAbout: ["Technical SEO", "Search strategy", "Local SEO", "Healthcare SEO", "AI search optimisation"],
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
    <div className="v3-experience v6-experience v7-experience">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollExperience />
      <AnalyticsEvents />
      <SiteHeader />

      <main>
        <section className="v3-hero v7-hero" id="home" aria-labelledby="hero-title">
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
                KaiRank identifies and repairs the search constraints keeping private clinics out of consideration across Google, Maps and AI.
              </p>
              <div className="v3-actions">
                <a className="v3-action v3-action--solid" href="#audit">Check my clinic <span aria-hidden="true">↘</span></a>
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

        <section className="v3-proof" id="proof" aria-labelledby="proof-title">
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
                <a data-event="evidence_opened" data-event-label="South City Hospital case study" href="https://drive.google.com/file/d/1liDUyqtgXvZD8adj3Wanulkv70N5hLvY/view?usp=sharing" target="_blank" rel="noreferrer">View verified case study <span aria-hidden="true">↗</span></a>
              </div>
              <dl>
                <div><dt>46K+</dt><dd>monthly organic visits</dd></div>
                <div><dt>3,900</dt><dd>ranking keywords</dd></div>
                <div><dt>194</dt><dd>doctor profiles in the top 10</dd></div>
                <div><dt>8,076</dt><dd>patient calls in one month</dd></div>
              </dl>
            </div>

            <div className="v7-proof-bridge" data-reveal>
              <div><span className="data-label">Apply the evidence</span><strong>Want to see which constraint applies to your clinic?</strong></div>
              <a className="v3-action v3-action--solid" href="#audit">Check my clinic <span aria-hidden="true">↘</span></a>
            </div>
          </div>
        </section>

        <section className="v7-founder" aria-labelledby="founder-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>Accountable specialist</span><span>One clear owner</span></div>
            <div className="v7-founder__grid" data-reveal>
              <div>
                <span className="data-label">{siteConfig.founder.role}</span>
                <h2 id="founder-title">Specialist diagnosis.<br /><em>Accountable delivery.</em></h2>
              </div>
              <div className="v7-founder__statement">
                <p>Every engagement has a clear owner. {siteConfig.founder.name} leads the diagnosis, priorities and search strategy—working with your developers, writers or existing agency where needed.</p>
                <a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">View founder profile <span aria-hidden="true">↗</span></a>
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
            </div>
            <ol className="v3-process__steps">
              <li data-reveal><span>01</span><div><h3>Diagnose</h3><p>Find where patient demand is being blocked, misunderstood or surrendered to competitors.</p></div><small>Find the constraint</small></li>
              <li data-reveal><span>02</span><div><h3>Engineer</h3><p>Repair the path and strengthen the signals that make the clinic relevant.</p></div><small>Fix the right layer</small></li>
              <li data-reveal><span>03</span><div><h3>Compound</h3><p>Measure what surfaces, earns trust and creates action—then address the next highest-leverage constraint.</p></div><small>Strengthen what works</small></li>
            </ol>
          </div>
        </section>

        <div className="v6-diagnostic" aria-label="Clinic search visibility diagnostic">
          <div className="container">
            <div className="v3-section-index data-label"><span>Search visibility diagnostic</span><span>Start with public evidence</span></div>
            <VisibilityAudit />
          </div>
        </div>

        <section className="v3-faq" id="faq" aria-labelledby="faq-title">
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

        <section className="v3-conversion" id="contact" aria-labelledby="conversion-title">
          <div className="v3-conversion__signal" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="container v3-conversion__inner" data-reveal>
            <span className="data-label">Start with evidence</span>
            <h2 id="conversion-title">Find the gap between your clinic and the shortlist.</h2>
            <p>Start with your website. Add your location and priority treatment for a deeper comparison.</p>
            <div className="v3-actions">
              <a className="v3-action v3-action--solid" href="#audit">Check my clinic <span aria-hidden="true">↗</span></a>
              <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source="final-cta" />
            </div>
          </div>
        </section>
      </main>

      <footer className="v3-footer">
        <div className="container v3-footer__grid">
          <div className="v3-footer__brand"><Wordmark href="/visual-system/" quiet /><p>Search visibility for private clinics across Google, Maps and AI search.</p></div>
          <nav aria-label="Services"><strong>Services</strong><a href="#services">Technical SEO</a><a href="#services">Search strategy</a><a href="#services">Local SEO</a><a href="#services">AI search optimisation</a></nav>
          <nav aria-label="Results"><strong>Results</strong><a href="#proof">The Recovery Room</a><a href="#proof">South City Hospital</a><a href="#audit">Visibility Diagnostic</a></nav>
          <nav aria-label="Company"><strong>Company</strong><a href="#process">How We Work</a><a href="#faq">FAQ</a><a href={siteConfig.founder.linkedIn} target="_blank" rel="noreferrer">Founder profile</a><a href={`mailto:${siteConfig.contact.email}`}>Contact</a></nav>
        </div>
        <div className="container v7-footer__privacy" id="privacy">
          <span className="data-label">Privacy note</span>
          <p>The diagnostic reads public website signals. If you request a deeper review, your contact and clinic details are sent to KaiRank so the requested review can be delivered. Booking details are handled by Cal.com.</p>
        </div>
        <div className="container v3-footer__base data-label"><span>© 2026 KaiRank</span><a href="#privacy">Privacy</a><span>{siteConfig.contact.email}</span><span>Search visibility for private clinics</span></div>
      </footer>

      <KaiAssistant />
    </div>
  );
}
