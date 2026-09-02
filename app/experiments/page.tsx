import type { Metadata } from "next";
import Link from "next/link";
import { ExperimentFrame } from "@/components/experiments/experiment-frame";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Art direction lab",
  description: "Internal KaiRank art-direction experiments for search visibility.",
  path: "/experiments/",
  noIndex: true,
});

const studies = [
  {
    code: "A",
    slug: "atlas",
    title: "Visibility Atlas",
    description: "Search visibility becomes a living territory of patient demand, evidence and discovery paths.",
    note: "Layered SVG · native scroll · pointer proximity",
  },
  {
    code: "B",
    slug: "editorial",
    title: "Editorial Search Engine",
    description: "A patient search unfolds as a sparse editorial story about consideration, absence and proof.",
    note: "Typography-led · CSS choreography · warm-paper chapter",
  },
  {
    code: "C",
    slug: "prism",
    title: "Search Prism",
    description: "One patient query splits across Google, Maps and AI before converging on clinic discovery.",
    note: "Precision SVG · semantic paths · scoped pointer response",
  },
] as const;

export default function ExperimentsIndexPage() {
  return (
    <div className="experiment-index">
      <ExperimentFrame />
      <main>
        <header className="experiment-index__intro">
          <span className="exp-kicker">KaiRank / Creative breakthrough</span>
          <h1>Three ways to make<br /><em>search visible.</em></h1>
          <p>Isolated hero and first-scroll studies. The V6 website remains the functional baseline while one ownable visual language is selected.</p>
        </header>

        <ol className="experiment-index__list">
          {studies.map((study) => (
            <li key={study.slug}>
              <Link href={`/experiments/${study.slug}`}>
                <span className="experiment-index__code">{study.code}</span>
                <span className="experiment-index__study">
                  <small>Study {study.code}</small>
                  <strong>{study.title}</strong>
                  <span>{study.description}</span>
                </span>
                <span className="experiment-index__note">{study.note}</span>
                <span className="experiment-index__arrow" aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ol>

        <footer className="experiment-index__footer">
          <p>Internal review route · noindex</p>
          <Link href="/visual-system">Open V6 baseline <span aria-hidden="true">↗</span></Link>
        </footer>
      </main>
    </div>
  );
}
