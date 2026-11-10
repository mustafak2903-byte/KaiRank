# KaiRank surgical launch QA

Reviewed 4 November 2026 on `refinement/clinic-conversion-20260921` against the final local production build at `http://127.0.0.1:3134`.

## Executive verdict

The application code and final local production build are technically coherent and visually ready for a controlled Vercel release on the current hostname. The homepage, service system, evidence pages, diagnostic and booking journey now form one clear clinic-buyer path.

The currently deployed `https://kai-rank.vercel.app` is **not the final approved release**. A live crawl still finds the older homepage and stale `https://www.kairank.com` Open Graph and Twitter URLs. The P0 launch gate is therefore to deploy the approved build with `NEXT_PUBLIC_SITE_URL=https://kai-rank.vercel.app`, then repeat the live-origin checks. The local build itself contains no crawlable reference to the unconfigured hostname.

This does not support a promise that a new domain will rank immediately. Indexing, competition, authority, implementation pace and live search results remain outside the application. Two commercial research gaps are intentionally left unfilled rather than populated with unverified terms: UK technical-SEO service keywords and UK AI/GEO service keywords.

## Verified keyword boundary

The attached UK workbook was checked against the previously supplied copy and is byte-for-byte identical. Only user-confirmed UK competitor-export metrics are treated as verified planning evidence.

| Page | Verified ownership | Implementation decision |
| --- | --- | --- |
| `/healthcare-seo` | `healthcare seo agency` 1,300/KD8; `healthcare seo services` 1,000/KD6; `healthcare seo` 1,600/KD25; `seo for healthcare` 880/KD21; `medical seo agency` 720/KD16; `seo services for healthcare` 590/KD9; `medical seo services` 590/KD9; `clinic seo` 140/KD6 | One definitive commercial page. Exact primary language appears naturally in the title, opening copy and buyer FAQs. The homepage does not reuse the same title target. |
| `/local-seo` | `local seo for healthcare` 320/KD19; `healthcare local seo` 260/KD22 | The page uses the verified cluster naturally. The workbook records mixed service/article intent, so a current UK SERP review remains a gate before expanding the cluster. |
| `/technical-seo` | None verified for the UK service intent | The page stays useful and descriptive. The 3,600/KD19 `technical seo audit service` figure is excluded because it comes from a manager export whose country is unconfirmed. |
| `/ai-search-optimisation` | None verified for the UK service intent | The page stays useful and descriptive. The legacy 110/KD6 AI term is excluded because its UK scope is unconfirmed. |
| `/` and `/services` | No separate volume-led cluster | These pages own brand proposition and service discovery, preventing cannibalisation of `/healthcare-seo`. |

No Ubersuggest data is used in the ownership model, metadata or structured data.

## Search and page architecture

| Route group | Search job | Indexing and structured-data role |
| --- | --- | --- |
| `/` | Brand proposition, buyer qualification and routing | WebPage + visible FAQPage; links to services, proof, process and conversion routes |
| `/services` | Compare intervention types | CollectionPage + FAQPage + BreadcrumbList |
| Four service pages | Resolve one commercial constraint | Service + visible FAQPage + BreadcrumbList |
| `/case-studies` | Evaluate proof quality | CollectionPage + BreadcrumbList |
| Two case studies | Inspect methods, periods, sources and limitations | Article + BreadcrumbList |
| `/search-visibility-diagnostic` | Run a bounded public technical check | WebPage + BreadcrumbList; no invented ranking score or Search Console claim |
| `/insights` | Browse evidence-led editorial topics | Blog + BreadcrumbList |
| Seven insight pages | Answer one clinic-search decision | BlogPosting + BreadcrumbList with author and dates |
| `/about` | Verify founder accountability | ProfilePage + BreadcrumbList |
| `/contact` | Book a clinic visibility review | ContactPage + BreadcrumbList |
| `/privacy` | Understand data use | WebPage + BreadcrumbList |

`/seo` redirects permanently to `/healthcare-seo`, concentrating overlapping commercial intent on one canonical service page.

FAQ markup is limited to pages with visible, useful questions. It is not repeated mechanically on case studies, About, Contact or every article because that would add low-value boilerplate rather than improve answer quality.

Google removed the FAQ rich-result feature and its documentation in 2026. The visible FAQs remain useful for buyers and semantic clarity, and their markup matches the rendered content, but they are not treated as a rich-result or ranking shortcut.

## Verified keyword and internal-link audit

The rendered copy was checked against the verified workbook terms rather than inferred or third-party substitute data:

- `/healthcare-seo`: `healthcare seo agency` appears 4 times and is present in the title and H1; `healthcare seo services` 3; `healthcare seo` 12; `seo for healthcare` 1; `medical seo agency` 2; `seo services for healthcare` 1; `medical seo services` 1; `clinic seo` 1.
- `/local-seo`: `local seo for healthcare` appears 4 times and is present in the title and H1; `healthcare local seo` appears 2 times.
- Every indexable page has at least one contextual inbound link from main content. There are no sitemap orphans.
- The homepage links to the commercial service, proof, diagnostic, contact and editorial routes.
- The service hub links to all four service pages; service pages cross-link to the most relevant adjacent service and proof routes.
- The Insights hub now includes an editorial-to-service decision pathway linking all four service routes, while articles link back to their matching commercial or evidence route.
- The case-study hub and individual case studies link to the relevant service and conversion routes.

The UK technical-SEO and AI/GEO commercial clusters remain intentionally descriptive rather than volume-led because the supplied workbook does not verify UK volume and difficulty for them.

