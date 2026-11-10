import fs from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3133";

const assignments = {
  "/healthcare-seo": {
    primary: "healthcare seo agency",
    verified: [
      "healthcare seo services",
      "healthcare seo",
      "seo for healthcare",
      "medical seo agency",
      "seo services for healthcare",
      "medical seo services",
      "clinic seo",
    ],
  },
  "/local-seo": {
    primary: "local seo for healthcare",
    verified: ["healthcare local seo"],
  },
};

const expectedJourneys = {
  "/": ["/healthcare-seo", "/local-seo", "/services", "/case-studies/the-recovery-room", "/search-visibility-diagnostic"],
  "/services": ["/healthcare-seo", "/technical-seo", "/local-seo", "/ai-search-optimisation", "/case-studies"],
  "/healthcare-seo": ["/services", "/case-studies/the-recovery-room", "/insights", "/search-visibility-diagnostic"],
  "/technical-seo": ["/services", "/case-studies/the-recovery-room", "/insights", "/search-visibility-diagnostic"],
  "/local-seo": ["/services", "/case-studies/the-recovery-room", "/insights", "/search-visibility-diagnostic"],
  "/ai-search-optimisation": ["/services", "/case-studies/south-city-hospital", "/insights", "/search-visibility-diagnostic"],
  "/case-studies": ["/case-studies/the-recovery-room", "/case-studies/south-city-hospital", "/services"],
  "/insights": ["/healthcare-seo", "/technical-seo", "/local-seo", "/ai-search-optimisation"],
};

function decode(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function visibleText(value = "") {
  return decode(value
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "));
}

function linksFrom(value = "") {
  return [...new Set(
    [...value.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)]
      .map((match) => match[1].split("#")[0] || "/")
      .filter((href) => href.startsWith("/")),
  )];
}

function phraseCount(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.match(new RegExp(`\\b${escaped}\\b`, "gi"))?.length ?? 0;
}

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const pages = [];

for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  const html = await response.text();
  const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
  const title = visibleText(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1 = visibleText(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const text = visibleText(main);
  const mainLinks = linksFrom(main);
  const assignment = assignments[route];
  const expected = expectedJourneys[route] ?? [];

  pages.push({
    route,
    status: response.status,
    title,
    h1,
    wordCount: text ? text.split(/\s+/).length : 0,
    mainLinks,
    expectedJourneyCoverage: expected.map((href) => ({ href, present: mainLinks.includes(href) })),
    keyword: assignment
      ? {
          primary: assignment.primary,
          primaryCount: phraseCount(`${title} ${h1} ${text}`, assignment.primary),
          primaryInTitleOrH1: phraseCount(`${title} ${h1}`, assignment.primary) > 0,
          verified: assignment.verified.map((phrase) => ({ phrase, count: phraseCount(text, phrase) })),
        }
      : null,
  });
}

const inboundMainLinks = Object.fromEntries(routes.map((route) => [route, 0]));
for (const page of pages) {
  for (const href of page.mainLinks) {
    if (href in inboundMainLinks && href !== page.route) inboundMainLinks[href] += 1;
  }
}

const failures = {
  primaryKeyword: pages
    .filter((page) => page.keyword && (!page.keyword.primaryInTitleOrH1 || page.keyword.primaryCount === 0))
    .map((page) => ({ route: page.route, keyword: page.keyword.primary, title: page.title, h1: page.h1 })),
  journeyLinks: pages
    .filter((page) => page.expectedJourneyCoverage.some((item) => !item.present))
    .map((page) => ({ route: page.route, missing: page.expectedJourneyCoverage.filter((item) => !item.present).map((item) => item.href) })),
  zeroContextualInbound: pages
    .filter((page) => page.route !== "/" && inboundMainLinks[page.route] === 0)
    .map((page) => page.route),
};

const report = {
  generatedAt: new Date().toISOString(),
  base,
  sourceBoundary: "Only UK-verified commercial queries from KaiRank_Keyword_Research_Master_UK_v5 (1).xlsx are evaluated.",
  pages,
  inboundMainLinks,
  failures,
};

await fs.mkdir("/private/tmp/kairank-surgical-qa", { recursive: true });
await fs.writeFile("/private/tmp/kairank-surgical-qa/keyword-link-report.json", JSON.stringify(report, null, 2));

console.log(JSON.stringify({
  pageCount: pages.length,
  assignedPages: pages.filter((page) => page.keyword).map((page) => ({ route: page.route, keyword: page.keyword })),
  inboundMainLinks,
  failures,
}, null, 2));
