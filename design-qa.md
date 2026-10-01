# Home V2 targeted correction — design QA

## Lessons + Included V5 — 2026-09-30

- Source: `tmp/figma-handoff/v5/lessons-included/`, exporter 2.3.1, 1440 × 1077, zero unresolved layers. Combined desktop stage preserves the background boundary at y=843 and the gear composition spanning y=677–1009.
- Implementation: `HomeV5LessonsIncluded.jsx`, connected to the existing lesson state and booking handlers in `HomeV2LessonsRentals.jsx`. The separate old Included desktop section is omitted, leaving one `#included` anchor. Mobile/tablet presentations are retained.
- All 20 exported assets are used from `public/design/home-v5/lessons-included/`. Actual native dimensions were verified: the two Figma copies export complementary clipped halves (166px each for the circle, 129/117px for the rashguard, 6/116px for the camera, 8/129px for zinc). These are aligned at the same seam without stretching. The description surface uses its native 416 × 212 render bounds.
- Text remains live. The source spelling `CHOSSE` is corrected to `CHOOSE`; the existing grammatical `of your lesson` translation is preserved. Recursive heading axes use longhand font properties to avoid a compiled shorthand resetting them. Longer lesson prices and RU labels have scoped sizing.
- Evidence: `qa-output/lessons-included-v5/en-group.png`, `ru-group.png`, and `states.json`. EN screenshot was visually compared to the whole source reference; minor text rendering differences remain. The 1px offset between the source gear copies is unified to a common x coordinate for a continuous seam.
- Browser verification: five states cycle in both locales with correct title/price and no description overflow; previous/next controls use the existing service ordering. Booking modal opened and closed, including verification of the individual lesson destination. Messenger lesson variants retain their existing links/handlers; no messages or bookings were submitted.
- Responsive checks: desktop viewports 1200, 1440, 1920, and RU mobile 390. Desktop content widths reflect the native scrollbar (1185/1425/1905); no horizontal overflow, one Included anchor, all scoped images loaded. Existing mobile presentation remains active.
- Targeted ESLint and whitespace checks passed. Hero, Rentals and other sections were not changed by this scoped implementation.
- final result: passed

## How It Works V5 — 2026-09-30

- Source: `tmp/figma-handoff/v5/how-it-works/`, exporter 2.3.1, 1440 × 730 reference. The sole unresolved layer is the solid `#1F1F1F` section background; it is reproduced in CSS.
- Implementation: `app/components/home-v2/sections/HomeV5HowItWorks.jsx`, desktop styles in `app/globals.css`, eight exact SVG surfaces and four clipped PNG photos in `public/design/home-v5/how-it-works/`. Heading and card text remain live and localized. The EN description line breaks match the handoff, with the apparent `lessonor` typo corrected to `lesson or`.
- Visual evidence: `qa-output/how-v5/en-1440.png`; checked against `tmp/figma-handoff/v5/how-it-works/reference/reference.png`. Card and heading geometry match the supplied coordinates. Minor antialiasing differences remain in browser text rendering. The local development indicator and existing chat widget appear in the screenshot, outside the central card content.
- RU desktop checked visually; long titles fit the same labels with a smaller localized type size. Existing mobile section remains active at 390px; the V5 desktop layout is active at 1200px and 1920px. No browser console errors in the checked state.
- Targeted ESLint passed. `git diff --check` reported only existing line-ending warnings. Hero remains a separate video task.
- final result: passed

## Header V5 — 2026-09-30 (current scoped review)

### RU navigation spacing correction

- Replaced inherited EN absolute link positions with content-width flex items and a uniform 41px gap in the RU desktop navigation only. All seven items now use Arial 12px, including Partners. The entire navigation remains centered.
- Measured at viewport widths 1200, 1440, 1920, 2560: all six gaps are exactly 41px; center deviation is under 0.01px; no header overflow. At the narrowest tested desktop width, navigation-to-actions clearance is 25px, so reducing the gaps is unnecessary.
- Evidence: `qa-output/header-v5/ru-gap-checks.json` and `qa-output/header-v5/ru-equal-gaps.png` (1440 × 86 content area, inspected visually).
- EN styles and mobile styles remain unchanged. `git diff --check` passed with existing line-ending warnings only.
- final result: passed

