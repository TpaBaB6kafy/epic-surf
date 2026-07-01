# Design System

Этот документ описывает production design system сайта. Его tokens, брендовые ограничения, accessibility и функциональные контракты применяются ко всему проекту. Visual form, composition и presentation layer для `/home-v2` и `/ru/home-v2` определяет `docs/design-experiments/home-v2/style-system/README.md`.

## Tailwind v4 theme colors

Defined in `app/globals.css`:

- `epicDark`: `#2E2E2E`
- `epicRed`: `#FE746A`
- `epicWhite`: `#F6F6F6`
- `epicMint`: `#AAFFC7`
- `epicGray`: `#585858`

## Fonts

- Headings: `"Arial Black", Arial, "Helvetica Neue", Helvetica, sans-serif`
- Body/UI: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `next/font/local` is not used.

## Visual style

- Bold surf-school identity.
- High-contrast dark/white/red/mint palette.
- Large uppercase heading style through `font-heading`.
- Photo/video-heavy sections from `public/hero-surf.mp4` and `public/gallery/`.
- Rounded cards and pill CTAs are common in current components.

## Buttons

- Use existing color tokens.
- Primary actions usually use `epicRed`, dark text/white text, or dark backgrounds depending on section.
- Booking/messenger/rental CTAs should keep analytics handlers.
- Do not create new CTA patterns unless existing ones cannot cover the case.

## Cards

- Current components use rounded cards, borders, shadows, and image cards.
- Prefer existing section patterns before adding new component abstractions.
- Keep cards content-focused: lesson, rental, event, benefit, gallery, partner blocks.

## Badges

- Badges are used as small labels/eyebrows.
- Keep them short.
- Use existing palette and border/filled styles.

## Sections

- Sections are composed in `LandingPage.jsx` in the current order.
- Preserve anchor targets used by navigation unless intentionally changing routing.
- Use existing spacing rhythm and responsive classes.

## Do not use in design

- Do not change theme tokens without confirmation.
- Do not introduce a new unrelated color palette.
- Do not replace real surf imagery with generic abstract graphics.
- Do not add decorative-only gradient blobs/orbs.
- Do not add large marketing-only sections that duplicate current functional sections.

## Last updated

2026-05-29
