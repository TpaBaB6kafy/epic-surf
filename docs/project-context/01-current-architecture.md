# Current Architecture

## `app/` structure

- `app/(en)/page.js`: English homepage at `/`.
- `app/(ru)/ru/page.js`: Russian homepage at `/ru`.
- `app/(en)/partners/page.js`: English partners page at `/partners`.
- `app/(ru)/ru/partners/page.js`: Russian partners page at `/ru/partners`.
- `app/(en)/layout.js`: English metadata/layout wrapper.
- `app/(ru)/layout.js`: Russian metadata/layout wrapper.
- `app/components/`: UI sections and shared interactive components.
- `app/data/`: content, translations, links, SEO config, gallery data, partner copy.
- `app/utils/`: tracking and attribution helpers.
- `app/sitemap.js`: sitemap routes and alternates.
- `app/robots.js`: robots config.
- `app/globals.css`: Tailwind v4 theme and global styles.

## Key components

- `LandingPage.jsx`: main page composition and modal state.
- `RootLayoutShell.jsx`: HTML shell, GTM, Umami, structured data.
- `Header.jsx`: navigation and language switch.
- `Hero.jsx`: first screen.
- `Lessons.jsx`: lesson cards and booking CTAs.
- `Rentals.jsx` / `RentalModal.jsx`: rental flow.
- `Forecast.jsx`: location/forecast/map section.
- `PartnersPage.jsx`: partner landing page and partner CTA tracking.
- `BookingModal.jsx`: booking iframe/modal.
- `MessengerFab.jsx`: floating messenger CTAs.
- `Footer.jsx`: footer links and social CTAs.

## Translations

- Main landing translations: `app/data/translations.jsx`
- Re-export: `app/data/translations.js`
- Partner page copy: `app/data/partners.js`

Current issue: Russian text appears mojibake/encoding-corrupted in several files. Confirm rendering in browser before editing copy.

## Tracking logic

- Main tracking helper: `app/utils/tracking.js`
- GTM/Umami script loading: `app/components/RootLayoutShell.jsx`
- Page-level attribution and `page_view`: `app/components/LandingPage.jsx`, `app/components/PartnersPage.jsx`

## Main files

- `app/data/siteConfig.js`
- `app/data/links.js`
- `app/data/translations.jsx`
- `app/data/partners.js`
- `app/utils/tracking.js`
- `app/components/LandingPage.jsx`
- `app/components/RootLayoutShell.jsx`
- `app/globals.css`
- `app/sitemap.js`
- `app/robots.js`
- `next.config.mjs`

## Do not rename without need

- Route folders: `app/(en)`, `app/(ru)`, `app/(ru)/ru`
- Public routes: `/`, `/ru`, `/partners`, `/ru/partners`
- Data exports used across components: `translations`, `links`, `siteConfig`, `partnersContent`
- Tracking function names in `app/utils/tracking.js`
- Public asset paths under `public/`, because components reference them directly.

## Last updated

2026-05-29
