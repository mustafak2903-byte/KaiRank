# Legacy migration inventory

The static KaiRank experience remains unchanged in the repository root. This document records what must be preserved when later milestones migrate its functionality and evidence.

## PageSpeed audit

Source: `index.html` and `app.js`

- Normalises a visitor-entered URL and calls Google PageSpeed Insights with the mobile strategy.
- Requests performance, SEO and accessibility categories.
- Displays performance, SEO, accessibility and Largest Contentful Paint.
- Handles empty input, generic API failure and rate-limit states separately.
- Animates result gauges and resolves immediately to the final state when reduced motion is enabled.
- Uses the public unauthenticated endpoint today; a production migration needs a protected API key or server-side proxy and rate-limit strategy.

Do not rebuild this API integration during the visual-system milestone.

## Email capture

Source: `index.html` and `app.js`

- Appears after a completed audit and carries the checked URL into the submission.
- Validates empty and malformed email states.
- Describes a free 15-point manual audit delivered within 24 hours.
- Formspree is configured with the placeholder `YOUR_FORM_ID`; no production submission currently occurs.
- Success copy and the promise of one email/no automated sequence must be reviewed when the real endpoint is selected.

## South City Hospital evidence

Source: `index.html` and `scroll.js`

- Ranking keywords: approximately 250 in July 2025 to 3,900 in May 2026.
- Intermediate evidence: 400+ top-10 terms in December; 600–700 in March; approximately 800 top-10 terms in April; 573 top-10 and 272 top-3 terms in May.
- 194 individual doctor profiles in Google’s top 10; 79 or more at positions 1–3.
- 8,076 patient calls from Google Business Profile in April.
- 46,000+ organic visits per month.
- AI visibility score 22, with 67 AI mentions and 88 cited pages.
- Existing attribution: SEMrush Domain Overview, Google Search Console and Google Business Profile, June 2026.

## The Recovery Room evidence

Source: `index.html`

- 682 organic clicks in 90 days.
- 22,100 search impressions in 90 days.
- Organic keywords increased from 5 to 56, with average position 9.1.
- Engagement rate: 81.11%.
- Narrative evidence: an indexing bug was identified and disclosed during the engagement.

## Presentation intentionally not migrated

- GSAP and ScrollTrigger orchestration.
- Lenis scroll smoothing and scroll hijacking.
- Custom cursor and permanent animation frame loop.
- Medical pulse/ECG metaphor.
- Infinite proof marquee.
- Horizontal-scroll case-study treatment.

The new system uses CSS/SVG paths, native scroll, restrained state transitions and `prefers-reduced-motion` fallbacks instead.
