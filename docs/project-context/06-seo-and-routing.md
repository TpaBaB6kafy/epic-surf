# SEO and Routing

## Routes

English:

- `/`
- `/partners`
- `/surf-lessons-danang`
- `/surfing-danang`
- `/surfboard-rental-danang`
- `/my-khe-beach-surfing`
- `/surf-guide`

Russian:

- `/ru`
- `/ru/partners`
- `/ru/surfboard-rental-danang`

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
- The rental pages use reciprocal EN/RU language alternates and English as `x-default`.

## SEO files

- `app/data/siteConfig.js`: metadata, alternates, structured data, canonical domain.
- `app/sitemap.js`: sitemap entries.
- `app/robots.js`: robots and sitemap URL.
- `app/data/seoPages.js`: English SEO page links/content and Russian rental content.
- Partner page metadata: route-level `page.js` files.
- Rental metadata: `app/(en)/surfboard-rental-danang/page.js` and `app/(ru)/ru/surfboard-rental-danang/page.js`.

## Rental canonical and hreflang

- `/surfboard-rental-danang` is self-canonical and declares EN, RU, and English `x-default` alternates.
- `/ru/surfboard-rental-danang` is self-canonical and declares reciprocal EN, RU, and English `x-default` alternates.
- `app/sitemap.js` includes both rental URLs with the same reciprocal language mapping.
- `Rentals.jsx` links the English homepage to the English rental page and the Russian homepage to the Russian rental page.

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

2026-06-15
