import Link from "next/link";
import { SearchSignalField } from "@/components/experience/search-signal-field";
import { VisibilityAudit } from "@/components/experience/visibility-audit";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { DiagnosticSignalInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Free website health check for private clinics",
  description: "Check the public technical signals helping or hindering a private clinic website, without sharing account access.",
  path: "/search-visibility-diagnostic",
});

export default function SearchVisibilityDiagnosticPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/search-visibility-diagnostic#page`,
    name: "Free website health check for private clinics",
    description: "A public technical health check for private clinic websites.",
    url: `${siteConfig.url}/search-visibility-diagnostic`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@type": "Thing", name: "Private clinic search visibility" },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="diagnostic-hero" aria-labelledby="diagnostic-page-title">
        <div className="container diagnostic-hero__inner observatory-hero__grid">
          <div className="diagnostic-hero__copy observatory-hero__copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Free website health check", href: "/search-visibility-diagnostic" }]} />
            <span className="data-label">Public evidence · no account access</span>
            <h1 id="diagnostic-page-title">Check the public health of<br /><em>your clinic website.</em></h1>
            <p>Review the technical signals search systems can see—without sharing analytics, passwords or website access.</p>
            <a className="v3-action v3-action--solid" href="#diagnostic">Check my website <span aria-hidden="true">↓</span></a>
          </div>
          <DiagnosticSignalInstrument />
        </div>
      </section>

      <div className="v6-diagnostic diagnostic-page-tool" id="diagnostic" aria-label="Clinic search visibility diagnostic" data-kai-avoid>
        <SearchSignalField />
        <div className="container">
          <div className="v3-section-index data-label"><span>Free website health check</span><span>Public evidence only</span></div>
          <VisibilityAudit />
        </div>
      </div>

      <section className="diagnostic-boundaries" aria-labelledby="diagnostic-boundaries-title">
        <div className="container diagnostic-boundaries__grid">
          <div><span className="data-label">Read the result accurately</span><h2 id="diagnostic-boundaries-title">A useful health check—not a ranking promise.</h2></div>
          <div><p>The check reads public response, HTTPS, page fundamentals, crawl directives, structured-data syntax and the mobile viewport declaration. Optional Google PageSpeed lab data adds a separate performance layer when available.</p><p>It is not Google Search Console data. It does not access analytics, log in to the website, measure live rankings, confirm indexation or turn technical checks into a forecast. A clinic visibility review is the next step if you want to connect public evidence to treatments, locations and competition.</p><Link href="/privacy">How KaiRank handles diagnostic data <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </MarketingShell>
  );
}