## Rendered SEO and technical QA

The production build exposed 21 indexable sitemap URLs. The final rendered audit returned:

- 21/21 routes with HTTP 200.
- One self-referencing canonical on every indexable route using the configured site origin.
- One H1 per page and no heading-level jumps.
- Unique titles and descriptions across all 21 routes.
- Open Graph URL, Open Graph image and Twitter image on every route.
- Parseable JSON-LD on every route.
- No image missing an `alt` attribute.
- No crawlable reference to an unconfigured `kairank.com` hostname.
- No broken internal links and no orphaned sitemap routes.
- `/robots.txt` and `/sitemap.xml` returned 200; an unknown route returned 404.
- Security headers were present: Content-Security-Policy, Strict-Transport-Security, Referrer-Policy, Permissions-Policy, X-Content-Type-Options and X-Frame-Options.
- `/seo` returned a permanent 308 redirect to `/healthcare-seo`; `/visual-system` carried `noindex` locally and is configured to redirect in production.
- `/feed.xml` returned valid RSS and the generated Open Graph image returned 200 as `image/png`.
- The audit endpoint rejected missing and private destinations, returned eleven evidence-complete checks for a public test site and did not invent unavailable performance data.
- Lint, TypeScript and production build passed after the final edits.

## Diagnostic integrity

The free website health check now reports eleven explicit public signals: response, HTTPS, title, meta description, canonical, H1, viewport, JSON-LD syntax, robots meta, robots.txt and sitemap.

Every result states the value observed, the public source checked, why it matters and what the check cannot prove. The interface explicitly says it is not Search Console data. Private and local destinations remain rejected server-side. PageSpeed data is treated as a separate lab-data enhancement and degrades honestly when Google quota is unavailable.

A future live Search Console product requires per-user Google OAuth, verified property selection, encrypted token storage, explicit scopes, revocation, privacy controls and a separate authenticated application surface. An email address alone cannot authorise Search Console access.

## CRO and interaction QA

- The primary action is consistently **Book a clinic visibility review**.
- Case-study and website-health-check links remain contextual secondary actions.
- Cal.com loads only after booking intent, opens inside KaiRank, loads the current event choices, closes with Escape and restores focus to the trigger.
- `booking_clicked`, `booking_opened` and `booking_completed` remain separate. Completion is not fired when the modal opens.
- Kai offers three bounded routes and does not claim live ranking data or medical advice.
- The mobile navigation and Kai panel close with Escape and return focus.
- All 21 indexable pages were inspected at 390 × 844 with no horizontal overflow, empty interactive controls or missing image alternatives.
- Nine representative routes were inspected at 1440 × 900: Home, Services, Healthcare SEO, Local SEO, The Recovery Room, the diagnostic, Insights, About and Contact. All retained one H1 and no horizontal overflow.
- The booking embed produced two harmless third-party Cal.com CSS-variable reset warnings but no first-party console errors.

The Cal flow was not taken through a real completed appointment during QA because that would create an external booking. Complete one owner-approved test booking on the deployed hostname before launch.

## Experience and visual direction

The final system uses original, restrained interaction patterns instead of copied theme code:

- scroll-linked section progress and reveal behaviour;
- pointer-responsive evidence surfaces;
- lightweight animated visibility traces on commercial pages;
- a compact mobile patient-decision-path card so the signature visual layer is no longer hidden on small screens;
- an editorial-to-service pathway on the Insights hub;
- reduced-motion fallbacks;
- editorial typography, calm proof, high-contrast calls to action and real founder imagery.

This keeps the experience distinctive without introducing a large WebGL payload, animation-led distraction or a generic component-library look.

The additional visual theme was not replaced with copied proprietary theme code. It is implemented as KaiRank's own patient-search observatory language across the hero decision path, visibility-gap map, clinic-visibility orbit, proof flow, diagnostic scanner and service-page traces. The earlier mobile build hid the hero signal card; that omission has been corrected.

## Release status

**Local code/build:** approved for controlled deployment.

**Current public deployment:** not approved as final until the stale build is replaced and the live-origin crawl confirms the configured Vercel hostname in canonicals, Open Graph, Twitter, robots, sitemap and JSON-LD.

After deployment, perform one owner-approved completed Cal.com booking, confirm the KaiRank-specific Cal profile/event copy, verify Search Console ownership, submit the sitemap and inspect the key commercial URLs. Search discovery can then begin, but indexing dates and rankings cannot be guaranteed.

## Inputs still needed from the owner

1. A UK-only technical SEO service export containing keyword, UK monthly volume, KD, intent, source/date and the current ranking page types for: `technical seo audit service`, `technical seo services`, `technical seo agency`, `technical seo consultant`, `technical website audit` and relevant healthcare variants.
2. A UK-only AI/GEO/AEO service export with the same fields for: `ai search optimisation for healthcare`, `healthcare ai seo`, `geo for clinics`, `ai search agency healthcare`, `answer engine optimisation healthcare` and close variants.
3. A current UK SERP capture for `local seo for healthcare` and `healthcare local seo` to confirm whether service pages or informational guides dominate.
4. A completed Cal.com test booking, followed by confirmation that the public Cal profile and event names represent KaiRank rather than the broader personal portfolio.
5. Production environment values, Vercel branch tracking, Search Console ownership and sitemap submission after the approved deployment.

Do not add new keyword claims until the missing UK research is supplied. When it is available, update the central page-ownership map first, then metadata, visible copy, internal anchors and supporting content together.
