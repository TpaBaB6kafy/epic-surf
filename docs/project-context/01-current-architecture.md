# Current Architecture

## `app/` structure

- `app/(en)/page.js`: English homepage at `/`.
- `app/(ru)/ru/page.js`: Russian homepage at `/ru`.
- `app/(en)/partners/page.js`: English partners page at `/partners`.
- `app/(ru)/ru/partners/page.js`: Russian partners page at `/ru/partners`.
- `app/(en)/surfboard-rental-danang/page.js`: English rental page at `/surfboard-rental-danang`.
- `app/(ru)/ru/surfboard-rental-danang/page.js`: Russian rental page at `/ru/surfboard-rental-danang`.
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
- `Rentals.jsx`: homepage rental promo, mini showroom, rental modal CTA, and locale-specific catalog link.
- `RentalBoardMiniShowroom.jsx`: updated homepage rental board presentation.
- `RentalDesignTestPage.jsx` / `RentalBoardShowroom.jsx`: production rental page and full board showroom.
- `RentalModal.jsx`: rental enquiry flow.
- `LiveCam.jsx`: My Khe live preview, provider attribution, outbound links, and WhatsApp conditions CTA.
- `Forecast.jsx`: location/forecast/map section.
- `PartnersPage.jsx`: partner landing page and partner CTA tracking.
- `BookingModal.jsx`: booking iframe/modal.
- `MessengerFab.jsx`: floating messenger CTAs.
- `Footer.jsx`: footer links and social CTAs.

## Homepage section order

`LandingPage.jsx` currently renders: Header, Hero, Why Epic, How It Works, Lessons, Included Bento, Rentals, LiveCam, Forecast, Reviews, FAQ, Events, Gallery, Footer, Messenger FAB, Booking Modal, Rental Modal.

LiveCam is intentionally placed between Rentals and Forecast.

## Translations

- Main landing translations: `app/data/translations.jsx`
- Re-export: `app/data/translations.js`
- Partner page copy: `app/data/partners.js`
- LiveCam provider config: `app/data/liveCam.js`
- Rental board catalog: `app/data/rentalBoards.js`
- SEO page content and links: `app/data/seoPages.js`

Current issue: Russian text appears mojibake/encoding-corrupted in several files. Confirm rendering in browser before editing copy.

## Tracking logic

- Main tracking helper: `app/utils/tracking.js`
- GTM/Umami script loading: `app/components/RootLayoutShell.jsx`
- Page-level attribution and `page_view`: `app/components/LandingPage.jsx`, `app/components/PartnersPage.jsx`
- LiveCam events: `app/components/LiveCam.jsx`

## Relevant tests

- `tests/live-cam.spec.js`: LiveCam placement, responsive 16:9 preview, provider links, and CTA behavior.
- `tests/homepage-rental-showroom.spec.js`: homepage mini showroom.
- `tests/rental-flow.spec.js`: EN/RU rental flows.
- `tests/rental-production.spec.js`: redesigned rental page behavior.
- `tests/process-rental-board-images.test.mjs`: rental image processing.

## Main files

- `app/data/siteConfig.js`
- `app/data/links.js`
- `app/data/translations.jsx`
- `app/data/partners.js`
- `app/data/liveCam.js`
- `app/data/rentalBoards.js`
- `app/data/seoPages.js`
- `app/utils/tracking.js`
- `app/components/LandingPage.jsx`
- `app/components/RootLayoutShell.jsx`
- `app/components/LiveCam.jsx`
- `app/components/Rentals.jsx`
- `app/components/RentalBoardMiniShowroom.jsx`
- `app/components/RentalDesignTestPage.jsx`
- `app/globals.css`
- `app/sitemap.js`
- `app/robots.js`
- `next.config.mjs`

## Do not rename without need

- Route folders: `app/(en)`, `app/(ru)`, `app/(ru)/ru`
- Public routes: `/`, `/ru`, `/partners`, `/ru/partners`, `/surfboard-rental-danang`, `/ru/surfboard-rental-danang`
- Data exports used across components: `translations`, `links`, `siteConfig`, `partnersContent`
- Tracking function names in `app/utils/tracking.js`
- Public asset paths under `public/`, because components reference them directly.

## Last updated

2026-06-15
