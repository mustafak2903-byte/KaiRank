# KaiRank rebuild

The production foundation for KaiRank: a premium SEO, technical SEO, local SEO, AI search/GEO and organic visibility consultancy.

This branch contains the V6 corrective experience pass for KaiRank. The `/visual-system` route combines the approved editorial system with a continuous patient-search journey, five interactive services, verified healthcare evidence, a progressive clinic Search Visibility Diagnostic, the deterministic Kai assistant and a lazy Cal.com booking modal. It remains a review route rather than the production homepage, so `/` is deliberately unchanged.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/visual-system](http://localhost:3000/visual-system) to review the design language.

If macOS reports an `EMFILE` watcher error, use the webpack polling fallback:

```bash
WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 npm run dev -- --webpack
```

Copy `.env.example` to `.env.local` when configuring production integrations. `PAGESPEED_API_KEY` is optional: the independent Fast Technical Check still returns public response, redirect, HTTPS, timing and on-page signals when PageSpeed is missing, unavailable or quota-limited. `AUDIT_LEAD_WEBHOOK_URL` is required before the post-value visibility-review form can accept leads; the interface will never show a false success when it is absent. No competitor provider is configured in V6, so competitor names and ranking claims remain explicitly withheld.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

- `app/` — App Router pages, layout, global styles, robots and sitemap
- `components/brand/` — signal mark and wordmark
- `components/layout/` — site navigation foundations
- `components/experience/` — audit, discovery and scroll-led evidence experiences
- `components/ui/` — reusable controls and form primitives
- `components/data/` — evidence-led visualisation primitives
- `components/motion/` — lightweight interactive SIGNAL primitives
- `app/api/` — protected audit and visibility-review endpoints
- `lib/audit.ts` — SSRF-safe public fetching, Fast Check extraction and PageSpeed normalisation
- `lib/competitors/` — provider-neutral Visibility Gap types, website-signal analysis and comparison architecture
- `lib/analytics.ts` — typed, no-cookie event layer ready for a future GA4/GTM data layer
- `lib/site.ts` — central business, navigation and route configuration
- `lib/metadata.ts` — reusable metadata and canonical helper
- `styles/tokens.css` — colour, typography, spacing and motion tokens
- `legacy/MIGRATION.md` — legacy feature and evidence inventory

## Legacy site

The original static site remains intact at the repository root in `index.html`, `app.js` and `scroll.js`. Git history is unchanged. These files are retained as migration source material and are not loaded by Next.js.

See `legacy/MIGRATION.md` for the original feature inventory and the current migration status.

## Implementation records

See `docs/v3-implementation-notes.md` for the creative rationale, verified evidence sources, audit threat model and third-party research/licensing record.

See `docs/v5-implementation-notes.md` for the final homepage/product architecture, live audit verification, Kai ownership finding, competitor-provider boundary and remaining integrations.

See `docs/v6-implementation-notes.md` for the corrective journey, interaction bug fix, evolved Kai physics, lazy Cal.com popup and final QA boundaries.
