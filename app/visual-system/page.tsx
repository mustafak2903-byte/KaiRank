import { Wordmark } from "@/components/brand/wordmark";
import { DiscoveryField } from "@/components/experience/discovery-field";
import { ScrollExperience } from "@/components/experience/scroll-experience";
import { SouthCityProgress } from "@/components/experience/south-city-progress";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { SiteHeader } from "@/components/layout/site-header";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Search visibility for clinics",
  description:
    "KaiRank engineers clinic visibility across Google Search, Maps and AI discovery—turning valuable patient searches into measurable opportunity.",
  path: "/visual-system/",
  noIndex: true,
});

const systemLayers = [
  { index: "01", title: "Technical foundation", body: "Make the site crawlable, fast and structurally clear before asking search systems to trust it.", signal: "Access / index / render" },
  { index: "02", title: "Search demand", body: "Map the treatments, conditions, locations and questions that carry genuine patient intent.", signal: "Intent / value / priority" },
  { index: "03", title: "Content + entity clarity", body: "Connect services, clinicians, evidence and locations so the business is easier to understand and retrieve.", signal: "Service / person / place" },
  { index: "04", title: "Local visibility", body: "Strengthen the signals that decide whether a nearby patient sees the clinic in Maps and local results.", signal: "Relevance / distance / trust" },
  { index: "05", title: "Authority + trust", body: "Build useful evidence around real expertise—not pages produced simply to occupy a keyword.", signal: "Experience / evidence / citation" },
  { index: "06", title: "AI retrieval", body: "Give answer engines consistent, structured information they can interpret without promising a guaranteed citation.", signal: "Understand / retrieve / cite" },
  { index: "07", title: "Measurement", body: "Keep rankings, calls, traffic and visibility tied to their source so decisions survive inspection.", signal: "Observe / learn / compound" },
] as const;

const services = [
  { title: "SEO", problem: "The right treatments are not appearing when patients compare providers.", answer: "Build a search structure around valuable demand, clear service relevance and pages worth choosing—not traffic for its own sake." },
  { title: "Technical SEO", problem: "Strong clinical content is being limited by crawl, rendering, performance or indexation failures.", answer: "Find the systemic barrier, prioritise it by commercial effect and make the site technically legible to search systems." },
  { title: "Local SEO", problem: "Nearby patients see competitors first in Maps, local results and treatment-led searches.", answer: "Align location, services, profiles, reviews and on-site signals around how patients actually search in the area." },
  { title: "AI search optimisation", problem: "The business is difficult for answer engines to understand, connect or retrieve with confidence.", answer: "Improve entity clarity, structured information, authority and citation-ready evidence—without AI-search theatre." },
  { title: "Healthcare SEO", problem: "Generic marketing misses how trust, treatment intent, clinical expertise and patient decisions intersect.", answer: "Connect search engineering to the commercial reality of running a clinic: profitable treatments, local trust and qualified enquiries." },
] as const;

