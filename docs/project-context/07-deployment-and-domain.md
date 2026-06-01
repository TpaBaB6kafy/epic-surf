# Deployment and Domain

## Deployment

- Project is a Next.js app.
- Scripts:
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
- README points to Vercel as deployment platform.
- Actual Vercel project settings: needs confirmation.

## Domain

- Default canonical domain: `https://www.surfdanang.com`
- Source: `app/data/siteConfig.js`
- README says default canonical domain is already `https://www.surfdanang.com`.
- Optional override:
  - `NEXT_PUBLIC_SITE_URL`
  - `SITE_URL`

## Domains mentioned by user

- `surfdanang.com`
- `www.surfdanang.com`

Repository confirms only `https://www.surfdanang.com` as the default canonical URL.

## DNS notes

- DNS provider: needs confirmation.
- Whether apex `surfdanang.com` redirects to `www.surfdanang.com`: needs confirmation.
- Vercel domain assignment: needs confirmation.
- Current production SSL status: needs confirmation.

## Wix notes

- No Wix references found in repository files.
- What happened with Wix and how it connects to current deployment: needs confirmation.

## Important

- Keep `siteConfig.siteUrl` aligned with the canonical production domain.
- If changing apex/www behavior, update:
  - Vercel domains
  - DNS records
  - canonical URL env vars
  - sitemap/robots output
  - Search Console properties, if used

## Last updated

2026-05-29
