export const siteConfig = {
  name: "KaiRank",
  legalName: "KaiRank",
  title: "KaiRank — Search visibility, engineered.",
  description:
    "SEO, technical SEO, local SEO and AI search visibility engineered for organisations that need to be found.",
  url: "https://kairank.com",
  locale: "en_GB",
  contact: {
    email: "hello@kairank.com",
    phone: null,
  },
  social: {
    linkedIn: null,
    x: null,
  },
  navigation: [
    { label: "Expertise", href: "/seo/" },
    { label: "Case studies", href: "/case-studies/" },
    { label: "Insights", href: "/insights/" },
    { label: "About", href: "/about/" },
  ],
  serviceRoutes: [
    { label: "SEO", href: "/seo/" },
    { label: "Technical SEO", href: "/technical-seo/" },
    { label: "Local SEO", href: "/local-seo/" },
    { label: "AI search optimisation", href: "/ai-search-optimisation/" },
    { label: "Healthcare SEO", href: "/healthcare-seo/" },
  ],
  futureRoutes: [
    "/case-studies/",
    "/case-studies/south-city-hospital/",
    "/case-studies/the-recovery-room/",
    "/about/",
    "/insights/",
    "/contact/",
  ],
} as const;

export type NavigationItem = (typeof siteConfig.navigation)[number];
