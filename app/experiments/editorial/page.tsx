import type { Metadata } from "next";
import { ExperimentFrame } from "@/components/experiments/experiment-frame";
import { ExperimentKai } from "@/components/experiments/experiment-kai";
import { ExperimentRuntime } from "@/components/experiments/experiment-runtime";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "KaiRank | SEO & Search Visibility for Private Clinics",
  description: "Healthcare SEO, technical SEO, local search and AI search optimisation for private clinics. KaiRank helps healthcare businesses become easier to find across Google, Maps and AI search.",
  path: "/experiments/editorial/",
  noIndex: true,
  absoluteTitle: true,
});

export default function EditorialExperimentPage() {
  return (
    <div className="experiment experiment--editorial" id="experiment-editorial">
      <ExperimentRuntime scope="experiment-editorial" />
      <ExperimentFrame current="editorial" />

      <main>
        <section className="editorial-hero" id="top" aria-labelledby="editorial-title">
          <div className="editorial-hero__edition" aria-hidden="true">
            <span>Vol. 01</span><span>Private clinic visibility</span><span>Search / Birmingham</span>
          </div>

          <div className="editorial-hero__copy" data-exp-reveal>
            <p className="exp-kicker">Healthcare SEO &amp; search visibility</p>
            <h1 id="editorial-title">
              <span>Be the clinic</span>
              <span>they find first.</span>
            </h1>
          </div>

          <aside className="editorial-hero__margin" aria-label="Patient search example" data-exp-reveal>
            <span>Patient search / 08:42</span>
            <p>“deep tissue massage<br />Birmingham”</p>
            <small>Intent enters the search field before it enters your clinic.</small>
          </aside>

          <div className="editorial-hero__search-axis" aria-hidden="true">
            <span>Patient query</span><i /><span>Result-entry threshold</span>
          </div>

          <div className="editorial-hero__support" data-exp-reveal data-kai-avoid>
            <p>KaiRank helps private clinics grow visibility across Google, Maps and AI search through healthcare SEO, technical SEO, local search and AI search optimisation.</p>
            <div className="exp-actions">
              <a className="exp-action exp-action--primary" href="/visual-system#audit">Check my clinic <span aria-hidden="true">↘</span></a>
              <a className="exp-action exp-action--quiet" href="/visual-system#proof">See verified results <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <a className="editorial-folio" href="#search-story"><span>Turn the page</span><strong>02</strong></a>
        </section>

        <section className="editorial-story" id="search-story" data-exp-journey aria-labelledby="editorial-story-title">
          <div className="editorial-story__sticky">
            <div className="editorial-story__rail" aria-hidden="true"><span>Patient search</span><i /><span>Shortlist</span></div>

            <div className="editorial-story__heading">
              <span className="exp-kicker">Search story / 01</span>
              <h2 id="editorial-story-title">Visibility gets you considered.<br /><em>Trust helps you get chosen.</em></h2>
              <p>Private-clinic search visibility is the route between patient intent and a credible option—across organic results, local discovery and AI search.</p>
            </div>

            <div className="editorial-results" aria-label="Conceptual patient search sequence" data-kai-avoid>
              <article className="editorial-result editorial-result--query">
                <span>Patient search</span><strong>deep tissue massage Birmingham</strong><small>01 / intent</small>
              </article>
              <article className="editorial-result editorial-result--one">
                <span>Relevant clinic</span><strong>Treatment relevance + local evidence</strong><small>02 / surfaced</small>
              </article>
              <article className="editorial-result editorial-result--two">
                <span>Nearby option</span><strong>Location + service clarity</strong><small>03 / surfaced</small>
              </article>
              <article className="editorial-result editorial-result--three">
                <span>Directory</span><strong>Aggregated alternatives</strong><small>04 / surfaced</small>
              </article>
              <article className="editorial-result editorial-result--absent">
                <span>Your clinic</span><strong>Not present in this conceptual shortlist</strong><small>05 / absent</small>
              </article>
            </div>

            <aside className="editorial-proof" aria-label="Verified case-study evidence" data-kai-avoid>
              <span>Verified case-study evidence</span>
              <dl>
                <div><dt>+808%</dt><dd>Search impressions</dd></div>
                <div><dt>+354%</dt><dd>Organic clicks</dd></div>
                <div><dt>#1</dt><dd>Deep tissue massage Birmingham</dd></div>
              </dl>
              <small>Recovery Room case study · evidence available in V6</small>
            </aside>
          </div>
        </section>
      </main>

      <ExperimentKai />
    </div>
  );
}
