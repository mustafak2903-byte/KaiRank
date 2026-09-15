import Link from "next/link";
import { BookingTrigger } from "@/components/experience/booking-trigger";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { MarketingShell } from "@/components/marketing/marketing-shell";
import type { InsightDefinition } from "@/lib/insights-content";
import { insights } from "@/lib/insights-content";
import { siteConfig } from "@/lib/site";
import { founderReference, organisationReference } from "@/lib/structured-data";

function displayDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00Z`));
}

export function InsightPage({ insight }: { insight: InsightDefinition }) {
  const url = `${siteConfig.url}/insights/${insight.slug}`;
  const related = insights.filter((item) => item.slug !== insight.slug).slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: `${insight.title} ${insight.accent}`,
    description: insight.description,
    url,
    datePublished: insight.published,
    dateModified: insight.updated,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: founderReference,
    publisher: organisationReference,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: insight.category,
    keywords: [insight.primaryKeyword, ...insight.supportingKeywords].join(", "),
    inLanguage: "en-GB",
    image: `${siteConfig.url}/og/insight/${insight.slug}`,
  };

  return (
    <MarketingShell structuredData={structuredData}>
      <article className="insight-article">
        <header className="insight-hero">
          <div className="insight-hero__grid" aria-hidden="true" />
          <div className="container insight-hero__inner insight-hero__layout">
            <div className="insight-hero__copy">
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: insight.category, href: `/insights/${insight.slug}` }]} />
              <div className="insight-hero__meta data-label"><span>{insight.category}</span><span>{displayDate(insight.published)}</span><span>{insight.readTime}</span></div>
              <h1>{insight.title}<br /><em>{insight.accent}</em></h1>
              <p>{insight.description}</p>
            </div>
            <aside className="insight-hero__register" aria-label="Article outline">
              <header><span className="data-label">Field note register</span><span>{insight.sections.length} observations</span></header>
              <p>{insight.takeaway}</p>
              <nav aria-label="On this page">{insight.sections.map((section, index) => <a href={`#insight-section-${index + 1}`} key={section.title}><span>0{index + 1}</span>{section.title}<i aria-hidden="true">↓</i></a>)}</nav>
            </aside>
          </div>
        </header>

        <div className="insight-layout container">
          <aside className="insight-aside">
            <span className="data-label">Field note</span>
            <p>{insight.takeaway}</p>
            <div><span className="data-label">Written by</span><Link href="/about"><strong>{siteConfig.founder.name}</strong></Link><small>{siteConfig.founder.role}</small></div>
          </aside>
          <div className="insight-body">
            {insight.sections.map((section, index) => (
              <section key={section.title} aria-labelledby={`insight-section-${index + 1}`}>
                <span className="data-label">0{index + 1}</span>
                <h2 id={`insight-section-${index + 1}`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points ? <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
              </section>
            ))}

            <section className="insight-sources" aria-labelledby="insight-sources-title">
              <span className="data-label">Primary references</span>
              <h2 id="insight-sources-title">Read the source guidance.</h2>
              <ul>{insight.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}</ul>
            </section>
          </div>
        </div>

        <section className="insight-next" aria-labelledby="insight-next-title">
          <div className="container">
            <div className="marketing-section__index data-label"><span>Continue the search model</span><span>Related field notes</span></div>
            <h2 id="insight-next-title">Build the connected picture.</h2>
            <div>{related.map((item) => <Link href={`/insights/${item.slug}`} key={item.slug}><span className="data-label">{item.category}</span><strong>{item.title} {item.accent}</strong><i aria-hidden="true">↗</i></Link>)}</div>
          </div>
        </section>

        <section className="marketing-conversion" aria-labelledby="insight-conversion-title" data-kai-avoid>
          <div className="container marketing-conversion__inner">
            <span className="data-label">Connect the principle to your clinic</span>
            <h2 id="insight-conversion-title">Find the constraint behind the search result.</h2>
            <p>Explore the relevant {insight.serviceLabel.toLowerCase()}, or start with a public diagnostic of your clinic website.</p>
            <div className="v3-actions">
              <Link className="v3-action v3-action--solid" href={`/${insight.serviceSlug}`}>Explore {insight.serviceLabel} <span aria-hidden="true">↗</span></Link>
              <BookingTrigger className="v3-action v3-action--text" label="Talk through my search strategy" source={`${insight.slug}-final`} />
            </div>
          </div>
        </section>
      </article>
    </MarketingShell>
  );
}
