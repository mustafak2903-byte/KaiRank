# KaiRank launch runbook

## Publishing model

Keep the current Next.js application on Vercel for launch. It already supports route-level metadata, structured data, sitemap generation, performance optimisation and the custom interaction system without a WordPress migration.

The current insight library in `lib/insights-content.ts` is the launch CMS. When non-technical publishing becomes frequent, Sanity is the preferred next step because it can add an editorial interface while preserving the Next.js front end, visual system and URL architecture. Do not connect a live CMS until the Sanity project, dataset, roles, preview policy and content model are approved. WordPress is not required for SEO and would add migration, security and rendering overhead without solving a current launch blocker.

This runbook is the production hand-off for the `kairank-rebuild` branch. Do not promote a build until every launch gate is confirmed on the deployed Vercel Preview URL.

## Current temporary production domain

The only configured public hostname is `https://kai-rank.vercel.app`. The custom domain has not been purchased or connected. Set Vercel Production `NEXT_PUBLIC_SITE_URL=https://kai-rank.vercel.app` before the approved deployment; an existing environment value overrides the code fallback. Do not redirect to the future domain or noindex the current production hostname. Custom-domain steps below apply only to a later migration after purchase, DNS connection and HTTPS verification.

## Search ownership

- `/` — UK healthcare SEO proposition, brand and routing authority; no separate commercial cluster
- `/services` — service discovery hub; no separate commercial cluster
- `/healthcare-seo` — verified UK cluster led by `healthcare seo agency` and `healthcare seo services`
- `/technical-seo` — descriptive service page; UK focus keyword research still required
- `/local-seo` — verified UK directional cluster led by `local seo for healthcare`; service-versus-guide intent still requires a live SERP check
- `/ai-search-optimisation` — descriptive service page; UK AI/GEO focus keyword research still required
- `/case-studies` — verified healthcare SEO evidence
- `/search-visibility-diagnostic` — public diagnostic and lead acquisition
- `/insights` — healthcare SEO blog and evidence-led informational search hub

`/seo` permanently redirects to `/healthcare-seo` so overlapping commercial terms do not split relevance or internal authority.

Do not add city, treatment or clinic-specialty pages until each proposed page has a distinct search intent, real audience need, original material and relevant evidence.

## Account actions requiring the owner

1. Import `mustafak2903-byte/KaiRank` into Vercel, then set **Settings → Environments → Production → Branch Tracking** to `kairank-rebuild`. This keeps `main` untouched while making the approved branch the production source.
2. Add the Preview and Production environment variables from `.env.example`.
3. A webhook is optional and reserved for a future review-request workflow; the current diagnostic uses booking/email actions.
4. Add both `www.kairank.com` and `kairank.com` to Vercel. Use `www.kairank.com` as primary for Vercel's recommended CNAME reliability and redirect the apex to it, then update `NEXT_PUBLIC_SITE_URL` to `https://www.kairank.com` before the production deployment. If the apex must remain primary, redirect `www` to the apex and retain `https://kairank.com` instead. Never allow both hosts to resolve independently.
5. Configure MX records with the chosen email provider and confirm `hello@kairank.com` can send and receive.
6. Rename the Cal.com event used by the website to a KaiRank-specific strategy conversation and refine the public profile copy.
7. Create or select the Google account that will own the Search Console Domain property.

## Required Vercel configuration

- `NEXT_PUBLIC_SITE_URL=https://kai-rank.vercel.app`
- `AUDIT_LEAD_WEBHOOK_URL=https://…` only for a future enabled review-request workflow
- `AUDIT_LEAD_WEBHOOK_TOKEN=…` only when that receiver supports authentication
- `PAGESPEED_API_KEY=…` for more reliable enhanced diagnostic quota

The central site URL defaults to the current Vercel hostname when unset. A configured value must be an HTTPS origin without credentials, a path, query or fragment. No webhook is required for the current production build.

