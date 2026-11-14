import fs from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3134";

async function jsonPost(path, body) {
  const response = await fetch(`${base}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let payload = null;
  try { payload = await response.json(); } catch { payload = null; }
  return { status: response.status, payload };
}

const homepage = await fetch(base);
const homepageHtml = await homepage.text();
const ogImages = [...new Set([...homepageHtml.matchAll(/<meta\b[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/gi)].map((match) => match[1]))];
const imageResults = [];
for (const url of ogImages) {
  const response = await fetch(url);
  imageResults.push({ url, status: response.status, contentType: response.headers.get("content-type") });
}

const robots = await fetch(`${base}/robots.txt`);
const robotsText = await robots.text();
const sitemap = await fetch(`${base}/sitemap.xml`);
const sitemapText = await sitemap.text();
const feed = await fetch(`${base}/insights/feed.xml`);
const seoRedirect = await fetch(`${base}/seo`, { redirect: "manual" });
const internalRoutes = [
  "/visual-system",
  "/experiments",
  "/experiments/atlas",
  "/experiments/editorial",
  "/experiments/prism",
];
const internalRouteResults = [];
for (const path of internalRoutes) {
  const response = await fetch(`${base}${path}`, { redirect: "manual" });
  const html = await response.text();
  const location = response.headers.get("location");
  const redirectedHome = [307, 308].includes(response.status) && location === "/";
  const noIndex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
  internalRouteResults.push({ path, status: response.status, location, redirectedHome, noIndex });
}

const invalid = await jsonPost("/api/audit", { url: "" });
const privateDestination = await jsonPost("/api/audit", { url: "http://127.0.0.1:3134" });
const publicDestination = await jsonPost("/api/audit", { url: "https://example.com", level: "fast" });
const checks = publicDestination.payload?.fast?.checks ?? [];

const report = {
  generatedAt: new Date().toISOString(),
  base,
  homepage: {
    status: homepage.status,
    headers: {
      csp: homepage.headers.get("content-security-policy"),
      hsts: homepage.headers.get("strict-transport-security"),
      referrerPolicy: homepage.headers.get("referrer-policy"),
      permissionsPolicy: homepage.headers.get("permissions-policy"),
      contentTypeOptions: homepage.headers.get("x-content-type-options"),
      frameOptions: homepage.headers.get("x-frame-options"),
    },
  },
  ogImages: imageResults,
  robots: { status: robots.status, currentSitemap: robotsText.includes("https://kai-rank.vercel.app/sitemap.xml") },
  sitemap: { status: sitemap.status, legacyDomain: /https:\/\/(?:www\.)?kairank\.com/i.test(sitemapText) },
  feed: { status: feed.status, contentType: feed.headers.get("content-type") },
  redirect: { status: seoRedirect.status, location: seoRedirect.headers.get("location") },
  internalRoutes: internalRouteResults,
  auditApi: {
    invalid: { status: invalid.status, code: invalid.payload?.code },
    privateDestination: { status: privateDestination.status, code: privateDestination.payload?.code },
    publicDestination: {
      status: publicDestination.status,
      kind: publicDestination.payload?.kind,
      level: publicDestination.payload?.level,
      checks: checks.length,
      completeEvidence: checks.every((check) => check.source && check.why && check.limitation),
    },
  },
};

const failures = [];
if (report.homepage.status !== 200) failures.push("homepage-status");
if (Object.values(report.homepage.headers).some((value) => !value)) failures.push("security-headers");
if (imageResults.some((image) => image.status !== 200 || !image.contentType?.startsWith("image/"))) failures.push("social-images");
if (report.robots.status !== 200 || !report.robots.currentSitemap) failures.push("robots");
if (report.sitemap.status !== 200 || report.sitemap.legacyDomain) failures.push("sitemap");
if (report.feed.status !== 200) failures.push("feed");
if (![307, 308].includes(report.redirect.status) || !report.redirect.location?.endsWith("/healthcare-seo")) failures.push("seo-redirect");
if (internalRouteResults.some((route) => !route.redirectedHome && !route.noIndex)) failures.push("internal-routes-indexable");
if (report.auditApi.invalid.status !== 400 || report.auditApi.invalid.code !== "invalid_url") failures.push("audit-invalid");
if (report.auditApi.privateDestination.status !== 400 || report.auditApi.privateDestination.code !== "private_destination") failures.push("audit-ssrf");
if (report.auditApi.publicDestination.status !== 200 || report.auditApi.publicDestination.checks < 8 || !report.auditApi.publicDestination.completeEvidence) failures.push("audit-public");

await fs.mkdir("/private/tmp/kairank-surgical-qa", { recursive: true });
await fs.writeFile("/private/tmp/kairank-surgical-qa/runtime-report.json", JSON.stringify({ ...report, failures }, null, 2));
console.log(JSON.stringify({ ...report, failures }, null, 2));
