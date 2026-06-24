# Current Architecture

## `app/` structure

- `app/(en)/page.js`: English homepage at `/`.
- `app/(ru)/ru/page.js`: Russian homepage at `/ru`.
- `app/(en)/home-v2/page.js`: hidden English Home V2 experiment at `/home-v2`.
- `app/(ru)/ru/home-v2/page.js`: hidden Russian Home V2 experiment at `/ru/home-v2`.
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

## Home V2 experiment

- Branch: `design/home-v2-poster-collage`.
- Routes: `/home-v2` and `/ru/home-v2`.
- Route metadata: both route files set `robots.index = false` and `robots.follow = false`, including `googleBot`.
- The experiment uses the existing homepage business logic patterns, translations, booking/rental modals, messenger links, analytics helpers, and partner attribution.
- Production homepages `/` and `/ru` are still owned by `app/(en)/page.js` and `app/(ru)/ru/page.js` and must not be replaced before approval.

## Key components

- `LandingPage.jsx`: main page composition and modal state.
- `home-v2/HomeV2Page.jsx`: Home V2 page composition, locale switch, modal state, gallery state, and messenger/rental wrappers.
- `home-v2/PosterPrimitives.jsx`: shared poster/collage primitives for the experiment.
- `home-v2/sections/HomeV2Hero.jsx`: Home V2 hero and benefit cards.
- `home-v2/sections/HomeV2ContentSections.jsx`: Home V2 how-it-works, reviews, FAQ, events, and gallery sections.
- `home-v2/sections/HomeV2LessonsRentals.jsx`: Home V2 lessons, included, rentals, and photo break sections.
- `home-v2/sections/HomeV2UtilitySections.jsx`: Home V2 LiveCam and forecast sections.
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

Home V2 currently renders: Header, Hero, How It Works, Lessons, Included, Rentals, LiveCam, Forecast, Photo Break, Reviews, FAQ, Events, Gallery, Footer, Messenger FAB, Booking Modal, Rental Modal.

## Translations

- Main landing translations: `app/data/translations.jsx`
- Re-export: `app/data/translations.js`
- Partner page copy: `app/data/partners.js`
- LiveCam provider config: `app/data/liveCam.js`
- Rental board catalog: `app/data/rentalBoards.js`
- SEO page content and links: `app/data/seoPages.js`

Current issue: Russian text appears mojibake/encoding-corrupted in several files. Confirm rendering in browser before editing copy.

## Home V2 assets

- `public/design/home-v2/why-epic/`: hero ocean image, benefit paper cards, and icons.
- `public/design/home-v2/how-it-works/`: poster card and step-number assets.
- `public/design/home-v2/lessons/`: lesson paper cards, icons, heading paper, and dividers.
- `public/design/home-v2/rentals/`: rental scene, board overlay, torn heading, and brush assets.
- `public/brand/epic-logo.svg` and `public/brand/surf-school-hero-logo.svg`: used by the Home V2 hero mask.
- `docs/design-experiments/home-v2/references/`: private design references for direction only; do not use them as public site assets.

## Tracking logic

- Main tracking helper: `app/utils/tracking.js`
- GTM/Umami script loading: `app/components/RootLayoutShell.jsx`
- Page-level attribution and `page_view`: `app/components/LandingPage.jsx`, `app/components/PartnersPage.jsx`
- LiveCam events: `app/components/LiveCam.jsx`

## Relevant tests

- `tests/live-cam.spec.js`: LiveCam placement, responsive 16:9 preview, provider links, and CTA behavior.
- `tests/homepage-rental-showroom.spec.js`: homepage mini showroom.
- `tests/home-v2.spec.js`: hidden Home V2 EN/RU routes, language switch, section rendering, poster assets, interactions, responsive behavior, and sitemap exclusion.
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
- `app/components/home-v2/HomeV2Page.jsx`
- `app/components/home-v2/PosterPrimitives.jsx`
- `app/components/home-v2/sections/HomeV2Hero.jsx`
- `app/components/home-v2/sections/HomeV2ContentSections.jsx`
- `app/components/home-v2/sections/HomeV2LessonsRentals.jsx`
- `app/components/home-v2/sections/HomeV2UtilitySections.jsx`
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
- Hidden test routes: `/home-v2`, `/ru/home-v2`
- Data exports used across components: `translations`, `links`, `siteConfig`, `partnersContent`
- Tracking function names in `app/utils/tracking.js`
- Public asset paths under `public/`, because components reference them directly.

## Last updated

2026-06-24
