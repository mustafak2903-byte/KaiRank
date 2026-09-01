# KaiRank V6 implementation notes

## Corrective experience pass

V6 keeps the verified V5 foundation at `9da93ef147087d3b8069492a25422e13e0c0e226` and the V3 rollback point at `5b89b9b`. It does not replace the retained legacy site or change the production `/` route.

The `/visual-system` story now moves through one coherent patient-search journey:

1. a clinic must enter the Google, Maps and AI consideration set;
2. the same patient query travels into a visible shortlist;
3. five services reveal the constraint KaiRank would fix;
4. verified Recovery Room and South City Hospital evidence demonstrates outcomes;
5. Diagnose / Engineer / Compound explains the delivery model;
6. the diagnostic starts only after the visitor understands the value;
7. the competitor review remains honest about the missing live provider;
8. FAQ and the final CTA close the route without repeating generic sales language.

The hero keeps one H1 and uses the approved copy: “Be the clinic patients find before they choose.” Its Google, Maps and AI surfaces stay mounted while their opacity and transforms change, avoiding a layout collapse during rapid selection.

## Interaction bug corrected

The V5 blank-state bug came from combining React-owned `className` values with an imperative `data-reveal` class. When either stateful component re-rendered, React replaced the reveal class that the scroll controller had added, returning the shared reveal rule to `opacity: 0`.

V6 removes `data-reveal` from the stateful hero and service roots. Their own persistent scene system now owns visibility. Rapid Google / Maps / AI and service switching preserves a stable component height and a single visible state.

## Proof and diagnostic boundaries

The Recovery Room proof uses only the verified metrics already established in V5: +808% search impressions, +354% organic clicks, #1 for “Deep Tissue Massage Birmingham”, 1.86K organic clicks, 120K search impressions and 214 booking-intent clicks in 28 days. South City Hospital remains supporting proof with the verified 46K+, 3,900, 194 and 8,076 figures.

The public diagnostic has a calm two-stage hierarchy. A live technical check runs first. Location and treatment context are added only after the useful result is visible, followed by an optional deeper-review form. Provider/debug language is not exposed in the public interface. Live competitor names, rankings, Maps positions and AI citations remain withheld until a reliable provider is configured.

The audit’s SSRF, DNS, redirect, timeout and response-size protections remain unchanged. PageSpeed is still optional enrichment and its unavailable message remains exact.

## Kai

No owned blue-robot asset exists in the KaiRank repository, so the external product mascot was not copied. V6 evolves the original inline-SVG Kai into a small search-signal robot with deterministic reactions, four personality modes, fixed site questions, optional browser speech, section context and a first-visit introduction.

Desktop pointer users can drag and throw Kai. Motion uses direct transforms, velocity, friction, damping and bounded edge bounces. Coarse pointers disable drag and momentum, reduced-motion users receive no idle or throw animation, and mobile uses a bottom-sheet assistant. Escape closes the panel and restores focus.

## Cal.com booking

The verified booking destination is stored once in `siteConfig.bookingUrl`. Navigation, post-diagnostic and final strategy CTAs use one shared `BookingTrigger`.

The official Cal.com element-click embed is bootstrapped only after booking intent. It preloads at that point, opens a dark namespaced modal, passes supported UTM fields, and exposes a central config path for future name/email prefilling. An external link appears if the embed script or Cal link fails.

Analytics separates intent from outcomes:

- `booking_clicked` fires on a real CTA interaction;
- `booking_opened` fires only when the modal becomes visibly open;
- `booking_completed` fires only from Cal.com’s `bookingSuccessfulV2` event.

Escape uses Cal.com’s documented `closeModal` instruction and returns focus to the CTA that opened the modal.

## Performance and dependencies

V6 adds no runtime package, UI kit, WebGL layer, animation library or smooth-scroll dependency. Native scrolling remains in place. Interactive views use CSS transforms and requestAnimationFrame only where direct pointer motion or scroll progress requires it. The Cal.com script and iframe are absent from the initial document and are requested only after booking intent.

## Remaining production inputs

- `AUDIT_LEAD_WEBHOOK_URL` and its optional token are still required for live lead delivery.
- `PAGESPEED_API_KEY` remains optional and unavailable quota never blocks the technical check.
- A live search/Maps provider is still required before competitor identities or positions can be shown.
- No first-party analytics screenshots were available, so source reports remain linked rather than fabricated.
- A real appointment was not submitted during QA; the successful-booking event is wired to Cal.com’s official success event so opening or browsing the modal cannot create a false completion.
