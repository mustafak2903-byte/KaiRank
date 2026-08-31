import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const MAX_REDIRECTS = 5;
const MAX_HTML_BYTES = 1_250_000;
const MAX_SUPPORT_BYTES = 160_000;

const blockedHostnames = new Set([
  "0.0.0.0",
  "localhost",
  "localhost.localdomain",
  "metadata",
  "metadata.google.internal",
  "metadata.azure.internal",
  "instance-data.ec2.internal",
]);

export class AuditError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status = 400,
  ) {
    super(message);
    this.name = "AuditError";
  }
}

function isPrivateIpv4(address: string) {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b, c] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && c === 0) ||
    (a === 192 && b === 0 && c === 2) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && c === 100) ||
    (a === 203 && b === 0 && c === 113) ||
    a >= 224
  );
}

function isPrivateIpv6(address: string) {
  const host = address.replace(/^\[|\]$/g, "").split("%")[0].toLowerCase();
  const mapped = host.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)?.[1];
  if (mapped) return isPrivateIpv4(mapped);
  return (
    host === "::" ||
    host === "::1" ||
    host.startsWith("fc") ||
    host.startsWith("fd") ||
    /^fe[89ab]/.test(host) ||
    host.startsWith("ff") ||
    host.startsWith("2001:db8") ||
    host.startsWith("2001:2:") ||
    host.startsWith("2001:10:")
  );
}

function isPrivateAddress(address: string) {
  const version = isIP(address);
  return version === 4 ? isPrivateIpv4(address) : version === 6 ? isPrivateIpv6(address) : true;
}

function validateHostname(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    !host ||
    blockedHostnames.has(host) ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    host.endsWith(".localhost") ||
    host.endsWith(".home") ||
    host.endsWith(".lan")
  ) {
    throw new AuditError("private_destination", "Local, private and internal network addresses cannot be checked.");
  }
  if (isIP(host) && isPrivateAddress(host)) {
    throw new AuditError("private_destination", "Local, private and internal network addresses cannot be checked.");
  }
  return host;
}

export function normalizeAuditUrl(input: unknown) {
  if (typeof input !== "string") throw new AuditError("invalid_url", "Add a valid website address.");
  const value = input.trim();
  if (!value || value.length > 2048) throw new AuditError("invalid_url", "Add a valid website address.");
  const explicitProtocol = value.match(/^([a-z][a-z0-9+.-]*):\/\//i)?.[1]?.toLowerCase();
  if (explicitProtocol && explicitProtocol !== "http" && explicitProtocol !== "https") {
    throw new AuditError("invalid_protocol", "Only HTTP and HTTPS website addresses can be checked.");
  }

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    throw new AuditError("invalid_url", "Use a website address such as yourclinic.com.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new AuditError("invalid_protocol", "Only HTTP and HTTPS website addresses can be checked.");
  }
  if (url.username || url.password) {
    throw new AuditError("credentials_not_allowed", "Website addresses containing credentials cannot be checked.");
  }

  validateHostname(url.hostname);
  url.hash = "";
  return url.toString();
}

export async function assertPublicDestination(input: string | URL) {
  const url = typeof input === "string" ? new URL(input) : input;
  const host = validateHostname(url.hostname);
  if (isIP(host)) return [host];

  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await lookup(host, { all: true, verbatim: true });
  } catch {
    throw new AuditError("dns_failure", "That domain could not be resolved on the public internet.", 422);
  }

  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new AuditError("private_destination", "The domain resolves to a private or internal network address.");
  }
  return addresses.map(({ address }) => address);
}

type SafeFetchOptions = {
  timeoutMs: number;
  maxBytes: number;
  requireHtml?: boolean;
};

type SafeFetchResult = {
  body: string;
  contentType: string;
  finalUrl: string;
  redirects: string[];
  responseMs: number;
  status: number;
};

async function readLimitedBody(response: Response, maxBytes: number) {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new AuditError("body_too_large", "The public page is too large for the Fast Check.", 413);
    }
    chunks.push(value);
  }

  const output = new Uint8Array(total);
  let offset = 0;
  chunks.forEach((chunk) => {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  });
  return new TextDecoder().decode(output);
}

