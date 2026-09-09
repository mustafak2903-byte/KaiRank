# KaiRank launch runbook

This runbook is the production hand-off for the `kairank-rebuild` branch. Do not promote a build until every launch gate is confirmed on the deployed Vercel Preview URL.

## Search ownership

- `/` — brand, proposition and routing authority
- `/services` — service discovery hub
- `/seo` — SEO for clinics / clinic SEO
- `/healthcare-seo` — SEO for healthcare and healthcare SEO consultants
- `/technical-seo` — technical SEO audit service
- `/local-seo` — local SEO for medical clinics
- `/ai-search-optimisation` — AI search optimisation for healthcare
- `/case-studies` — verified healthcare SEO evidence
- `/search-visibility-diagnostic` — public diagnostic and lead acquisition
- `/insights` — evidence-led informational search hub

Do not add city, treatment or clinic-specialty pages until each proposed page has a distinct search intent, real audience need, original material and relevant evidence.

## Account actions requiring the owner

1. Import `mustafak2903-byte/KaiRank` into Vercel and deploy `kairank-rebuild` as a Preview.
2. Add the Preview and Production environment variables from `.env.example`.
3. Choose the receiving system for diagnostic review requests and provide its HTTPS webhook URL and bearer token, if supported.
4. Add `kairank.com` to Vercel, then apply the exact DNS records Vercel provides at the domain registrar.
5. Configure MX records with the chosen email provider and confirm `hello@kairank.com` can send and receive.
6. Rename the Cal.com event used by the website to a KaiRank-specific strategy conversation and refine the public profile copy.
7. Create or select the Google account that will own the Search Console Domain property.

## Required Vercel configuration

- `NEXT_PUBLIC_SITE_URL=https://kairank.com`
- `AUDIT_LEAD_WEBHOOK_URL=https://…`
- `AUDIT_LEAD_WEBHOOK_TOKEN=…` when the receiver supports authentication
- `PAGESPEED_API_KEY=…` for more reliable enhanced diagnostic quota

Production builds fail closed if the canonical origin or lead webhook is missing or does not use HTTPS.

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
3. Re-run the full route, form, booking, security-header and mobile QA against `https://kairank.com`.
4. Verify a Google Search Console Domain property through DNS.
5. Submit `https://kairank.com/sitemap.xml`.
6. Inspect the homepage, service hub, five commercial service pages, case-study hub and diagnostic URL.
7. Request indexing only after the live canonical, rendered HTML and indexation status are correct.
8. Record the launch date and the initial Search Console, analytics and qualified-lead baseline.

## First 90 days

- Review qualified diagnostic requests and booked conversations weekly.
- Review Search Console query/page performance every two weeks after data begins to accumulate.
- Improve titles and introductions from real impressions and click-through behaviour, not rank-tracker volatility alone.
- Publish evidence-led field notes from actual clinic questions, audits and project methods.
- Add specialist clinic pages only when demand and proof support a materially different page.
- Keep impressions, clicks, enquiries, booking intent, completed bookings and won revenue as separate measures.
