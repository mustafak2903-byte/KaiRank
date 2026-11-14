import playwright from "/Users/mac/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js";
import fs from "node:fs/promises";

const { chromium } = playwright;
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3133";
const canonicalOrigin = process.env.QA_CANONICAL_ORIGIN || "https://kai-rank.vercel.app";
const output = "/private/tmp/kairank-browser-qa";
await fs.rm(output, { recursive: true, force: true });
await fs.mkdir(output, { recursive: true });

const sitemapText = await fetch(`${base}/sitemap.xml`).then((response) => response.text());
const routes = [...sitemapText.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "tablet", viewport: { width: 820, height: 1180 }, isMobile: true },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.QA_CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const report = { base, canonicalOrigin, routes, pages: [], consoleErrors: [], brokenLinks: [], schemaErrors: [], interactions: {} };

for (const profile of profiles) {
  const context = await browser.newContext({ viewport: profile.viewport, isMobile: profile.isMobile ?? false, reducedMotion: profile.name === "tablet" ? "no-preference" : "reduce" });
  for (const route of routes) {
    const page = await context.newPage();
    page.on("console", (message) => { if (message.type() === "error") report.consoleErrors.push({ profile: profile.name, route, text: message.text() }); });
    page.on("pageerror", (error) => report.consoleErrors.push({ profile: profile.name, route, text: error.message }));
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 30_000 });
    const metrics = await page.evaluate(({ canonicalOrigin }) => {
      const text = (value) => value?.replace(/\s+/g, " ").trim() ?? "";
      const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((script) => {
        try {
          const parsed = JSON.parse(script.textContent || "{}");
          const nodes = parsed["@graph"] ?? [parsed];
          return { valid: true, types: nodes.flatMap((node) => node["@type"] ?? []) };
        } catch (error) {
          return { valid: false, error: error instanceof Error ? error.message : "JSON parse failed", types: [] };
        }
      });
      const internalLinks = [...document.querySelectorAll("a[href]")]
        .map((link) => link.getAttribute("href"))
        .filter((href) => href?.startsWith("/") && !href.startsWith("//") && !href.startsWith("/#"))
        .map((href) => href.split("#")[0])
        .filter(Boolean);
      const h1s = [...document.querySelectorAll("h1")].map((node) => text(node.textContent));
      const canonical = document.querySelector('link[rel="canonical"]')?.href ?? "";
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
        canonical,
        canonicalHostCorrect: canonical.startsWith(canonicalOrigin),
        ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content") ?? "",
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
        twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") ?? "",
        h1s,
        h2Count: document.querySelectorAll("h2").length,
        mainCount: document.querySelectorAll("main").length,
        navCount: document.querySelectorAll("nav").length,
        imageCount: document.images.length,
        missingAlt: [...document.images].filter((image) => !image.hasAttribute("alt")).length,
        horizontalOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
        minTapTargetFailures: [...document.querySelectorAll("a,button,input,summary")].filter((element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (style.display === "none" || style.visibility === "hidden" || rect.width === 0 || rect.height === 0) return false;
          return rect.width < 24 || rect.height < 24;
        }).length,
        bookingCtas: [...document.querySelectorAll("button,a")].filter((element) => text(element.textContent).toLowerCase().includes("clinic visibility review")).length,
        schema: jsonLd,
        internalLinks: [...new Set(internalLinks)],
        hasUnconfiguredDomain: document.documentElement.innerHTML.includes("www.kairank.com") || document.documentElement.innerHTML.includes('"https://kairank.com'),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "",
      };
    }, { canonicalOrigin });

    const safeName = route === "/" ? "home" : route.slice(1).replaceAll("/", "--");
    const screenshot = `${output}/${profile.name}--${safeName}.png`;
    await page.screenshot({ path: screenshot, fullPage: false });
    report.pages.push({ profile: profile.name, route, status: response?.status() ?? null, screenshot, ...metrics });
    for (const schema of metrics.schema) if (!schema.valid) report.schemaErrors.push({ profile: profile.name, route, error: schema.error });
    await page.close();
  }
  await context.close();
}

const uniqueInternalLinks = [...new Set(report.pages.flatMap((page) => page.internalLinks))];
for (const href of uniqueInternalLinks) {
  const response = await fetch(`${base}${href}`, { redirect: "manual" });
  if (response.status >= 400) report.brokenLinks.push({ href, status: response.status });
}

