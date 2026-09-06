# Home V2 homepage promotion

## Saved inputs

- Base: origin/main at ae7891a3e41335be3fbca24c2042b38af3e69034.
- V2 checkpoint: 549881afe6352d9fe2965ff3df3055a59852c06b.
- Branch: release/home-v2-promotion.
- Old production is saved in archive/home-before-v2-2026-09-06 and annotated tag backup-home-before-v2-2026-09-06, verified on origin.
- Vercel production FERvvoPQXknrzwWLFmLKqFKVaPLY was confirmed to use the base SHA before this work.

## Route ownership

The English root and /ru render HomeV2Page. The temporary /home-v2 and /ru/home-v2 routes do not exist and return 404, including with query parameters. There are no redirects for these addresses. Their route files were not present in the main base and were deliberately excluded from the transfer.

HomeV2Page uses the primary locale URLs for navigation and language switching. Four Russian footer links use the existing English article URLs while keeping Russian labels; the Russian rental URL remains localized.

## Preserved behavior

Only the two root page modules and shared Header, MessengerFab and globals.css change among existing application files. Home V2 components and public/design/home-v2 assets, including the v2.3 mobile bundle and font licenses, are added from the checkpoint. No design-system lab or QA material is imported.

The main implementations of LandingPage and its sections, rental pages/assets/prices, translations, booking/rental modals, booking URLs, tracking utilities, layout metadata, RootLayoutShell, structured data, robots, sitemap, Yandex verification, package.json and package-lock.json are preserved. Existing CSS is retained; V2 CSS is additive.

Line-up/Pro remains 1.200.000 VND in both locales. Main's board prices (including 350000 VND) remain authoritative. The rental promotion's existing starting price remains 250.000 VND.

V2 LiveCam uses main's 30-second preview URL, mounts when the section enters the viewport, supports the missing-IntersectionObserver fallback, and reports preview load on iframe load rather than mount. External stream availability is not asserted by local tests.

Main's lesson WhatsApp messages intentionally omit the partner code; partner attribution remains on lead events. General messenger/rental behavior is retained. Existing main wording, including the lesson section heading, is retained.

## Local verification and review

Install with npm ci --no-audit --no-fund; no dependency versions or lockfile changes are needed. Run npm run lint and npm run build.

For local event-payload tests only, the build process used NEXT_PUBLIC_GTM_ID=GTM-LOCALQA. This is a non-production marker supplied to that process, not a saved project or Vercel environment setting. The tests block external providers and inspect local dataLayer payloads. They do not prove receipt by external analytics or create bookings.

The local production build is served with npm run start -- --port 3300. Review http://127.0.0.1:3300/ and http://127.0.0.1:3300/ru. Other servers are left running.

Run the target suite with:

    npx playwright test --config=playwright.promotion.config.js --reporter=line

The config uses one worker to avoid intermittent concurrent-browser resource stalls in this local environment. Tests cover 404/no redirect for retired URLs; EN/RU 390/1440 layout and navigation; lesson states and conversion paths; booking fallback; messenger/rental links; attribution; SEO; LiveCam integration; and linked production-page smoke checks. Older tests explicitly testing the superseded homepage presentation are not part of the promotion suite. No broad test-suite success is claimed.

No commit, push, merge or production deploy is part of this preparation. A future production build must use the actual deployment environment, not the local QA marker.

## Verification result

- npm run lint: passed, including the final test edits.
- npm run build: passed; generated route list contains / and /ru and no preview routes.
- Target suite: all 34 distinct checks passed (28 in the full run, then the remaining 6 in a sequential rerun after aligning test expectations with main).
- Retired URLs: 404 with and without partner/UTM query parameters; no Location header.
- Existing application diff: five files modified, no tracked file deleted. The two original worktrees keep their prior HEADs and have no tracked changes.
- Remaining review limitation: local browser tests isolate external providers. External analytics receipt, provider uptime and real booking submission were not verified. No booking was created.
