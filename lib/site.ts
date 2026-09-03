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
  founder: {
    name: "Muhammad Mustafa Khan",
    role: "Founder · Search strategist",
    linkedIn: "https://www.linkedin.com/in/muhammad-mustafa-khan/",
    aboutUrl: null,
  },
  bookingUrl: "https://cal.com/mustafa-reuzwm",
  heroVideoUrl: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4",
  social: {
    linkedIn: "https://www.linkedin.com/in/muhammad-mustafa-khan/",
    x: null,
  },
  navigation: [
    { label: "Services", href: "#services" },
    { label: "Results", href: "#proof" },
    { label: "How We Work", href: "#process" },
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
