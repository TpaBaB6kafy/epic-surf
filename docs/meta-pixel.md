# Meta Pixel

Pixel ID: `2326198411479887`.

Direct integration: `app/components/MetaPixel.jsx`, mounted by the shared public
`RootLayoutShell.jsx`. It observes Next.js pathname changes. The loader and queue
are in `app/utils/metaPixel.js`; no GTM setup or environment variable is required.
Existing GTM and Umami integrations are unchanged.

## Behavior

- Loads the official `https://connect.facebook.net/en_US/fbevents.js` SDK
  asynchronously on `surfdanang.com` and `www.surfdanang.com` only.
- Initializes this Pixel once per document. Queues `PageView` until the SDK is ready.
- Sends `PageView` on the initial page and each pathname change, including
  returning to a previously visited page. Consecutive effect replays for the same
  pathname do not send extra events. Query/hash-only changes are not new views.
- Uses `trackSingle` so these views target this Pixel ID only.
- Does not load on localhost, Vercel preview domains or the design-system catalog.
- Renders no UI. Does not add a JavaScript-disabled image fallback.
- Does not forward the existing analytics payload, form fields, partner codes or
  messenger messages to Meta. Standard SDK behavior, including the page URL and
  Meta-side settings, still applies.
- Does not add custom lead, booking-completed, payment or Alteg events. The Alteg
  iframe requires its own integration. Consent UI/settings are unchanged.
- Vendor failures do not throw into navigation, booking or messenger handlers.

## Verification and publication

Run `node --test scripts/verify-meta-pixel.mjs`, scoped ESLint and the production
build. The Node tests use a mocked SDK/DOM and never contact Meta.

After publication, check the real EN/RU site in Meta Events Manager / Pixel Helper:
one `PageView` on entry, one after a page link, and another when returning. Check
the rental and partner pages too. Anchor clicks should not send a new page view.
Confirm only one copy of this Pixel is installed. Local checks do not demonstrate
receipt or ad attribution in Meta. The host guard intentionally disables live
Meta requests in development and on preview domains.

Code preparation is not publication. This task has not changed the GTM or Alteg
accounts, and does not create server-side Conversions API events.