{
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const bookingButton = page.getByRole("button", { name: "Book a clinic visibility review" }).first();
  await bookingButton.focus();
  const triggerFocused = await bookingButton.evaluate((element) => document.activeElement === element);
  await bookingButton.click();
  const modal = page.locator('iframe[src*="app.cal.com"][src*="embedType=modal"]').last();
  await modal.waitFor({ state: "visible", timeout: 20_000 }).catch(() => null);
  const modalVisible = await modal.isVisible().catch(() => false);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  const modalClosed = await page.locator("body").evaluate((element) => !element.classList.contains("has-booking-open"));
  const focusRestored = await bookingButton.evaluate((element) => document.activeElement === element).catch(() => false);
  report.interactions.booking = { triggerFocused, modalVisible, modalClosed, focusRestored };
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${base}/`, { waitUntil: "networkidle" });
  const menu = page.getByRole("button", { name: /menu/i });
  await menu.click();
  const panel = page.locator("#mobile-navigation-panel");
  const opened = (await panel.getAttribute("aria-hidden")) === "false";
  await page.keyboard.press("Escape");
  const closedWithEscape = (await panel.getAttribute("aria-hidden")) === "true";
  const focusRestored = await menu.evaluate((element) => document.activeElement === element);
  report.interactions.mobileMenu = { opened, closedWithEscape, focusRestored };
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto(`${base}/search-visibility-diagnostic`, { waitUntil: "networkidle" });
  const input = page.locator('input[name="url"]');
  await page.getByRole("button", { name: "Check my website" }).last().click();
  const emptyValidation = await page.getByRole("alert").textContent().catch(() => "");
  await input.fill("http://localhost:3000");
  await page.getByRole("button", { name: "Check my website" }).last().click();
  const privateNetworkRejected = await page.getByRole("alert").textContent().catch(() => "");
  await input.fill("example.com");
  await page.getByRole("button", { name: "Check my website" }).last().click();
  await page.getByText("This is not Search Console data.").waitFor({ state: "visible", timeout: 20_000 });
  const checkCards = await page.locator(".fast-result__evidence article").count();
  const boundariesVisible = await page.getByText("This is not Search Console data.").isVisible();
  const sourceRows = await page.locator(".fast-result__evidence dt", { hasText: "Source checked" }).count();
  const limitRows = await page.locator(".fast-result__evidence dt", { hasText: "Limit" }).count();
  report.interactions.diagnostic = { emptyValidation, privateNetworkRejected, checkCards, boundariesVisible, sourceRows, limitRows };
  await context.close();
}

const robotsResponse = await fetch(`${base}/robots.txt`);
const robotsBody = await robotsResponse.text();
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
report.technical = { robotsStatus: robotsResponse.status, robotsBody, sitemapStatus: sitemapResponse.status, sitemapRouteCount: routes.length };

await browser.close();
const failures = {
  non200: report.pages.filter((page) => page.status !== 200).map((page) => ({ profile: page.profile, route: page.route, status: page.status })),
  canonical: report.pages.filter((page) => !page.canonicalHostCorrect || page.hasUnconfiguredDomain).map((page) => ({ profile: page.profile, route: page.route, canonical: page.canonical })),
  structure: report.pages.filter((page) => page.h1s.length !== 1 || page.mainCount !== 1 || page.horizontalOverflow > 0 || page.missingAlt > 0 || page.minTapTargetFailures > 0).map((page) => ({ profile: page.profile, route: page.route, h1s: page.h1s.length, main: page.mainCount, overflow: page.horizontalOverflow, missingAlt: page.missingAlt, tapTargets: page.minTapTargetFailures })),
  brokenLinks: report.brokenLinks,
  schema: report.schemaErrors,
  interactions: [
    ...(!report.interactions.booking?.triggerFocused || !report.interactions.booking?.modalVisible || !report.interactions.booking?.modalClosed || !report.interactions.booking?.focusRestored ? ["booking"] : []),
    ...(!report.interactions.mobileMenu?.opened || !report.interactions.mobileMenu?.closedWithEscape || !report.interactions.mobileMenu?.focusRestored ? ["mobile-menu"] : []),
    ...(report.interactions.diagnostic?.checkCards < 8 || !report.interactions.diagnostic?.boundariesVisible || report.interactions.diagnostic?.sourceRows !== report.interactions.diagnostic?.checkCards || report.interactions.diagnostic?.limitRows !== report.interactions.diagnostic?.checkCards ? ["diagnostic"] : []),
  ],
  technical: [
    ...(report.technical.robotsStatus !== 200 ? ["robots"] : []),
    ...(report.technical.sitemapStatus !== 200 || report.technical.sitemapRouteCount !== routes.length ? ["sitemap"] : []),
  ],
};
const failureCount = Object.values(failures).reduce((total, items) => total + items.length, 0);
const completedReport = { ...report, failures, failureCount };
await fs.writeFile(`${output}/report.json`, JSON.stringify(completedReport, null, 2));
console.log(JSON.stringify({
  base,
  routeCount: routes.length,
  viewportPageChecks: report.pages.length,
  interactions: report.interactions,
  technical: report.technical,
  failures,
  failureCount,
}, null, 2));
if (failureCount > 0) process.exitCode = 1;