- Scope: desktop header only, EN/RU. Earlier five-section review is preserved below.
- Source: `tmp/figma-handoff/v5/header/reference/reference.png`, 1440 × 86; exporter 2.3.1, no unresolved assets.
- Implementation: `qa-output/header-v5/en-1440.png`, 1440 × 86.
- Comparison: `qa-output/header-v5/comparison.png`, source above implementation, 1440 × 172. No image resizing.
- Browser: Codex in-app browser, local `/` and `/ru`. At viewport 1455 × 900 the Windows scrollbar consumes 15px, leaving a measured 1440px content area. Capture is a 1440 × 86 crop at the top of the page, pixel density 1. Also measured ordinary viewports 1200, 1440, 1920, 2560; content/header widths 1185, 1425, 1905, 2545, respectively.
- Additional evidence: `qa-output/header-v5/geometry.json`, `en-1920.png`, `ru-1440.png`, `ru-mobile.png` in the same directory. Geometry was measured after booking close, when the page had a retained scroll offset; x/width values are valid, negative y values reflect scrolling. Final screenshots were captured after returning to page top.
- State: default navigation, booking closed. Focused comparison is the whole 86px header; all labels and controls are legible without a larger-page crop.
- Typography: Arial 12/400 navigation; existing local Inter 12/800 actions. Live text and seven translated links retained. Minor browser capture/font smoothing differences are P3.
- Layout: source height 86px, logo about 79.2 × 35.4, language 41 × 41, CTA 112 × 41, gap 11px. At 1440 content width, nav x=400.484 versus source 400.996; action positions differ by less than 0.02px. Wide screens keep the 86px height, centered menu and proportional outer gutters. No header overflow or intersection of logo/nav/actions at tested desktop widths.
- Colors: #1F1F1F background, white navigation, #F6F6F6 source logo, #2E2E2E language control, #FE746A CTA.
- Assets: exact supplied SVG logo and textless CTA surface copied to `public/design/home-v5/header/`. No rasterized navigation or generated replacements.
- Content: Lessons, Rentals, Process, Forecast, Events, Map, Partners. All six in-page targets exist; Partners retains its existing localized route.
- Interaction verification: header Book Now opens the existing booking modal with its booking iframe/link; close button works. EN→RU→EN navigation works. No booking was submitted. Mobile at 390px retains original logo/menu and has no header overflow. Console error query returned none at the checked point.
- Iteration history: first rendered check revealed legacy header video overriding the new background (P1). A desktop-only selector now hides that layer; the second combined source/implementation image confirms the solid background. Old conflicting 1200–1439 styles were removed; mobile and tablet styling below 1200px is retained.
- Code checks: targeted Header.jsx ESLint passed; git diff --check passed (existing line-ending warnings only). Other sections were not reviewed or changed by this scoped implementation.
- Implementation checklist: source assets connected; desktop geometry/styles updated; seven links preserved; EN/RU and booking checked; source comparison inspected.
- final result: passed

## Evidence

- Reference: `tmp/figma-handoff/epic-handoff-v2.3.1/reference/reference.png` (1440 × 3828 px)
- Corrected implementation: `qa-output/home-v2-targeted-v2.3.1/en-first-five-1440-corrected.png`
- Side-by-side: `qa-output/home-v2-targeted-v2.3.1/reference-left-implementation-right-corrected.png`
- 50% overlay: `qa-output/home-v2-targeted-v2.3.1/reference-implementation-overlay-corrected.png`
- Section overlays: `qa-output/home-v2-targeted-v2.3.1/overlay-*-1440-corrected.png`
- Diff summary: `qa-output/home-v2-targeted-v2.3.1/diff-metrics-corrected.json`

The Hero video interior is replaced with the reference pixels only in overlay/diff preparation. The live implementation screenshot is unchanged, and the video border remains included in comparison.

## Corrections reviewed

