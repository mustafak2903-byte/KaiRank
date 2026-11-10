// One origin for metadata, structured data, feeds, sitemap and robots.
// Change NEXT_PUBLIC_SITE_URL only after the new domain is connected and verified.
function resolveSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://kai-rank.vercel.app";
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without credentials, a path, query or fragment.");
  }
  return url.origin;
}

export const SITE_URL = resolveSiteUrl();

export const siteConfig = {
  name: "KaiRank",
  legalName: "KaiRank",
  title: "Healthcare Search Visibility for UK Private Clinics | KaiRank",
  description:
    "Founder-led healthcare SEO for UK private clinics, strengthening visibility across Google Search and Maps from treatment search to enquiry.",
  url: SITE_URL,
  locale: "en_GB",
  primaryMarket: "United Kingdom",
  serviceMarkets: ["United Kingdom"],
  contact: {
    email: null,
    phone: null,
  },
  founder: {
    name: "Muhammad Mustafa Khan",
    role: "Founder · Search strategist",
    linkedIn: "https://www.linkedin.com/in/muhammad-mustafa-khan/",
    portraitUrl: "/muhammad-mustafa-khan.webp",
    aboutUrl: null,
  },
  bookingUrl: "https://cal.com/mustafa-reuzwm",
  heroVideoUrl: "/kairank-hero-v1-720.mp4",
  heroPosterUrl: "/kairank-hero-v1-poster.jpg",
  social: {
    linkedIn: "https://www.linkedin.com/in/muhammad-mustafa-khan/",
    x: null,
  },
  navigation: [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  serviceRoutes: [
    { label: "Technical SEO", href: "/technical-seo" },
    { label: "Local SEO", href: "/local-seo" },
    { label: "AI search optimisation", href: "/ai-search-optimisation" },
    { label: "Healthcare SEO services", href: "/healthcare-seo" },
  ],
  publicRoutes: [
    "/services",
    "/case-studies",
    "/case-studies/south-city-hospital",
    "/case-studies/the-recovery-room",
    "/search-visibility-diagnostic",
    "/insights",
    "/about",
    "/contact",
    "/privacy",
  ],
} as const;

export type NavigationItem = (typeof siteConfig.navigation)[number];
