# Master Context

## Project

Epic Surf School Da Nang website: Next.js App Router, React, Tailwind CSS v4. Goal: sell surf lessons/rentals, route users to booking and messengers, support EN/RU visitors and partner referrals.

## Routes

- `/`: English homepage.
- `/ru`: Russian homepage.
- `/partners`: English partner page.
- `/ru/partners`: Russian partner page.
- `/surfboard-rental-danang`: English surfboard rental page.
- `/ru/surfboard-rental-danang`: Russian surfboard rental page.

## Key Files

- `app/components/LandingPage.jsx`: homepage composition.
- `app/components/Rentals.jsx`, `app/components/RentalBoardMiniShowroom.jsx`: updated homepage rental block.
- `app/components/LiveCam.jsx`, `app/data/liveCam.js`: Da Nang Surf Cam partner preview and links.
- `app/data/seoPages.js`: SEO page content and route links.
- `app/components/RootLayoutShell.jsx`: GTM, Umami, structured data shell.
- `app/data/siteConfig.js`: SEO, canonical domain, structured data.
- `app/data/translations.jsx`: main EN/RU content.
- `app/data/partners.js`: partner page content.
- `app/data/links.js`: booking, messenger, social links.
- `app/utils/tracking.js`: attribution and `trackEvent()`.
- `app/globals.css`: Tailwind v4 theme.
- `app/sitemap.js`, `app/robots.js`: SEO routing.

## Design Tokens

- `epicDark`: `#2E2E2E`
- `epicRed`: `#FE746A`
- `epicWhite`: `#F6F6F6`
- `epicMint`: `#AAFFC7`
- `epicGray`: `#585858`
- Headings: `"Arial Black", Arial, "Helvetica Neue", Helvetica, sans-serif`
- Body/UI: system sans stack.

## Partner System

- Partner links use `partner`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
- Attribution is stored in `localStorage` key `epic_surf_attribution`.
- `partner` is included only for partner context or lead events.
- Messenger messages append partner code when available.
- QR generation/storage is not implemented; workflow needs confirmation.
- Alteg/YClients URL is not modified; official support for partner/UTM passthrough needs confirmation.

## Analytics

- GTM: `NEXT_PUBLIC_GTM_ID`.
- Umami: `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- Canonical override: `NEXT_PUBLIC_SITE_URL` or `SITE_URL`.
- `trackEvent()` sends to `dataLayer` and Umami when configured.
- Events include `page_view`, `booking_cta_click`, `gallery_open`, `map_activate`, `language_switch`, messenger clicks, `rental_cta_click`, `partner_cta_click`, `live_cam_preview_load`, `live_cam_outbound_click`, and `live_cam_cta_click`.

## Current Main State

- Current HEAD is `86dcc76` (`Fix live cam preview aspect ratio`).
- The redesigned EN/RU surfboard rental pages are in `main`.
- The homepage rental block uses the updated mini showroom and links to the locale-specific rental page.
- `LiveCam` is in `main` between Rentals and Forecast on both homepages.
- The block uses the Da Nang Surf Cam / Ryan partner embed with partner ID `epicsurf`.
- The embedded preview is responsive 16:9. The full stream remains on `danangsurfcam.com`.
- Former preview-branch deployment URLs are obsolete and must not be treated as the current site.

## Do Not Break

- Public routes: `/`, `/ru`, `/partners`, `/ru/partners`, `/surfboard-rental-danang`, `/ru/surfboard-rental-danang`.
- Locale alternates, sitemap, robots, canonical domain behavior.
- `trackEvent()` and partner attribution scope.
- Booking and messenger links.
- Public asset paths referenced from components.
- Design tokens without confirmation.

## Known Issues

- Russian source text appears encoding-corrupted; verify in browser/source before editing.
- DNS, apex/www redirect, Vercel domain settings: needs confirmation.
- Wix history: needs confirmation.
- Production analytics delivery needs validation.
- LiveCam availability depends on the external Da Nang Surf Cam provider.
- README still contains create-next-app boilerplate.

## Next Tasks

- Confirm DNS/Vercel/env vars.
- Validate analytics payloads in production.
- Validate LiveCam event delivery in production analytics.
- Decide later whether My Khe live cam needs a dedicated SEO page.
- Replace the partner embed with an Epic-owned camera only as a future project.
- Confirm Alteg/YClients UTM/partner support.
- Check and fix Russian encoding if confirmed broken.
- Clean README and document exact deployment setup.

## Last updated

2026-06-15
