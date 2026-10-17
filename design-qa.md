# Home V2 targeted correction — design QA

> Historical QA log of earlier implementations, not current design instructions. Approved composition, width and vertical spacing now follow [the layout and scale standard](docs/design/layout-and-scale.md). Preserve these entries as evidence; do not restore their old geometry.

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

## Страница уроков по выбранному первому макету — 2026-10-05

### Target and evidence

- Source visual truth: `C:/Users/TpaBa/epic-surf/output/lesson-selected-mockup/selected-reference.png`, copied from the first displayed Image Gen result `exec-2a9f8a18-6153-4f0a-a832-f703041b242c.png`. The user selected this image with «Первый».
- Implementation: `http://localhost:3000/ru/surf-lessons-danang`, EN peer `/surf-lessons-danang`; screenshot `output/lesson-selected-mockup/after-ru-1440.jpg`.
- State: initial group offer, FAQ closed, extra details and footer contacts/map closed, reduced motion, 100% browser scale. Real source assets and prices; outside services stubbed in QA, never submitted.
- Source pixels: 904×1739. CSS viewport: 1440×900, deviceScaleFactor=1; full-page implementation pixels: 1440×2868. Source normalized proportionally to width1440 (height2770), never stretched to match page height. Full comparison uses both images proportionally downsampled to width720, displayed side by side in the same comparison input.
- Full-view evidence: `output/lesson-selected-mockup/comparison-full.png`. Focused comparisons: `comparison-hero.png`, `comparison-choice.png`, `comparison-lower.png`. These were opened and compared together, with source on left and browser capture on right.
- Responsive evidence: `after-ru-2560.jpg`, EN/RU full390 captures, readable `mobile-hero-en.png`, `mobile-choice-ru.png`, `focused-details.json`; snapshots for both languages at320/360/390/1024/1200/1440/1920/2560/3200.
- Library evidence: `catalog-included-ru.png`, `catalog-included-en.png`, `catalog-validation.json`.

### Comparison history and fixes

1. First comparison (`comparison-iteration-1.png`), result blocked: [P1] old large footer/map materially extended the compact target; [P2] display typography was too weak; [P2] first process image showed an empty beach rather than the people/lesson. Fixed with compact footer and accessible disclosure preserving the full existing contacts/map, stronger local display typography, and actual EPIC theory photo.
2. Second comparison (`comparison-iteration-2.png`), result blocked: [P2] texture fill became too light through blending; [P2] library specificity overrode section heading sizes; [P2] small native header/short links fell below44px. Fixed darker texture overlay, scoped heading specificity, and control dimensions. Hero and process remained actual source photographs.
3. Interaction review, result blocked: [P1] English mobile native header booking button overlapped language switch. Fixed mobile native button positioning within the existing header frame; both locales then passed selection/book/language/menu checks.
4. Focused mobile review, result blocked: [P2] long private format title crowded the adjacent description; [P2] floating chat could obscure the photo's lower-right booking text. Fixed separate readable mobile title/price and description rows, and left-side photo booking. New `mobile-choice-ru.png` shows clean rows and unobscured booking; 320/360/390 retain no overflow.
5. Wide-screen review, result blocked: [P2] fixed-height full-bleed photo cropped people's heads at2560. Corrected wide hero object-position to20% and theory photo's focal point to25%/scale1.15. Revised `after-ru-2560.jpg` and `comparison-lower.png` were opened; heads and focal subjects remain visible. All responsive snapshots were recaptured after the fix.

### Required fidelity surfaces

- Fonts/typography: Neucha is supplied locally with Cyrillic/Latin; photo hero uses `--ds-photo-hero-size`80–104px, section headings44px max. Body/CTA retain existing Arial/Chivo/Montserrat roles. Headlines have the handwritten uppercase character and strong hierarchy of the mock. Mobile and RU names are readable, without clipped words. Neucha is a deliberate closest real-font interpretation of generated lettering; no text has been rasterized.
- Spacing/layout: same photo hero → linked selector/photo → current Included → photo strip/four steps → FAQ/booking band → compact footer sequence. Content obeys the user's normative C=min(94vw,2160px)×.832, with wider header/final-band S and fullbleed photo backgrounds. This intentionally uses the real approved site edges rather than copying the generated image's looser margins. No repeated copy-card stacks or isolated centered desktop controls. CTA/radii retain approved library values.
- Colors/tokens: EPIC charcoal, coral, sea-green and white; texture darkened for clear contrast. Selected, hover and keyboard focus states use shared roles. Header, controls and lower band remain the existing palette. Secondary gray tactile buttons retain the user's accepted design; their tone and label color differ slightly from the raster concept intentionally.
- Image quality/assets: actual `practice-photo.webp` for hero, original group practice photo for chooser; actual EPIC theory/practice imagery for process. Original gear-background/rashguard/camera/zinc split exports join in their native proportions. No old `incl-1.webp`, invented people, placeholders, generated brand assets or CSS drawings replace imagery. Real photography differs from the Image Gen scene retouching intentionally.
- Copy/content: concise EN/RU promise, prices from shared homepage translations, original booking destinations; three prominent FAQ and original detailed information behind disclosures. Timing remains10/15/75/10. Existing canonical/alternates/JSON-LD/title remain unchanged. Related public links and contact/map behavior remain available.
- Icons/states/accessibility: consistent library outline icons; semantic native controls, labels/alt text, keyboard selection and FAQ, visible focus, reduced motion. Native header reused on desktop. Ten measured locale/viewport header sets contain no obscured controls and no sub44px targets. Modal Escape restores focus and scroll; map needs explicit activation.

