import { isIP } from "node:net";

const blockedHostnames = new Set([
  "localhost",
  "localhost.localdomain",
  "0.0.0.0",
  "127.0.0.1",
  "::1",
]);

function isPrivateIpv4(hostname: string) {
  const parts = hostname.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return false;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a >= 224
  );
}

function isPrivateIpv6(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "").toLowerCase();
  return host === "::1" || host === "::" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe8") || host.startsWith("fe9") || host.startsWith("fea") || host.startsWith("feb");
}

export function normalizeAuditUrl(input: unknown) {
  if (typeof input !== "string") throw new Error("Add a valid website address.");
  const value = input.trim();
  if (!value || value.length > 2048) throw new Error("Add a valid website address.");

  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    throw new Error("Use a website address such as yourclinic.com.");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only HTTP and HTTPS website addresses can be checked.");
  }
  if (url.username || url.password) throw new Error("Website addresses containing credentials cannot be checked.");

  const hostname = url.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (
    !hostname ||
    blockedHostnames.has(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".localhost")
  ) {
    throw new Error("Local and private network addresses cannot be checked.");
  }

  const ipVersion = isIP(hostname);
  if ((ipVersion === 4 && isPrivateIpv4(hostname)) || (ipVersion === 6 && isPrivateIpv6(hostname))) {
    throw new Error("Local and private network addresses cannot be checked.");
  }

  url.hash = "";
  return url.toString();
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
  if (!lighthouse?.categories) throw new Error("Google did not return a complete Lighthouse result.");

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
    kind: "instant-technical-diagnostic" as const,
    url: lighthouse.finalDisplayedUrl ?? fallbackUrl,
    strategy: "mobile" as const,
    generatedAt: new Date().toISOString(),
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
    note: "This is an instant Lighthouse diagnostic, not a complete SEO, local-search or AI-visibility audit.",
  };
}
