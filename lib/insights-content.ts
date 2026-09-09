export type InsightSection = {
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type InsightDefinition = {
  slug: string;
  category: string;
  seoTitle: string;
  title: string;
  accent: string;
  description: string;
  published: string;
  updated: string;
  readTime: string;
  serviceSlug: string;
  serviceLabel: string;
  takeaway: string;
  sections: readonly InsightSection[];
  sources: readonly { label: string; href: string }[];
};

export const insights: readonly InsightDefinition[] = [
  {
    slug: "prioritise-technical-seo-audit-private-clinic",
    category: "Technical SEO",
    seoTitle: "Technical SEO audit priorities for private clinics",
    title: "A clinic technical audit should protect",
    accent: "the patient journey—not the report.",
    description: "A practical framework for prioritising technical SEO issues around treatment demand, indexation and the actions a private clinic needs patients to take.",
    published: "2026-09-09",
    updated: "2026-09-09",
    readTime: "7 minute read",
    serviceSlug: "technical-seo",
    serviceLabel: "Technical SEO audit service",
    takeaway: "The best technical audit is not the one with the most findings. It is the one that makes the most commercially important patient journey easier to discover, evaluate and complete.",
    sections: [
      {
        title: "Start with the pages the clinic cannot afford to lose",
        paragraphs: [
          "A crawl export does not know which treatment funds the clinic, which location has capacity or which patient questions precede a high-consideration decision. Establish those priorities before grading technical issues.",
          "Build a small critical set: the homepage, priority treatment pages, location pages, clinician profiles, evidence pages and the enquiry or booking route. Every technical finding should be assessed by whether it affects access to, selection of or action from that set.",
        ],
        points: [
          "Which treatments and locations matter commercially now?",
          "Which URL should search systems select for each intent?",
          "Can a patient move from the landing page to credible evidence and a clear next step?",
        ],
      },
      {
        title: "Separate access, selection and experience",
        paragraphs: [
          "Technical SEO becomes easier to act on when findings are grouped by the decision they affect. Access covers response codes, robots directives, crawl paths and rendering. Selection covers canonicals, duplicates, internal links and sitemap consistency. Experience covers mobile usability, responsiveness and visual stability.",
          "A slow page is important, but it is not automatically the first problem. A fast treatment page that is excluded from the index, canonicalised elsewhere or unreachable from the clinic’s navigation still cannot compete reliably.",
        ],
        points: [
          "Access: can the page be requested and rendered reliably?",
          "Selection: is the intended URL the clear canonical destination?",
          "Experience: can a patient understand and act without delay or instability?",
        ],
      },
      {
        title: "Prioritise by loss, confidence and dependency",
        paragraphs: [
          "High-severity labels are not a delivery plan. Score each issue against the value of the affected pages, the strength of the evidence and whether other work depends on the repair.",
          "An incorrect sitewide canonical pattern may deserve immediate attention because it affects every commercial URL. An isolated metadata improvement may wait if the page itself is not part of the current demand strategy. The sequence should be explainable to both the clinic and its developer.",
        ],
      },
      {
        title: "Treat production verification as part of the fix",
        paragraphs: [
          "A ticket marked complete is not release evidence. Re-crawl the deployed page, inspect the rendered HTML, follow the redirect chain and verify the canonical, indexation directive and internal links in production.",
          "Then monitor real-user Core Web Vitals and Search Console. The objective is not a perfect laboratory score; it is a stable, discoverable route from patient demand to the clinic’s most useful page.",
        ],
      },
    ],
    sources: [
      { label: "Google: URL structure best practices", href: "https://developers.google.com/search/docs/crawling-indexing/url-structure" },
      { label: "Google: link best practices", href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable" },
      { label: "Google: Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
    ],
  },
  {
    slug: "clinic-location-pages-without-doorway-content",
    category: "Local SEO",
    seoTitle: "Clinic location pages without doorway content",
    title: "A clinic location page should represent",
    accent: "a real patient decision.",
    description: "How private clinics can structure location and service coverage without creating thin city pages that add crawlable URLs but little patient value.",
    published: "2026-09-09",
    updated: "2026-09-09",
    readTime: "6 minute read",
    serviceSlug: "local-seo",
    serviceLabel: "Local SEO for medical clinics",
    takeaway: "Create a location page when the clinic can show a real place, real services, real people and a useful local next step. Do not create one merely because a city name has search volume.",
    sections: [
      {
        title: "Model the real footprint before creating URLs",
        paragraphs: [
          "A useful local architecture starts with facts: where the clinic operates, which treatments are genuinely available at each location, which clinicians deliver them and how a patient can reach the right team.",
          "This prevents one generic location template from claiming every service and prevents treatment pages from competing with near-identical city variants. The architecture should explain reality more clearly than the clinic’s internal spreadsheet does.",
        ],
        points: [
          "A stable clinic address or legitimate service area",
          "Location-specific treatments, clinicians or facilities",
          "Evidence and contact information relevant to that place",
          "A distinct reason for a patient to use this page",
        ],
      },
      {
        title: "Choose the page that best answers the query",
        paragraphs: [
          "For a single-location clinic, a strong treatment page can often carry local context naturally. For a multi-location group, a location hub may need to connect local treatments, clinicians, directions and evidence without duplicating the full treatment explanation.",
          "The test is not whether another keyword can be placed in a title. It is whether the proposed URL resolves an information need better than the pages already available.",
        ],
      },
      {
        title: "Connect website and real-world evidence",
        paragraphs: [
          "Names, addresses, phone numbers, opening information, practitioner relationships and service availability should agree across the site and the profiles the clinic is entitled to manage. Reviews can support trust, but they should remain authentic and connected to the relevant location and service context.",
          "A Google Business Profile is not a substitute for the website. The profile can create discovery; the site still has to explain the treatment, expertise, evidence and next step with enough clarity for a considered decision.",
        ],
      },
      {
        title: "Measure local visibility without overclaiming it",
        paragraphs: [
          "Local rankings change with proximity, query and searcher context. Use them as one directional signal alongside profile discovery, calls, direction requests, landing-page behaviour and qualified enquiries.",
          "Keep call actions separate from confirmed appointments and patient revenue. Credible reporting makes the boundary visible instead of turning every platform interaction into a business outcome.",
        ],
      },
    ],
    sources: [
      { label: "Google: Business Profile eligibility", href: "https://support.google.com/business/answer/13763036" },
      { label: "Google: creating helpful, reliable content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Google: link best practices", href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable" },
    ],
  },
  {
    slug: "what-ai-search-changes-for-healthcare-websites",
    category: "AI search",
    seoTitle: "AI search optimisation for healthcare websites",
    title: "AI search changes the retrieval layer.",
    accent: "It does not remove the need for evidence.",
    description: "How healthcare websites can prepare for AI search through clearer entities, expertise and original evidence—without making citation guarantees.",
    published: "2026-09-09",
    updated: "2026-09-09",
    readTime: "7 minute read",
    serviceSlug: "ai-search-optimisation",
    serviceLabel: "AI search optimisation for healthcare",
    takeaway: "Healthcare organisations should make their real expertise easier to retrieve and verify. They should not manufacture certainty about platforms they do not control.",
    sections: [
      {
        title: "The website still needs an intelligible subject model",
        paragraphs: [
          "An AI interface does not make unclear clinic information clearer by default. The site still needs to express the relationships between the organisation, locations, clinicians, specialties, treatments and supporting evidence.",
          "Those relationships should be visible in navigation, headings, copy and internal links before they are described in structured data. Markup can reinforce what a visitor can verify; it should not invent expertise or associations that the page does not show.",
        ],
        points: [
          "Who provides the service?",
          "At which location is it available?",
          "What expertise supports the explanation?",
          "Which first-party or authoritative evidence substantiates the claim?",
        ],
      },
      {
        title: "Original evidence becomes more valuable—not less",
        paragraphs: [
          "Generic summaries are easy to reproduce. A clinic’s useful advantage comes from material grounded in its clinicians, patient questions, service process, outcomes methodology and responsibly framed first-party data.",
          "Clear authorship, review dates, source links and claim boundaries help people evaluate the content. They also give search and retrieval systems a more coherent set of signals than anonymous volume publishing does.",
        ],
      },
      {
        title: "Technical access remains foundational",
        paragraphs: [
          "A page cannot become a dependable source if important content is difficult to crawl, rendered inconsistently or duplicated across competing URLs. AI-search work therefore extends technical SEO and content architecture; it does not replace them.",
          "Keep important pages reachable through standard links, render critical copy in the page output and maintain one clear canonical destination for each subject.",
        ],
      },
      {
        title: "Measure observations, not promises",
        paragraphs: [
          "No consultant controls whether a third-party AI interface cites a clinic. Track observable signals instead: cited pages, referral traffic, assisted conversions, branded demand and the quality of enquiries arriving through emerging search surfaces.",
          "A citation can be useful evidence of retrieval. It is not automatically proof of patient acquisition, revenue or durable visibility. Keep those categories separate in the same way responsible SEO reporting separates impressions, clicks, enquiries and confirmed outcomes.",
        ],
      },
    ],
    sources: [
      { label: "Google: AI-generated content guidance", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
      { label: "Google: structured data principles", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "Google: people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
  },
] as const;

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