### Validation and practical limits

- Production build and targeted ESLint passed.
- `scripts/verify-lesson-rework.mjs`:120 checks passed; zero browser exceptions/failed local assets. Correct group/private/split destinations, keyboard/FAQ, language with query, attribution including footer WhatsApp, Telegram/Zalo, mobile navigation, explicit map activation, preserved homepage content/geometry.
- 18 responsive snapshot sets: no horizontal overflow, visible local photos loaded, common bounded edges, metadata/schema retained.
- Catalog EN/RU at320/390/1440: no overflow; private selection and demo booking/close work; current gear artwork present, retired asset absent.
- Forms/maps and offsite requests were stubbed for reproducible QA. No real booking submitted or message sent. This does not certify external provider availability.
- Scope: only lesson routes and their reusable library examples. No commit, push, publication or migration of other pages is included.

### Findings and follow-up

No actionable P0/P1/P2 findings remain in the inspected scope. [P3] Raster-generated letter shapes and retouched photo tone are not pixel-identical to live font/actual photography; they are documented interpretations, not placeholders. Optional future refinements can tune the display letter spacing and photo grade after the user reviews the live page.

The latest browser-rendered page and focused comparisons are the post-fix evidence. Technical/visual QA does not assert that the user has approved the live implementation.

final result: passed

## Lesson polish, 2026-10-07

Source targets: the user's attached desktop/mobile screenshots and the previously selected first mockup. Latest instructions override the original three-format/two-photo composition: five formats, four process photos, 60 minutes in water, no chooser dividers, a wave transition, a centered mobile action, FAQ-independent sand and an adaptive offer photo. The hero subtitle is removed in EN/RU following the user's final correction.

### Findings and repairs

- P2: Chooser separators and rectangular hover patches competed with the selected plaque. Removed borders, consistent rounded hover/selected geometry.
- P2: Group export contained a baked rounded alpha mask under a second CSS frame. Reused the opaque original group photo with one frame and one lower edge.
- P2: Sand repeated a non-tileable source at 1440px, exposing seams on large viewports. Replaced tiling with a single proportional, non-repeating image. Iteration 1 used cover across FAQ too; the user identified resizing on answer expansion. Final static sand wrapper contains formats/Included/process only, with a 70px overlap behind the FAQ's rounded top. FAQ content can grow independently.
- P2: Five rows made narrow desktop photos look undersized and stranded in vertical space. Desktop photo fills its grid row; 600–1199px uses a two-column choice grid followed by a full-width photo/action. Mobile keeps the action below the photo.
- P2: Portrait Surf-skate source cropped the rider's head in a landscape slot. Final portrait variant preserves the complete photo with contain and a softly blurred copy behind it. No synthetic photograph or substitute drawing was introduced.
- Content: Restored Surf-skate and Line-up Pro using homepage prices and their existing WhatsApp booking pattern; three form-backed services retain their original destinations. Ocean practice now reads 60 minutes in the model, homepage translations, SEO copy and FAQ schema.
- Process: Four real photos, semantic library icons, linked pressed state, arrows/Home/End keyboard handling, mobile scroll-snap, short single-play icon motion. Reduced motion disables animation and smooth programmatic scrolling.

### Visual comparisons

Evidence under `output/lesson-polish-2026-10-07`:

- `comparison-full-en.png` / `comparison-full-ru.png`: before and final implementation at 1440 CSS px, both resized equally to 600px per side.
- `comparison-focus-photo.png` / `comparison-focus-process.png`: attached source crops and rendered components normalized to equal widths. User crops omit different surrounding areas; these compare frame/asset treatment and the deliberately changed process, not exact viewport coordinates.
- `comparison-adaptive-800.png` / `comparison-adaptive-1440.png`: user's undersized-photo evidence beside the corrected layout; source screenshots are cropped, so viewport equality is not assumed.
- `all-offer-photo-crops.png`: all five offers at 390, 1440 and 2560px; final Surf-skate head and board are both visible. Screenshots include dev indicator/floating chat where present; neither is artwork.
- `focus-transition-en.png`, `focus-mobile-book-en.png`, `focus-mobile-book-ru.png`, and process captures: curved source-asset alpha mask, single photo edge, centered mobile action and readable EN/RU steps.

Required fidelity surfaces reviewed: existing Neucha/Montserrat/body roles retained; no clipping in inspected headings/actions, changed hero density intentional. Approved C/S geometry retained; tablet row/photo reflow resolves vertical imbalance. Palette/CTA treatments retained. Real source imagery and library icons retained, rounded group alpha halo eliminated; portrait fallback reviewed. Copy reflects all five services, 60-minute practice and removal of hero subtitle. Included and lower contact/map presentation retain their component styles.

