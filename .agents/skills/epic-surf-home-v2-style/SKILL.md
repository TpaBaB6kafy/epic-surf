---
name: epic-surf-home-v2-style
description: Repo-scoped visual and functional guardrails for the hidden Epic Surf School home-v2 experiment.
---

# Epic Surf Home V2 Style

## Goal

Create and maintain the hidden experimental homepage routes `/home-v2` and `/ru/home-v2` for testing a new Epic Surf School visual direction without changing the production homepages `/` and `/ru`.

## Visual Direction

The style must feel like surf-zine, editorial poster collage, and surf poster culture: layered, energetic, handmade, photo-heavy, and slightly raw. It should be surfy and poster-like, but not chaotic.

## Reference Use

Use `docs/design-experiments/home-v2/references/ref-01-surf-poster-collage.webp` only as visual direction.

Take these principles from the reference:
- poster composition and diagonal rhythm;
- collage layering;
- black-and-white photo treatment;
- rough paper, print, and grain texture cues;
- torn labels and sticker-like captions;
- photo plus graphic plus type layering;
- dynamic tilt and overlap.

Do not take these from the reference:
- the palette;
- specific images;
- specific text;
- one-to-one layout;
- public use of the reference file as a site asset.

## Palette

Use only the current Epic Surf School palette:
- `epicDark`: `#2E2E2E`
- `epicRed`: `#FE746A`
- `epicWhite`: `#F6F6F6`
- `epicMint`: `#AAFFC7`
- `epicGray`: `#585858`

Do not use the blue, teal, or green palette from the reference as brand color. Build contrast around `epicDark`, `epicWhite`, and `epicMint`; reserve `epicRed` for CTAs, stamps, and priority accents; use `epicGray` as a supporting neutral.

## Functional Guardrails

Do not break:
- booking modal opening;
- rental modal opening;
- WhatsApp, Telegram, and Zalo links;
- language switch between `/home-v2` and `/ru/home-v2`;
- `trackEvent()` analytics behavior;
- partner attribution and stored partner code;
- current booking, rental, and messenger helpers;
- Alteg/YClients iframe and fallback behavior.

## SEO Guardrails

The home-v2 routes are preview/test pages only. They must be `noindex, nofollow`, excluded from sitemap, and not added to header, footer, or internal SEO link sets.

## Mobile Rules

Mobile width `390px` is mandatory. At this width:
- there must be no horizontal overflow;
- booking, rental, and messenger actions must be reachable;
- text, prices, and CTAs must remain readable;
- tilted and collage elements must not break the grid;
- images must not cover important content;
- modals must open in a usable way.

## Taste Rules

Prefer bold poster hierarchy, real Epic Surf imagery, black-and-white photo treatments, rough labels, and strong CTA contrast. Avoid generic SaaS landing-page styling, decorative gradient blobs or orbs, copied reference elements, and chaotic overlaps that hide content.
