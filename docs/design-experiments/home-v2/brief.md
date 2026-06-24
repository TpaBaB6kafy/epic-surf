# Home V2 Design Brief

## Purpose

Build hidden preview pages for a new Epic Surf School homepage visual shell:
- `/home-v2`
- `/ru/home-v2`

The production pages `/` and `/ru` must remain unchanged. The content order and business logic should mirror the current homepage, while the visual language should shift to surf-zine / editorial poster collage.

## Reference

Reference path: `docs/design-experiments/home-v2/references/ref-01-surf-poster-collage.webp`

The file exists and is used only for design analysis. It must not be used as a public website asset.

## Product Design / Creative Production Analysis

The Product Design and Creative Production plugins are available in this workspace. For this implementation they are used as a pre-implementation design analysis gate, not for asset generation.

Reference observations:
- The composition is built from tilted poster planes over a dark gutter/background.
- Visual energy comes from layered photos, cutout objects, rough labels, and graphic wave shapes.
- Black-and-white photography keeps busy layouts calmer and lets accent color control hierarchy.
- Torn-paper labels work best when they carry short, high-priority text.
- CTA hierarchy must stay simpler than the poster collage: one primary red action per major decision area, with quieter secondary links.
- Mobile 390px needs a stacked poster rhythm, not a scaled-down desktop collage. Overlaps should become shallow, contained, and clipped.

## Take From The Reference

- Poster composition and editorial rhythm.
- Collage layering.
- Photo plus graphic plus label systems.
- Black-and-white photo treatment.
- Torn labels and sticker-like badges.
- Dynamic tilts and asymmetric layouts.
- Rough paper, print, and grain cues.

## Do Not Take From The Reference

- Palette.
- Specific images.
- Specific text.
- One-to-one layout.
- The reference file as a site asset.
- Decorative elements that hide prices, CTA, or important copy.

## Epic Surf School Palette

Use only the current design-system colors:
- `epicDark`: `#2E2E2E`
- `epicRed`: `#FE746A`
- `epicWhite`: `#F6F6F6`
- `epicMint`: `#AAFFC7`
- `epicGray`: `#585858`

Color mapping:
- `epicDark`: poster gutters, high-contrast sections, dark type.
- `epicWhite`: paper surfaces and readable copy areas.
- `epicMint`: wave graphics, soft highlights, secondary surfaces.
- `epicRed`: primary CTAs, stamps, urgent labels.
- `epicGray`: supporting text, neutral borders, muted surfaces.

Do not use the reference's blue/teal/green palette.

## UX Constraints

- Keep the current homepage section order.
- Keep Header, Hero, Why, How It Works, Lessons, Included, Rentals, Live Cam, Forecast, Reviews, FAQ, Events, Gallery, Footer, Messenger FAB, Booking Modal, and Rental Modal.
- Keep lesson prices, rental prices, CTAs, and key actions readable.
- Header section links on V2 must point inside `/home-v2#...` and `/ru/home-v2#...`.
- Language switch must preserve partner and UTM query params.

## SEO Constraints

- `/home-v2` and `/ru/home-v2` must be `noindex, nofollow`.
- Do not add V2 routes to sitemap.
- Do not add V2 routes to header, footer, or internal SEO links.
- Do not change canonical production pages.
- Do not change SEO for `/` or `/ru`.

## Analytics And Partner Constraints

- Reuse `trackEvent()`.
- Reuse `storeAttributionFromUrl({ includePartner: true })`.
- Booking, rental, and messenger CTA events must keep the same event names and payload shape where possible.
- Partner code must remain stored and appended to messenger messages by existing helpers.
- Do not modify Alteg/YClients booking URLs for partner passthrough.
- Missing GTM or Umami env vars must not break the page.

## Mobile And Adaptive Requirements

Required viewport checks:
- `390px` mobile.
- `820px` tablet.
- `1440px` desktop.

At `390px`:
- no horizontal overflow;
- hero and primary CTA visible;
- booking/rental/messenger actions accessible;
- text and prices readable;
- tilted collage elements contained;
- images do not cover important content;
- modals open correctly.

## First Prototype Done Criteria

- `/home-v2` and `/ru/home-v2` render.
- Production `/` and `/ru` remain unchanged.
- V2 routes have `noindex, nofollow`.
- V2 routes are absent from sitemap.
- The visual direction is clearly poster-collage, not a light restyle.
- All colors come from the Epic palette.
- Booking modal, rental modal, messenger links, language switch, analytics, and partner attribution continue to work.
- Smoke tests cover 390px, 820px, and 1440px.
