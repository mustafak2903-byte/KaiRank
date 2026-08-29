# KaiRank rebuild

The production foundation for KaiRank: a premium SEO, technical SEO, local SEO, AI search/GEO and organic visibility consultancy.

This milestone establishes a Next.js App Router architecture, TypeScript, central site configuration, metadata scaffolding, design tokens, responsive interface primitives, data visualisation and the internal visual-system review route. It intentionally does **not** build the final homepage or service pages.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/visual-system](http://localhost:3000/visual-system) to review the design language.

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
- `components/ui/` — controls and form specimens
- `components/data/` — evidence-led visualisation primitives
- `components/motion/` — lightweight interactive SIGNAL primitives
- `lib/site.ts` — central business, navigation and route configuration
- `lib/metadata.ts` — reusable metadata and canonical helper
- `styles/tokens.css` — colour, typography, spacing and motion tokens
- `legacy/MIGRATION.md` — legacy feature and evidence inventory

## Legacy site

The original static site remains intact at the repository root in `index.html`, `app.js` and `scroll.js`. Git history is unchanged. These files are retained as migration source material and are not loaded by Next.js.

See `legacy/MIGRATION.md` before migrating the PageSpeed audit, email capture or case studies.
