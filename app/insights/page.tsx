import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { insights } from "@/lib/insights-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Healthcare SEO insights and field notes",
  description: "Evidence-led guidance on technical SEO, local visibility and AI search for private clinics and healthcare organisations.",
  path: "/insights",
});

export default function InsightsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/insights#page`,
    name: "KaiRank insights",
    description: "Field notes on healthcare search visibility.",
    url: `${siteConfig.url}/insights`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-index-hero insights-index-hero" aria-labelledby="insights-title">
        <div className="container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }]} />
          <span className="data-label">Search field notes · evidence before volume</span>
          <h1 id="insights-title">Useful thinking for<br /><em>high-consideration search.</em></h1>
          <p>Frameworks for clinic teams that need to understand what is changing, what can be controlled and which search work deserves priority.</p>
        </div>
      </section>
      <section className="insights-index" aria-label="KaiRank search insights">
        <div className="container">
          {insights.map((insight, index) => (
            <article key={insight.slug} data-reveal>
              <Link href={`/insights/${insight.slug}`}>
                <div className="insights-index__meta data-label"><span>0{index + 1}</span><span>{insight.category}</span><span>{insight.readTime}</span></div>
                <div className="insights-index__body"><h2>{insight.title}<br /><em>{insight.accent}</em></h2><p>{insight.description}</p></div>
                <span className="insights-index__link">Read the field note <i aria-hidden="true">↗</i></span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </MarketingShell>
  );
}
