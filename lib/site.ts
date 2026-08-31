export const siteConfig = {
  name: "KaiRank",
  legalName: "KaiRank",
  title: "KaiRank — Search visibility, engineered.",
  description:
    "Search visibility engineered for clinics across Google, Maps and AI discovery.",
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
    { label: "Services", href: "#services" },
    { label: "Results", href: "#proof" },
    { label: "Approach", href: "#system" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
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
