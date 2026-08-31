# KaiRank V3 implementation notes

## Creative concept

V3 treats search visibility as one living **SIGNAL path**: patient demand moves through Search, Maps and AI discovery before a clinic can earn trust and an enquiry. The same visual grammar appears in the hero, the cost-of-invisibility sequence, the capabilities and the Recovery Room proof story. It is implemented with original CSS and SVG rather than a component kit or shader dependency.

The selected hero line is **“Make the searches that matter lead to your clinic.”** It was chosen from ten internal options because it names the commercial job, stays specific to clinics, avoids a ranking guarantee, fits mobile without losing its rhythm and transitions naturally into the Fast Check.

The deliberate visual risk is the empty clinic result in the ivory problem sequence. Instead of decorating lost opportunity with another dashboard, the interface makes absence itself visible.

## Verified case-study sources

The case-study source of truth was read-only `mustafak2903-byte/mustafa-portfolio`, branch `portfolio-rebuild`, primarily `lib/case-studies.ts`.

- The Recovery Room: +808% search impressions, +354% organic clicks, #1 for “deep tissue massage Birmingham”, 1.86K organic clicks, 120K impressions and 214 booking-intent clicks in 28 days. Evidence report: <https://drive.google.com/file/d/1J4ZsFBqIM2yaaLEP7uJljvjyYRoD-cLO/view?usp=sharing>
- South City Hospital: 46K+ monthly organic visits, 3,900 ranking keywords, 194 doctor profiles in the top 10 and 8,076 patient calls in one month. Evidence report: <https://drive.google.com/file/d/1liDUyqtgXvZD8adj3Wanulkv70N5hLvY/view?usp=sharing>

The portfolio repository contains report links and official logos but no analytics screenshots. V3 links to the authentic reports and explicitly avoids manufacturing screenshot evidence. Amaan GEO remains available as a future compact proof source but is not needed in the current homepage story.

## Interaction and open-source research record

No third-party interaction code was copied and no UI, animation, WebGL or smooth-scroll dependency was added. The following sources informed technique selection only:

- [Design Spells](https://www.designspells.com/) — micro-interaction feedback and small state changes; visual research only.
- [Agency Gallery](https://agencygallery.com/) and [Fig Components](https://www.figcomponents.com/) — asymmetric agency layouts and interaction references; visual research only.
- [Motion Primitives](https://github.com/ibelick/motion-primitives) — short, state-led UI transitions; MIT licensed. V3 re-authors the timing and interaction logic without copying a component.
- [ShaderGradient](https://github.com/ruucm/shadergradient) — evaluated for a single SIGNAL shader; MIT licensed. Not used because original SVG/CSS communicates the system with less runtime cost.
- [Magic UI](https://github.com/magicuidesign/magicui) — evaluated for animated beams and number treatments; MIT licensed. Not used.
- [Cult UI](https://github.com/nolly-studio/cult-ui) — evaluated for shader and tactile interaction patterns; MIT licensed. Not used.
- [Codrops Creative Hub](https://tympanus.net/codrops/hub/) — scroll staging and SVG path references. No demo code or asset was copied; individual Codrops repositories have their own licences and would need case-by-case verification before reuse.

The implemented motion uses native scrolling, `requestAnimationFrame`, CSS custom properties and small React state changes. There is no Lenis, GSAP, WebGL, video background, pointer-driven React render loop or continuous decorative particle system.

## Audit threat model and fallback

`POST /api/audit` exposes two explicit levels:

1. `fast` resolves and validates every destination, manually validates every redirect, fetches a size-limited public HTML response with a timeout, and extracts response, HTTPS, title, description, canonical, H1, viewport, JSON-LD, robots.txt and sitemap signals.
2. `pagespeed` is an optional mobile Lighthouse layer. Quota, timeout, missing-key and upstream failures return an `unavailable` state while preserving the Fast Check.

The public fetch rejects credentials, non-HTTP protocols, localhost, private/RFC1918, carrier-grade NAT, link-local, documentation/reserved IPs, multicast, common internal suffixes and cloud metadata destinations. DNS resolution is checked before the initial request and before every redirect. Redirect depth, response time and body size are capped. Structured errors distinguish invalid destinations, timeout, oversized bodies and unsupported content.

Lead confirmation remains truthful: the follow-up form only enters a success state after the configured webhook confirms the request.
