const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

export const siteConfig = {
  name: "KaiRank",
  legalName: "KaiRank",
  title: "KaiRank — Search visibility, engineered.",
  description:
    "Search visibility engineered for clinics across Google, Maps and AI discovery.",
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
    { label: "Services", href: "/#services" },
    { label: "Results", href: "/#proof" },
    { label: "How We Work", href: "/#process" },
    { label: "FAQ", href: "/#faq" },
  ],
  serviceRoutes: [
    { label: "SEO", href: "/seo/" },
    { label: "Technical SEO", href: "/technical-seo/" },
    { label: "Local SEO", href: "/local-seo/" },
    { label: "AI search optimisation", href: "/ai-search-optimisation/" },
    { label: "Healthcare SEO", href: "/healthcare-seo/" },
  ],
  publicRoutes: [
    "/case-studies/",
    "/case-studies/south-city-hospital/",
    "/case-studies/the-recovery-room/",
    "/about/",
    "/contact/",
    "/privacy/",
  ],
} as const;

export type NavigationItem = (typeof siteConfig.navigation)[number];
