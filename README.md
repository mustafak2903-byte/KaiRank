# KaiRank rebuild

The production Next.js website for KaiRank: a founder-led search visibility practice for private clinics across Google, Maps and AI discovery.

The production homepage is `/`. It combines the approved editorial system with a continuous patient-search journey, five service routes, verified healthcare evidence, a progressive Search Visibility Diagnostic, the Kai site guide and a lazy Cal.com booking modal. `/visual-system` and `/experiments/*` remain non-indexable review routes.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to review the production homepage.

If macOS reports an `EMFILE` watcher error, use the webpack polling fallback:

```bash
WATCHPACK_POLLING=true CHOKIDAR_USEPOLLING=1 npm run dev -- --webpack
```

Copy `.env.example` to `.env.local` when configuring production integrations. `NEXT_PUBLIC_SITE_URL` and `AUDIT_LEAD_WEBHOOK_URL` are required for a Vercel Production build; production fails closed rather than publishing broken canonical or lead-delivery configuration. `PAGESPEED_API_KEY` is optional: the independent Fast Technical Check still returns public response, redirect, HTTPS, timing and on-page signals when PageSpeed is missing, unavailable or quota-limited. `AUDIT_LEAD_WEBHOOK_TOKEN` is recommended whenever the receiving endpoint supports bearer authentication.

Vercel Web Analytics and Speed Insights are integrated in the root layout. Enable both products in the Vercel project dashboard after importing the repository. Conversion events contain only non-personal operational labels; names, email addresses and Cal.com booking identifiers are not sent to analytics.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Production checklist

- Deploy the `kairank-rebuild` branch to a Vercel Preview environment first.
- Configure `AUDIT_LEAD_WEBHOOK_URL` and, where supported, `AUDIT_LEAD_WEBHOOK_TOKEN` for Preview and Production.
- Add `PAGESPEED_API_KEY` for more reliable enhanced diagnostic quota.
- Connect `kairank.com`, confirm HTTPS and verify that `hello@kairank.com` can receive the form's email fallback.
- Enable Vercel Web Analytics and Speed Insights.
- Update the Cal.com profile and event names to match KaiRank's private-clinic positioning.
- Run the full diagnostic, visibility-review delivery and Cal.com booking flow on the deployed Preview URL before promoting it.

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
