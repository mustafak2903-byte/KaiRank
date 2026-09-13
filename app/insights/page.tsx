import Link from "next/link";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { InsightSignalInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { insights } from "@/lib/insights-content";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

function topicId(topic: string) {
  return `topic-${topic.toLowerCase().replaceAll(" ", "-")}`;
}

export const metadata = {
  ...createMetadata({
    title: "Healthcare SEO Blog & Search Insights",
    description: "Evidence-led healthcare SEO insights on technical audits, local search, medical content and AI visibility for private clinics.",
    path: "/insights",
  }),
  alternates: {
    canonical: "/insights",
    types: { "application/rss+xml": "/insights/feed.xml" },
  },
};

export default function InsightsPage() {
  const latestInsights = [...insights].sort((a, b) => b.published.localeCompare(a.published));
  const [featured, ...remaining] = latestInsights;
  const topics = [...new Set(insights.map((insight) => insight.category))];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteConfig.url}/insights#page`,
    name: "KaiRank healthcare SEO insights",
    description: "Evidence-led healthcare SEO articles for private clinics and medical practices.",
    url: `${siteConfig.url}/insights`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    publisher: { "@id": `${siteConfig.url}/#organisation` },
    blogPost: latestInsights.map((insight) => ({
      "@type": "BlogPosting",
      headline: `${insight.title} ${insight.accent}`,
      url: `${siteConfig.url}/insights/${insight.slug}`,
      datePublished: insight.published,
      dateModified: insight.updated,
    })),
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <section className="marketing-index-hero insights-index-hero observatory-hero" aria-labelledby="insights-title">
        <div className="container observatory-hero__grid">
          <div className="observatory-hero__copy">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }]} />
            <span className="data-label">Healthcare SEO blog · evidence before volume</span>
            <h1 id="insights-title">Search intelligence for<br /><em>high-stakes decisions.</em></h1>
            <p>Evidence-led guidance for clinic owners and marketing teams deciding what to fix across technical SEO, local search, healthcare content and AI discovery.</p>
            <a className="observatory-hero__jump" href="#field-notes">Explore the latest insight <span aria-hidden="true">↓</span></a>
          </div>
          <InsightSignalInstrument insights={latestInsights.slice(0, 4)} />
        </div>
      </section>
      <nav className="insights-topics" aria-label="Healthcare SEO blog topics">
        <div className="container"><span className="data-label">Explore by search constraint</span>{topics.map((topic) => <a href={`#${topicId(topic)}`} key={topic}>{topic}</a>)}</div>
      </nav>
      <section className="insights-index" id="field-notes" aria-label="KaiRank healthcare SEO blog">
        <div className="container">
          <article className="insights-featured" id={topicId(featured.category)} data-reveal>
            <Link href={`/insights/${featured.slug}`}>
              <div className="insights-featured__meta data-label"><span>Latest field note</span><span>{featured.category}</span><span>{featured.readTime}</span></div>
              <div className="insights-featured__body"><span className="insights-featured__signal" aria-hidden="true"><i /><b /></span><div><h2>{featured.title}<br /><em>{featured.accent}</em></h2><p>{featured.description}</p><strong>Read the analysis <i aria-hidden="true">↗</i></strong></div></div>
            </Link>
          </article>
          <div className="insights-index__register"><span className="data-label">Research register</span><span className="data-label">{remaining.length} further field notes</span></div>
          {remaining.map((insight, index) => (
            <article id={latestInsights.findIndex((item) => item.category === insight.category) === index + 1 ? topicId(insight.category) : undefined} key={insight.slug} data-reveal>
              <Link href={`/insights/${insight.slug}`}>
                <div className="insights-index__meta data-label"><span>{String(index + 2).padStart(2, "0")}</span><span>{insight.category}</span><span>{insight.readTime}</span></div>
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