### Verification

- Production build passed after the final subtitle/portrait changes; targeted ESLint passed.
- 18 responsive captures: EN/RU × 320/360/390/1024/1200/1440/1920/2560/3200px, no horizontal overflow, photos load when their horizontal-gallery positions are visited, approved desktop content widths.
- `scripts/verify-lesson-polish.mjs`: 180 checks passed against the production build on localhost:3001. Includes all five destinations, modal focus/scroll restoration, messenger attribution, FAQ, menu, language/query, keyboard/reduced motion, portrait fit and absence of hero subtitle. No browser exceptions or failed local assets.
- `sand-adaptive-validation.json`: EN/RU at eight widths, static sand height unchanged by FAQ and More expansion; desktop photo/list height relationship and tablet stacking checked.
- `sand-pixel-validation.json`: background pixel crops are identical before/after FAQ + More expansion at 390/800/1440/2560px.
- `verify-polish-smooth.cjs`: normal-motion mobile progression and final-photo alignment passed. Catalog EN/RU choice/dialog checks and 320/390/1440px overflow checks passed.
- External widgets/forms/messengers are stubbed in automation. These checks do not submit a booking or send a message.

No actionable P0/P1/P2 findings remain in the inspected scope. P3: the reused Surf-skate source has lower source detail than the other lesson photos; its portrait treatment preserves the activity. Final visual approval remains the user's judgment of the live page.

final result: passed

### Mobile hero correction before release — 2026-10-07

The user clarified that the mobile photo must be repaired before commit and deployment. The existing 62% crop cut people at both edges and centered a board fragment. At widths below 800px the focal position is now 35%: the learner carrying the board remains inside the frame. The source photograph, overlay, hero content and desktop layout are retained. Captured EN/RU at 320/360/390/430/600/799px; verified the actual rendered hero at 800/1440/2560px is pixel-identical to the prior crop rule. All 18 cases passed with loaded photo, no horizontal overflow, both CTA actions and no removed subtitle. Inspected the before/candidate, final EN 320px and RU 390px images. Artifacts: `output/lesson-mobile-hero-2026-10-07`. Production build and targeted lint passed after this correction.

## Partners v4 — 2026-10-08

Approved source: `output/partner-reference-v4-2026-10-08/partner-reference-v4.png`. Six actual partner sections; green painted hero/final, transparent surfer/hands, dark semantic-photo slider, open audience/benefit layouts. Existing EN/RU content, commercial conditions, Header/Footer, public routes, metadata and attribution retained. No team block or ordinal labels.

Fixed P2 findings before handoff: desktop slider photo aspect ratio, hero path visibility, mobile hand edge framing, non-library CTA font override and horizontal active-tab visibility. Reviewed typography, geometry, palette/surfaces, assets and copy/actions against v4 and the approved design standard. Full factual copy and existing complete footer intentionally differ from the condensed raster concept.

Production build and targeted lint passed. Behavior: 103 checks; messengers: 8 checks; responsive/SEO: 20 EN/RU screens at 320/360/390/430/800/1024/1200/1440/1920/2560px. No overflow or failed local images. Playwright explicitly authorized by the user after the embedded browser failed before opening the page. No bookings/messages submitted. External widgets stubbed; analytics delivery not verified because local GTM/Umami are unconfigured, while callback payloads and partner attribution passed mock/browser checks.

Evidence and full report: `output/partner-implementation-2026-10-08/design-qa.md`, `comparison-final-ru.png`, `before/`, `after/`, `behavior.json`, `messengers.json`, `layout-validation.json`. Local preview: http://localhost:3010/ru/partners. No actionable P0/P1/P2 findings remain in inspected scope. No commit/push/deploy.

final result: passed

## Partners v4 feedback corrections — 2026-10-08

Replaced yellow hero board with generated painted scarlet EPIC fish (real alpha, split tail, black logo); removed circular photo arrows and format underlines; made all mobile labels visible; reused the lesson compact/native-details footer as SiteFooter with full-width partner expansion; increased referral-panel contrast; reduced/lifted mobile hands with green bottom space. Source copy, conditions, metadata and attribution preserved.

Final production build, lint and whitespace checks passed. 121 behavior checks, 20 EN/RU production viewports (320–2560px), 18 partner/lesson footer cases. Previous lesson footer geometry/defaults retained. External services stubbed, no submissions/messages. Real analytics delivery remains unverified in unconfigured local environment; sender payloads and partner links checked. No actionable P0/P1/P2 findings remain in inspected scope.

Evidence: `output/partner-refinements-2026-10-08/design-qa.md`, `comparison-hero.png`, `comparison-mobile-final.png`, `after/`, `behavior.json`, `layout-validation.json`, `footer-validation.json`. Local production preview on localhost:3010. No commit/push/deploy.

final result: passed

Hero correction following user's blue-water feedback: final no-blue `surfer-epic-fish-v3.png` exported to the existing runtime WebP. Transparent underside, original surfer/white-spray visual composition, branded red fish with explicit forked tail. 15 asset/hero checks and refreshed 20 EN/RU responsive captures passed. Comparison and task report refreshed in `output/partner-refinements-2026-10-08`. Earlier generated v1 is superseded. No pixel-identical preservation claim is made for the imagegen edit.