## Exact Vercel dashboard sequence

1. In Vercel, choose **Add New → Project**, connect GitHub if prompted, and import `mustafak2903-byte/KaiRank`.
2. Keep **Framework Preset: Next.js**, **Root Directory: `./`**, and the default install/build/output settings; then deploy once to create the project.
3. Open **Settings → Environments → Production → Branch Tracking**, set the production branch to `kairank-rebuild`, and save. Do not select or merge `main`.
4. Open **Settings → Environment Variables**. Add `NEXT_PUBLIC_SITE_URL`, `AUDIT_LEAD_WEBHOOK_URL`, the optional webhook token and the optional PageSpeed key. Apply the canonical origin to Production and Preview; apply secret values only to the environments that need them. Redeploy after every environment-variable change because previous deployments do not receive new values.
5. For the current launch, retain `kai-rank.vercel.app`. Only after purchasing the custom domain, add it under **Settings → Domains** and choose the preferred hostname.
6. At the domain registrar, remove conflicting records and enter the exact DNS values shown by Vercel for both hosts. Vercel's general-purpose values are not a substitute for the project-specific values shown in **Domains**.
7. Wait until Vercel marks both domains valid and provisions HTTPS. Then redeploy the latest `kairank-rebuild` commit to Production and execute the live-domain release gate below.

## Preview release gate

- Preview contains a `noindex` robots directive.
- All indexable routes return 200.
- Slash variants redirect once to the no-trailing-slash canonical.
- Every indexable page has one H1, one self-canonical, a unique title and a useful description.
- `/robots.txt` and `/sitemap.xml` return 200 and use the production origin.
- Structured data passes Google's Rich Results Test where the type is supported.
- Desktop, mobile, keyboard, focus, reduced-motion and short-landscape behaviour are checked.
- The diagnostic completes for a valid public HTTPS site and rejects local/private destinations.
- A real review request reaches the receiving system exactly once with the expected attribution.
- Cal.com opens lazily, closes with Escape, restores focus and completes one test booking.
- `booking_clicked`, `booking_opened` and `booking_completed` remain distinct events.
- Vercel Web Analytics and Speed Insights are enabled.

## Launch sequence

1. Promote the approved Vercel Preview to Production.
2. Confirm the preferred hostname and HTTPS redirect behaviour.
3. Inspect the live homepage source and generated outputs. Canonical, `og:url`, Open Graph image, Twitter image, JSON-LD URLs, `/robots.txt` and `/sitemap.xml` must all use `https://kai-rank.vercel.app`; the 4 November 2026 public crawl still exposed stale `https://www.kairank.com` social metadata from the older deployment.
4. Re-run route, booking, security-header and mobile QA against the configured `NEXT_PUBLIC_SITE_URL` (currently `https://kai-rank.vercel.app`).
5. Verify a Google Search Console Domain property through DNS.
6. Submit the configured origin's `/sitemap.xml`. Use a URL-prefix Search Console property for the current Vercel hostname; a Domain property requires ownership of the later custom domain.
7. Inspect the homepage, service hub, four commercial service pages, case-study hub, healthcare SEO blog and diagnostic URL.
8. Request indexing only after the live canonical, rendered HTML and indexation status are correct.
9. Record the launch date and the initial Search Console, analytics and qualified-lead baseline.

## First 90 days

- Review qualified diagnostic requests and booked conversations weekly.
- Review Search Console query/page performance every two weeks after data begins to accumulate.
- Improve titles and introductions from real impressions and click-through behaviour, not rank-tracker volatility alone.
- Publish evidence-led field notes from actual clinic questions, audits and project methods. Follow `docs/seo-content-map.md` so new articles support rather than cannibalise commercial pages.
- Add specialist clinic pages only when demand and proof support a materially different page.
- Keep impressions, clicks, enquiries, booking intent, completed bookings and won revenue as separate measures.
