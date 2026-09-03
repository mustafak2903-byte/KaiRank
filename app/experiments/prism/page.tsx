import type { Metadata } from "next";
import { ExperimentFrame } from "@/components/experiments/experiment-frame";
import { ExperimentKai } from "@/components/experiments/experiment-kai";
import { ExperimentRuntime } from "@/components/experiments/experiment-runtime";
import { PrismField } from "@/components/experiments/prism-field";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "KaiRank | SEO & Search Visibility for Private Clinics",
  description: "Healthcare SEO, technical SEO, local search and AI search optimisation for private clinics. KaiRank helps healthcare businesses become easier to find across Google, Maps and AI search.",
  path: "/experiments/prism/",
  noIndex: true,
  absoluteTitle: true,
});

export default function PrismExperimentPage() {
  return (
    <div className="experiment experiment--prism" id="experiment-prism">
      <ExperimentRuntime scope="experiment-prism" />
      <ExperimentFrame current="prism" />

      <main>
        <section className="prism-hero" id="top" aria-labelledby="prism-title">
          <div className="prism-hero__copy" data-exp-reveal>
            <p className="exp-kicker">Healthcare SEO &amp; search visibility</p>
            <h1 id="prism-title">
              <span>Be the clinic</span>
              <span>they find first.</span>
            </h1>
            <p className="exp-lead">KaiRank helps private clinics grow visibility across Google, Maps and AI search through healthcare SEO, technical SEO, local search and AI search optimisation.</p>
            <div className="exp-actions">
              <a className="exp-action exp-action--primary" href="/visual-system#audit">Check my clinic <span aria-hidden="true">↘</span></a>
              <a className="exp-action exp-action--quiet" href="/visual-system#proof">See verified results <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className="prism-hero__beam" aria-hidden="true" data-kai-avoid>
            <div className="prism-hero__beam-query">
              <span>Patient query / Birmingham</span>
              <strong>deep tissue massage</strong>
            </div>
            <svg viewBox="0 0 520 250" preserveAspectRatio="none">
              <path className="prism-hero__beam-entry" d="M8 125H173" />
              <path className="prism-hero__beam-face" d="m174 77 48 48-48 48-48-48Z" />
              <path className="prism-hero__beam-google" d="M222 125 508 34" />
              <path className="prism-hero__beam-maps" d="M222 125H508" />
              <path className="prism-hero__beam-ai" d="m222 125 286 91" />
              <circle cx="508" cy="34" r="4" /><circle cx="508" cy="125" r="4" /><circle cx="508" cy="216" r="4" />
            </svg>
            <div className="prism-hero__beam-labels"><span>Google</span><span>Maps</span><span>AI search</span></div>
            <b>Clinic discovery / interpreted three ways</b>
          </div>

          <a className="exp-scroll-cue" href="#refraction">
            <span>Trace the signal</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <section className="prism-journey" id="refraction" data-exp-journey aria-labelledby="prism-journey-title">
          <div className="prism-journey__sticky">
            <header className="prism-journey__header" data-exp-reveal>
              <div>
                <span className="exp-kicker">One query / three interpretations</span>
                <h2 id="prism-journey-title">Discovery is not<br />one surface.</h2>
              </div>
              <p>Technical SEO, local SEO and connected evidence help search systems interpret the same private clinic through different signals.</p>
            </header>

            <PrismField />
          </div>
        </section>
      </main>

      <ExperimentKai />
    </div>
  );
}
