import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { InsightSignalInstrument } from "@/components/marketing/hero-instruments";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import { insights } from "@/lib/insights-content";
import { services } from "@/lib/marketing-content";
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
      <section className="insights-pathways" aria-labelledby="insights-pathways-title">
        <div className="container">
          <div className="marketing-section__index data-label"><span>From research to action</span><span>Choose the constraint</span></div>
          <div className="insights-pathways__grid">
            <div><h2 id="insights-pathways-title">Take the next useful route.</h2><p>Move from an evidence-led article to the service layer that owns the problem.</p></div>
            <ol>
              {services.map((service, index) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`}>
                    <span className="data-label">0{index + 1}</span>
                    <strong>{service.navLabel}</strong>
                    <small>{service.diagnosticQuestion}</small>
                    <i aria-hidden="true">↗</i>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
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
      <section className="marketing-conversion" aria-labelledby="insights-conversion-title" data-kai-avoid>
        <div className="container marketing-conversion__inner"><span className="data-label">Turn insight into a decision</span><h2 id="insights-conversion-title">Apply the evidence to one clinic search constraint.</h2><p>Explore the service system, or bring one priority treatment and location to a focused review.</p><div className="v3-actions"><Link className="v3-action v3-action--solid" href="/services">Explore healthcare SEO services <span aria-hidden="true">↗</span></Link><BookingTrigger className="v3-action v3-action--text" label="Book a clinic visibility review" source="insights-final" /></div></div>
      </section>
    </MarketingShell>
  );
}
