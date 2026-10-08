# Vietnamese partner page

Implemented 2026-10-08 at `/vi/partners`. This is an independent, statically rendered public route; changing language navigates to another URL.

## Copy and scope

The Vietnamese text is in `app/data/partners-vi.js`. It addresses local business partners with the respectful form “Quý đối tác” and explains the actual workflow rather than reproducing English labels word for word:

- “Giới thiệu khách”: referring guests.
- “Hoa hồng”: commission, explicitly subject to agreement.
- “Mã đối tác”: partner code, distinct from a discount code.
- “Đối soát”: reconciling confirmed referrals before settlement.

Mỹ Khê and Đà Nẵng use Vietnamese spelling. Hostel, softboard and retreat are retained only where their context explains the meaning. Lessons remain described as taught in English or Russian. No commission rate, payout schedule, cancellation policy or Vietnamese-language instruction has been invented.

The form, status messages, accessibility labels, navigation, booking-modal shell and expanded footer are localized. The existing English booking destination is identified as an English form. Zalo is the main partnership contact. The homepage and other services are still EN/RU.

Translation was authored and reviewed by the coding agent. No independent human native-speaker review was performed.

## Search and behavior

The page has Vietnamese title, description, social metadata, `html lang="vi"`, a self canonical and Vietnamese WebPage structured data. All three partner routes have reciprocal EN/RU/VI hreflang and x-default EN; sitemap includes the VI page without inventing a Vietnamese homepage. Shared WebSite language metadata includes VI.

The round language button has no arrow. Its options are round 44×44 links. Escape closes the options and restores focus. Language navigation retains partner and UTM parameters. The form handler accepts VI and records `/vi/partners` in the existing bot notification; no real notification was sent during QA.

## Verification

- Production build and targeted ESLint passed.
- 30 mocked API checks and 4 contact/analytics checks passed.
- 53 existing EN/RU email-form checks passed on the production preview.
- 142 production checks passed. `scripts/verify-partners-vi.mjs` verifies independent URLs, server-rendered copy, metadata, language navigation, circle geometry, keyboard focus, form states, Zalo, booking, map, slider and 20 responsive views.
- VI: 320, 360, 390, 700, 1024, 1200, 1440, 1920, 2560, 3200 px. EN/RU: 390, 1024, 1440, 1920, 2560 px.
- Browser font inspection confirms Vietnamese title glyphs use Montserrat and body glyphs use Chivo, with no fallback-font substitution in the sampled text.

Artifacts: `output/partners-vi-2026-10-08/`. Before screenshots are in `before/`; final production results are in `production/qa.json`, `production/fonts.json`, and `production/after/`. External scripts/widgets are stubbed and form delivery is mocked. Local screenshot runs hide the Next.js developer badge.

Local production preview: http://localhost:3011/vi/partners. The user approved commit, push and production deployment on 2026-10-08. Release validation and publishing are recorded in `docs/releases/partners-vi-2026-10-08.md`.
