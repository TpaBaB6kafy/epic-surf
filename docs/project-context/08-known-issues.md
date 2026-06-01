# Known Issues

## Russian encoding

- Russian text appears mojibake/encoding-corrupted in source files such as:
  - `app/data/translations.jsx`
  - `app/data/partners.js`
  - `app/data/siteConfig.js`
  - `app/(ru)/ru/partners/page.js`
- Needs browser verification and source encoding check before copy edits.

## Partner attribution through Alteg/YClients

- Current Alteg booking URLs are not modified with partner/UTM params.
- Official support for source/UTM params in booking records is not confirmed.
- Existing workaround: capture attribution in analytics before opening booking.

## QR code workflow

- Partner QR codes are described in copy/docs.
- QR generation and asset management are not implemented in code.
- Needs confirmation.

## DNS/domain state

- `www.surfdanang.com` is configured as canonical in code.
- Apex domain behavior, DNS records, and Vercel domain state need confirmation.

## Analytics validation

- GTM/Umami integration is implemented.
- Production event delivery should be checked with real env vars.
- Confirm `dataLayer` and Umami payloads include expected attribution fields.

## Technical debt

- Large translation/content files mix copy and JSX icons.
- Several components contain dense Tailwind class strings.
- No automated tests are visible beyond installed Playwright dependency.
- README still contains default create-next-app sections.

## Last updated

2026-05-29
