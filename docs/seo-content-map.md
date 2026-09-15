# KaiRank search ownership and publishing map

This document records the launch architecture implemented on the `kairank-rebuild` branch. It is based on `KaiRank_Keyword_Research_Master_v3.xlsm` and the 12-row Keyword Manager export in the KaiRank Google Drive folder, reviewed on 13 September 2026.

Keyword volumes and difficulty scores are research inputs, not permanent facts. Recheck the target market, search results, volume and intent before adding a new commercial URL. The two supplied files disagree on the `seo for healthcare` volume: the newer shortlist reports 2.9K volume and KD 29, while the master workbook records 2.4K and leaves difficulty pending. The query remains a priority; the metric should not be published as a claim until revalidated.

## Commercial page ownership

| URL | Primary query | Supporting query family | Role |
| --- | --- | --- | --- |
| `/` | UK healthcare SEO agency for private clinics | healthcare SEO company UK, healthcare SEO consultants, search visibility for private clinics | UK-primary entity, proposition and routing authority |
| `/services` | healthcare SEO services | private clinic SEO services, medical SEO services | Service discovery and comparison hub |
| `/seo` | SEO for private clinics | clinic SEO strategy, UK clinic SEO | Demand mapping, page ownership and connected clinic SEO strategy |
| `/healthcare-seo` | healthcare SEO services UK | SEO for healthcare, SEO for medical clinics, healthcare SEO consultants | Broader healthcare-specialist service for clinics, consultants and groups |
| `/technical-seo` | technical SEO audit service | technical SEO for healthcare, healthcare website optimisation, crawling SEO | Technical access, selection and performance service |
| `/local-seo` | local SEO for medical clinics | local SEO for medical practices UK, local SEO for doctors, healthcare directory optimisation | Local and Maps service |
| `/ai-search-optimisation` | AI search optimisation for healthcare | AI search optimization for healthcare, healthcare AEO, medical content AI discoverability | AI retrieval, entity and evidence service |

The homepage should not repeat every service page. It establishes KaiRank as the UK-primary specialist entity, communicates the commercial promise and routes visitors and internal authority into the page that owns each constraint.

## Geography decision

The United Kingdom is the primary launch market. Current proof, British-English terminology and the private-clinic proposition are strongest there. The `.com` domain remains appropriate because KaiRank can support work in the United States, but US pages should be added only after US-specific search research, terminology, evidence and regulatory context exist. Do not publish copied `/us/` variants or mix UK and US spellings to manufacture geographic reach.

## AEO, GEO and structured data boundary

Organization, Person, WebSite, Service, BreadcrumbList, BlogPosting, Article and FAQPage entities describe content that visitors can verify on the page. FAQ markup remains semantically aligned with the visible questions, but Google removed the FAQ rich-result feature in May 2026; the markup is not treated as a ranking or rich-result shortcut. Google's current generative-AI guidance says the same crawlability, originality, technical clarity and people-first content principles apply, and that no special AI schema or `llms.txt` file is required for Google Search.

Article and case-study pages use visible authorship, genuine publish/update dates and a unique representative social image. Keep those elements accurate when an article is revised; never advance a date without a substantive change.

## Blog ownership

The `/insights` route is the healthcare SEO blog and evidence-led learning hub. Its articles answer informational questions, demonstrate reasoning and link to the relevant commercial page.

Current keyword-led articles include:

- `/insights/healthcare-website-optimisation` — `optimizing healthcare websites`, `healthcare website optimisation`, `on-page SEO services healthcare`
- `/insights/why-local-seo-matters-medical-practices` — `importance of local SEO for medical practices`, `local SEO for doctors`, `healthcare directory optimisation`
- `/insights/healthcare-answer-engine-optimisation` — `healthcare answer engine optimisation`, `AI search optimisation for medical websites`, `healthcare visibility in AI search engines`
- `/insights/healthcare-content-strategy` — `healthcare content strategy`, `healthcare website content`, `content marketing workflow healthcare`
- `/insights/prioritise-technical-seo-audit-private-clinic` — private-clinic technical audit prioritisation, supporting the commercial audit page without duplicating its service intent
- `/insights/clinic-location-pages-without-doorway-content` — clinic location-page architecture, supporting the local SEO service
- `/insights/what-ai-search-changes-for-healthcare-websites` — structuring medical content for AI discoverability, supporting the AI-search service

The hub, static route generation, article structured data, sitemap entries and RSS feed all read from `lib/insights-content.ts`. Adding a complete object there publishes a new article through the same system.

## Content gate for every new article

Before publishing:

1. Assign one primary query and one search intent. Confirm that no existing page already owns it.
2. Define the clinic decision the article will help resolve.
3. Add original experience, a clear method, useful examples or first-party evidence. Do not publish a generic search summary.
4. Name the author and qualified clinical reviewer when the subject includes medical guidance or consequential clinical claims.
5. Link to the one service page that logically continues the journey and to related evidence where useful.
6. Use a descriptive title, one H1, a useful summary, a stable canonical URL and a genuine published/updated date.
7. Check every source, claim boundary and call to action on mobile and desktop.
8. After launch, evaluate impressions, clicks, qualified journeys and actions separately. Do not treat traffic as a patient or revenue outcome.

## Expansion gate

The research includes promising med-spa and dental clusters. They remain Phase 2. Create either specialist service page only after KaiRank can provide a distinct audience proposition, non-duplicative copy, subject expertise and relevant proof. A low difficulty score alone is not enough reason to publish a commercial page.