final result: passed

## Partner page: layout, email request flow and RU wording, 2026-10-08

Hero surfer reduced/inset; mobile hands resized with proportional clearance; desktop process evenly fills the shared content width. RU label changed to «Турагентства и организаторы частных туров». The primary partner CTA opens a shared-library email dialog; discussion uses Telegram for RU and WhatsApp for EN. VI Zalo mapping is prepared without creating a VI page. Email/partner attribution forwards through a server-only Telegram endpoint; no email enters analytics.

Production build/scoped lint passed; 125 page behavior, 53 email form, 28 mocked API, 4 contact/analytics, 2 landscape-access and 20 EN/RU responsive/SEO checks passed. Final full-page screenshots cover 320–2560px, additional isolated sections cover 699px. No overflow, missing page images or browser exceptions; SEO values are preserved. Detailed evidence: [report](output/partner-email-flow-2026-10-08/design-qa.md).

**Operational dependency remains:** the bot does not exist yet. Actual endpoint returns 503 until server-only PARTNER_TELEGRAM_BOT_TOKEN/PARTNER_TELEGRAM_CHAT_ID are configured; the UI shows an error with messenger fallback. Delivery success was tested only with mock transport. No real messages were sent. The team emails partner codes manually. See [setup](docs/partner-code-requests.md). No commit/push/deploy; unrelated homepage work preserved.

## Partner page: monitor-scale hands and clean hero, 2026-10-08

Desktop/tablet hand image switched from oversized cover to centered proportional contain, capped at 460px (previously 826.656px at 2560px). Mobile drawing geometry unchanged. Background Paths component, import and styles removed: the page's short entrance had left static stripes; the textured surfer/spray hero reads more clearly without this layer.

Production build/scoped lint passed. 16 EN/RU before/after captures at 320/390/430/1024/1440/1920/2560/3200px passed image loading, overflow, SEO and drawing-scale checks. 125 existing behavior checks passed on refreshed localhost:3010. No real submissions or messages; no commit/push/deploy. [Evidence and rationale](output/partner-wide-hands-2026-10-08/design-qa.md).

## 2026-10-14 — rental page, selected photo composition

**Final result: passed.** No actionable P0/P1/P2 findings remain for this task. Existing earlier QA entries above are retained.

**Visual truth and normalization.** Desktop: `output/rental-concepts-2026-10-13/variant-d.png`, 1440×3020px; implementation: `output/rental-implementation-2026-10-14/qa/ru-1440-full.png`, 1440×5389px, viewport 1440×900 CSS px, deviceScaleFactor 1. Mobile: `output/rental-mobile-concept-2026-10-14/mobile-restored-390.png`, 780×9254px, normalized to 390×4627px; implementation: `output/rental-implementation-2026-10-14/qa/ru-390-full.png`, 390×6801px, viewport 390×900 CSS px, deviceScaleFactor 1. State: RU, Softboard Orange selected, no modal, menu/FAQ/footer closed, fonts and real equipment images loaded. EN equivalents and responsive sizes are in `qa/`.

**Combined comparison evidence.** Opened and reviewed source LEFT / implementation RIGHT in `comparisons/desktop-full.png` and `mobile-full.png`; focused readable comparisons `desktop-hero.png`, `mobile-hero.png` and `mobile-pickup.png`. Folder prefix: `output/rental-implementation-2026-10-14/`. Wide composition evidence: `comparisons/hero-ru-1920.png`, `hero-ru-2560.png`, `hero-ru-3200.png` and EN equivalents. Browser captures use the authorized Playwright fallback after the in-app browser environment failed. In-app preview request was queued; browser screenshots and local links are the reliable review artifacts.

**Comparison history / corrected findings.**

- [P2, first pass] Header retained the legacy 1248px frame; bounded body and header did not share the approved composition. Scoped header frame now uses S=min(94vw,2160px). Revised desktop hero/full comparisons confirm common edges.
- [P2, first pass] Inline page token overrode mobile gutters, narrowing the image and actions incorrectly. PageFrame now supplies 20px at 320px and 24px at 390px; revised mobile comparison and measured frame widths confirm the fix.
- [P2, first pass] Action icon wrapped under its label. Shared action child alignment is scoped to the rental page with inline-flex; revised hero and pickup comparisons show one-line labels/icons.
- [P2, second pass] Mobile pickup photo appeared before its heading. Grid areas now place heading → photo → delivery description → action. Re-captured `mobile-pickup.png` confirms the corrected source order.
- [P2, wide review] Cover cropping clipped the central board nose/tail at 2560/3200px. From 1800px, a complete 1600×900px central photograph blends into a soft full-width copy of the same asset. Initial sharp-edge blend was refined with a mask on the actual central image bounds. Final wide captures show intact silhouettes; `qa/wide.json` confirms 6 final responsive checks. No interface scaling or legacy narrow whole-page frame was introduced.

**Required fidelity surfaces.**

