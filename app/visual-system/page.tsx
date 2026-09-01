import { Wordmark } from "@/components/brand/wordmark";
import { AnalyticsEvents } from "@/components/experience/analytics-events";
import { CapabilityStage } from "@/components/experience/capability-stage";
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
    question: "Is KaiRank only for healthcare businesses?",
    answer:
      "Healthcare is the centre of the work because patient search combines local intent, trust and technical complexity. Similar high-consideration service businesses may also be a fit.",
  },
  {
    question: "What does the Search Visibility Diagnostic actually check?",
    answer:
      "The automated stage checks the public response, redirects, HTTPS, page fundamentals, indexation signals, structured data, mobile setup and optional PageSpeed data. The deeper review is manual.",
  },
  {
    question: "Do you guarantee rankings or AI citations?",
    answer:
      "No. KaiRank improves the signals search systems use, but rankings, Maps visibility and AI citations remain decisions made by third-party platforms.",
  },
  {
    question: "How quickly should we expect movement?",
    answer:
      "Technical access can improve quickly. Competitive treatment and local visibility usually compound over months, depending on the starting point and market.",
  },
  {
    question: "Can KaiRank work with our current team or agency?",
    answer:
      "Yes. KaiRank can lead delivery or provide the diagnosis, priorities and measurement layer for your developers, writers or existing agency.",
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
    <div className="v3-experience">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ScrollExperience />
      <AnalyticsEvents />
      <SiteHeader />

      <main>
        <section className="v3-hero" id="home" aria-labelledby="hero-title">
          <div className="v3-hero__mesh" aria-hidden="true" />
          <div className="container v3-hero__inner">
            <div className="v3-hero__meta data-label">
              <span>Search visibility / private clinics</span>
              <span>Google · Maps · AI</span>
              <span><i /> Signal online</span>
            </div>

            <div className="v3-hero__stage">
              <div className="v3-hero__copy" data-reveal>
                <p className="v3-eyebrow">Search visibility for private clinics</p>
                <h1 id="hero-title">
                  Make the searches
                  <span>that matter</span>
                  <em>lead to your clinic.</em>
                </h1>
                <p className="v3-hero__lead">
                  KaiRank builds the technical, local, content and AI-search signals that help private clinics get discovered across Google, Maps and AI — around the treatments, locations and searches that matter commercially.
                </p>
                <div className="v3-actions">
                  <a className="v3-action v3-action--solid" href="#audit">Check my clinic <span aria-hidden="true">↘</span></a>
                  <a className="v3-action v3-action--text" href="#proof">See verified results <span aria-hidden="true">↓</span></a>
                </div>
              </div>

              <HeroSignal />
            </div>

            <div className="v3-hero__dock">
              <VisibilityAudit />
              <aside className="v3-proof-strip" aria-label="Selected verified results">
                <span className="data-label">Verified outcome / The Recovery Room</span>
                <dl>
                  <div><dt>+808%</dt><dd>search impressions</dd></div>
                  <div><dt>+354%</dt><dd>organic clicks</dd></div>
                  <div><dt>#1</dt><dd>deep tissue massage Birmingham</dd></div>
                </dl>
                <a href="#proof">Trace the result <span aria-hidden="true">→</span></a>
              </aside>
            </div>
          </div>
        </section>

        <ProblemJourney />

        <section className="v3-system" id="system" aria-labelledby="system-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>02 / The KaiRank Visibility System</span><span>One connected decision path</span></div>
            <div className="v3-system__intro" data-reveal>
              <p className="v3-eyebrow">Search visibility, engineered</p>
              <h2 id="system-title">Visibility is a chain of agreement.</h2>
              <p>Search systems need to reach the site, understand the clinic, trust the evidence and match it to the right patient need. Break one link and valuable demand leaks away.</p>
            </div>
            <div className="v3-system__chain" aria-label="Demand to opportunity visibility chain" data-reveal>
              {[
                ["01", "Demand", "A patient expresses intent."],
                ["02", "Visibility", "Your clinic enters the consideration set."],
                ["03", "Trust", "Evidence reduces doubt."],
                ["04", "Enquiry", "The next action feels clear."],
                ["05", "Opportunity", "Search becomes measurable growth."],
              ].map(([index, title, body]) => (
                <div key={index} tabIndex={0}>
                  <span className="data-label">{index}</span>
                  <strong>{title}</strong>
                  <small>{body}</small>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v3-capabilities" id="services" aria-labelledby="capabilities-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>03 / What we fix</span><span>Constraint first · package second</span></div>
            <div className="v3-capabilities__intro" data-reveal>
              <h2 id="capabilities-title">The problem changes. So does the work.</h2>
              <p>We don’t force every clinic into the same SEO package. We find the constraint, then repair the part of the search journey holding visibility back.</p>
            </div>
            <CapabilityStage />
          </div>
        </section>

        <section className="v3-proof" id="proof" aria-labelledby="proof-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>04 / Verified outcome</span><span>Case-study data · source attached</span></div>
            <div className="v3-proof__intro" data-reveal>
              <p className="v3-eyebrow">The Recovery Room · Birmingham</p>
              <h2 id="proof-title">One clinic. A much larger search surface.</h2>
              <p>Technical repairs, clearer treatment targeting and stronger local relevance expanded The Recovery Room’s visibility around high-intent Birmingham searches.</p>
            </div>
            <RecoveryProgress />

            <div className="v3-south-city" data-reveal>
              <div>
                <span className="data-label">Supporting proof / South City Hospital</span>
                <h3>Healthcare search at scale.</h3>
                <p>A scalable service-and-doctor search architecture expanded organic discovery across specialties, services and individual doctor profiles.</p>
                <a data-event="evidence_opened" data-event-label="South City Hospital case study" href="https://drive.google.com/file/d/1liDUyqtgXvZD8adj3Wanulkv70N5hLvY/view?usp=sharing" target="_blank" rel="noreferrer">View verified case study <span aria-hidden="true">↗</span></a>
              </div>
              <dl>
                <div><dt>46K+</dt><dd>monthly organic visits</dd></div>
                <div><dt>3,900</dt><dd>ranking keywords</dd></div>
                <div><dt>194</dt><dd>doctor profiles in the top 10</dd></div>
                <div><dt>8,076</dt><dd>patient calls in one month</dd></div>
              </dl>
            </div>
          </div>
        </section>

        <section className="v3-process" id="process" aria-labelledby="process-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>05 / How we work</span><span>Three decisions · one accountable route</span></div>
            <div className="v3-process__intro" data-reveal>
              <h2 id="process-title">Diagnose. Engineer. Compound.</h2>
              <p>Rigorous search work, without making your team manage the complexity.</p>
            </div>
            <ol className="v3-process__steps">
              <li data-reveal><span>01</span><div><h3>Diagnose</h3><p>Find where valuable demand is being blocked, missed or misunderstood — and what fixing it could change.</p></div><small>Evidence before activity</small></li>
              <li data-reveal><span>02</span><div><h3>Engineer</h3><p>Repair the technical path, sharpen relevance and connect the clinic’s services, people, places and proof.</p></div><small>Priority before volume</small></li>
              <li data-reveal><span>03</span><div><h3>Compound</h3><p>Measure what surfaces, earns trust and creates action. Then use that evidence to strengthen the next cycle.</p></div><small>Learning before theatre</small></li>
            </ol>
          </div>
        </section>

        <section className="v3-faq" id="faq" aria-labelledby="faq-title">
          <div className="container v3-faq__grid">
            <div data-reveal>
              <span className="data-label">06 / Useful answers</span>
              <h2 id="faq-title">Before we look closer.</h2>
              <p>Clear expectations make better search work.</p>
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
            <span className="data-label">07 / Start with evidence</span>
            <h2 id="conversion-title">See where competitors are easier to find.</h2>
            <p>Start with your website, location and priority treatment. We’ll check the public signals first, then show where the deeper visibility gap deserves attention.</p>
            <div className="v3-actions">
              <a className="v3-action v3-action--solid" href="#audit">Find my visibility gap <span aria-hidden="true">↗</span></a>
              <a className="v3-action v3-action--text" data-event="booking_clicked" data-event-label="Final CTA" href={siteConfig.bookingUrl} target="_blank" rel="noreferrer">Talk through my search strategy <span aria-hidden="true">↗</span></a>
            </div>
            <small className="v3-conversion__aside">Find the signal your competitors are already winning.</small>
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
        <div className="container v3-footer__base data-label"><span>© 2026 KaiRank</span><span>{siteConfig.contact.email}</span><span>Review route / noindex</span></div>
      </footer>

      <KaiAssistant />
    </div>
  );
}