- Hero: aligned the background horizon, rear palm, location label, and Surf School lockup while retaining the live video.
- How It Works: restored full-width photo crops, corrected the photo height, exact description widths/wrapping, heading line spacing, and title placement. EN/RU title overflow check reports zero clipped headings.
- Choose Your Lesson: retained all five states and corrected desktop photo width, heading line spacing, price, and CTA position.
- Included: restored the artwork's vertical scale, corrected Zinc/Camera placement, and placed the coral and gray strips above the dark/textured layers so the bands stay continuous without the earlier conspicuous rectangular gaps.
- Rentals: removed the targeted-run overrides for heading, intro, and offer-panel geometry. The pre-existing section layout is restored; only the new top and bottom SVG cut edges remain.

## Remaining visible differences

- Hero's live video frame differs from the static reference by design; small antialiasing differences remain around the irregular white boundary and raster artwork.
- How It Works still shows modest crop/focal-point differences because the implementation uses the existing source photos rather than the flattened reference pixels. Font rasterization also creates small title/body ghosts in overlay.
- Included uses the available Bebas/Arial fallback treatment rather than the exact rough display lettering visible in the flattened reference; minor Zinc/Camera outline and shadow differences remain.
- Rentals intentionally retains its previous working element geometry, per the correction brief. It therefore remains visibly different from the supplied reference in heading and panel placement, while the two requested SVG cut edges are present.

## Verification

- Targeted ESLint completed without errors for the three changed Home V2 JSX section files.
- Short Playwright smoke completed for EN and RU: all five sections visible, no clipped How titles, and no horizontal overflow.
- `git diff --check` completed without whitespace errors (only existing line-ending notices).

## 2026-09-30 — V5 Rentals + Conditions + Reviews

This pass supersedes the earlier Rentals geometry notes above for desktop widths >=1200px.

- Implemented the combined 1440 × 2203 handoff: Rentals 900px, Conditions 684px, Reviews 619px, scaled proportionally with container units.
- Restored the rental circle in CSS; matched the dark-to-teal curve and the two clipped marquee pieces without repeating nested artwork.
- Kept rental modal and localized board catalog destinations, forecast fetching, live iframe URLs, camera attribution/provider links and conditions WhatsApp handler. Review cards link to Google Maps and support keyboard focus.
- Preserved existing layouts below 1200px. RU uses existing translations with fitted labels and longer review copy.
- Visual comparison against reference/reference.png completed for the static artwork, section geometry and text. Live forecast values intentionally differ from the snapshot.
- Browser checks: EN/RU at 1440px; 1200px and 1920px desktop geometry; 390px mobile in both languages and 900px tablet. No horizontal overflow; tested rental modal open/close and verified catalog/provider/review link destinations. No text container overflow in the RU desktop checks.
- Targeted ESLint passed for the four changed JSX files; git diff --check passed (existing line-ending notices only).
- Evidence: qa-output/rentals-conditions-reviews-v5/desktop-en.png and desktop-ru.png.
- External preview limitation: both Windy and Da Nang Surf Cam respond HTTP 200 outside the sandbox. Camera's response CSP allows surfdanang.com, slicedwaves.com and Vercel subdomains, but excludes localhost, so video playback cannot be verified locally. External iframe contents appeared blank in the in-app browser; their real integrations are retained without replacing them with static reference screenshots. Verify playback on an allowed preview/production domain.

## Scroll-linked sunset V5 — 2026-10-01

