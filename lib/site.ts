const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "KaiRank",
  legalName: "KaiRank",
  title: "Healthcare SEO Agency for Private Clinics | KaiRank",
  description:
    "A healthcare SEO agency for private clinics, connecting technical SEO, local search, medical content and AI search visibility to patient demand.",
  url: configuredSiteUrl || "https://kairank.com",
  locale: "en_GB",
  contact: {
    email: "hello@kairank.com",
    phone: null,
  },
  founder: {
    name: "Muhammad Mustafa Khan",
    role: "Founder · Search strategist",
    linkedIn: "https://www.linkedin.com/in/muhammad-mustafa-khan/",
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
    { label: "SEO for clinics", href: "/seo" },
    { label: "Technical SEO", href: "/technical-seo" },
    { label: "Local SEO", href: "/local-seo" },
    { label: "AI search optimisation", href: "/ai-search-optimisation" },
    { label: "Healthcare SEO", href: "/healthcare-seo" },
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
