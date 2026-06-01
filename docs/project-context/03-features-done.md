# Features Done

## Homepage routing

- English homepage at `/`: `app/(en)/page.js`
- Russian homepage at `/ru`: `app/(ru)/ru/page.js`
- Both render `LandingPage.jsx` with locale.

## Core landing page

- `app/components/LandingPage.jsx`
- Composes header, hero, why, process, lessons, included items, rentals, forecast/location, reviews, FAQ, events, gallery, footer, messenger FAB, booking modal, rental modal.

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
- Rental CTA tracked as `rental_cta_click`.
- Messenger links are built with attribution-aware helpers.

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

## Security headers

- `next.config.mjs`
- Adds DNS prefetch, frame, content-type, referrer, and permissions-policy headers.

## Last updated

2026-05-29
