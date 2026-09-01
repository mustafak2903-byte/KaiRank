# KaiRank V5 implementation notes

## What V5 preserves

V5 keeps the committed V3 rollback at `5b89b9b` and preserves its Instrument Serif editorial typography, ink/ivory rhythm, periwinkle SIGNAL path, native scroll behaviour, patient-query visual, cost-of-invisibility sequence, interactive capability stage, Recovery Room progression and Diagnose / Engineer / Compound process. No animation, UI-kit, WebGL or smooth-scroll dependency was added.

The deliberate visual signature remains the same clinic-discovery topology: a patient query moves across Search, Maps and AI while the clinic either enters or misses the consideration set. V5 makes that topology respond to visitor-supplied diagnostic context without presenting it as live ranking data.

## Search Visibility Diagnostic

The product hierarchy is now explicit:

1. **Search Visibility Diagnostic** — the visitor-facing product.
2. **Fast Technical Check** — a live server-side check using only the website field.
3. **Visibility Gap** — progressive location/treatment context plus transparent public website-signal analysis.
4. **Full Search Visibility Review** — optional lead capture only after useful output is visible.

Visible URL handling no longer prepends a decorative protocol, and server normalisation accepts bare domains, `www`, HTTP, HTTPS and repeated-protocol paste such as `https://https://example.com`. The SSRF, DNS, redirect, timeout and response-size protections remain in `lib/audit.ts`.

The result UI groups 10 checks into Technical Access, Page Fundamentals, Indexation Signals, Structure and Mobile Readiness. All individual evidence remains available through a controlled disclosure. PageSpeed remains independent optional enrichment.

## Live Recovery Room verification

On 1 September 2026, `POST /api/audit` checked `https://therecoveryroom.org.uk/` live and returned:

- HTTP 200 over HTTPS
- approximately 1.4–1.6 seconds public response time during local QA
- title: `Expert Massage and Wellness Hub | The Recovery Room`
- description: `Expert Massage and Wellness Hub`
- canonical: `https://therecoveryroom.org.uk/`
- one H1 element
- two JSON-LD blocks
- `robots.txt` found with HTTP 200
- sitemap found with HTTP 200
- mobile viewport declared

These are not hardcoded into the interface. The live audit result remains separate from the case-study performance metrics.

## Verified proof source

The read-only source of truth was rechecked at `mustafak2903-byte/mustafa-portfolio`, branch `portfolio-rebuild`, commit `19e6474d2632c4811bb0534d8ccb66d61f4ab81a`, primarily `lib/case-studies.ts`.

- The Recovery Room: +808% search impressions, +354% organic clicks, #1 for “Deep Tissue Massage Birmingham”, 1.86K organic search clicks, 120K search impressions and 214 booking-intent clicks in 28 days.
- South City Hospital: 46K+ monthly organic visits, 3,900 ranking keywords, 194 doctor profiles in the top 10 and 8,076 patient calls in one month.

The source repository provides report links but no analytics screenshots. V5 therefore provides stronger, keyboard-accessible evidence disclosures and source-report links without fabricating screenshots. It explicitly states that booking-intent clicks are not completed bookings.

The verified portfolio configuration also supplies Muhammad Mustafa Khan’s LinkedIn profile and `https://cal.com/mustafa-reuzwm`; V5 centralises that booking URL as `siteConfig.bookingUrl` and uses it only for the final high-intent strategy CTA.

## Visibility Gap and competitor boundary

`lib/competitors/` separates provider discovery, website analysis and comparison logic. V5 uses **no external competitor provider**. The free MVP analyses only observable signals from the visitor’s checked page:

- technical foundation
- treatment-language relevance in title/description/H1
- location context in title/description/H1
- structured-data presence
- competitive visibility as an explicit `needs review` state

Every status includes “Why am I seeing this?” evidence. With no provider configured, the interface says so and does not invent nearby businesses, Google rankings, Maps positions, AI citations or an arbitrary SEO score.

## Kai ownership finding and implementation

No blue robot or mascot asset exists in the KaiRank repository. The robot visible in the surrounding product UI is therefore treated as external and was not copied. V5 adds an original inline-SVG Kai mark built from a search orbit, technical signal waveform and restrained wave gesture.

Kai is deterministic and does not claim to be a live AI model. It includes Focused, Curious, Light Humour and Quick Facts modes; section-aware prompts; nine bounded site questions; no medical advice; no clinical humour; a first-visit session-only introduction; keyboard/Escape support; a mobile bottom sheet; and opt-in browser `speechSynthesis` when supported. Text is always primary.

## Analytics readiness

The typed event layer dispatches local `kairank:analytics` events and, when a future data layer already exists, pushes the same payload without creating cookies or adding a tracker. Prepared events include diagnostic, Visibility Gap, evidence, Kai, full-review, booking and FAQ interactions.

## Missing integrations and assets

- `AUDIT_LEAD_WEBHOOK_URL` and its optional token are not configured in the preview; lead capture returns an honest 503 instead of false success.
- Google PageSpeed quota was unavailable during final QA; the Fast Technical Check still completed.
- No Places/SERP/competitor provider credential is configured; competitor names and positions remain withheld.
- No first-party GSC/GA4 screenshot assets are present; source reports are linked instead.
- Dedicated case-study, service, About and Contact routes remain future architecture and were not built in this pass.
