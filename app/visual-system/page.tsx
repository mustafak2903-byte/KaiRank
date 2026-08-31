import { Wordmark } from "@/components/brand/wordmark";
import { CapabilityStage } from "@/components/experience/capability-stage";
import { HeroSignal } from "@/components/experience/hero-signal";
import { ProblemJourney } from "@/components/experience/problem-journey";
import { RecoveryProgress } from "@/components/experience/recovery-progress";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Search visibility for private clinics",
  description:
    "KaiRank engineers clinic visibility across Google Search, Maps and AI discovery—turning valuable patient searches into qualified enquiries.",
  path: "/visual-system/",
  noIndex: true,
});

const faqs = [
  {
    question: "Is KaiRank only for healthcare businesses?",
    answer:
      "Healthcare is the centre of the work because patient search combines local intent, trust and technical complexity. KaiRank can support other high-consideration service businesses when the same search dynamics apply.",
  },
  {
    question: "What does the instant audit actually check?",
    answer:
      "The Fast Check reads the public page, response, redirects, HTTPS, title, description, canonical, headings, viewport, structured data, robots.txt and sitemap. PageSpeed is an optional second layer, not the whole diagnosis.",
  },
  {
    question: "Do you guarantee rankings or AI citations?",
    answer:
      "No. KaiRank improves the technical, local, content and entity signals that search systems use. Rankings, map visibility and citations remain decisions made by third-party platforms.",
  },
  {
    question: "How quickly should we expect movement?",
    answer:
      "Technical fixes can change access quickly; competitive treatment and local visibility usually compound over months. The plan separates immediate blockers from the longer work of relevance and authority.",
  },
  {
    question: "Can KaiRank work with our current team or agency?",
    answer:
      "Yes. The engagement can lead delivery or supply the search diagnosis, priorities and measurement layer for your developers, writers and marketing team to execute together.",
  },
] as const;