- Typography: local Neucha display face, shared homepage label/body font and sensible fallback; heading hierarchy and natural EN/RU wrapping verified. The shared header keeps its existing language/menu controls. Mobile pickup heading may fit one line instead of the mock's two; minor P3 wrapping refinement only.
- Spacing/layout: full-bleed hero, approved bounded desktop frame, large front photo plus two detail photos, open process/comparison rows, swipe rail and stacked mobile layout retained. Gallery carries the current five spec rows. Controlled section gaps and natural document flow; no horizontal page overflow at 320–3200px.
- Color/tokens: graphite grain, white typography, mint emphasis, coral primary actions, raised shared button edges/shadows and sea-colored ending match the selected direction and existing homepage palette. New texture is deliberately finer than the coarse mock; subjective P3 tuning can follow user review.
- Images: custom standalone hero and matte texture generated from the selected direction; seven-board lineup is recognizable. Catalogue/back/fins/thumb and pickup images are real existing assets. No mock screenshot is embedded as a webpage and no product imagery is approximated with CSS. Wide crops revised as above.
- Copy/content: original prices, specs, current 15-board inventory, delivery statement, lesson comparison, all FAQ questions, related routes, live camera and four contact channels retained. Actual data replaces abbreviated mock copy. Filters reflect all current board types. The longer document is an authorized content-preservation difference, not empty spacing; sections shown in the user's later screenshots are integrated into the selected dark visual style.

**Behavior and regression evidence.** `scripts/qa-rental-v5.cjs` passed EN/RU at 320/360/390/1024/1200/1440/1920/2560/3200px (18 combinations), plus 36 behavior checks: real Chromium touch swipes next/back, vertical page gesture, all 15 boards/three photo views, category filters, photo dialog/key navigation/Escape/focus return, selected-board rental flow, partner code on messenger URLs, language/query preservation, mobile menu, FAQ and hidden footer/map toggle. No page errors or missing images. Supplemental final wide CSS checks passed six combinations. Home/partners regression passed four cases. Targeted ESLint, production build (25 routes) and diff whitespace check passed.

**Limits and follow-up polish.** Camera and map use deterministic iframe content during browser QA; their live providers were not availability-tested. Messenger URLs were inspected without sending messages or submitting a rental. P3 only: optional grain strength and natural mobile heading wrap. No open implementation questions or required fixes remain.

**Implementation checklist:** selected composition and two assets installed; all sections/data retained; mobile gestures and hidden footer verified; EN/RU routing/metadata/attribution retained; revised captures compared; local server retained. No commit, push or deployment requested or performed.

final result: passed

## 2026-10-15 — rental refinement, all 12 user corrections

**Findings / final result: passed.** No remaining P0/P1/P2 issue in the authorized rental EN/RU scope. The latest user feedback supersedes the earlier pass: remove hero location label, type filters and magnifier icons; match gallery/info heights; enlarge four-board rail and use dark arrows; restore compact timeline/map; combine pickup/conditions; replace related list/backgrounds; fit mobile selection and rental CTA in one screen.

**Source visual truth.** `output/rental-concepts-2026-10-13/variant-d.png` (1440×3020), `output/rental-mobile-concept-2026-10-14/mobile-restored-390.png` (780×9254, normalized to 390×4627) and the user's 10 attached feedback crops dated 2026-10-15. Those crops identify defects in the previous implementation, rather than a request to reproduce those defects. Explicit current corrections take priority over older mock details.

**Implementation / density / state.** Prefix `output/rental-refinement-2026-10-15/`. Final `after/ru-1440-full.png` is 1440×4943, CSS viewport 1440×844, deviceScaleFactor 1; `after/ru-390-full.png` is 390×6097, CSS viewport 390×844, deviceScaleFactor 1. State: Softboard Orange, menu/FAQ/footer closed, photo/rental dialogs closed, camera idle until requested, real images/fonts loaded. EN equivalents captured. The source mobile bitmap is downsampled by 2 for comparisons; no browser chrome or page scaling used. Complete implementation is taller than the abbreviated reference because all equipment facts, FAQ questions and contact channels remain.

**Combined comparison evidence.** Opened source LEFT / implementation RIGHT in `comparisons/reference-desktop.png`, `reference-mobile.png`, `before-after-1440.png`, `before-after-390.png`. Readable focused comparisons `before-after-catalog.png`, `before-after-process.png`, `before-after-comparison.png`, `before-after-pickup.png`, `before-after-related.png` were generated; catalogue/process/related reviewed together in combined inputs. Final focused crops are taken from the full document capture to avoid sticky-header overlap. Earlier `before/` element captures can include the sticky header; their full-page capture is authoritative for alignment. Separate final mobile viewport proofs: `layout/ru-320x568.png`, `layout/en-390x844.png` and all other tested phone sizes. Playwright was explicitly authorized earlier; local in-app preview request remains queued.

**Iteration history and fixes.**