export default function VisualSystemPage() {
  return (
    <div className="experience">
      <ScrollExperience />
      <SiteHeader />

      <main>
        <section className="experience-hero" aria-labelledby="hero-title">
          <div className="experience-hero__field" aria-hidden="true">
            <span className="experience-hero__signal experience-hero__signal--one" />
            <span className="experience-hero__signal experience-hero__signal--two" />
            <span className="experience-hero__signal experience-hero__signal--three" />
          </div>

          <div className="container experience-hero__inner">
            <div className="experience-hero__meta data-label">
              <span>Search visibility for clinics</span>
              <span>Google / Maps / AI discovery</span>
              <span>Signal status / active</span>
            </div>

            <div className="experience-hero__grid">
              <div className="experience-hero__copy" data-reveal>
                <p className="eyebrow"><span /> Search visibility, engineered.</p>
                <h1 id="hero-title">
                  <span>Be the clinic</span>
                  <span>patients find</span>
                  <em>before they decide.</em>
                </h1>
                <p className="experience-hero__lead">KaiRank connects technical SEO, local search, content and entity clarity so valuable patient demand finds your clinic across Google, Maps and AI answers.</p>
                <div className="experience-hero__actions">
                  <a className="action action--primary" href="#audit"><span>Run my visibility audit</span><i aria-hidden="true">↘</i></a>
                  <a className="action action--text" href="#results">See the results <span aria-hidden="true">↓</span></a>
                </div>
                <p className="experience-hero__intent data-label">Treatment / condition / location / practitioner / urgency</p>
              </div>

              <VisibilityAudit />
            </div>

            <div className="experience-hero__proof" aria-label="Selected verified results">
              <div><strong>3,900</strong><span>ranking keywords</span><small>South City Hospital</small></div>
              <div><strong>8,076</strong><span>Google Business Profile calls</span><small>One month / April</small></div>
              <div><strong>194</strong><span>doctor profiles in Google’s top 10</span><small>79+ at positions 1–3</small></div>
              <p>Verified repository evidence. Context and source stay attached.</p>
            </div>
          </div>
        </section>

        <section className="search-landscape" id="search-landscape" aria-labelledby="landscape-title">
          <div className="container">
            <div className="section-kicker data-label"><span>Before the enquiry</span><span>Discovery model / 01</span></div>
            <div className="search-landscape__intro" data-reveal>
              <h2 id="landscape-title">The commercial decision starts before your reception team hears a word.</h2>
              <div>
                <p>A patient may begin with a symptom, a treatment, a location, a practitioner or a need for reassurance. Each search is a different route into the same decision: which provider feels relevant enough to contact.</p>
                <p>Traffic is useful. Being visible at the moment of choice is better.</p>
              </div>
            </div>
            <DiscoveryField />
          </div>
        </section>

        <section className="results-section" id="results" aria-labelledby="results-title">
          <div className="container">
            <div className="section-kicker data-label"><span>Verified proof</span><span>South City Hospital / 2025–2026</span></div>
            <div className="results-section__intro" data-reveal>
              <div>
                <p className="eyebrow"><span /> Baseline to compounding visibility</p>
                <h2 id="results-title">Clinical expertise existed. Search visibility had to catch up.</h2>
              </div>
              <p>KaiRank built a connected search system across technical foundations, services and individual doctor profiles. The result was not one isolated keyword win, but a measurable expansion in how the hospital could be discovered.</p>
            </div>
            <SouthCityProgress />

            <div className="results-ledger" data-reveal>
              <div className="results-ledger__primary">
                <span className="data-label">Commercial visibility / April</span>
                <strong>8,076</strong>
                <p>patient calls reported through Google Business Profile in one month.</p>
              </div>
              <dl>
                <div><dt>194</dt><dd>individual doctor profiles in Google’s top 10</dd></div>
                <div><dt>46,000+</dt><dd>monthly organic visits</dd></div>
                <div><dt>67</dt><dd>AI mentions</dd></div>
                <div><dt>88</dt><dd>cited pages</dd></div>
              </dl>
              <p className="results-ledger__source data-label">Sources / SEMrush Domain Overview / Google Search Console / Google Business Profile / June 2026</p>
            </div>
          </div>
        </section>

        <section className="visibility-system" id="system" aria-labelledby="system-title">
          <div className="container">
            <div className="section-kicker data-label"><span>How KaiRank works</span><span>Interconnected system / 07 layers</span></div>
            <div className="visibility-system__intro" data-reveal>
              <h2 id="system-title">Visibility compounds when every signal agrees.</h2>
              <p>Search does not reward a checklist. Technical access, local relevance, content, authority and entity clarity reinforce—or contradict—one another. KaiRank engineers the relationships between them.</p>
            </div>

            <div className="visibility-system__map">
              <div className="visibility-system__core" aria-hidden="true">
                <span className="data-label">KaiRank</span>
                <strong>Strong<br />signal</strong>
                <i />
              </div>
              <ol>
                {systemLayers.map((layer) => (
                  <li key={layer.index} data-reveal>
                    <span className="data-label">{layer.index}</span>
                    <div><h3>{layer.title}</h3><p>{layer.body}</p></div>
                    <small className="data-label">{layer.signal}</small>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="ai-search-section" id="ai-search" aria-labelledby="ai-title">
          <div className="ai-search-section__signal" aria-hidden="true" />
          <div className="container">
            <div className="section-kicker data-label"><span>Search is expanding</span><span>Retrieval / entity / evidence</span></div>
            <div className="ai-search-section__intro" data-reveal>
              <div>
                <p className="eyebrow"><span /> Another discovery layer</p>
                <h2 id="ai-title">Search widened. The foundations did not disappear.</h2>
              </div>
              <div>
                <p>People now encounter providers through Google, Maps, AI Overviews, Gemini and ChatGPT-style search. These systems still need a business they can understand: what it does, where it operates, who provides the expertise and what evidence supports it.</p>
                <p>KaiRank strengthens that underlying clarity. No secret tricks. No guaranteed citation.</p>
              </div>
            </div>

            <div className="entity-map" data-reveal>
              <div className="entity-map__source"><span className="data-label">Business entity</span><strong>Your clinic</strong><small>Identifiable / consistent / evidenced</small></div>
              <div className="entity-map__attributes" aria-label="Entity attributes">
                <span>Services</span><span>Locations</span><span>Expertise</span><span>Evidence</span><span>Authority</span>
              </div>
              <div className="entity-map__route" aria-hidden="true"><i /><i /><i /></div>
              <div className="entity-map__outputs">
                <div><span className="data-label">01</span><strong>Search</strong><small>Relevant result</small></div>
                <div><span className="data-label">02</span><strong>Maps</strong><small>Local discovery</small></div>
                <div><span className="data-label">03</span><strong>AI answers</strong><small>Retrieval potential</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="recovery-case" aria-labelledby="recovery-title">
          <div className="container">
            <div className="section-kicker data-label"><span>Technical proof</span><span>The Recovery Room / Birmingham</span></div>
            <div className="recovery-case__grid">
              <div className="recovery-case__lead" data-reveal>
                <span className="data-label">Organic clicks / 90 days</span>
                <strong>682</strong>
                <h2 id="recovery-title">Growth continued while a hidden indexing failure was being fixed.</h2>
              </div>
              <div className="recovery-case__diagnostic" data-reveal>
                <div className="recovery-case__trace" aria-hidden="true">
                  <span /><span /><i />
                  <small className="data-label">Index path / obstruction found</small>
                </div>
                <p>KaiRank found a page-indexing bug that was quietly hiding parts of the site from Google. It was disclosed when it was discovered—not buried in a final report. That is the difference between publishing content and solving the search system around it.</p>
              </div>
            </div>
            <dl className="recovery-case__metrics" data-reveal>
              <div><dt>22,100</dt><dd>search impressions / 90 days</dd></div>
              <div><dt>5 → 56</dt><dd>organic keywords</dd></div>
              <div><dt>9.1</dt><dd>average position</dd></div>
              <div><dt>81.11%</dt><dd>engagement rate</dd></div>
            </dl>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="container">
            <div className="section-kicker data-label"><span>Services</span><span>Problems solved / not disciplines sold</span></div>
            <div className="services-section__intro" data-reveal>
              <h2 id="services-title">Fix the part of search that is costing the clinic visibility.</h2>
              <p>The work changes with the constraint. The commercial goal stays stable: make the right business easier to discover, understand, trust and contact.</p>
            </div>
            <div className="service-list">
              {services.map((service, index) => (
                <details key={service.title} data-reveal>
                  <summary>
                    <span className="data-label">0{index + 1}</span>
                    <h3>{service.title}</h3>
                    <p>{service.problem}</p>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <div className="service-list__answer"><span className="data-label">KaiRank response</span><p>{service.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-section" id="trust" aria-labelledby="trust-title">
          <div className="container">
            <div className="section-kicker data-label"><span>Why trust KaiRank</span><span>Evidence over theatre</span></div>
            <div className="trust-section__grid">
              <div data-reveal>
                <h2 id="trust-title">The work is technical. The explanation should not hide behind it.</h2>
                <p>KaiRank connects each intervention to what it changes, reports the measures that matter, and names uncertainty where it exists. No invented testimonials. No borrowed logos. No rankings presented without context.</p>
              </div>
              <ol>
                <li data-reveal><span>01</span><div><strong>Real case evidence</strong><p>Results remain attached to the organisation, time period and source.</p></div></li>
                <li data-reveal><span>02</span><div><strong>Technical candour</strong><p>Indexation failures and platform limits are surfaced when found.</p></div></li>
                <li data-reveal><span>03</span><div><strong>Commercial focus</strong><p>Visibility is judged by the valuable searches and actions it can influence.</p></div></li>
                <li data-reveal><span>04</span><div><strong>Search-specific expertise</strong><p>Google, Maps and AI discovery are treated as connected systems—not campaign slogans.</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="final-conversion" aria-labelledby="conversion-title">
          <div className="final-conversion__field" aria-hidden="true"><i /><i /><i /><span /></div>
          <div className="container final-conversion__grid" data-reveal>
            <div>
              <span className="data-label">The next useful question</span>
              <h2 id="conversion-title">Patients are already searching. Which clinic do they meet?</h2>
            </div>
            <div className="final-conversion__action">
              <p>Start with the instant technical signal. Then decide whether the wider search opportunity is worth a closer look.</p>
              <a className="action action--primary" href="#audit"><span>Run my visibility audit</span><i aria-hidden="true">↑</i></a>
              <a className="action action--text" href="mailto:hello@kairank.com?subject=Search%20strategy%20conversation">Talk through my search strategy <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="experience-footer">
        <div className="container">
          <div><Wordmark href="/visual-system/" quiet /><p>Search visibility engineered across Google, Maps and AI discovery.</p></div>
          <nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#results">Results</a><a href="#ai-search">AI Search</a><a href="#audit">Visibility audit</a></nav>
          <div className="experience-footer__meta data-label"><span>hello@kairank.com</span><span>© 2026 KaiRank</span><span>Review prototype / noindex</span></div>
        </div>
      </footer>
    </div>
  );
}