export default function VisualSystemPage() {
  return (
    <div className="v3-experience">
      <ScrollExperience />
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
                <p className="v3-eyebrow">Healthcare search consultancy</p>
                <h1 id="hero-title">
                  Make the searches
                  <span>that matter</span>
                  <em>lead to your clinic.</em>
                </h1>
                <p className="v3-hero__lead">
                  KaiRank engineers the technical, local, content and entity signals that help private clinics surface across Google, Maps and AI search—then turns real search demand into qualified enquiries, without making paid clicks the only route to growth.
                </p>
                <div className="v3-actions">
                  <a className="v3-action v3-action--solid" href="#audit">Run the Fast Check <span aria-hidden="true">↘</span></a>
                  <a className="v3-action v3-action--text" href="#proof">See verified proof <span aria-hidden="true">↓</span></a>
                </div>
              </div>

              <HeroSignal />
            </div>

            <div className="v3-hero__dock">
              <VisibilityAudit />
              <aside className="v3-proof-strip" aria-label="Selected verified results">
                <span className="data-label">The Recovery Room / Birmingham</span>
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
            <div className="v3-section-index data-label"><span>02 / Visibility system</span><span>One connected decision path</span></div>
            <div className="v3-system__intro" data-reveal>
              <p className="v3-eyebrow">Search visibility, engineered</p>
              <h2 id="system-title">Visibility is a chain of agreement.</h2>
              <p>Search systems need to reach the site, understand the clinic, trust the evidence and match it to the right patient need. Break one link and demand leaks away.</p>
            </div>
            <div className="v3-system__chain" aria-label="Demand to opportunity visibility chain" data-reveal>
              {[
                ["01", "Demand", "A patient expresses intent"],
                ["02", "Visibility", "The clinic earns the result"],
                ["03", "Trust", "Evidence reduces doubt"],
                ["04", "Enquiry", "The next action feels clear"],
                ["05", "Opportunity", "Search becomes growth"],
              ].map(([index, title, body]) => (
                <div key={index}>
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
            <div className="v3-section-index data-label"><span>03 / Five capabilities</span><span>Different constraint · connected system</span></div>
            <div className="v3-capabilities__intro" data-reveal>
              <h2 id="capabilities-title">The work changes with the visibility constraint.</h2>
              <p>Each capability changes a different part of the route from patient intent to confident action. Select one to see the signal it repairs.</p>
            </div>
            <CapabilityStage />
          </div>
        </section>

        <section className="v3-proof" id="proof" aria-labelledby="proof-title">
          <div className="container">
            <div className="v3-section-index data-label"><span>04 / Verified outcomes</span><span>Context stays attached</span></div>
            <div className="v3-proof__intro" data-reveal>
              <p className="v3-eyebrow">The Recovery Room · Birmingham</p>
              <h2 id="proof-title">One clinic. A much larger search surface.</h2>
              <p>KaiRank connected technical repair, treatment demand and local relevance. The result was broader discovery at the searches most likely to become bookings.</p>
            </div>
            <RecoveryProgress />

            <div className="v3-south-city" data-reveal>
              <div>
                <span className="data-label">Supporting proof / South City Hospital</span>
                <h3>Scale without losing the clinical detail.</h3>
                <p>Service architecture and individual doctor visibility expanded together—creating more ways for patient demand to reach the right expertise.</p>
                <a href="https://drive.google.com/file/d/1liDUyqtgXvZD8adj3Wanulkv70N5hLvY/view?usp=sharing" target="_blank" rel="noreferrer">Open evidence report <span aria-hidden="true">↗</span></a>
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
            <div className="v3-section-index data-label"><span>05 / How it works</span><span>Three decisions · one accountable route</span></div>
            <div className="v3-process__intro" data-reveal>
              <h2 id="process-title">Diagnose. Engineer. Compound.</h2>
              <p>The engagement starts with the constraint, not a pre-filled deliverables list.</p>
            </div>
            <ol className="v3-process__steps">
              <li data-reveal><span>01</span><div><h3>Diagnose</h3><p>Find where valuable demand is being blocked, missed or misunderstood—and what fixing it could change.</p></div><small>Evidence before activity</small></li>
              <li data-reveal><span>02</span><div><h3>Engineer</h3><p>Repair the technical path, sharpen relevance and connect the clinic’s services, people, places and proof.</p></div><small>Priority before volume</small></li>
              <li data-reveal><span>03</span><div><h3>Compound</h3><p>Measure what surfaces, earns trust and creates action; use that evidence to strengthen the next cycle.</p></div><small>Learning before theatre</small></li>
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
                  <summary><span className="data-label">0{index + 1}</span><strong>{faq.question}</strong><i aria-hidden="true">+</i></summary>
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
            <h2 id="conversion-title">Find the signal your competitors are already winning.</h2>
            <p>Run the Fast Check now. If the technical surface is only part of the problem, request a deeper review of treatment demand, local visibility, content and AI discovery.</p>
            <div className="v3-actions">
              <a className="v3-action v3-action--solid" href="#audit">Run my visibility audit <span aria-hidden="true">↑</span></a>
              <a className="v3-action v3-action--text" href="mailto:hello@kairank.com?subject=Search%20visibility%20conversation">Talk through the opportunity <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="v3-footer">
        <div className="container v3-footer__grid">
          <div className="v3-footer__brand"><Wordmark href="/visual-system/" quiet /><p>Search visibility engineered for clinics across Google, Maps and AI discovery.</p></div>
          <nav aria-label="Services"><strong>Services</strong><a href="#services">Technical SEO</a><a href="#services">Local visibility</a><a href="#services">Content authority</a><a href="#services">AI search</a></nav>
          <nav aria-label="Results"><strong>Results</strong><a href="#proof">The Recovery Room</a><a href="#proof">South City Hospital</a><a href="#audit">Fast Check</a></nav>
          <nav aria-label="Company"><strong>Company</strong><a href="#system">Approach</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="mailto:hello@kairank.com">Contact</a></nav>
        </div>
        <div className="container v3-footer__base data-label"><span>© 2026 KaiRank</span><span>hello@kairank.com</span><span>Review route / noindex</span></div>
      </footer>
    </div>
  );
}
