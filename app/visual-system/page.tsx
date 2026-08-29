import type { CSSProperties } from "react";
import { SignalMark } from "@/components/brand/signal-mark";
import { Wordmark } from "@/components/brand/wordmark";
import { ProofLedger } from "@/components/data/proof-ledger";
import { RankingTrajectory } from "@/components/data/ranking-trajectory";
import { SiteHeader } from "@/components/layout/site-header";
import { SignalSystem } from "@/components/motion/signal-system";
import { Button, ButtonLink } from "@/components/ui/button";
import { FormSpecimen } from "@/components/ui/form-specimen";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Visual system",
  description: "The KaiRank SIGNAL visual system: typography, colour, interface and data language.",
  path: "/visual-system/",
  noIndex: true,
});

const palette = [
  { name: "Ink", value: "#080A0F" },
  { name: "Graphite", value: "#151922" },
  { name: "Paper", value: "#F2EFE8" },
  { name: "Signal", value: "#718DFF" },
  { name: "Signal bright", value: "#A9B8FF" },
] as const;

export default function VisualSystemPage() {
  return (
    <div className="visual-system">
      <SiteHeader />
      <main>
        <section className="system-hero" aria-labelledby="system-title">
          <div className="system-hero__field" aria-hidden="true">
            <span className="system-hero__line system-hero__line--one" />
            <span className="system-hero__line system-hero__line--two" />
            <span className="system-hero__line system-hero__line--three" />
          </div>
          <div className="container system-hero__container">
            <div className="system-hero__meta data-label">
              <span>Visual system / foundation 01</span>
              <span>Art direction / SIGNAL</span>
              <span>Status / in review</span>
            </div>
            <div className="system-hero__layout">
              <div className="system-hero__copy">
                <p className="eyebrow"><span /> Search visibility, engineered.</p>
                <h1 id="system-title">Make the right signal impossible to miss.</h1>
                <p className="system-hero__lead">
                  KaiRank engineers how organisations are discovered—across search, maps, entities, and AI answers.
                </p>
              </div>
              <div className="system-hero__instrument" aria-label="KaiRank signal mark construction">
                <span className="system-hero__coordinate data-label">KR / SIG—01</span>
                <SignalMark className="system-hero__mark" title="KaiRank signal mark" />
                <span className="system-hero__instrument-label">Query in <i /> visibility out</span>
              </div>
            </div>
            <div className="system-hero__footer">
              <span className="data-label">Scroll to inspect</span>
              <span className="system-hero__rule" />
              <span className="data-label">10 system layers</span>
            </div>
          </div>
        </section>

        <section className="system-section brand-direction" aria-labelledby="brand-heading">
          <div className="container">
            <div className="section-index data-label"><span>01</span><span>Brand direction</span></div>
            <div className="brand-direction__layout">
              <div>
                <p className="eyebrow"><span /> Precision without sterility</p>
                <h2 id="brand-heading">A system for visibility—not a costume for technology.</h2>
              </div>
              <div className="brand-direction__notes">
                <p>
                  The signature is a routed signal: a query enters a measured field, changes direction through deliberate work, and resolves as visible proof.
                </p>
                <dl>
                  <div><dt>Character</dt><dd>Precise / editorial / assured</dd></div>
                  <div><dt>Geometry</dt><dd>Paths / nodes / coordinates</dd></div>
                  <div><dt>Restraint</dt><dd>One accent / earned motion</dd></div>
                </dl>
              </div>
            </div>
            <div className="brand-direction__wordmarks">
              <div className="wordmark-stage wordmark-stage--dark">
                <span className="data-label">Primary / dark field</span>
                <Wordmark />
              </div>
              <div className="wordmark-stage wordmark-stage--light">
                <span className="data-label">Reverse / light field</span>
                <div className="wordmark wordmark--static">
                  <SignalMark className="wordmark__mark" />
                  <span className="wordmark__name">KaiRank</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="system-section typography-section" aria-labelledby="typography-heading">
          <div className="container">
            <div className="section-index data-label"><span>02</span><span>Typography</span></div>
            <div className="typography-section__intro">
              <div>
                <span className="data-label">Display / Instrument Serif</span>
                <h2 id="typography-heading">Authority, with a human edge.</h2>
              </div>
              <p>
                Editorial scale frames the outcome. A disciplined grotesk carries the explanation. Monospace is reserved for the machinery underneath.
              </p>
            </div>
            <div className="type-scale">
              <div className="type-scale__display"><span className="data-label">Display / 168–68</span><p>Visibility</p></div>
              <div className="type-scale__h1"><span className="data-label">H1 / 124–54</span><p>Search systems, made legible.</p></div>
              <div className="type-scale__h2"><span className="data-label">H2 / 92–43</span><p>Earn the answer.</p></div>
              <div className="type-scale__body">
                <span className="data-label">Lead / Manrope</span>
                <p>Technical expertise should feel clear before it feels complicated. We show the path, the intervention, and the result.</p>
              </div>
              <div className="type-scale__data">
                <span className="data-label">Data / IBM Plex Mono</span>
                <p>QUERY: private clinic near me<br />SURFACE: maps / search / AI<br />STATUS: discoverable</p>
              </div>
            </div>
          </div>
        </section>

        <section className="system-section palette-section" aria-labelledby="palette-heading">
          <div className="container">
            <div className="section-index data-label"><span>03</span><span>Palette</span></div>
            <div className="palette-section__heading">
              <h2 id="palette-heading">Low light. High signal.</h2>
              <p>Warm typography prevents the technical system from turning cold. Indigo appears only where attention or movement is meaningful.</p>
            </div>
            <div className="palette-grid">
              {palette.map((colour, index) => (
                <div className="palette-chip" key={colour.name}>
                  <span className="palette-chip__colour" style={{ "--swatch": colour.value } as CSSProperties} />
                  <span className="palette-chip__index data-label">0{index + 1}</span>
                  <strong>{colour.name}</strong>
                  <code>{colour.value}</code>
                </div>
              ))}
            </div>
            <div className="semantic-colours">
              <span><i className="is-success" /> Success / measured gain</span>
              <span><i className="is-warning" /> Warning / needs attention</span>
              <span><i className="is-error" /> Error / blocked pathway</span>
            </div>
          </div>
        </section>

        <section className="system-section controls-section" aria-labelledby="controls-heading">
          <div className="container">
            <div className="section-index data-label"><span>04</span><span>Controls + conversion</span></div>
            <div className="controls-section__layout">
              <div className="controls-section__buttons">
                <div className="controls-section__heading">
                  <h2 id="controls-heading">Quiet until action matters.</h2>
                  <p>Controls use decisive contrast, explicit language, and generous targets. Feedback is physical but never theatrical.</p>
                </div>
                <div className="button-specimens">
                  <div><span className="data-label">Primary</span><Button>Start with an audit</Button></div>
                  <div><span className="data-label">Secondary</span><Button variant="secondary">Read a case study</Button></div>
                  <div><span className="data-label">Quiet action</span><Button variant="quiet">Explore technical SEO →</Button></div>
                  <div><span className="data-label">Disabled</span><Button disabled>Analysis unavailable</Button></div>
                  <div><span className="data-label">Loading</span><Button className="is-loading" aria-busy="true">Reading signals</Button></div>
                </div>
              </div>
              <FormSpecimen />
            </div>
          </div>
        </section>

        <section className="system-section signal-section" aria-labelledby="signal-heading">
          <div className="container">
            <div className="section-index data-label"><span>05</span><span>Animated system</span></div>
            <div id="signal-heading"><SignalSystem /></div>
          </div>
        </section>

        <section className="system-section data-section" aria-labelledby="data-heading">
          <div className="container">
            <div className="section-index data-label"><span>06</span><span>Data visualisation</span></div>
            <div className="data-section__intro">
              <h2 id="data-heading">Evidence is the composition.</h2>
              <p>No fake dashboard chrome. No invented metrics. Each visual starts with a verifiable change and makes the comparison immediate.</p>
            </div>
            <RankingTrajectory />
          </div>
        </section>

        <section className="system-section proof-section" aria-labelledby="proof-heading">
          <div className="container">
            <div className="section-index data-label"><span>07</span><span>Proof treatment</span></div>
            <div className="proof-section__layout">
              <div className="proof-section__headline">
                <span className="data-label">Proof / existing evidence</span>
                <h2 id="proof-heading">Results that can withstand inspection.</h2>
                <p>Large numbers are not decoration. Context, measure, and source remain attached.</p>
              </div>
              <ProofLedger />
            </div>
          </div>
        </section>

        <section className="system-section composition-section" aria-labelledby="composition-heading">
          <div className="container">
            <div className="section-index data-label"><span>08</span><span>Composition modes</span></div>
            <div className="composition-section__intro">
              <h2 id="composition-heading">One system. Different jobs.</h2>
              <p>The same grammar moves between service explanation, editorial thinking, proof, and conversion without repeating a card layout.</p>
            </div>
            <div className="composition-modes">
              <article className="composition-mode composition-mode--service">
                <span className="data-label">Service / pathway</span>
                <div className="mini-path" aria-hidden="true"><i /><i /><i /><i /></div>
                <h3>Technical foundations that search systems can trust.</h3>
                <p>Architecture, crawlability, performance, and entity clarity—resolved in the order that moves visibility.</p>
                <ButtonLink href="/technical-seo/" variant="quiet">Explore technical SEO →</ButtonLink>
              </article>
              <article className="composition-mode composition-mode--editorial">
                <span className="data-label">Editorial / insight</span>
                <blockquote>“Being indexed is not the same as being understood.”</blockquote>
                <p>A field note on the signals that make a business retrievable in AI answers.</p>
                <span className="data-label">Reading time / 06 min</span>
              </article>
              <article className="composition-mode composition-mode--conversion">
                <span className="data-label">Conversion / decisive</span>
                <SignalMark className="composition-mode__mark" />
                <h3>Find out where your signal disappears.</h3>
                <ButtonLink href="/contact/">Start with an audit</ButtonLink>
              </article>
            </div>
          </div>
        </section>

        <section className="system-section responsive-section" aria-labelledby="responsive-heading">
          <div className="container">
            <div className="section-index data-label"><span>09</span><span>Responsive behaviour</span></div>
            <div className="responsive-section__layout">
              <div>
                <span className="data-label">Mobile / first-class system</span>
                <h2 id="responsive-heading">The signal adapts. It does not disappear.</h2>
              </div>
              <ol className="responsive-principles">
                <li><span>360–430</span><p>Single-column rhythm, large type under control, and native vertical data reading.</p></li>
                <li><span>Touch</span><p>Targets remain at least 48px; important information never depends on hover.</p></li>
                <li><span>Motion</span><p>Animations resolve to meaningful static end states when reduced motion is preferred.</p></li>
                <li><span>Navigation</span><p>A real modal-like menu preserves context, focus visibility, and an obvious close state.</p></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="system-conclusion" aria-labelledby="conclusion-heading">
          <div className="container system-conclusion__layout">
            <div>
              <span className="data-label">10 / System conclusion</span>
              <h2 id="conclusion-heading">Search visibility,<br /><em>engineered.</em></h2>
            </div>
            <div className="system-conclusion__action">
              <p>This is the foundation. The homepage and service pages remain intentionally unbuilt until the visual language is approved.</p>
              <ButtonLink href="mailto:hello@kairank.com">Review the direction</ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <footer className="system-footer">
        <div className="container">
          <Wordmark quiet />
          <span className="data-label">Visual system / foundation milestone</span>
          <span className="data-label">© 2026 KaiRank</span>
        </div>
      </footer>
    </div>
  );
}
