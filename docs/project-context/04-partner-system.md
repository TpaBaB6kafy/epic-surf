# Partner System

## How it works

- Partner traffic uses normal site URLs with query parameters.
- `storeAttributionFromUrl({ includePartner: true })` reads query params in the browser.
- Attribution is saved to `localStorage`.
- Stored key: `epic_surf_attribution`
- Stored fields may include attribution params plus `landing_page` and `stored_at`.

Source files:

- `app/utils/tracking.js`
- `app/components/LandingPage.jsx`
- `app/components/PartnersPage.jsx`
- `docs/partner-attribution.md`

## Personal links

Example English link:

```txt
https://www.surfdanang.com/?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

Example Russian link:

```txt
https://www.surfdanang.com/ru?partner=hotel_abc&utm_source=hotel_abc&utm_medium=partner&utm_campaign=partner_referral&utm_content=reception_qr
```

## QR codes

- QR codes should point to partner URLs with `partner` and UTM parameters.
- QR generation/storage is not implemented in the codebase.
- QR production workflow: needs confirmation.

## `partner` query param

- Supported param: `partner`
- Stored only when `includePartner: true`.
- Included in analytics only for partner context or lead-related events.
- Partner code is appended to WhatsApp/Telegram/Zalo message text when available.

## UTM tags

Supported:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

## Events that should include partner attribution

Defined in `PARTNER_LEAD_EVENTS`:

- `booking_cta_click`
- `whatsapp_click`
- `telegram_click`
- `zalo_click`
- `rental_cta_click`
- `partner_cta_click`

## Alteg/YClients booking

- Current Alteg URL is not modified with partner or UTM params.
- Reason from existing docs: official support for passing these params through booking is not confirmed.
- Attribution for bookings is captured before opening Alteg via analytics events.

## Last updated

2026-05-29