- [P2, source defects] Gallery had an independent fixed height, while long copy extended below it; five small rail images/sea-colored arrows and isolated numbered steps differed from the selected composition. Replaced gallery height with grid stretch to natural copy, enlarged rail to four thumbnails, dark 76px controls, continuous timeline with coral dots. Final focused catalogue/process comparisons verify proportions and alignment.
- [P2, first revised capture] Floating chat overlapped the mobile rental action. An IntersectionObserver on the catalogue now hides only this page's mobile floating chat while selection is on screen. Final mobile viewport captures show the CTA unobstructed; all phone states assert the chat is hidden.
- [P2, compact-screen validation] A long label at 390×667 left less than the required 8px bottom clearance (CTA bottom 659.67px). Reduced viewport-dependent gallery height by 20px. Re-ran every board at every size: all 330 states pass, including 320×568. On short screens ≤640px high, image contain preserves complete board silhouettes.
- [P2, interaction regression] Removing type-filter clicks also removed their incidental delay after a swipe; the next explicit photo tap after a thumbnail selection could still be suppressed by the prior gesture. Thumbnail selection now clears the stale suppression timer; swipe-induced clicks remain suppressed. Re-run touch, lightbox and rental checks pass.
- [P2, content/layout] Previously missing decorative map is restored from the original map asset with an actual Google Maps link. Pickup/delivery and conditions share one composition; the camera is initiated explicitly, preventing an automatic gray failed iframe on initial view. Related content is an editorial photograph feature plus three compact image links. Final comparison/pickup/related crops show these changes.
- [P2, art direction] Replaced busy fine white speckle and flat green final strip. Generated, inspected and saved the two independent assets before wiring them: `public/design/rental-v5/rental-ground-v2.webp` (449164 bytes) and `rental-tide-v2.webp` (323680 bytes), built-in image_gen; source PNGs and exact prompts under `assets/`. Restrained overlay softens grain under text. Hero photograph is unchanged. Final full-page and ending crops verify the new surfaces.

**Required fidelity surfaces.** Typography retains local Neucha and shared body/label font; hierarchy, EN/RU wraps and natural content lengths verified. Geometry retains S=min(94vw,2160px), C=S×.832, common content edges, rounded real photographs, shared raised coral/gray buttons; no page zoom/transform. Mobile puts three views, rail, current price and rental CTA together, with full descriptions/specs immediately below. Coral timeline/primary actions and mint emphasis retain homepage tokens. New low-contrast graphite/petrol material replaces the old backgrounds. Asset subjects, original board identities and real related photographs are retained; no custom-drawn substitute for imagery. Copy, current 15 models, complete questions and original delivery/lesson text are preserved. Only the location eyebrow, category controls and magnifier artwork are intentionally removed. Enlargement still works by clicking a photograph.

**Validation.** `qa/report.json`: passed, 18 EN/RU-width combinations, 44 behavior checks. `layout/report.json`: passed, all 15 boards in EN/RU across 320×568, 360×640, 390×667, 390×844, 430×932, 1024×900, 1200×900, 1440×900, 1920×1080, 2560×1440, 3200×1440 (330 states). Assertions cover equal photo/copy heights above phone breakpoint, four-thumbnail scale, unobstructed mobile CTA, full catalogue/asset loads, real touch swipe vs vertical scroll, photo/rental dialogs and focus return, selected board in messenger URLs, partner attribution, language/query, restored map, click-to-start camera, FAQ and closed footer/map activation. No page overflow/errors. Production build (25 routes), targeted ESLint and diff whitespace check pass. Shared source components/routes/metadata were not modified in this pass.

**Limits / follow-up polish.** Camera/maps use deterministic external responses only for behavior QA; live provider availability is not certified. No messages or bookings were submitted. Texture strength and mobile image balance can receive subjective tuning after review; no P3 requires another implementation loop. Saved generated source assets remain available for that iteration.

**Checklist:** two assets prepared before integration; all 12 points implemented; EN/RU desktop/mobile captured; combined comparisons reviewed; gesture/booking/metadata preservation checked; local preview retained. No commit/push/deploy.

final result: passed

## 2026-10-15 — rental backgrounds, continuous partner surfaces

**Final result: passed.** Latest user direction replaces the previous grunge surface: eliminate wide hero blur, mismatched hero/catalog strip and visible repeated background pieces; use the partner page's calmer material language. Earlier texture approvals/pass notes above are historical and do not override this correction.

**Sources and evidence.** User screenshots `codex-clipboard-ef162322-60fb-43d8-8641-b42f56d5346c.png`, `a6f28535-dc9f-49ec-94b4-0f4e972dd122.png`, `7a650f87-d597-45ac-8a5c-a5ddb2c55ac5.png`, `a278ed5a-19a9-4763-865c-a3c39bb442a7.png` identify the defects; current partner composition and actual owning CSS were inspected. Evidence prefix: `output/rental-backgrounds-2026-10-15/`. `before/` captures the actual prior rental implementation; `after/` captures the revised one. Partner source reference is `before/partners-2560.jpg` and `after/partners-2560.jpg` (390px versions also saved). Final `after/en-2560-top.png` is 2560×1200 at CSS viewport 2560×1200, deviceScaleFactor 1; 3200×1200 and 390×844 equivalents use the same 1:1 density. Full-page captures retain document height; browser chrome excluded.

