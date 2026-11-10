# KaiRank search ownership and publishing map

This document records the launch architecture implemented on the `kairank-rebuild` branch and refined on 22 September 2026. It is based on `KaiRank_Keyword_Research_Master_UK_v5.xlsx`, including the UK-confirmed competitor export and the separate 12-row Keyword Manager export.

Keyword volumes and difficulty scores are research inputs, not permanent facts. Recheck the target market, live results, volume and intent before adding a new commercial URL. For UK planning, use only the user-confirmed UK competitor-export values. Keep Keyword Manager-only and legacy values separate because their geography is not confirmed.

## Commercial page ownership

| URL | Primary query | Supporting query family | Role |
| --- | --- | --- | --- |
| `/` | Brand + healthcare SEO proposition | Descriptive homepage language only; no separate high-volume cluster assigned | UK-primary entity, proposition, proof and conversion authority; avoid competing with `/healthcare-seo` |
| `/services` | Service discovery hub | No separate keyword cluster assigned | Compare the four intervention types without competing with their service pages |
| `/healthcare-seo` | healthcare SEO agency (UK 1,300/KD8) | healthcare SEO services (1,000/KD6), healthcare SEO (1,600/KD25), SEO for healthcare (880/KD21), medical SEO agency (720/KD16), seo services for healthcare (590/KD9), medical SEO services (590/KD9), clinic SEO (140/KD6) | Primary healthcare-specialist commercial page for clinics, consultants and groups |
| `/technical-seo` | UK primary keyword not yet verified | Descriptive technical-SEO language only; do not use the manager-only 3,600/KD19 as UK evidence | Technical access, selection and performance service |
| `/local-seo` | local SEO for healthcare (UK 320/KD19; mixed-intent gate) | healthcare local SEO (260/KD22) | Local and Maps service; verify the current UK service-page SERP before broadening the cluster |
| `/ai-search-optimisation` | UK primary keyword not yet verified | Descriptive AI-search language only; legacy 110/KD6 data is not UK-confirmed | AI retrieval, entity and evidence service |

The homepage should not repeat every service page. It establishes KaiRank as the UK-primary specialist entity, communicates the commercial promise and routes visitors and internal authority into the page that owns each constraint.

`/seo` permanently redirects to `/healthcare-seo`. This removes commercial-intent overlap and concentrates internal authority on one definitive healthcare SEO page.

## Geography decision

The United Kingdom is the primary launch market. Current proof, British-English terminology and the private-clinic proposition are strongest there. The `.com` domain remains appropriate for later expansion, but US pages should be added only after US-specific search research, terminology, evidence and regulatory context exist. Do not publish copied `/us/` variants or mix UK and US spellings to manufacture geographic reach.

## AEO, GEO and structured data boundary

Organization, Person, WebSite, Service, BreadcrumbList, BlogPosting, Article and FAQPage entities describe content that visitors can verify on the page. FAQ markup remains semantically aligned with the visible questions, but Google removed the FAQ rich-result feature in May 2026; the markup is not treated as a ranking or rich-result shortcut. Google's current generative-AI guidance says the same crawlability, originality, technical clarity and people-first content principles apply, and that no special AI schema or `llms.txt` file is required for Google Search.

Article and case-study pages use visible authorship, genuine publish/update dates and a unique representative social image. Keep those elements accurate when an article is revised; never advance a date without a substantive change.

## Blog ownership

The `/insights` route is the healthcare SEO blog and evidence-led learning hub. Its articles answer informational questions, demonstrate reasoning and link to the relevant commercial page.

Current editorial topics include. They are useful supporting topics, not claims of verified UK search volume or difficulty:

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

1. Assign one verified primary query and one search intent. Confirm the data source, market, date and that no existing page already owns it.
2. Define the clinic decision the article will help resolve.
3. Add original experience, a clear method, useful examples or first-party evidence. Do not publish a generic search summary.
4. Name the author and qualified clinical reviewer when the subject includes medical guidance or consequential clinical claims.
5. Link to the one service page that logically continues the journey and to related evidence where useful.
6. Use a descriptive title, one H1, a useful summary, a stable canonical URL and a genuine published/updated date.
7. Check every source, claim boundary and call to action on mobile and desktop.
8. After launch, evaluate impressions, clicks, qualified journeys and actions separately. Do not treat traffic as a patient or revenue outcome.

## Expansion gate

The research includes promising med-spa and dental clusters. They remain Phase 2. Create either specialist service page only after KaiRank can provide a distinct audience proposition, non-duplicative copy, subject expertise and relevant proof. A low difficulty score alone is not enough reason to publish a commercial page.