async function safeFetch(startUrl: string, options: SafeFetchOptions): Promise<SafeFetchResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs);
  const startedAt = performance.now();
  const redirects: string[] = [];
  let current = new URL(startUrl);

  try {
    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
      await assertPublicDestination(current);
      const response = await fetch(current, {
        cache: "no-store",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          Accept: options.requireHtml ? "text/html,application/xhtml+xml" : "text/plain,text/xml,application/xml,*/*;q=0.2",
          "User-Agent": "KaiRank-Visibility-Fast-Check/3.0 (+https://kairank.com)",
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location) throw new AuditError("invalid_redirect", "The site returned a redirect without a destination.", 502);
        if (redirectCount === MAX_REDIRECTS) throw new AuditError("too_many_redirects", "The site redirected too many times.", 422);
        const next = new URL(location, current);
        if ((next.protocol !== "http:" && next.protocol !== "https:") || next.username || next.password) {
          throw new AuditError("unsafe_redirect", "The site redirected to an unsupported or unsafe destination.");
        }
        await assertPublicDestination(next);
        redirects.push(next.toString());
        current = next;
        continue;
      }

      const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
      if (options.requireHtml && !contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
        throw new AuditError("unsupported_content", "The address did not return a public HTML page.", 415);
      }

      const body = await readLimitedBody(response, options.maxBytes);
      return {
        body,
        contentType,
        finalUrl: current.toString(),
        redirects,
        responseMs: Math.round(performance.now() - startedAt),
        status: response.status,
      };
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new AuditError("timeout", "The public page took too long to respond.", 504);
    }
    if (error instanceof AuditError) throw error;
    throw new AuditError("fetch_failure", "The public page could not be reached for the Fast Check.", 502);
  } finally {
    clearTimeout(timeout);
  }

  throw new AuditError("fetch_failure", "The public page could not be checked.", 502);
}

function decodeText(value: string | null) {
  if (!value) return null;
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim() || null;
}

function attributes(tag: string) {
  const output: Record<string, string> = {};
  const pattern = /([:\w-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of tag.matchAll(pattern)) {
    output[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return output;
}

function findMeta(html: string, name: string) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    if ((attrs.name ?? attrs.property ?? "").toLowerCase() === name.toLowerCase()) return decodeText(attrs.content ?? null);
  }
  return null;
}

function findLink(html: string, relation: string, baseUrl: string) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    const attrs = attributes(tag);
    const rels = (attrs.rel ?? "").toLowerCase().split(/\s+/);
    if (rels.includes(relation) && attrs.href) {
      try {
        return new URL(attrs.href, baseUrl).toString();
      } catch {
        return attrs.href;
      }
    }
  }
  return null;
}

export type CheckStatus = "pass" | "attention" | "fail" | "info";

export type FastCheck = {
  finalUrl: string;
  statusCode: number;
  responseMs: number;
  redirects: string[];
  https: boolean;
  title: string | null;
  metaDescription: string | null;
  canonical: string | null;
  robotsMeta: string | null;
  h1Count: number;
  viewport: boolean;
  structuredDataCount: number;
  robotsTxt: { found: boolean; status: number | null };
  sitemap: { found: boolean; status: number | null; url: string };
  checks: Array<{ id: string; label: string; status: CheckStatus; value: string }>;
};

async function inspectSupportFile(url: string) {
  try {
    const result = await safeFetch(url, { timeoutMs: 4_500, maxBytes: MAX_SUPPORT_BYTES });
    return { found: result.status >= 200 && result.status < 400 && result.body.trim().length > 0, status: result.status };
  } catch {
    return { found: false, status: null };
  }
}