**Combined visual comparisons reviewed.** Source/before LEFT, implementation/after RIGHT in `comparisons/before-after-2560-top.png`, `before-after-1440-join.png`, `before-after-2560-process.png`, `before-after-full-2560.png`, `before-after-390-top.png`. Additional same-viewport comparisons at 390/1440/3200 and partner/rental sheets are saved in the same directory. Focused top/transition views are used because full-page sheets alone make typography and seams too small. The 2560px final full document is 5251px high; composition/content heights were preserved in this pass.

**Findings, changes and iteration.**

- [P2, source] Wide hero combined a 1600px foreground with a blurred full-width duplicate and edge masks. Replaced with one responsive `<picture>`: the original image below 1800px; a separate 3:1 outpainted photograph from 1800px. All seven boards remain in the central group, with sharp continuous wall/sand/foliage at both sides. Generated by built-in image_gen after inspecting the target; source/prompts in `assets/`. Installed `public/design/rental-v5/rental-hero-wide-v3.webp`, 2172×724, 638132 bytes. No board photo in the catalogue changed. Final 1800/1920/2560/3200 captures verify the framing, with no blur/filter/mask/duplicate backdrop in computed styles.
- [P2, source] Hero ending sampled the texture at 800px while the catalogue sampled it at 1600px. Removed the textured masked strip. The photo now fades into the exact same `--ds-graphite` (#2E2E2E) used by the catalogue, without a separate image or edge mask. Final transition comparison verifies the seam is gone.
- [P2, source] The main 1600px repeating bitmap exposed rows and rectangular joins on wide displays. Removed it from the active surface. Catalogue through related content uses a single flat graphite role matching partner dark sections; comparison remains transparent with its map above that same background. Footer is the same graphite. The lower accent reuses the actual partner `sea-texture.webp`, non-repeating, at its existing scale, with the same restrained overlay. Grunge-v2 assets remain as historical outputs and are no longer referenced by page CSS.
- [P2, first revised review] Extending the bottom fade caused it to paint above the hero action buttons, slightly dimming their fill. Put `.rv-hero-frame` on an explicit foreground layer. Re-captured all affected viewports and re-generated the combined sheets. Final hero comparison shows normal coral/gray action appearance and the same clean transition.

**Fidelity and scope.** Typography/font files, content, prices, cards/rounding, control geometry and bounded frame remain unchanged. The new surface color is the exact partner graphite token, not a competing palette. Original hero photograph remains the fallback for regular desktop/mobile; the wide photographic extension is intentionally limited to the prior wide layout breakpoint. Image rendering keeps proportions and all catalogue imagery intact. No substitute drawings, mirror panels or blurry side fills used. The partner page itself was only read/captured, not edited. All sections, map, EN/RU routes/metadata, selection/rental flow and partner attribution remain.

**Verification.** `after/report.json`: 18 passing EN/RU combinations at 390/1024/1200/1440/1799/1800/1920/2560/3200px. Checks assert selected `currentSrc`, cover layout, no filter/mask/backdrop, no main/footer background image, transparent comparison, non-repeating partner accent, no overflow or page errors. `qa/report.json`: 18 standard responsive combinations and 44 passing behavior checks, including real touch swipes vs vertical scrolling, selected-board rental dialog, messenger attribution, language/query, FAQ, map/camera and hidden footer. Production build (25 routes), targeted ESLint and diff whitespace check pass. Full earlier 330-board layout matrix was not repeated because this pass does not change catalogue geometry; current responsive/behavior checks confirm the existing composition still works.

**Limits / follow-up.** Browser behavior QA fixes external camera/maps content; availability of those providers is not certified. No messages or booking requests were sent. Further texture intensity/fade preferences can be tuned after user review; no remaining actionable P0/P1/P2. Source PNG, exact generation prompt, comparison captures and architecture notes are saved. Local preview retained; in-app open request queued. No commit, push or deployment.

final result: passed

## 2026-10-17 — rental selection stability, map and mobile hero

**Final result: passed.** Authorized scope is the existing EN/RU rental page. User feedback requested stable selection height (especially White/Green Malibu at 1440), clear map placement and school point, bounded desktop CTA widths, and a complete mobile hero board lineup. The user confirmed the current school point: 16.0464674, 108.2504812.

**Reference and review.** Current user screenshots and the approved homepage scale remain the reference. Reliable previous visual captures are in `output/rental-backgrounds-2026-10-15/after`. Current matched captures and combined sheets are in `output/rental-polish-2026-10-17/after` and `comparisons`. Reviewed EN/RU White vs Green at 1440, the mobile hero before/after at 390, map and lesson CTA at 1440, lower actions before/after at 2560, and the complete current 2560 page. Initial local baseline region crops could be displaced by smooth scrolling; they are not presented as matched visual evidence. Baseline geometry measurements remain valid. Final captures use instant positioning.

**Findings corrected.**

- [P2] White vs Green changed panel height by 62.09px at 1440 EN; the range across all 15 boards was 110.09px. RentalBoardInformation now gives titles, descriptions and specs separate shared CSS grid cells sized to the largest actual localized entry. Inactive entries remain hidden from sight and assistive technology. No text is truncated and no arbitrary fixed panel height is imposed. The final height delta is 0 across all 15 boards at every checked tablet/desktop size; gallery and information heights match, and price/CTA/rail/document height remain stable.
- [P2] The decorative map drifted behind the comparison columns. RentalLocationMap is a separate centered figure below both columns, capped at 920px and preserving 1414:490 proportions. EPIC is pinned to the existing school symbol at schematic coordinates 780,218; normalized pin position stays constant across all 20 viewport/language combinations. Both Google Maps links retain tracking and open the user-confirmed real school point. This source is an illustrative map, not a geographic projection.
- [P2] Buttons expanded excessively on wide screens. Rental-scoped actions now have bounded widths: hero 280px, board 320px, lessons 300px, conditions 280px, lower channels 232px in a 480px group. All retain max-width:100% and mobile adaptation. An initial 260px lesson action wrapped its English label; increased to 300px and visually rechecked in the latest focused capture.
- [P2] Tall mobile cover cropping exposed only two boards. Below 700px the hero uses heading, full-width original 16:9 photo with contain, price and stacked actions. All seven boards are visible without distortion. The compact mobile catalogue/selector/rental CTA still fits one viewport when aligned below the sticky header.

**Fidelity surfaces.** Existing Neucha headings and shared body/label fonts remain, with natural EN/RU wrapping. Approved bounded desktop width and shared content edges remain. Graphite, mint/coral roles, existing imagery, round controls and partner sea accent remain. Catalogue photos, original descriptions/specs/prices, all 15 boards, FAQ, camera, related links and collapsible footer are preserved. No new bitmap asset or generated equipment was needed. Reserved title/description space on shorter entries is intentional to prevent movement; mobile retains natural content flow.

**Verification.** `after/report.json`: EN/RU × 320x568, 360x640, 390x844, 430x932, 1024x900, 1200x1000, 1440x1000, 1920x1080, 2560x1200, 3200x1200 × 15 boards = 300 passing states. `verified-summary.json` checks map proportions/anchors and bounded channel widths (232px at every checked desktop width). `qa/report.json`: 18 responsive cases plus 44 behavior checks pass, including real touch swipes vs vertical gestures, photo dialog/Escape/focus return, selected-board rental, messenger/partner attribution, language/query, FAQ, map/camera and hidden footer. No page overflow or browser errors in the matrix. Targeted ESLint and production build (25 routes) pass. Main QA navigation now waits for DOMContentLoaded plus explicit font/image readiness instead of unrelated network idle.

**Limits.** External map/camera providers use deterministic iframe content in behavior QA; provider uptime is not certified. Messenger URLs were checked without sending messages or rental requests. No remaining actionable P0/P1/P2 in this pass. No commit, push or deployment requested or performed.

final result: passed

## 2026-10-17 — map integrated into desktop comparison

**Final result: passed.** User selected the proposed first direction: integrate the map on the right of the comparison instead of presenting it as a separate desktop row. Mobile was explicitly retained.

**Reference / scope.** Current supplied screenshots and the existing approved rental page; only comparison frame class, rental-scoped desktop CSS and marker tooltip changed. No new bitmap, route, data, catalogue, hero or shared component change. Before/after evidence: `output/rental-map-integration-2026-10-17`. Latest request supersedes the earlier separate-map desktop composition.

**Resolved findings.** [P2] The centered narrow map and caption appeared detached on wide desktop. At >=1200px, map artwork is an absolute decoration anchored to the right of the bounded comparison frame; the separate lower caption row is hidden. The 1000px image preserves its original proportions, fades under text and at its edges, and does not add a separate row. The EPIC marker remains tied to the existing school symbol and is readable in the free right area. Its link retains the confirmed coordinates and tracking. Foreground text and button remain above artwork; the decorative layer ignores pointer input while the marker accepts it. Initial review showed too much line detail under copy, corrected with a stronger gradual fade and recaptured.

**Fidelity surfaces.** Existing typography, graphite/mint/coral palette, 300px lesson action, two comparison columns and approved shared content edges remain. Full EN/RU copy retained. Mobile/tablet keep the separate map, caption and unchanged geometry. Actual marker coordinates are in the schematic image; the Google Maps destination is the user-confirmed real school point 16.0464674, 108.2504812.

**Visual and behavior evidence.** EN/RU at 390/1024/1200/1440/1920/2560/3200px, height1000, 100%: 14 before and 14 after cases. Viewed RU1200, EN1440/2560 and EN390, with matched comparisons and focused desktop crops. All cases have no horizontal overflow or page errors. Desktop marker hit testing passes and its box does not intersect comparison headings, lesson paragraph or action. All four mobile/tablet cases match baseline geometry within1px. Keyboard focus and Enter open the correct Maps destination at EN1440, RU2560 and EN390; external Maps content fixed for test. Main rental QA rerun: 18 responsive cases, 44 behavior checks passed, including swipes, rental selection/attribution, dialogs/focus, FAQ, map/camera and footer. Targeted ESLint, production build (25 routes) and whitespace check pass. Existing pickup reveal can still be in progress in full viewport images; focused map crops avoid it. No changes to that unrelated reveal behavior.

**Remaining issues / limits.** No actionable P0/P1/P2 for this change. Google Maps content is fixed in keyboard QA; availability of the external provider is not certified. No messages/bookings sent. No commit, push or deployment requested or performed.

final result: passed
