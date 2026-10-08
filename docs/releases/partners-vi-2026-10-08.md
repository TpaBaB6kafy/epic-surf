# Vietnamese partner page — 2026-10-08

The user approved commit, push and deployment of the Vietnamese partner page. The independent /vi/partners route contains Vietnamese server-rendered copy, a localized form, accessibility labels, footer and booking-modal shell. Zalo is the preferred VI contact. Existing commercial terms and English/Russian instruction are preserved.

Each partner page has reciprocal EN/RU/VI hreflang. The VI page has its own canonical, metadata, Vietnamese WebPage schema and sitemap entry. The round language control opens round EN/RU/VI links, retains attribution, and supports Escape with focus restoration. The request handler accepts VI and records the correct source route.

Validation before publication: production build, scoped ESLint, 142 production-preview checks across 20 responsive views, 53 existing EN/RU form checks, 30 isolated API checks and 4 contact/analytics checks. External widgets were stubbed and message delivery mocked. No real notifications or bookings were created. The existing bot-configuration dependency is unchanged; see ../partner-code-requests.md.

Copy and implementation notes: ../partners-vi-localization.md. Local verification artifacts: output/partners-vi-2026-10-08/production/. No independent human native-speaker review was performed.

Release contains only the reviewed partner localization and its shared-component support. Independent homepage sunset edits, the pre-existing QA-script modification and local tmp/output material are excluded. Production is published through the existing GitHub/Vercel integration by pushing main. Deployment status and public routes will be verified against the release commit after push.
