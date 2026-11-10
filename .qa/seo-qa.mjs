import fs from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3131";
const canonicalOrigin = process.env.QA_CANONICAL_ORIGIN || "https://kai-rank.vercel.app";
const decode = (value = "") => value
  .replace(/<[^>]*>/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'")
  .replace(/\s+/g, " ")
  .trim();
const attr = (html, selector) => html.match(selector)?.[1] ?? "";

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
const sitemapText = await sitemapResponse.text();
const routes = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const pages = [];

for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  const html = await response.text();
  const headings = [...html.matchAll(/<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((match) => ({ level: Number(match[1][1]), text: decode(match[2]) }));
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);
  const jsonLd = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = parsed["@graph"] ?? [parsed];
      return { valid: true, types: nodes.flatMap((node) => Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]]).filter(Boolean) };
    } catch (error) {
      return { valid: false, error: error instanceof Error ? error.message : "parse error", types: [] };
    }
  });
  const canonical = attr(html, /<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || attr(html, /<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const title = decode(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const description = attr(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
    || attr(html, /<meta\b[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const ogUrl = attr(html, /<meta\b[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i);
  const ogImage = attr(html, /<meta\b[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  const twitterImage = attr(html, /<meta\b[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i);
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const headingJumps = headings.slice(1).filter((heading, index) => heading.level - headings[index].level > 1);
  pages.push({
    route,
    status: response.status,
    title,
    description,
    canonical,
    ogUrl,
    ogImage,
    twitterImage,
    headings,
    h1Count: headings.filter((heading) => heading.level === 1).length,
    headingJumps,
    schema: jsonLd,
    missingAlt: images.filter((image) => !/\balt=["'][^"']*["']/i.test(image)).length,
    internalLinks: [...new Set(links.filter((href) => href.startsWith("/")).map((href) => href.split("#")[0] || "/"))],
    hasLegacyDomain: /https:\/\/(?:www\.)?kairank\.com/i.test(html),
    hasMain: /<main\b/i.test(html),
  });
}

const titleDuplicates = Object.entries(Object.groupBy(pages, (page) => page.title)).filter(([, list]) => list.length > 1 && list[0].title);
const descriptionDuplicates = Object.entries(Object.groupBy(pages, (page) => page.description)).filter(([, list]) => list.length > 1 && list[0].description);
const linkedRoutes = new Set(pages.flatMap((page) => page.internalLinks));
const orphans = routes.filter((route) => route !== "/" && !linkedRoutes.has(route));
const brokenLinks = [];
for (const href of linkedRoutes) {
  const response = await fetch(`${base}${href}`, { redirect: "manual" });
  if (response.status >= 400) brokenLinks.push({ href, status: response.status });
}

const robotsResponse = await fetch(`${base}/robots.txt`);
const robotsText = await robotsResponse.text();
const notFoundResponse = await fetch(`${base}/this-route-must-not-exist`);
const report = {
  generatedAt: new Date().toISOString(),
  base,
  canonicalOrigin,
  routes,
  pages,
  failures: {
    non200: pages.filter((page) => page.status !== 200).map((page) => ({ route: page.route, status: page.status })),
    badCanonical: pages.filter((page) => page.canonical !== `${canonicalOrigin}${page.route === "/" ? "" : page.route}`).map((page) => ({ route: page.route, canonical: page.canonical })),
    h1: pages.filter((page) => page.h1Count !== 1).map((page) => ({ route: page.route, h1Count: page.h1Count })),
    headings: pages.filter((page) => page.headingJumps.length).map((page) => ({ route: page.route, jumps: page.headingJumps })),
    missingMetadata: pages.filter((page) => !page.title || !page.description || !page.ogUrl || !page.ogImage || !page.twitterImage).map((page) => page.route),
    schema: pages.filter((page) => page.schema.some((item) => !item.valid)).map((page) => page.route),
    missingAlt: pages.filter((page) => page.missingAlt).map((page) => ({ route: page.route, count: page.missingAlt })),
    legacyDomain: pages.filter((page) => page.hasLegacyDomain).map((page) => page.route),
    missingMain: pages.filter((page) => !page.hasMain).map((page) => page.route),
    titleDuplicates,
    descriptionDuplicates,
    brokenLinks,
    orphans,
  },
  robots: { status: robotsResponse.status, text: robotsText },
  sitemap: { status: sitemapResponse.status, count: routes.length },
  notFoundStatus: notFoundResponse.status,
};

await fs.mkdir("/private/tmp/kairank-surgical-qa", { recursive: true });
await fs.writeFile("/private/tmp/kairank-surgical-qa/seo-report.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify({
  pageCount: pages.length,
  failures: report.failures,
  robotsStatus: report.robots.status,
  sitemapStatus: report.sitemap.status,
  notFoundStatus: report.notFoundStatus,
}, null, 2));
