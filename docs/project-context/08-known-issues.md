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
- Confirm production delivery for `live_cam_preview_load`, `live_cam_outbound_click`, and `live_cam_cta_click`.

## LiveCam external dependency

- The homepage preview depends on `danangsurfcam.com` and can be affected by provider uptime, embed policy, or URL changes.
- Epic hosts only the partner preview block; the full stream remains on the provider site.
- An Epic-owned camera is not implemented and remains a future project.
- The provider is Da Nang Surf Cam / Ryan and the configured partner ID is `epicsurf`.
- The production build completed without a warning for `/epic-logo-v-ksu-v4.png` on 2026-06-15, so no active logo warning is recorded here.

## Technical debt

- Large translation/content files mix copy and JSX icons.
- Several components contain dense Tailwind class strings.
- Automated Playwright coverage exists for homepage rental, rental flows, production rental pages, LiveCam, and other key interactions; broader production monitoring is still limited.
- README still contains default create-next-app sections.

## Last updated

2026-06-15
