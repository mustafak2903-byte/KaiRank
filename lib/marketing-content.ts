export type ServiceDefinition = {
  slug: string;
  navLabel: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  promise: string;
  diagnosticQuestion: string;
  symptoms: readonly string[];
  work: readonly { index: string; title: string; body: string; output: string }[];
  measures: readonly { label: string; value: string }[];
  faqs: readonly { question: string; answer: string }[];
};

export const services: readonly ServiceDefinition[] = [
  {
    slug: "seo",
    navLabel: "SEO",
    seoTitle: "SEO for clinics and private healthcare",
    seoDescription: "SEO for clinics that connects technical access, treatment demand, local evidence and measurable patient action across Google, Maps and AI search.",
    eyebrow: "Search visibility system",
    title: "Turn clinic expertise into",
    accent: "discoverable demand.",
    description: "SEO for private clinics that finds the constraint suppressing discovery and connects technical access, treatment relevance, local evidence and measurable action.",
    promise: "The goal is not more activity. It is a clearer route from valuable treatment demand to a clinic patients can find, evaluate and contact.",
    diagnosticQuestion: "Where does qualified patient demand lose the route to your clinic?",
    symptoms: [
      "High-value treatments are buried beneath directories or competitors.",
      "Organic traffic exists, but it does not reach treatment or contact pages.",
      "Technical, local and content work happen without one commercial priority.",
      "Reporting counts rankings without showing qualified on-site action.",
    ],
    work: [
      { index: "01", title: "Map demand", body: "Connect priority treatments, locations and patient language to the pages and search surfaces that shape consideration.", output: "Demand and constraint map" },
      { index: "02", title: "Repair discovery", body: "Fix the technical, structural, local or authority layer preventing the clinic from surfacing credibly.", output: "Prioritised implementation" },
      { index: "03", title: "Measure action", body: "Separate visibility from meaningful behaviour, then compound what creates qualified visits, calls, enquiries and booking intent.", output: "Measured growth loop" },
    ],
    measures: [
      { label: "Discovery", value: "Impressions and non-brand coverage" },
      { label: "Consideration", value: "Treatment-page engagement" },
      { label: "Action", value: "Calls, enquiries and booking intent" },
    ],
    faqs: [
      { question: "Is this a fixed SEO package?", answer: "No. The first priority depends on the clinic's actual constraint. A technically blocked site needs a different opening move from a clinic with strong access but weak treatment or local relevance." },
      { question: "Does KaiRank implement the work?", answer: "KaiRank can lead delivery or provide the diagnosis, priorities and measurement layer for your developers, writers or existing agency." },
      { question: "How quickly should a clinic expect change?", answer: "Technical access can change quickly. Competitive treatment and local visibility usually compound over months, depending on the starting point, market and implementation pace." },
    ],
  },
  {
    slug: "technical-seo",
    navLabel: "Technical SEO",
    seoTitle: "Technical SEO audit service for private clinics",
    seoDescription: "A technical SEO audit service for private clinics covering crawling, rendering, indexation, canonicalisation, internal architecture and mobile performance.",
    eyebrow: "Access before amplification",
    title: "Make every valuable clinic page",
    accent: "reachable and interpretable.",
    description: "Technical SEO for private clinics that removes crawl, indexation, rendering, duplication and performance constraints before content is asked to compete.",
    promise: "If search systems cannot reliably access, select and understand the right page, stronger copy and authority are being built on a compromised foundation.",
    diagnosticQuestion: "Can search systems consistently reach, select and render the pages patients need?",
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
    seoTitle: "Local SEO for medical clinics",
    seoDescription: "Local SEO for medical clinics that connects treatments, locations, clinicians, Google Business Profile signals and evidence patients can evaluate.",
    eyebrow: "Location meets treatment intent",
    title: "Help nearby patients understand",
    accent: "why this clinic is relevant.",
    description: "Local SEO for clinics that connects services, locations, clinicians and trusted evidence across the website and Google Business Profile.",
    promise: "Local visibility is earned through a coherent footprint: the right service in the right place, supported by consistent information and evidence a patient can evaluate.",
    diagnosticQuestion: "Does every location make its services, people and evidence unmistakably clear?",
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
      { question: "Does every area need a location page?", answer: "No. Pages should represent real locations or genuinely useful service-area information. Thin city variants create noise without improving patient understanding." },
      { question: "How are reviews used?", answer: "Reviews support patient trust and local prominence, but the process must remain authentic and platform-compliant. KaiRank does not manufacture or gate reviews." },
    ],
  },
  {
    slug: "ai-search-optimisation",
    navLabel: "AI search optimisation",
    seoTitle: "AI search optimisation for healthcare",
    seoDescription: "AI search optimisation for healthcare built on clear entities, clinical expertise, services, locations, citations and useful first-party evidence.",
    eyebrow: "Entity and evidence clarity",
    title: "Make the clinic easier for",
    accent: "emerging search systems to interpret.",
    description: "AI search optimisation built on clear entities, services, locations, expertise, citations and useful first-party evidence.",
    promise: "There is no shortcut that guarantees a citation. The defensible work is to make the clinic's real expertise and relationships explicit, useful and consistently evidenced.",
    diagnosticQuestion: "Can a search system confidently connect this clinic, clinician, service, place and proof?",
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
    navLabel: "Healthcare SEO",
    seoTitle: "SEO for healthcare and medical clinics",
    seoDescription: "Healthcare SEO for private clinics that makes expertise, authorship, clinical clarity and patient comprehension part of the search experience.",
    eyebrow: "High-consideration search",
    title: "Build visibility with the level of",
    accent: "trust healthcare demands.",
    description: "Healthcare SEO that makes expertise, authorship, clinical clarity and patient comprehension part of the search experience.",
    promise: "A healthcare page has to do two jobs at once: help search systems understand relevance and help a patient make a careful, informed next decision.",
    diagnosticQuestion: "Does the search experience make expertise and next steps clear without overclaiming?",
    symptoms: [
      "Clinician, treatment and location pages operate as disconnected templates.",
      "Clinical content has no clear author, reviewer, update context or evidence path.",
      "Pages pursue keywords while leaving patient questions and next steps unresolved.",
      "Measurement counts traffic without separating research intent from treatment demand.",
    ],
    work: [
      { index: "01", title: "Model the care journey", body: "Map the questions, treatments, specialists, locations and trust signals involved in a considered patient decision.", output: "Patient-search architecture" },
      { index: "02", title: "Make expertise visible", body: "Strengthen clinician, service and evidence pages with clear ownership, review context and useful internal relationships.", output: "Trust and content build" },
      { index: "03", title: "Measure responsibly", body: "Separate visibility, engagement and action while preserving the difference between an enquiry, booking intent and a confirmed patient outcome.", output: "Qualified measurement model" },
    ],
    measures: [
      { label: "Reach", value: "Priority treatment discovery" },
      { label: "Trust", value: "Clinician and evidence engagement" },
      { label: "Intent", value: "Qualified enquiries and calls" },
    ],
    faqs: [
      { question: "What makes healthcare SEO different?", answer: "Healthcare decisions carry more risk and scrutiny. Content needs clearer expertise, sourcing, ownership and patient-centred explanation than a generic service page." },
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
    period: "April–August 2026",
    title: "From SEO foundation to",
    accent: "#1 commercial visibility.",
    description: "How a structured local SEO programme expanded discovery for a Birmingham massage clinic, produced a tracked #1 treatment query and increased booking intent.",
    sourceUrl: "https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing",
    sourceLabel: "Open the 12-page source report",
    metrics: [
      { value: "1.86K", label: "Google Search clicks", note: "Three-month Search Console view captured August 2026" },
      { value: "120K", label: "Search impressions", note: "Same property, metric and three-month view" },
      { value: "#1", label: "Priority treatment query", note: "Deep tissue massage Birmingham · SEMrush tracking · 22–28 August 2026" },
      { value: "214", label: "Booking-intent clicks", note: "Clicks to Treatwell actions · 28-day GA4 view · not confirmed bookings" },
    ],
    challenge: "The clinic had early visibility, a technical indexing barrier and a limited non-brand keyword footprint. The commercial opportunity was not simply to publish more: it was to restore access, strengthen the priority treatment route and connect discovery to measurable action.",
    work: [
      { index: "01", title: "Technical foundation", body: "Indexing barriers were resolved and crawlability strengthened before amplification." },
      { index: "02", title: "Commercial page relevance", body: "Priority service-page structure and Birmingham treatment relevance were sharpened." },
      { index: "03", title: "Content and internal routes", body: "Treatment and customer-need coverage connected informational demand to service pages." },
      { index: "04", title: "Local evidence and measurement", body: "Local signals were strengthened while GA4 recorded clicks from organic landing pages to booking actions." },
    ],
    evidence: [
      { title: "+808% impressions", body: "The comparable three-month Search Console view increased from 12.7K impressions in the April/May capture to 120K in August.", source: "Google Search Console" },
      { title: "+354% clicks", body: "The same three-month comparison increased from 387 clicks to 1.86K clicks.", source: "Google Search Console" },
      { title: "5 → 176 tracked keywords", body: "The report separates SEMrush's directional keyword estimates from actual Search Console clicks and impressions.", source: "SEMrush · August 2026" },
      { title: "Organic became the leading channel", body: "Approximately 2,000 Organic Search sessions appeared in the latest 90-day GA4 acquisition view.", source: "Google Analytics 4 · 28 August 2026" },
    ],
    limitations: [
      "Search Console comparisons use the same property, metric and three-month window, captured at different points in the campaign.",
      "SEMrush rankings, keyword counts and traffic are third-party directional estimates, not first-party analytics.",
      "The 214 figure records clicks to Treatwell booking actions. It does not represent confirmed appointments or revenue.",
      "Rankings are time- and location-sensitive and are not guaranteed to persist.",
    ],
  },
  {
    slug: "south-city-hospital",
    client: "South City Hospital",
    market: "Karachi, Pakistan",
    period: "July 2025–May 2026",
    title: "One healthcare system.",
    accent: "A much larger discovery footprint.",
    description: "How an 11-month SEO programme connected a multi-specialty hospital, more than 200 consultants and high-intent treatment demand across search surfaces.",
    sourceUrl: "https://drive.google.com/file/d/1liDUyqtgXvZD8adj3Wanulkv70N5hLvY/view?usp=sharing",
    sourceLabel: "Open the 15-page source report",
    metrics: [
      { value: "3,900", label: "Ranking keywords", note: "From roughly 250 · SEMrush · May/June 2026" },
      { value: "46K+", label: "Estimated monthly organic traffic", note: "SEMrush domain overview · June 2026" },
      { value: "194", label: "Doctor profiles in the top 10", note: "Tracked profile visibility · April 2026" },
      { value: "8,076", label: "Google Business Profile calls", note: "April 2026 · calls, not confirmed appointments" },
    ],
    challenge: "The hospital had substantial offline credibility but weak individual doctor discovery, treatment terms beyond page two, inconsistent technical foundations and limited measurement. A useful solution had to model a healthcare system rather than optimise isolated pages.",
    work: [
      { index: "01", title: "Technical foundation", body: "Crawl depth, indexation, performance and schema issues were addressed first." },
      { index: "02", title: "Treatment architecture", body: "Departments and high-intent treatments were mapped to patient search language and connected internally." },
      { index: "03", title: "Doctor profile system", body: "Profiles connected each consultant's name, specialty, conditions and location signals." },
      { index: "04", title: "Local and entity visibility", body: "Google Business Profile and entity evidence were strengthened and monitored across conventional and emerging search." },
    ],
    evidence: [
      { title: "~250 → 3,900 keywords", body: "The reported organic keyword footprint increased across treatments, specialties and doctor names over the 11-month programme.", source: "SEMrush · May/June 2026" },
      { title: "238K Search clicks", body: "The source records 238K clicks and 3.89M impressions during the July–December 2025 growth phase.", source: "Google Search Console" },
      { title: "194 doctor profiles", body: "The source reports 194 individual doctor profiles in Google's top 10 and 79+ at positions one to three.", source: "Tracked rankings · April 2026" },
      { title: "8,076 profile calls", body: "Google Business Profile reporting recorded 8,076 calls during April 2026 and 16.4K total interactions.", source: "Google Business Profile" },
    ],
    limitations: [
      "The 46K+ traffic and 3,900-keyword figures are third-party SEMrush estimates, not first-party session counts.",
      "Google Business Profile calls represent call actions, not confirmed appointments, patients or revenue.",
      "AI visibility scores and cited-page counts are directional third-party measurements and do not imply guaranteed citations.",
      "Karachi is a different healthcare market from the United Kingdom; the case demonstrates architecture and execution at scale, not an identical competitive environment.",
    ],
  },
] as const;

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
