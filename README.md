# Kairank

Search visibility landing page for dental, physio, and recovery clinics, with a live audit console that scans a visitor's site through the real Google PageSpeed Insights API.

Static site, no build step or backend required — open `index.html` directly or serve the folder from any static host (GitHub Pages, Netlify, Vercel, S3, etc.).

## Files

- `index.html` — page markup and styles
- `app.js` — the audit console (URL scan → PageSpeed API call → gauge animation) and email capture form
- `scroll.js` — scroll-driven effects (GSAP/ScrollTrigger + Lenis smooth scroll, reveal-on-scroll, the South City case-study chart, the horizontal Recovery Room scroller)

## Before going live

- **Email capture form** (`index.html`, the `#emailForm` element) posts to `https://formspree.io/f/YOUR_FORM_ID` — replace `YOUR_FORM_ID` with a real [Formspree](https://formspree.io) form ID, or swap in your own endpoint. Until then, submissions are validated client-side but not actually sent anywhere.
- **PageSpeed Insights API**: the audit console calls the public, unauthenticated PageSpeed API, which has a low shared rate limit and will show the "rate limited" error fairly quickly under real traffic. For production, get a free [PageSpeed Insights API key](https://developers.google.com/speed/docs/insights/v5/get-started) and append `&key=YOUR_KEY` to the `api` URL built in `app.js`.
- Update the `mailto:hello@kairank.com` link in the final CTA section to a real inbox.

## Enabling GitHub Pages

Settings → Pages → Deploy from branch → `main` / `/ (root)`.
