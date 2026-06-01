# Epic Surf School Da Nang

Website for Epic Surf School Da Nang. It sells surf lessons and board rentals, routes visitors to booking and messengers, supports EN/RU pages, and tracks partner referrals.

## Stack

- Next.js App Router
- React
- Tailwind CSS v4

## Routes

- `/` - English homepage
- `/ru` - Russian homepage
- `/partners` - English partner page
- `/ru/partners` - Russian partner page

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - start production server
- `npm run lint` - run ESLint

## Project Docs

- Project context docs: `docs/project-context/`
- Start with: `docs/project-context/MASTER-CONTEXT.md`

## Env Variables

- `NEXT_PUBLIC_GTM_ID` - enables Google Tag Manager
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` - Umami script URL
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` - Umami website ID
- `NEXT_PUBLIC_SITE_URL` - optional canonical site URL override
- `SITE_URL` - optional canonical site URL override

Default canonical domain in code: `https://www.surfdanang.com`.

## SEO

SEO metadata, canonical URLs, language alternates, and structured data live in `app/data/siteConfig.js`. Sitemap and robots are in `app/sitemap.js` and `app/robots.js`.

Do not break public routes, language alternates, canonical behavior, sitemap, or structured data without a migration plan.

## Partner System

Partner links use `partner`, `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content`. Attribution is stored client-side in `localStorage` under `epic_surf_attribution`.

Partner attribution is included only for partner context or lead events. Messenger messages append the partner code when available.

## Analytics

Tracking lives in `app/utils/tracking.js`. `trackEvent()` sends events to GTM `dataLayer` and Umami when env vars are configured.

Known tracked events include `page_view`, `booking_cta_click`, `gallery_open`, `map_activate`, `language_switch`, messenger clicks, `rental_cta_click`, and `partner_cta_click`.

## Needs Confirmation

- DNS and apex/www redirect setup
- Vercel project/domain settings
- Partner QR code workflow
- Alteg/YClients partner or UTM passthrough support