- Scope: the approved teal-to-sunset background behind the existing V5 Rentals / Conditions / Reviews composition. Added `HomeV5SunsetScene.jsx` and `home-v5-sunset.css`; wrapped the existing sections in `HomeV2Page.jsx`. No new dependencies or replacement image assets.
- Source visual: `C:/Users/TpaBa/AppData/Local/Temp/codex-clipboard-e210a867-29b4-4c59-990e-1cfe258a964b.png`, plus the explicitly approved scroll-light treatment. The supplied sun/wave is already present as `public/design/home-v5/rentals-conditions-reviews/reviews-wave.webp` with transparency.
- Browser-rendered evidence: `qa-output/sunset-v5/en-cool-1440.png`, `en-forecast-1440.png`, `en-warm-1440.png`, `ru-1200.png`, `en-mobile-390.png`. Viewports: EN 1440 x 1000, RU 1200 x 900, mobile EN 390 x 844. Desktop layout content widths are 1425 / 1185 due to the native scrollbar.
- Combined visual comparison: `qa-output/sunset-v5/reference-and-result.png`. The source screenshot is 1523 x 1117; its reviews/wave canvas crop is 786 x 360 at (627,365). Saved browser image sizes are 1425 x 990 (EN desktop), 1185 x 889 (RU), and 375 x 812 (mobile); the screenshot tool scales the viewport capture. Accounting for the EN scale of 1425/1440, the browser reviews crop is 1410 x 606 at (0,95), normalized to 786px width, shown beside the source. This is a regional composition comparison, not a full-page pixel match: the source contains Figma selection guides and a taller visible bottom wave edge, while the current site retains its pre-existing art crop and FAQ. Full viewport evidence separately covers the forecast-to-reviews transition. The enlarged EN/RU screenshots were also inspected for text and image clarity.
- Typography: existing fonts, weights, line wrapping and card copy retained; no new text. EN and RU review cards remain readable.
- Layout: section boundaries share the same background with no gaps. At 1200px, rental bottom and forecast top both measured -852.9375; forecast bottom and reviews top both measured -290.0625. No horizontal overflow at 1440, 1200 or 390. Card positions and wave geometry are unchanged.
- Color: intentional change from flat #598D80 to a teal base plus sand/peach gradients. The glow is centered on the existing sun. Gradient layers sit behind content and do not tint card text or the illustration.
- Image quality: original transparent WebP remains in use; no filters, stretching, replacement or separate sun cutout introduced.
- Interaction: scrolling down reaches opacity 1 for warmth/glow at the reviews; scrolling up returned to 0.45678/0.208369 and then 0/0 at rentals. Motion is driven by section progress without per-scroll React state. Rental modal opened through RENT NOW and closed successfully; RU FAQ expanded (aria-expanded=true) and collapsed. No outbound message submitted.
- Responsive behavior: the sunset is scoped to the existing V5 desktop breakpoint (>=1200px). The different mobile layout remains in place; both the desktop illustration and sunset layers are hidden at 390px. Reduced-motion support uses static opacity and no scaling, including a CSS first-paint override; this was reviewed in code, not emulated in the browser.
- Iteration history: initial global stylesheet update was not picked up by the existing dev server; extracted the effect into its own imported stylesheet and verified computed styles. Initial accelerated Motion opacity maps followed page progress while scale followed section progress; routed maps through a measured derived MotionValue, then verified cool/mid/warm states and reverse scrolling. Latest captures include both fixes.
- Console: no page errors in the final checked state. The existing third-party camera iframe refuses embedding in this browser; forecast, layout and sunset remain visible. Existing image sizing warnings are unrelated to this change.
- Validation: targeted ESLint passed for both changed JSX files; whitespace check passed. No production deployment performed.
- Residual test gaps: reduced-motion preference was not browser-emulated; no device GPU profiling or other browser engines tested.
- Findings: no actionable P0/P1/P2 issues in the scoped sunset change. Existing FAQ design differences from the screenshot are outside this change.
- final result: passed

## V5 FAQ, Events and Gallery — 2026-10-01
- Source: tmp/figma-handoff/v5/faq-events-gallery, exporter 2.3.1, root 2201:30; unresolved 0.
- Desktop implementation uses separate live text, controls, exported SVG surfaces and WebP photographs. Default gallery matches the five exported crops. Other albums use existing photo data.
- FAQ grows with its open answer; events CTAs select the corresponding gallery album and scroll to it. All five filters were exercised. Keyboard Enter toggles the FAQ.
- EN and RU visually checked at 1440px. No horizontal overflow at 1200, 1440, 1920, 900 and 390px in the checks performed. Below 1200px the existing mobile/tablet layouts remain active; RU mobile FAQ was exercised.
- Captures: qa-output/faq-events-gallery-v5/desktop-en.png and desktop-ru.png.
- Targeted ESLint and git diff --check passed. Exported images loaded without failures. No deployment performed.
- Scope: desktop handoff; no new mobile design, gallery lightbox or hero changes.
