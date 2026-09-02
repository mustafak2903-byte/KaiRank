import type { Metadata } from "next";
import { AtlasField } from "@/components/experiments/atlas-field";
import { ExperimentFrame } from "@/components/experiments/experiment-frame";
import { ExperimentKai } from "@/components/experiments/experiment-kai";
import { ExperimentRuntime } from "@/components/experiments/experiment-runtime";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "KaiRank | SEO & Search Visibility for Private Clinics",
  description: "Healthcare SEO, technical SEO, local search and AI search optimisation for private clinics. KaiRank helps healthcare businesses become easier to find across Google, Maps and AI search.",
  path: "/experiments/atlas/",
  noIndex: true,
  absoluteTitle: true,
});

export default function AtlasExperimentPage() {
  return (
    <div className="experiment experiment--atlas" id="experiment-atlas">
      <ExperimentRuntime scope="experiment-atlas" />
      <ExperimentFrame current="atlas" />

      <svg className="atlas-spine" viewBox="0 0 100 235" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M75 29C83 55 70 76 57 91s-2 40-17 61-25 34-31 64" />
      </svg>

      <main>
        <section className="atlas-hero" aria-labelledby="atlas-title" id="top">
          <div className="atlas-hero__copy" data-exp-reveal>
            <p className="exp-kicker">Healthcare SEO &amp; search visibility</p>
            <h1 id="atlas-title">
              <span>Be the clinic</span>
              <span>they find first.</span>
            </h1>
            <p className="exp-lead">KaiRank helps private clinics grow visibility across Google, Maps and AI search through healthcare SEO, technical SEO, local search and AI search optimisation.</p>
            <div className="exp-actions">
              <a className="exp-action exp-action--primary" href="/visual-system#audit">Check my clinic <span aria-hidden="true">↘</span></a>
              <a className="exp-action exp-action--quiet" href="/visual-system#proof">See verified results <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className="atlas-hero__visual" data-exp-reveal>
            <AtlasField />
          </div>

          <a className="exp-scroll-cue" href="#shortlist">
            <span>Follow the query</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="atlas-journey" id="shortlist" data-exp-journey aria-labelledby="atlas-shortlist-title">
          <div className="atlas-journey__sticky">
            <div className="atlas-query-carrier" aria-hidden="true">
              <span>Patient query / continuing</span>
              <strong>deep tissue massage Birmingham</strong>
            </div>

            <div className="atlas-journey__copy" data-exp-reveal>
              <span className="exp-kicker">The first decision happens in search</span>
              <h2 id="atlas-shortlist-title">You can’t be chosen<br />if you never enter<br /><em>the shortlist.</em></h2>
              <p>SEO for healthcare begins before an enquiry: technical SEO creates access, local SEO clarifies place, and connected evidence helps private clinics surface across Google, Maps and AI search.</p>
            </div>

            <div className="atlas-shortlist" aria-label="Conceptual search shortlist">
              <span className="atlas-shortlist__label">Discovery territory / conceptual</span>
              <svg viewBox="0 0 700 470" aria-hidden="true">
                <path className="atlas-shortlist__contour" d="M-20 258C86 161 160 215 239 125s190-81 242 10 169 87 236 8M-10 348c112-90 213-16 281-108s199-94 256 1 117 60 192 25" />
                <path className="atlas-shortlist__route" pathLength="1" d="M42 404C127 357 150 249 253 229s133-102 222-77 122 81 184 34" />
              </svg>
              <ol>
                <li className="atlas-option atlas-option--one"><i /><span>Relevant clinic</span><strong>Surfaced</strong></li>
                <li className="atlas-option atlas-option--two"><i /><span>Nearby clinic</span><strong>Surfaced</strong></li>
                <li className="atlas-option atlas-option--missing"><i /><span>Your clinic</span><strong>Not surfaced</strong></li>
              </ol>
              <p>No live ranking or Maps position implied.</p>
            </div>
          </div>
        </section>
      </main>

      <ExperimentKai />
    </div>
  );
}
