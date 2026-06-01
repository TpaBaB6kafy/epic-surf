# Confirmation Checklist

## 1. Confirmed From Repository

- Canonical default is `https://www.surfdanang.com` in `app/data/siteConfig.js`.
- Canonical can be overridden by `SITE_URL` or `NEXT_PUBLIC_SITE_URL`.
- GTM env var is `NEXT_PUBLIC_GTM_ID`.
- Umami env vars are `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- GTM/Umami scripts load in `app/components/RootLayoutShell.jsx`.
- `trackEvent()` is in `app/utils/tracking.js`.
- Partner attribution uses `partner`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`.
- Attribution is stored in `localStorage` key `epic_surf_attribution`.
- Alteg/YClients booking URLs are not modified with partner/UTM params.
- QR generation/storage is not implemented in code.
- No Wix references found in repository files.
- README create-next-app boilerplate has been removed.

## 2. Cannot Confirm Without Vercel/DNS/Production Access

- DNS provider: needs confirmation.
- Apex `surfdanang.com` behavior and redirect to/from `www.surfdanang.com`: needs confirmation.
- Vercel project and domain assignment: needs confirmation.
- Production SSL status: needs confirmation.
- Production env values for GTM, Umami, and canonical site URL: needs confirmation.
- Whether production analytics receives events correctly: needs confirmation.
- Wix migration/history and whether Wix still controls DNS/domain: needs confirmation.
- Whether Alteg/YClients can store partner or UTM params in booking records: needs confirmation.

## 3. Manual Browser Checks

- Open `/`, `/ru`, `/partners`, `/ru/partners` in production.
- Confirm Russian text renders correctly; source files show mojibake, but browser output needs verification.
- Open a partner URL and confirm `localStorage.epic_surf_attribution` is written.
- Switch language from a partner URL and confirm query params are preserved.
- Click booking CTA and confirm `booking_cta_click` payload includes partner/UTM fields.
- Click WhatsApp, Telegram, and Zalo and confirm partner code is appended to message text.
- Confirm Alteg iframe/modal still opens with unchanged booking URL.
- Check GTM `dataLayer` and Umami events in production browser/devtools.

## 4. Data Needed From Owner

- DNS provider dashboard or screenshots for `surfdanang.com` records.
- Vercel project name, domain settings, and production env vars.
- Confirmation whether apex should redirect to `www` or `www` should redirect to apex.
- Current Wix account/domain status, if Wix was previously used.
- Partner QR workflow: who generates QR codes, where assets live, naming rules, and example QR.
- Alteg/YClients docs or admin screenshots proving whether booking records accept UTM/source/partner params.
- Production analytics access or screenshots showing GTM/Umami events and payloads.
- Browser screenshots of Russian pages if text appears broken.

## 5. Most Urgent

- Confirm DNS/Vercel/domain setup before changing canonical or deployment docs.
- Validate production analytics events and partner attribution.
- Confirm Alteg/YClients UTM/partner support before modifying booking URLs.
- Verify Russian text rendering before editing copy.
- Define QR workflow before promising partner QR assets.

## Last updated

2026-05-29
