export type ServiceDefinition = {
  slug: string;
  navLabel: string;
  primaryTopic: string;
  verifiedKeywordCluster: readonly string[];
  updated: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  promise: string;
  diagnosticQuestion: string;
  headings: {
    principle: string;
    symptoms: string;
    work: string;
    workIntro: string;
    measurement: string;
    insights: string;
    insightsIntro: string;
  };
  symptoms: readonly string[];
  work: readonly { index: string; title: string; body: string; output: string }[];
  measures: readonly { label: string; value: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const services: readonly ServiceDefinition[] = [
  {
    slug: "technical-seo",
    navLabel: "Technical SEO",
    primaryTopic: "Technical SEO for healthcare websites",
    verifiedKeywordCluster: [],
    updated: "2026-11-04",
    seoTitle: "Technical SEO for UK Private Clinic Websites",
    seoDescription: "Technical SEO for UK clinic websites, covering crawling, rendering, indexation, canonicalisation, site architecture and mobile performance.",
    eyebrow: "Technical SEO for clinic websites · access before amplification",
    title: "Technical SEO for clinic websites.",
    accent: "Fix what blocks discovery.",
    description: "Technical SEO for UK private clinics that removes crawling, indexation, rendering, duplication and performance constraints before content is asked to compete.",
    promise: "If search systems cannot reliably access, select and understand the right page, stronger copy and authority are being built on a compromised foundation.",
    diagnosticQuestion: "Can search systems consistently reach, select and render the pages patients need?",
    headings: {
      principle: "Repair access before adding authority.",
      symptoms: "Where technical failures become commercial losses.",
      work: "A repair sequence engineers can verify.",
      workIntro: "Findings are ordered by affected patient demand, translated into implementation requirements and checked again in production.",
      measurement: "Technical progress is verified after release.",
      insights: "Read the evidence behind each technical priority.",
      insightsIntro: "Use the field notes to separate urgent access and selection problems from lower-value audit noise.",
    },
    symptoms: [
      "Priority treatment pages are excluded, duplicated or inconsistently canonicalised.",
      "JavaScript, redirects or templates obscure the main content and page purpose.",
      "Internal links do not communicate service, clinician and location relationships.",
      "Mobile performance adds friction before a patient can evaluate the clinic.",
    ],
    work: [
      { index: "01", title: "Trace access", body: "Audit crawl paths, response behaviour, indexation directives, rendering and the signals that identify preferred pages.", output: "Technical constraint register" },
      { index: "02", title: "Set priority", body: "Order repairs by patient demand and business value so engineering time protects the pages that matter most.", output: "Implementation sequence" },
      { index: "03", title: "Verify release", body: "Recheck production output, indexation signals and real-user performance instead of treating deployment as completion.", output: "Release evidence" },
    ],
    measures: [
      { label: "Access", value: "Crawl and response integrity" },
      { label: "Selection", value: "Canonical and indexation clarity" },
      { label: "Experience", value: "Mobile Core Web Vitals" },
    ],
    faqs: [
      { question: "Do we need a complete rebuild?", answer: "Usually not. The useful question is which technical constraint materially affects important pages. KaiRank prioritises the smallest reliable repair before recommending structural replacement." },
      { question: "Can KaiRank work with our developer?", answer: "Yes. Findings can be translated into implementation-ready requirements and verified after release with the clinic's internal or external development team." },
      { question: "Is site speed the whole technical audit?", answer: "No. Performance matters, but access, rendering, canonicalisation, indexation and internal architecture can suppress discovery even when a speed score looks healthy." },
    ],
  },
  {
    slug: "local-seo",
    navLabel: "Local SEO",
    primaryTopic: "Local SEO for healthcare",
    verifiedKeywordCluster: ["local SEO for healthcare", "healthcare local SEO"],
    updated: "2026-11-04",
    seoTitle: "Local SEO for Healthcare Clinics | UK",
    seoDescription: "Local SEO for UK healthcare clinics that connects services, locations, clinicians, Google Business Profiles and trusted evidence.",
    eyebrow: "Local SEO for healthcare · location meets intent",
    title: "Local SEO for healthcare clinics.",
    accent: "Make proximity become consideration.",
    description: "Local SEO for UK healthcare clinics that connects services, locations, clinicians and trusted evidence across the website and Google Business Profile.",
    promise: "Local visibility is earned through a coherent footprint: the right service in the right place, supported by consistent information and evidence a patient can evaluate.",
    diagnosticQuestion: "Does every location make its services, people and evidence unmistakably clear?",
    headings: {
      principle: "Model the real footprint before expanding it.",
      symptoms: "Where local relevance usually becomes unclear.",
      work: "A local system grounded in real clinic operations.",
      workIntro: "Each stage aligns the locations, services, clinicians and proof that patients and local search systems need to evaluate.",
      measurement: "Maps visibility is read with real patient actions.",
      insights: "Understand the decisions behind local growth.",
      insightsIntro: "Use the field notes to build genuine local usefulness without thin city pages or ranking promises.",
    },
    symptoms: [
      "One location page is expected to rank for every treatment and service area.",
      "Website and Google Business Profile information disagree or remain incomplete.",
      "Reviews exist, but the site does not connect them to relevant services and clinicians.",
      "Maps reporting presents isolated screenshots instead of repeatable local evidence.",
    ],
    work: [
      { index: "01", title: "Define the footprint", body: "Map real locations, service areas, treatments and practitioner relationships before creating local pages.", output: "Location-service model" },
      { index: "02", title: "Align the evidence", body: "Strengthen pages, profiles, categories, citations and review pathways around consistent real-world information.", output: "Local evidence build" },
      { index: "03", title: "Read the market", body: "Measure discovery by treatment and geography while separating relevance work from proximity and platform volatility.", output: "Local visibility review" },
    ],
    measures: [
      { label: "Profile", value: "Discovery and interaction trends" },
      { label: "Pages", value: "Location-treatment coverage" },
      { label: "Action", value: "Calls and direction requests" },
    ],
    faqs: [
      { question: "Can Local SEO guarantee a Maps position?", answer: "No. Maps ordering is controlled by Google and is affected by relevance, distance, prominence and the searcher's context. KaiRank strengthens the signals a clinic can legitimately control." },
      { question: "How does healthcare local SEO support multiple clinic locations?", answer: "Healthcare local SEO should connect each real location to the treatments, clinicians, opening information and evidence available there. KaiRank builds that location-service model first, then aligns the website and Google Business Profiles around it without manufacturing thin city pages." },
      { question: "Does every area need a location page?", answer: "No. Pages should represent real locations or genuinely useful service-area information. Thin city variants create noise without improving patient understanding." },
      { question: "How are reviews used?", answer: "Reviews support patient trust and local prominence, but the process must remain authentic and platform-compliant. KaiRank does not manufacture or gate reviews." },
    ],
  },
  {
    slug: "ai-search-optimisation",
    navLabel: "AI search optimisation",
    primaryTopic: "AI search optimisation for healthcare",
    verifiedKeywordCluster: [],
    updated: "2026-11-04",
    seoTitle: "AI Search Optimisation for UK Healthcare",
    seoDescription: "AI search optimisation for UK healthcare using clear entities, clinical expertise, citations and first-party evidence across AI answers and search.",
    eyebrow: "AI search optimisation for healthcare · entity clarity",
    title: "AI search optimisation for healthcare.",
    accent: "Make your clinic easier to interpret.",
    description: "AI search optimisation for UK healthcare built on clear entities, services, locations, expertise, citations and useful first-party evidence.",
    promise: "There is no shortcut that guarantees a citation. The defensible work is to make the clinic's real expertise and relationships explicit, useful and consistently evidenced.",
    diagnosticQuestion: "Can a search system confidently connect this clinic, clinician, service, place and proof?",
    headings: {
      principle: "Clarify real entities before chasing citations.",
      symptoms: "Where AI retrieval loses confidence in the clinic.",
      work: "An evidence system people can verify.",
      workIntro: "The sequence makes real expertise easier to retrieve while keeping visible content, source evidence and structured data aligned.",
      measurement: "Observe retrieval signals without inventing certainty.",
      insights: "Read the principles behind AI discoverability.",
      insightsIntro: "Use the field notes to strengthen retrieval, authorship and evidence without treating third-party citations as guaranteed outcomes.",
    },
    symptoms: [
      "Services and clinical expertise are described without clear entity relationships.",
      "Important claims lack first-party evidence, authorship or source context.",
      "Structured data conflicts with what visitors can actually see on the page.",
      "An AI-content programme is producing volume without a distinct point of view.",
    ],
    work: [
      { index: "01", title: "Clarify entities", body: "Connect the clinic, locations, clinicians, treatments and authoritative profiles in visible content and structured data.", output: "Entity relationship map" },
      { index: "02", title: "Strengthen evidence", body: "Publish useful first-party material with clear authorship, methods, sources and claims that can withstand human scrutiny.", output: "Evidence-led content system" },
      { index: "03", title: "Observe carefully", body: "Track cited pages and referral behaviour as directional evidence without relabelling mentions as guaranteed visibility or revenue.", output: "AI discovery watchlist" },
    ],
    measures: [
      { label: "Clarity", value: "Entity and service consistency" },
      { label: "Evidence", value: "Cited first-party pages" },
      { label: "Discovery", value: "Qualified referral signals" },
    ],
    faqs: [
      { question: "Can KaiRank guarantee AI citations?", answer: "No. AI interfaces and source selection are controlled by third parties. KaiRank improves clarity and evidence, then measures what can be observed reliably." },
      { question: "Is this separate from SEO?", answer: "It is an extension of strong search and content foundations, not a replacement. Accessible pages, explicit expertise, useful original material and consistent entities matter across conventional and emerging search." },
      { question: "Should we publish large volumes of AI-written content?", answer: "Not by default. Commodity content creates little defensible value. The priority is material grounded in the clinic's actual expertise, questions, evidence and patient needs." },
    ],
  },
  {
    slug: "healthcare-seo",
    navLabel: "Healthcare SEO services",
    primaryTopic: "Healthcare SEO for private clinics",
    verifiedKeywordCluster: ["healthcare SEO agency", "healthcare SEO services", "healthcare SEO", "SEO for healthcare", "medical SEO agency", "SEO services for healthcare", "medical SEO services", "clinic SEO"],
    updated: "2026-11-04",
    seoTitle: "Healthcare SEO Agency & Services UK",
    seoDescription: "A founder-led healthcare SEO agency for UK private clinics, combining technical clarity, local relevance, clinical expertise and patient-centred search journeys.",
    eyebrow: "UK healthcare SEO services · high-consideration search",
    title: "Healthcare SEO for private clinics.",
    accent: "Build trust at every decision.",
    description: "A founder-led healthcare SEO agency for UK private clinics, connecting treatment demand, technical clarity, local relevance and patient trust.",
    promise: "The goal is not more activity. It is a clearer route from valuable treatment demand to a clinic patients can find, evaluate and contact with confidence.",
    diagnosticQuestion: "Where does qualified patient demand lose the route to your clinic?",
    headings: {
      principle: "Map demand, then earn the patient’s confidence.",
      symptoms: "Where clinic SEO loses qualified patient demand.",
      work: "A healthcare search strategy your team can inspect.",
      workIntro: "Each stage connects a priority treatment to an owned page, credible evidence, an implementation decision and a measurable patient action.",
      measurement: "Visibility, trust and patient intent stay distinct.",
      insights: "See what credible healthcare SEO requires.",
      insightsIntro: "Use the field notes to evaluate technical, clinical and content decisions before turning them into a campaign.",
    },
    symptoms: [
      "High-value treatments are buried beneath directories or clearer competitors.",
      "Clinician, treatment and location pages operate as disconnected templates.",
      "Pages pursue keywords while leaving patient questions and next steps unresolved.",
      "Reporting counts rankings without showing qualified patient action.",
    ],
    work: [
      { index: "01", title: "Map demand", body: "Connect priority treatments, locations and patient language to the pages and search surfaces that shape consideration.", output: "Demand and constraint map" },
      { index: "02", title: "Repair discovery and trust", body: "Fix the technical, local, structural or evidence layer preventing the clinic from surfacing credibly.", output: "Prioritised implementation" },
      { index: "03", title: "Measure action", body: "Separate visibility, engagement, enquiries and booking intent, then compound what creates qualified action.", output: "Measured growth loop" },
    ],
    measures: [
      { label: "Discovery", value: "Priority treatment and non-brand reach" },
      { label: "Trust", value: "Clinician, treatment and evidence engagement" },
      { label: "Action", value: "Calls, enquiries and booking intent" },
    ],
    faqs: [
      { question: "Is KaiRank a healthcare SEO agency, medical SEO agency or consultant?", answer: "Clinics often use healthcare SEO agency, medical SEO agency and healthcare SEO consultant for similar support. KaiRank combines the accountability of a founder-led consultant with connected delivery: one strategic lead stays close to diagnosis, priorities, implementation and measurement, while working directly with the clinic's existing specialists where useful." },
      { question: "How should a clinic compare healthcare SEO companies?", answer: "Compare the diagnosis, implementation ownership, evidence standard and measurement boundaries—not the length of a deliverables list. Credible SEO services for healthcare should separate rankings, estimates, enquiries, booking intent and completed appointments. Medical SEO services should never promise outcomes controlled by search platforms." },
      { question: "What makes healthcare SEO different?", answer: "Healthcare decisions carry more risk and scrutiny. Content needs clearer expertise, sourcing, ownership and patient-centred explanation than a generic service page." },
      { question: "Is this a fixed SEO package?", answer: "No. The opening priority depends on the clinic's actual constraint. A technically blocked site needs a different first move from a clinic with strong access but weak treatment or local relevance." },
      { question: "Does KaiRank write medical advice?", answer: "No. Clinical claims and advice should come from appropriately qualified people. KaiRank structures search demand, content requirements and evidence so the clinic's expertise can be presented clearly." },
      { question: "Can this support multiple clinicians or locations?", answer: "Yes. The architecture can connect services, specialties, practitioners and locations without duplicating pages or obscuring which entity is responsible for what." },
    ],
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export type CaseStudyDefinition = {
  slug: string;
  client: string;
  market: string;
  period: string;
  published: string;
  updated: string;
  title: string;
  accent: string;
  description: string;
  sourceUrl: string;
  sourceLabel: string;
  metrics: readonly { value: string; label: string; note: string }[];
  challenge: string;
  work: readonly { index: string; title: string; body: string }[];
  evidence: readonly { title: string; body: string; source: string }[];
  limitations: readonly string[];
};

export const caseStudies: readonly CaseStudyDefinition[] = [
  {
    slug: "the-recovery-room",
    client: "The Recovery Room",
    market: "Birmingham, United Kingdom",
    period: "April–September 2026",
    published: "2026-09-06",
    updated: "2026-09-25",
    title: "From an indexing barrier to",
    accent: "180K search impressions.",
    description: "How technical, local and content SEO grew a Birmingham massage clinic to 3,027 Google Search clicks and measurable booking intent.",
    sourceUrl: "https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing",
    sourceLabel: "Open the full source report",
    metrics: [
      { value: "3.03K", label: "Google Search clicks", note: "3,027 clicks · Search Console · 12 April–21 September 2026" },
      { value: "180K", label: "Search impressions", note: "180,419 impressions · same property and six-month view" },
      { value: "#1", label: "Priority treatment query", note: "Deep tissue massage Birmingham · Semrush tracking · 18–24 September 2026" },
      { value: "629", label: "Treatwell-link clicks", note: "Sitewide GA4 event · 26 June–23 September 2026 · not confirmed bookings" },
    ],
    challenge: "The clinic had a strong service proposition, but an indexing barrier and limited non-brand reach restricted discovery. The priority was to make the site reliably accessible first, then strengthen Birmingham treatment intent, supporting content and the measurement path from search to action.",
    work: [
      { index: "01", title: "Resolve access first", body: "Indexability and crawlability issues were addressed before content was scaled." },
      { index: "02", title: "Sharpen treatment intent", body: "Priority service pages were strengthened around commercial Birmingham searches and clearer conversion paths." },
      { index: "03", title: "Build supporting demand", body: "Content around pain, recovery and treatment questions expanded topical coverage and linked readers back to commercial pages." },
      { index: "04", title: "Connect local signals and action", body: "Local relevance was reinforced while Search Console and GA4 measured acquisition, engagement and on-site booking intent separately." },
    ],
    evidence: [
      { title: "+204% Search clicks", body: "Clicks increased from 271 in the first 28 days of the six-month dataset to 825 in the latest 28 days.", source: "Google Search Console · 12 Apr–21 Sep 2026" },
      { title: "+500% search impressions", body: "Impressions increased from 8.5K in the first 28 days to 51K in the latest 28 days of the same dataset.", source: "Google Search Console · 12 Apr–21 Sep 2026" },
      { title: "242 organic keywords", body: "Semrush reported 242 organic keywords, up 29%, and 416 estimated organic traffic, up 63%, on 24 September.", source: "Semrush · 24 September 2026" },
      { title: "2,619 organic sessions", body: "The 90-day GA4 view recorded an 83.3% engagement rate, 629 Treatwell-link clicks and 46 form submissions.", source: "Google Analytics 4 · 26 Jun–23 Sep 2026" },
    ],
    limitations: [
      "The +204% clicks and +500% impressions comparisons use the first and latest 28 days inside the same six-month Search Console dataset.",
      "Semrush rankings, keyword counts and traffic are point-in-time third-party estimates and are kept separate from first-party Search Console data.",
      "The 629 Treatwell-link clicks and 46 form submissions are sitewide tracked events. They indicate booking intent and conversion activity, not confirmed appointments or organic-attributed revenue.",
      "Rankings are time- and location-sensitive and are not guaranteed to persist.",
    ],
  },
  {
    slug: "south-city-hospital",
    client: "South City Hospital",
    market: "Karachi, Pakistan",
    period: "July 2025–August 2026",
    published: "2026-09-06",
    updated: "2026-11-10",
    title: "One healthcare system.",
    accent: "A much larger discovery footprint.",
    description: "How a multi-phase SEO programme connected a multi-specialty hospital, more than 200 consultants and high-intent treatment demand across search surfaces.",
    sourceUrl: "https://drive.google.com/file/d/11BBxopRazl8Ax1xp5eq_EFa2ogM737Lv/view?usp=sharing",
    sourceLabel: "Open the current source report",
    metrics: [
      { value: "40.5K", label: "Google Search clicks", note: "Google Search Console · August 2026" },
      { value: "522K", label: "Search impressions", note: "Google Search Console · August 2026" },
      { value: "700", label: "Doctor-related search terms", note: "Tracked Google visibility · August 2026" },
      { value: "8,801", label: "Google Business Profile calls", note: "July 2026 · calls, not confirmed appointments" },
    ],
    challenge: "The hospital had substantial offline credibility but weak individual doctor discovery, treatment terms beyond page two, inconsistent technical foundations and limited measurement. A useful solution had to model a healthcare system rather than optimise isolated pages.",
    work: [
      { index: "01", title: "Technical foundation", body: "Crawl depth, indexation, performance and schema issues were addressed first." },
      { index: "02", title: "Treatment architecture", body: "Departments and high-intent treatments were mapped to patient search language and connected internally." },
      { index: "03", title: "Doctor profile system", body: "Profiles connected each consultant's name, specialty, conditions and location signals." },
      { index: "04", title: "Local and entity visibility", body: "Google Business Profile and entity evidence were strengthened and monitored across conventional and emerging search." },
    ],
    evidence: [
      { title: "40.5K clicks · 522K impressions", body: "Google Search Console recorded 40.5K clicks and 522K impressions in August 2026, after the primary growth programme moved into ongoing maintenance.", source: "Google Search Console · August 2026" },
      { title: "700 doctor-related terms", body: "Tracked visibility connected consultant names and specialties to hundreds of doctor-related Google searches in August 2026.", source: "Tracked Google visibility · August 2026" },
      { title: "8,801 profile calls", body: "Google Business Profile reporting recorded 8,801 call actions and 17,790 total interactions during July 2026.", source: "Google Business Profile · July 2026" },
      { title: "~250 → 3,900 keywords", body: "At the May/June 2026 campaign peak, third-party reporting showed an increase from roughly 250 to 3,900 ranking keywords and 46K+ estimated monthly organic traffic.", source: "SEMrush · May/June 2026" },
    ],
    limitations: [
      "The August 2026 click and impression figures are first-party Search Console measurements; they are not patient, appointment or revenue totals.",
      "The 46K+ traffic and 3,900-keyword campaign-peak figures are third-party SEMrush estimates, not first-party session counts.",
      "Google Business Profile calls represent call actions, not confirmed appointments, patients or revenue.",
      "AI visibility scores and cited-page counts are directional third-party measurements and do not imply guaranteed citations.",
      "Karachi is a different healthcare market from the United Kingdom; the case demonstrates architecture and execution at scale, not an identical competitive environment.",
    ],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
