# Home V2 Section System Design

> **Статус:** Rejected visual implementation / historical reference.
>
> Этот документ не является текущим visual authority и не должен использоваться как план повторной реализации. Разбор отклонённого результата: `docs/design-experiments/home-v2/style-system/references/bad-result-2026-07-01.md`. Актуальные правила: `docs/design-experiments/home-v2/style-system/README.md`.

## Scope

Bring the hidden `/home-v2` and `/ru/home-v2` pages into one surf-zine / poster-collage system without changing page order, content meaning, routes, analytics, attribution, or modal behavior.

In scope: Home V2 Header, shared section headings, Included, Reviews, FAQ, Events, Epic Moments / Gallery, and Footer.

Explicitly out of scope: production `/` and `/ru`, Hero mechanics, global redesigns of Rentals, LiveCam, and Forecast, sitemap/robots/canonical changes, project color-token changes, and new large assets.

## Shared Visual System

`PosterPrimitives.jsx` will own reusable Home V2 presentation primitives when they reduce duplication:

- `SectionTitle`: an intrinsic-width CSS paper backing, hard offset shadow, large uppercase type, optional eyebrow, and variants suitable for light or dark sections. It must wrap safely for different EN/RU lengths.
- Existing rectangular poster buttons/links remain the action baseline.
- A small paper-card or tape/pin helper may be added only if at least two target sections use the same structure.

Only `epicDark`, `epicRed`, `epicWhite`, `epicMint`, and `epicGray` are used. Borders are straight; controls are rectangular or square. No pills, gradient blobs, decorative one-off badges, or image assets for section-title backings.

The existing mint Choose Your Lesson heading asset is replaced with a calmer CSS backing that sizes to its EN/RU text while retaining a cut-paper poster character.

## Header

Home V2 receives a dedicated overlay-style header presentation while reusing the current navigation data, callbacks, tracking, language switch, booking action, query preservation, and mobile-menu behavior.

The header is transparent over the hero where legibility allows, with a controlled contrast treatment for links. Language and booking controls become strict rectangular/square poster controls. Production Header behavior and production routes remain untouched.

## Target Sections

### Included

Remove the obsolete beta board illustration and do not introduce a replacement photo unless it improves comprehension. Present the translated included items as a strict, quickly scannable paper-card grid with restrained tape/pin accents, hard borders, and hard shadows.

### Reviews

Keep the white section background, review copy, names and available metadata, Google trust marker, and review CTA. Use readable paper notes with meaningful tape/pin accents; remove unrelated small colored squares and decorative noise.

### FAQ

Keep the current translated questions, answers, and accordion state behavior. Rows become rectangular poster strips with hard borders and compact plus/minus controls. Open content must remain readable at 390px.

### Events

Keep the white background, existing photos, translated content, CTA destinations, and `gallery_open` behavior. Cards become straight-edged poster/paper compositions; incidental badges and strong rounding are removed. Actions use rectangular poster controls.

### Epic Moments / Gallery

Keep the existing filters, image source data, masonry/grid character, modal opening, and `gallery_open` tracking. Filters become rectangular controls and image frames use consistent hard borders and spacing.

Exactly the first five photos in the active gallery group are visible in the initial gallery area. Remaining photos stay available inside a vertically scrollable container rather than extending the page into a full image sheet. The modal remains able to open any displayed photo. The layout must not create horizontal overflow at 390px.

### Footer

Keep all navigation, map, partner, social, and messenger destinations and behavior. Recompose the existing light/dark zones into the Home V2 poster system, replacing oval social controls and rounded contact/map treatments with square or rectangular elements.

## Localization And Data Flow

All visible strings continue to come from the current EN/RU translation and section data. Any Home V2-only labels that are currently hard-coded in English receive explicit EN/RU values. No translation shape used by production pages is changed unless the change is backward-compatible.

The existing callbacks remain the source of truth for booking, rental, messenger, gallery, language, partner-query, and analytics behavior. Presentation components receive data and callbacks; they do not duplicate business logic.

## Responsive Behavior

At approximately 1440px, sections use a consistent editorial rhythm, shared heading scale, and controlled collage offsets. At 390px, grids stack, rotations/offsets are reduced, text wraps naturally, controls remain reachable, and `document.documentElement.scrollWidth` does not exceed the viewport.

The Header remains usable at 390px, and Gallery's overflow is vertical only.

## Verification

Add or update Playwright assertions before implementation for the new shared heading contract, rectangular controls, Included layout, Gallery five-photo initial limit and scroll container, EN/RU headings, retained analytics hooks, and no horizontal overflow.

After implementation:

- visually inspect `/home-v2` and `/ru/home-v2` at roughly 1440px and at 390px in the in-app browser;
- run `npm run lint`;
- run `npx playwright test tests/home-v2.spec.js`;
- confirm production route/component files, sitemap, robots, canonical configuration, Hero mechanics, Rentals, LiveCam, and Forecast were not globally redesigned.

No commit or push is part of this iteration.
