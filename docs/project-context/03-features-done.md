# Features Done

## Homepage routing

- English homepage at `/`: `app/(en)/page.js`
- Russian homepage at `/ru`: `app/(ru)/ru/page.js`
- Both render `LandingPage.jsx` with locale.

## Core landing page

- `app/components/LandingPage.jsx`
- Composes header, hero, why, process, lessons, included items, rentals, LiveCam, forecast/location, reviews, FAQ, events, gallery, footer, messenger FAB, booking modal, rental modal.
- LiveCam is placed between Rentals and Forecast.

## Booking flow

- `BookingModal.jsx`
- Booking URLs from `app/data/links.js`
- CTA tracking from `LandingPage.jsx` and section components.

## Surf lessons

- `Lessons.jsx`
- Uses translated content from `app/data/translations.jsx`
- Opens booking modal with tracked `booking_cta_click`.

## Rentals

- `Rentals.jsx`
- `RentalModal.jsx`
- Redesigned rental pages are live at `/surfboard-rental-danang` and `/ru/surfboard-rental-danang`.
- The homepage rental block uses `RentalBoardMiniShowroom.jsx` and links to the matching EN/RU rental page.
- The production rental experience uses `RentalDesignTestPage.jsx`, `RentalBoardShowroom.jsx`, and `app/data/rentalBoards.js`.
- Rental board images, detail crops, contact sheets, and desktop/mobile hero images were updated as part of the redesign.
- Rental CTA tracked as `rental_cta_click`.
- Messenger links are built with attribution-aware helpers.

## My Khe LiveCam

- `LiveCam.jsx` and `app/data/liveCam.js` are in `main`.
- Provider: Da Nang Surf Cam / Ryan; partner ID: `epicsurf`.
- The homepage embeds a short partner preview; the full stream remains on `danangsurfcam.com`.
- The iframe fills a responsive 16:9 preview container across mobile, tablet, and desktop layouts.
- Tracks preview load, provider outbound clicks, and the Epic WhatsApp conditions CTA.

## Forecast/location

- `Forecast.jsx`
- Google Maps link from `app/data/links.js`
- Tracks `map_activate`.

## Gallery and events

- `Events.jsx`
- `Gallery.jsx`
- Gallery data from `app/data/gallery.js`
- Event gallery opening tracked as `gallery_open`.

## Reviews

- `Reviews.jsx`
- Google Maps URL from `app/data/links.js`.

## Partner pages

- `PartnersPage.jsx`
- Content in `app/data/partners.js`
- Routes: `/partners`, `/ru/partners`
- Tracks partner page views and partner CTA clicks.

## Analytics and attribution

- `RootLayoutShell.jsx`: loads GTM and Umami when env vars exist.
- `app/utils/tracking.js`: `trackEvent()`, attribution storage, partner code helpers, messenger URL builders.
- Existing doc: `docs/partner-attribution.md`

## SEO

- Metadata and structured data: `app/data/siteConfig.js`
- Sitemap: `app/sitemap.js`
- Robots: `app/robots.js`
- Language alternates for EN/RU routes.
- Reciprocal canonical/hreflang metadata and sitemap entries for the EN/RU rental pages.

## Security headers

- `next.config.mjs`
- Adds DNS prefetch, frame, content-type, referrer, and permissions-policy headers.

## Last updated

2026-06-15
