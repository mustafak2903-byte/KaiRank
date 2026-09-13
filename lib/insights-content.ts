export type InsightSection = {
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type InsightDefinition = {
  slug: string;
  category: string;
  primaryKeyword: string;
  supportingKeywords: readonly string[];
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
    primaryKeyword: "technical SEO audit for clinics",
    supportingKeywords: ["technical SEO audit checklist", "clinic technical SEO", "technical website audit"],
    seoTitle: "Prioritising a Clinic Technical SEO Audit",
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
    primaryKeyword: "clinic location pages",
    supportingKeywords: ["local SEO for clinics", "medical clinic location pages", "healthcare local SEO"],
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
    primaryKeyword: "medical content for AI search",
    supportingKeywords: ["medical content AI discoverability", "AI discoverability for healthcare websites", "AI search content structure"],
    seoTitle: "How to Structure Medical Content for AI Search",
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
  {
    slug: "healthcare-website-optimisation",
    category: "Technical SEO",
    primaryKeyword: "optimizing healthcare websites",
    supportingKeywords: ["healthcare website optimisation", "healthcare website optimization", "on-page SEO services healthcare"],
    seoTitle: "Healthcare Website Optimisation Framework",
    title: "A healthcare website should make",
    accent: "the right page unmistakable.",
    description: "A practical framework for optimising healthcare websites around technical access, clear page ownership, patient comprehension and measurable action.",
    published: "2026-09-13",
    updated: "2026-09-13",
    readTime: "8 minute read",
    serviceSlug: "technical-seo",
    serviceLabel: "Technical SEO audit service",
    takeaway: "Healthcare website optimisation works when technical access, page purpose and the patient decision are improved together—not when a score is treated as the outcome.",
    sections: [
      {
        title: "Give each high-value question one clear destination",
        paragraphs: [
          "Start with the clinic’s real search journeys: a treatment, a clinician, a location and the evidence a patient needs before taking the next step. Assign one useful page to each distinct intent before revising titles or producing more copy.",
          "When several URLs compete for the same question, internal links, canonicals and content signals become harder to interpret. Consolidate overlap where it improves the patient journey, and keep separate pages only when each one resolves a genuinely different need.",
        ],
        points: [
          "One primary intent and useful next step per page",
          "Clear relationships between services, clinicians and locations",
          "Internal links that explain those relationships in ordinary language",
        ],
      },
      {
        title: "Verify access before asking the page to compete",
        paragraphs: [
          "The preferred URL should return a reliable response, render its critical content, remain indexable and declare a consistent canonical. Important pages should be reachable through standard links rather than depending on a search box, script or orphaned sitemap entry.",
          "Crawling and rendering checks belong beside the content review. A persuasive page cannot earn dependable visibility if search systems receive a different, incomplete or duplicated version of it.",
        ],
      },
      {
        title: "Reduce uncertainty in the patient decision",
        paragraphs: [
          "Useful healthcare pages explain who provides the service, where it is available, what the process involves and which evidence supports the claims. Clear authorship and review context matter more than repeating a target phrase.",
          "Mobile performance supports that comprehension. Protect the main heading, essential explanation and next step from late-loading assets, unstable layouts and interaction delays that interrupt evaluation.",
        ],
      },
      {
        title: "Measure the whole route, not one score",
        paragraphs: [
          "Track indexation and search visibility, then connect them to engagement with treatment, clinician and evidence content. Calls, enquiries and booking-intent clicks should remain separate from confirmed appointments and revenue.",
          "Use those observations to find the next constraint. Optimisation becomes a repeatable operating loop when every change has a page, a reason and a measurable patient action attached.",
        ],
      },
    ],
    sources: [
      { label: "Google: creating helpful, reliable content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Google: URL structure best practices", href: "https://developers.google.com/search/docs/crawling-indexing/url-structure" },
      { label: "Google: Core Web Vitals", href: "https://developers.google.com/search/docs/appearance/core-web-vitals" },
    ],
  },
  {
    slug: "why-local-seo-matters-medical-practices",
    category: "Local SEO",
    primaryKeyword: "importance of local SEO for medical practices",
    supportingKeywords: ["local SEO for doctors", "local SEO medical practice", "healthcare directory optimisation"],
    seoTitle: "Why Local SEO Matters for Medical Practices",
    title: "Local search decides whether proximity",
    accent: "becomes consideration.",
    description: "Why local SEO matters for medical practices, and how website, Google Business Profile and location evidence work together to support patient discovery.",
    published: "2026-09-13",
    updated: "2026-09-13",
    readTime: "7 minute read",
    serviceSlug: "local-seo",
    serviceLabel: "Local SEO for medical clinics",
    takeaway: "Local SEO matters because nearby demand still needs a credible route from a location-sensitive search to the right service, clinician and next step.",
    sections: [
      {
        title: "Nearby does not automatically mean relevant",
        paragraphs: [
          "A patient may search with a town, neighbourhood, ‘near me’ phrase or no location at all. Search platforms infer local intent, then compare proximity with the service, prominence and evidence they can understand.",
          "A medical practice therefore needs more than an address. Its public footprint must make the relationship between place, treatment and practitioner clear enough for a patient to evaluate.",
        ],
      },
      {
        title: "The website and profile need one version of reality",
        paragraphs: [
          "Names, addresses, telephone numbers, opening hours, categories and service availability should agree across the website and the profiles the practice legitimately controls. Consistency helps discovery, but accuracy is the real requirement.",
          "The website carries the depth a profile cannot: treatment explanations, clinician expertise, location-specific facilities, evidence and a considered next step. Local SEO works when those surfaces reinforce rather than contradict one another.",
        ],
        points: [
          "Accurate Google Business Profile information",
          "Useful location and service relationships on the website",
          "Authentic reviews and evidence connected to the relevant place",
          "A clear call, enquiry or booking route on mobile",
        ],
      },
      {
        title: "Build coverage from real operations",
        paragraphs: [
          "Create a location page when it represents a genuine clinic, service area or patient decision. Avoid producing near-identical city pages that change the place name but offer no distinct people, services, evidence or instructions.",
          "For multi-location groups, a useful architecture shows which services and clinicians belong to each location. For a single practice, strong service pages can often carry local context without a large set of thin URLs.",
        ],
      },
      {
        title: "Read local performance with the right boundaries",
        paragraphs: [
          "Measure profile discovery, calls, direction requests, local landing-page engagement and qualified enquiries together. Grid rankings and isolated screenshots can add context, but they change with distance, query and searcher conditions.",
          "A profile interaction is not automatically a patient outcome. Keeping those stages distinct makes local reporting more credible and makes the next improvement easier to choose.",
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
    slug: "healthcare-answer-engine-optimisation",
    category: "AI search",
    primaryKeyword: "healthcare answer engine optimisation",
    supportingKeywords: ["healthcare answer engine optimization", "AI search optimisation for medical websites", "healthcare visibility in AI search engines"],
    seoTitle: "Healthcare Answer Engine Optimisation",
    title: "Answer engines need a source",
    accent: "people can still verify.",
    description: "What healthcare answer engine optimisation involves: clearer entities, retrievable medical content, credible evidence and honest AI-search measurement.",
    published: "2026-09-13",
    updated: "2026-09-13",
    readTime: "8 minute read",
    serviceSlug: "ai-search-optimisation",
    serviceLabel: "AI search optimisation for healthcare",
    takeaway: "Answer engine optimisation should make real healthcare expertise easier to retrieve and verify. It cannot guarantee that a third-party system will cite or recommend a clinic.",
    sections: [
      {
        title: "Start with the question an answer must resolve",
        paragraphs: [
          "Answer engines assemble responses around questions, entities and supporting passages. A healthcare site should therefore organise useful explanations around real patient decisions instead of publishing disconnected keyword pages.",
          "State what the service is, who provides it, where it is available and which evidence supports the explanation. The page should remain useful even when a visitor arrives directly at the relevant passage.",
        ],
      },
      {
        title: "Make entity relationships visible",
        paragraphs: [
          "Connect the organisation, locations, clinicians, specialties and services through visible copy and crawlable internal links. Structured data can reinforce those relationships after the page expresses them clearly.",
          "Do not use markup to imply credentials, reviews or service relationships that a visitor cannot verify. In healthcare, retrieval quality and trust depend on the same underlying facts.",
        ],
        points: [
          "Named authors and qualified clinical reviewers",
          "Explicit service, clinician and location relationships",
          "Original evidence with dates, methods and limitations",
          "One canonical source for each distinct subject",
        ],
      },
      {
        title: "Write passages that stand on their own",
        paragraphs: [
          "Clear headings, direct definitions, concise answers and supporting detail make information easier for both people and retrieval systems to navigate. That is an editorial discipline, not a licence to strip nuance from medical information.",
          "Keep important caveats close to the claim they qualify. Link to deeper service, clinician and evidence pages where the answer requires more context than a short passage can carry.",
        ],
      },
      {
        title: "Treat citations as observations",
        paragraphs: [
          "Track where the clinic appears, which pages are cited and whether visitors arrive from AI interfaces. Compare those observations with branded search, assisted journeys and qualified enquiries without assigning revenue that cannot be demonstrated.",
          "Platform behaviour changes. A durable programme improves the source material and information architecture first, then reviews emerging visibility as one part of the wider search system.",
        ],
      },
    ],
    sources: [
      { label: "Google: AI-generated content guidance", href: "https://developers.google.com/search/docs/fundamentals/using-gen-ai-content" },
      { label: "Google: structured data principles", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
      { label: "Google: people-first content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
    ],
  },
  {
    slug: "healthcare-content-strategy",
    category: "Healthcare content",
    primaryKeyword: "healthcare content strategy",
    supportingKeywords: ["healthcare website content", "content marketing workflow healthcare", "healthcare content SEO"],
    seoTitle: "Healthcare Content Strategy for Search",
    title: "A healthcare content strategy should follow",
    accent: "the patient’s decision—not a calendar.",
    description: "A healthcare content strategy for connecting patient questions, clinical expertise, service pages and measurable search journeys without commodity publishing.",
    published: "2026-09-13",
    updated: "2026-09-13",
    readTime: "8 minute read",
    serviceSlug: "healthcare-seo",
    serviceLabel: "SEO for healthcare",
    takeaway: "The strongest healthcare content system starts with patient decisions and accountable expertise, then publishes only what improves comprehension, discovery or action.",
    sections: [
      {
        title: "Map decisions before topics",
        paragraphs: [
          "List the questions a patient needs to resolve before, during and after evaluating a treatment. Connect each question to the most useful service, clinician, location or evidence page rather than defaulting every topic to a new article.",
          "This creates a content architecture with a job to do. Core pages explain the clinic’s offer; supporting articles resolve deeper questions and return the reader to the appropriate next step.",
        ],
      },
      {
        title: "Make clinical ownership explicit",
        paragraphs: [
          "Define who writes, reviews and updates information that depends on clinical expertise. Show that context where it helps a reader judge the material, and keep sources and limitations close to consequential claims.",
          "Search optimisation cannot replace clinical governance. The content workflow should make expert review easier to complete and easier for the public to understand.",
        ],
        points: [
          "A named owner for each medically consequential page",
          "A review standard matched to the risk of the subject",
          "Source, update and limitation fields in the publishing workflow",
          "A clear route for correcting outdated information",
        ],
      },
      {
        title: "Build subject depth without manufacturing pages",
        paragraphs: [
          "Use search demand to reveal language and unanswered questions, then test whether the clinic has distinct expertise or evidence to contribute. Combine overlapping topics when one stronger page would serve the reader better.",
          "Internal links should describe the relationship between an article and the relevant service, clinician or location. Generic ‘read more’ links waste an opportunity to clarify the site’s subject model.",
        ],
      },
      {
        title: "Measure usefulness across the journey",
        paragraphs: [
          "Review impressions and clicks alongside engagement with evidence, service exploration and qualified actions. A high-traffic article can be useful, but volume alone does not prove that it supports the clinic’s commercial or patient objectives.",
          "Refresh or consolidate content when real query data reveals a clearer need. A publishing cadence is valuable only when it keeps useful information accurate and strengthens the routes patients actually use.",
        ],
      },
    ],
    sources: [
      { label: "Google: creating helpful, reliable content", href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content" },
      { label: "Google: link best practices", href: "https://developers.google.com/search/docs/crawling-indexing/links-crawlable" },
      { label: "Google: structured data principles", href: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" },
    ],
  },
] as const;

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}
