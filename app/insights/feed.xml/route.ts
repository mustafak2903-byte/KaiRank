import { insights } from "@/lib/insights-content";
import { siteConfig } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = [...insights]
    .sort((a, b) => b.published.localeCompare(a.published))
    .map((insight) => {
      const url = `${siteConfig.url}/insights/${insight.slug}`;
      return `<item><title>${escapeXml(`${insight.title} ${insight.accent}`)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(insight.description)}</description><pubDate>${new Date(`${insight.published}T12:00:00Z`).toUTCString()}</pubDate><category>${escapeXml(insight.category)}</category></item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>KaiRank Healthcare SEO Insights</title><link>${siteConfig.url}/insights</link><description>${escapeXml("Evidence-led healthcare SEO guidance for private clinics.")}</description><language>en-gb</language><atom:link href="${siteConfig.url}/insights/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
