import Link from "next/link";
import { SearchSignalField } from "@/components/experience/search-signal-field";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Free search visibility diagnostic for clinics",
  description: "Check the public technical and search signals helping or hindering a private clinic across Google, Maps and AI search.",
  path: "/search-visibility-diagnostic",
});

export default function SearchVisibilityDiagnosticPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/search-visibility-diagnostic#page`,
    name: "Search Visibility Diagnostic for private clinics",
    description: "A public technical and search-context diagnostic for private clinic websites.",
    url: `${siteConfig.url}/search-visibility-diagnostic`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@type": "Thing", name: "Private clinic search visibility" },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="diagnostic-hero" aria-labelledby="diagnostic-page-title">
        <div className="container diagnostic-hero__inner">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search Visibility Diagnostic", href: "/search-visibility-diagnostic" }]} />
          <div className="diagnostic-hero__copy">
            <span className="data-label">Public evidence · no account access</span>
            <h1 id="diagnostic-page-title">See what search systems encounter<br /><em>before a patient finds you.</em></h1>
            <p>Start with the public technical surface. Then add one clinic location and priority treatment to frame the competitive search landscape that matters commercially.</p>
          </div>
          <ol className="diagnostic-hero__steps" aria-label="Diagnostic stages">
            <li><span className="data-label">01 / Technical surface</span><strong>Access, selection and mobile signals</strong></li>
            <li><span className="data-label">02 / Search context</span><strong>One location and priority treatment</strong></li>
            <li><span className="data-label">03 / Deeper review</span><strong>Requested only when you choose</strong></li>
          </ol>
        </div>
      </section>

      <div className="v6-diagnostic diagnostic-page-tool" aria-label="Clinic search visibility diagnostic" data-kai-avoid>
        <SearchSignalField />
        <div className="container">
          <div className="v3-section-index data-label"><span>Search visibility diagnostic</span><span>Start with public evidence</span></div>
          <VisibilityAudit />
        </div>
      </div>

      <section className="diagnostic-boundaries" aria-labelledby="diagnostic-boundaries-title">
        <div className="container diagnostic-boundaries__grid">
          <div><span className="data-label">Read the result accurately</span><h2 id="diagnostic-boundaries-title">A diagnostic—not a ranking promise.</h2></div>
          <div><p>The first check reads public response, HTTPS, page fundamentals, indexation signals, structured data and mobile setup. Optional PageSpeed data adds a performance layer when Google makes it available.</p><p>It does not access analytics, log in to the website, measure live rankings or turn a technical score into a forecast. A deeper review is sent only after you add context and explicitly request it.</p><Link href="/privacy">How KaiRank handles diagnostic data <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </MarketingShell>
  );
}