export async function runFastCheck(url: string): Promise<FastCheck> {
  const page = await safeFetch(url, { timeoutMs: 9_000, maxBytes: MAX_HTML_BYTES, requireHtml: true });
  const title = decodeText(page.body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? null);
  const metaDescription = findMeta(page.body, "description");
  const canonical = findLink(page.body, "canonical", page.finalUrl);
  const robotsMeta = findMeta(page.body, "robots");
  const viewport = Boolean(findMeta(page.body, "viewport"));
  const h1Count = page.body.match(/<h1\b[^>]*>/gi)?.length ?? 0;
  const structuredDataCount = (page.body.match(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>/gi) ?? []).length;
  const sitemapLink = findLink(page.body, "sitemap", page.finalUrl);
  const origin = new URL(page.finalUrl).origin;
  const sitemapUrl = sitemapLink ?? new URL("/sitemap.xml", origin).toString();
  const [robotsTxt, sitemap] = await Promise.all([
    inspectSupportFile(new URL("/robots.txt", origin).toString()),
    inspectSupportFile(sitemapUrl),
  ]);

  const okStatus = page.status >= 200 && page.status < 400;
  const checks: FastCheck["checks"] = [
    { id: "response", label: "Public response", status: okStatus ? "pass" : "fail", value: `${page.status} · ${page.responseMs} ms` },
    { id: "https", label: "HTTPS", status: page.finalUrl.startsWith("https://") ? "pass" : "attention", value: page.finalUrl.startsWith("https://") ? "Secure" : "Not secure" },
    { id: "title", label: "Page title", status: title ? "pass" : "fail", value: title ? `${title.length} characters` : "Missing" },
    { id: "description", label: "Meta description", status: metaDescription ? "pass" : "attention", value: metaDescription ? `${metaDescription.length} characters` : "Missing" },
    { id: "canonical", label: "Canonical URL", status: canonical ? "pass" : "attention", value: canonical ? "Declared" : "Not declared" },
    { id: "h1", label: "Primary heading", status: h1Count === 1 ? "pass" : h1Count === 0 ? "fail" : "attention", value: h1Count === 1 ? "One H1" : `${h1Count} H1 elements` },
    { id: "viewport", label: "Mobile viewport", status: viewport ? "pass" : "fail", value: viewport ? "Declared" : "Missing" },
    { id: "structured", label: "Structured data", status: structuredDataCount > 0 ? "pass" : "info", value: structuredDataCount > 0 ? `${structuredDataCount} JSON-LD block${structuredDataCount === 1 ? "" : "s"}` : "Not detected" },
    { id: "robots", label: "robots.txt", status: robotsTxt.found ? "pass" : "attention", value: robotsTxt.found ? "Found" : "Not found" },
    { id: "sitemap", label: "Sitemap", status: sitemap.found ? "pass" : "attention", value: sitemap.found ? "Found" : "Not found" },
  ];

  return {
    finalUrl: page.finalUrl,
    statusCode: page.status,
    responseMs: page.responseMs,
    redirects: page.redirects,
    https: page.finalUrl.startsWith("https://"),
    title,
    metaDescription,
    canonical,
    robotsMeta,
    h1Count,
    viewport,
    structuredDataCount,
    robotsTxt,
    sitemap: { ...sitemap, url: sitemapUrl },
    checks,
  };
}

type LighthouseAudit = {
  numericValue?: number;
  numericUnit?: string;
  displayValue?: string;
};

export type PageSpeedPayload = {
  lighthouseResult?: {
    finalDisplayedUrl?: string;
    lighthouseVersion?: string;
    categories?: Record<string, { score?: number | null }>;
    audits?: Record<string, LighthouseAudit | undefined>;
  };
  error?: { code?: number; message?: string; status?: string };
};

export function normalizePageSpeedPayload(payload: PageSpeedPayload, fallbackUrl: string) {
  const lighthouse = payload.lighthouseResult;
  if (!lighthouse?.categories) throw new AuditError("pagespeed_incomplete", "Performance data was incomplete.", 502);

  const score = (key: string) => {
    const value = lighthouse.categories?.[key]?.score;
    return typeof value === "number" ? Math.round(value * 100) : null;
  };
  const metric = (key: string, fallbackUnit: string | null) => {
    const audit = lighthouse.audits?.[key];
    return {
      value: typeof audit?.numericValue === "number" ? audit.numericValue : null,
      display: audit?.displayValue ?? "Not available",
      unit: audit?.numericUnit ?? fallbackUnit,
    };
  };

  return {
    status: "complete" as const,
    url: lighthouse.finalDisplayedUrl ?? fallbackUrl,
    strategy: "mobile" as const,
    lighthouseVersion: lighthouse.lighthouseVersion ?? null,
    scores: {
      performance: score("performance"),
      seo: score("seo"),
      accessibility: score("accessibility"),
    },
    metrics: {
      lcp: metric("largest-contentful-paint", "millisecond"),
      cls: metric("cumulative-layout-shift", "unitless"),
      inp: metric("interaction-to-next-paint", "millisecond"),
    },
  };
}
