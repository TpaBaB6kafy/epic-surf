# SEO and Routing

## Routes

English:

- `/`
- `/partners`

Russian:

- `/ru`
- `/ru/partners`

## Why `/` is English

- `siteConfig.defaultLocale` is `en`.
- `localizedPath("en")` returns `/`.
- `app/(en)/page.js` renders `LandingPage locale="en"`.
- English is the `x-default` language alternate.

## Why `/ru` is Russian

- `siteConfig.alternateLocale` is `ru`.
- `localizedPath("ru")` returns `/ru`.
- `app/(ru)/ru/page.js` renders `LandingPage locale="ru"`.

## SEO benefits

- Clean language-specific URLs.
- Canonicals are generated per locale.
- `alternates.languages` maps EN/RU versions.
- Sitemap includes both language versions.
- Structured data is generated per locale.

## SEO files

- `app/data/siteConfig.js`: metadata, alternates, structured data, canonical domain.
- `app/sitemap.js`: sitemap entries.
- `app/robots.js`: robots and sitemap URL.
- Partner page metadata: route-level `page.js` files.

## Do not break

- Do not move `/` away from English without an SEO migration plan.
- Do not move `/ru` without redirects and alternate updates.
- Do not remove language alternates.
- Do not change canonical domain without confirming production DNS.
- Do not rename route folders casually.
- Do not remove `metadataBase`, sitemap, or structured data.

## Current issue

- Russian metadata/content appears encoding-corrupted in source files. Needs confirmation in browser and source control before editing SEO copy.

## Last updated

2026-05-29
