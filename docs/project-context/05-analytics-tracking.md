# Analytics Tracking

## GTM

- Loaded in `app/components/RootLayoutShell.jsx`.
- Env var: `NEXT_PUBLIC_GTM_ID`
- If present, GTM script loads from `googletagmanager.com`.
- `trackEvent()` pushes events to `window.dataLayer`.

## Umami

- Loaded in `app/components/RootLayoutShell.jsx`.
- Env vars:
  - `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
  - `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- If both are present, Umami script is loaded.
- `trackEvent()` calls `window.umami.track()` when available.

## Tracking helper

- File: `app/utils/tracking.js`
- Function: `trackEvent(event, payload = {})`
- Adds stored attribution and `page_path`.
- Filters `partner` out unless the event is partner-related or the current page is `/partners`.

## Env variables

- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_SITE_URL`
- `SITE_URL`

## Events found in code

- `page_view`
- `booking_cta_click`
- `gallery_open`
- `map_activate`
- `language_switch`
- `telegram_click`
- `whatsapp_click`
- `zalo_click`
- `rental_cta_click`
- `partner_cta_click`
- `live_cam_preview_load`
- `live_cam_outbound_click`
- `live_cam_cta_click`

## LiveCam events

- `live_cam_preview_load`: fired by the iframe `onLoad`; payload includes `language`, provider `danangsurfcam`, and location `homepage_live_cam`.
- `live_cam_outbound_click`: fired for full-stream and donation links; payload also identifies target `full_stream` or `donate`.
- `live_cam_cta_click`: fired for the WhatsApp conditions CTA with target `whatsapp_conditions`.
- The same WhatsApp action also emits `whatsapp_click` with service type `conditions_check`; that companion event retains partner attribution under the current `PARTNER_LEAD_EVENTS` rules.

## Events that should retain partner attribution

- `booking_cta_click`
- `whatsapp_click`
- `telegram_click`
- `zalo_click`
- `rental_cta_click`
- `partner_cta_click`

## Important behavior

- Analytics must not break booking or messenger links.
- Missing env vars are handled safely.
- Attribution is client-side only.
- Server-side conversion tracking is not implemented.

## Last updated

2026-06-15
