# Home V2 — Fluid / Full-Bleed Layout Plan

## Status

- Project: Epic Surf School
- Scope: Home V2 only
- Branch: `design/home-v2-poster-collage`
- Review routes:
  - `/home-v2`
  - `/ru/home-v2`
- Current phase: **Stage 5.1 complete — awaiting user visual review before approved checkpoint commit**
- Implementation status: **STAGES 1–4 APPROVED; STAGE 5.1 ZOOM / REFLOW CORRECTION COMPLETE; NO CHECKPOINT COMMIT OR PRODUCTION ROLLOUT PERFORMED**
- Last updated: 2026-08-29

---

## 1. Goal

Rework Home V2 from a visually narrow, centered-page composition into a responsive **full-bleed / fluid layout system** that uses the available screen area effectively across phones, tablets, laptops, desktop monitors, and large / ultrawide displays.

The intended direction is:

**FULL-BLEED CANVAS + FLUID GRID + CONTROLLED CONTENT**

Meaning:

- sections may use the full viewport width;
- images, collages, poster surfaces, utility blocks, backgrounds, and decorative composition can expand with the viewport;
- repeated layout geometry should be controlled by one Home V2 layout system;
- text must retain a readable line length and must not simply stretch across large displays;
- large screens should gain useful composition space, not merely oversized text/cards;
- responsive behavior must remain intentional at every target viewport.

This task is a layout-system redesign, not a functionality redesign.

---

## 2. Non-goals / hard constraints

Do **not** change any of the following unless explicitly requested in a later phase:

- booking functionality;
- rental functionality;
- messenger functionality;
- analytics / `trackEvent()` behavior;
- partner attribution;
- language switching;
- section order;
- business copy;
- SEO routing;
- public production homepage routes `/` and `/ru`;
- Home V2 `noindex, nofollow`;
- sitemap behavior;
- global production design tokens;
- unrelated components/pages.

Do not merge Home V2 into `main`.

Do not replace production `/` or `/ru`.

Do not add `/home-v2` or `/ru/home-v2` to the sitemap or public navigation.

Do not perform a visual redesign of individual sections during Stage 0.

---

## 3. Current Home V2 section order

Keep this order unchanged during the fluid-layout project unless explicitly approved later:

1. Header
2. Hero
3. How It Works
4. Lessons
5. Included
6. Rentals
7. LiveCam
8. Forecast
9. Photo Break — currently not rendered; restoration is out of scope unless explicitly requested
10. Reviews
11. FAQ
12. Events
13. Gallery
14. Footer
15. Messenger FAB
16. Booking Modal
17. Rental Modal

---

## 4. Relevant Home V2 files

Primary layout ownership is expected around:

- `app/components/home-v2/HomeV2Page.jsx`
- `app/components/home-v2/PosterPrimitives.jsx`
- `app/components/home-v2/sections/HomeV2Hero.jsx`
- `app/components/home-v2/sections/HomeV2ContentSections.jsx`
- `app/components/home-v2/sections/HomeV2LessonsRentals.jsx`
- `app/components/home-v2/sections/HomeV2UtilitySections.jsx`
- Home V2-specific styles in `app/globals.css`, if any
- `tests/home-v2.spec.js`

Other files may be inspected only when necessary to trace actual layout ownership.

Do not broaden the audit into production homepage components unless Home V2 directly depends on them and that dependency materially affects layout.

---

# STAGE 0 — LAYOUT AUDIT

## 5. Purpose

Determine exactly **why Home V2 feels visually narrow today** before changing the layout.

No layout implementation is allowed in this stage.

The audit must identify the actual constraints in the current source instead of guessing from screenshots.

---

## 6. Required preflight

Before inspecting or changing anything, record:

- current branch;
- `git status --short`;
- relevant current diff;
- current HEAD.

If the active branch is not `design/home-v2-poster-collage`, stop and report it.

Do not switch branches automatically.

Do not discard, stash, restore, clean, or overwrite unrelated work.

Do not use `git add -A`.

---

## 7. Baseline viewports

Audit Home V2 at these viewport widths:

- `390px`
- `768px`
- `1024px`
- `1440px`
- `1920px`
- `2560px`

Use a consistent desktop height where practical.

Baseline captures are QA/reference material only. Do not commit generated screenshots unless explicitly instructed.

Both locales must remain renderable, but the detailed visual width audit may use EN `/home-v2` as the primary reference unless RU exposes a layout-specific issue.

### Verified preflight and baseline — 2026-08-28

- Branch: `design/home-v2-poster-collage`
- HEAD: `905b5e1e8475201222a2402125ada878ce481236`
- The working tree was already dirty before the audit. Existing changes in `HomeV2Hero.jsx`, `app/globals.css`, `tests/home-v2.spec.js`, package files, and existing untracked QA/design files were left untouched.
- Baseline method: local `/home-v2` DOM/layout measurement at a consistent `1000px` viewport height. No QA screenshots were added to the repository.
- `/ru/home-v2` was separately rendered at `390px` and `1440px`; all current sections rendered and document-level horizontal overflow remained `0`.
- The in-app browser reserves a `15px` vertical scrollbar, so measured layout-area widths were `viewport - 15px`. Percentages below use the requested nominal viewport widths so the large-screen loss is easy to compare.

| Viewport | Active layout mode | Verified width behavior | Document overflow |
|---|---|---|---|
| 390 | Approved EN mobile compositions | Full viewport sections; several inner artboards use a `390px` anchor or `max-width: 390px`. The centered Included artboard measured `390px` and is clipped by the root at the scrollbar-reduced content edge. | 0 |
| 768 | Adaptive | `--home-v2-gutter: 24px`; common constrained content measured `705px`. Conditions stays stacked and centers fixed `503/504px` panels. | 0 |
| 1024 | Adaptive | Common constrained content measured `961px`; How/Included/Events/Gallery use the adaptive grids, while Conditions still centers fixed `503/504px` panels in a stacked composition. | 0 |
| 1440 | Approved desktop compositions | The `min-width: 1440px` branches switch to nominal `1440px` canvases with absolute geometry. This is the exact current desktop anchor. | 0 (root clipping contains fixed canvases) |
| 1920 | Approved desktop compositions | Most visible composition canvases remain `1440px` wide: 75% of the viewport, leaving about `240px` per side. `1280px` wrappers use 66.7%; Conditions' inner `1148px` composition uses about 59.8%. | 0 |
| 2560 | Approved desktop compositions | The same `1440px` canvases use only 56.25% of the viewport, leaving about `560px` per side. `1280px` wrappers use 50%; Conditions' inner `1148px` composition uses about 44.8%. | 0 |

Current shared adaptive variables found in `app/globals.css`:

- `--home-v2-content-max: 1280px`
- `--home-v2-gutter: 16px`, then `24px` from `640px`, then `32px` from `1200px`
- `.home-v2-container { width: min(calc(100% - 2 * gutter), 1280px); margin-inline: auto; }`
- existing fluid spacing tokens already use `clamp()` for compact, standard, feature, heading, and internal spacing.

---

## 8. Width-constraint inventory

For every visible Home V2 section, identify the elements responsible for horizontal geometry.

Specifically inspect for:

- `max-width` / Tailwind `max-w-*`;
- `container`;
- `mx-auto` wrappers;
- fixed pixel widths;
- fixed percentage widths;
- viewport widths;
- arbitrary Tailwind widths;
- nested width constraints;
- fixed paddings / gutters;
- grid column definitions;
- fixed gaps;
- flex basis;
- `min-width`;
- `clamp()`;
- `minmax()`;
- absolute-position offsets;
- transforms used to fake width/placement;
- overflow clipping;
- image/object-fit constraints;
- aspect-ratio constraints;
- wrappers that prevent children from expanding;
- breakpoint-specific geometry.

Do not mechanically list every Tailwind class.

Record only constraints that materially affect layout behavior.

---

## 9. Required audit table

Fill this table with actual findings.

| Section | Owning file/component | Current horizontal constraint | Effect at 1440 | Effect at 1920/2560 | Likely action later |
|---|---|---|---|---|---|
| Header | `Header.jsx` plus Home V2 rules in `app/globals.css` | Header strip is full width. At `>=1440`, the frame is fixed/max `1440px`; logo, nav, language, and booking controls use absolute x-offsets (`99`, `451`, `1176`, `1228px`). At `640-1439`, the frame is fluid `min(100% - 2*gutter, 1280px)`. | Exact 1440 anchor fills the nominal viewport. | Frame stays 1440: about 240/560px outer side space. | Keep the strip full bleed; replace desktop absolute frame coordinates with a fluid inner grid and controlled edge gutters. **candidate / needs visual validation** |
| Hero | `HomeV2Hero.jsx` plus Home V2 rules in `app/globals.css` | Section and dithering layer are full width, but at `>=1440` the visible desktop body/video canvas is fixed `1440x726`; lockup is `left:99px`, benefits are `right:101px; width:464px`; body clips overflow. Adaptive grid below 1440 is capped by `--home-v2-content-max`. | Approved 1440 composition is fully expressed. | Main video/content remain centered in 1440 while only the dithering/background spans the viewport; large side areas gain no content geometry. | Make media/background full bleed and move lockup/benefits to a fluid grid; retain a readable max measure for benefit copy. Decorative shader/video behavior needs visual validation. |
| How It Works | `HomeV2ContentSections.jsx` / `HomeV2HowItWorks` | `>=1440`: centered fixed `1440x720` canvas, four absolutely placed cards (`left:100/426/755/...`, about `249-254px` wide), fixed heading and oversized wave offsets. `640-1439`: `.home-v2-container` (1280 cap) with 1/2/4-column adaptive layouts and card widths clamped `238-254px` at 1200+. Mobile EN is a fixed-height, clipped composition. | Four-card approved row occupies the 1440 canvas. | Entire row and decorative wave remain 1440; card size/gaps stop growing. | Reuse the working adaptive grid model above 1440 with `minmax()` and fluid gaps; re-anchor the wave to the fluid grid rather than fixed canvas offsets. Preserve readable card text. |
| Lessons | `HomeV2LessonsRentals.jsx` / `HomeV2Lessons` | `>=1440`: centered fixed `1440x843` canvas with selector `405.9px` at `left:100px` and detail `682px` at `left:659px`; detail contains fixed `360/325px` photo/info panels and fixed CTA/price coordinates. `640-1439`: `.home-v2-container` with a two-column `minmax()` layout from 900px. Mobile EN uses a `390px` anchor. | Exact approved selector/detail composition fills the anchor. | All meaningful geometry remains inside 1440 and therefore becomes visibly isolated. | Promote adaptive selector/detail grid to large screens; keep a bounded text/info panel and fluid media track. Fixed heights/overlap and RU copy are high-risk. **candidate / needs visual validation** |
| Included | `HomeV2LessonsRentals.jsx` / `HomeV2Included` | `>=1440`: centered fixed `1440x639` canvas; four features, callout, `781px` description, and `1440px` marquee are absolutely positioned. `640-1439`: `.home-v2-container`, 2 then 4 columns; descriptions retain `max-width:220px`. Mobile EN uses a centered fixed `390px` canvas. | Approved feature spacing uses the full anchor. | Feature cluster and marquee stay 1440; side area is unused. | Keep short descriptions deliberately narrow, but make the feature grid and marquee track fluid/full bleed; remove desktop canvas dependence from feature offsets. |
| Rentals | `HomeV2LessonsRentals.jsx` / `HomeV2Rentals` | `>=1440`: fixed centered `1440x900` clipped artboard; media layers are 1440 wide, intro is `1241px` at `left:99.5px`, offer panel is `909px` at `left:265px`, with fixed price/CTA offsets. Adaptive version uses `.home-v2-container`; offer width is `min(909px, 100% - 80px)`. | Approved poster artboard fills the anchor. | Background and content stop at 1440; even within it, the decision panel is only 909px. | Let media/background bleed; place intro and offer panel on a fluid grid while keeping the transactional content intentionally bounded. Re-anchor paper heading and fixed CTA geometry. |
| LiveCam | `HomeV2Conditions.jsx` / `HomeV2Conditions` (not the currently unused `HomeV2UtilitySections.jsx`) | Shared Conditions outer artboard is `max-width:1440px`. Its inner wrapper is `width:calc(100% - 48px); max-width:1148px`; at 1440 it becomes a fixed two-column `503px + 504.2px + 140px` composition. Live preview is about `503x328px` plus a fixed attribution footer. Below 1100, the fixed panel is centered in a stack; mobile has 20px gutters. | Two fixed utility panels fit the approved 1148px inner scene. | Outer scene stays 1440 and actual panel pair stays about 1148, using only 59.8%/44.8% of the viewport. | Keep preview aspect/attribution readable; use a fluid two-track grid only when both minimum panel sizes fit, and let the utility surface occupy more large-screen space. |
| Forecast | `HomeV2Conditions.jsx` / `HomeV2Conditions` | Same `1440/1148px` shared scene. Forecast panel is fixed `503px`; map uses `aspect-ratio:503/376`; wave/stat/CTA elements use fixed widths and absolute offsets. Stacked through 1099px. | Fixed map and stats balance against LiveCam. | Map remains 503px regardless of viewport; large available width is discarded around the 1148px pair. | Preserve map aspect and readable stats, but make the track fluid and recompose fixed stat/callout offsets. Keep Conditions stacked until verified fit. **candidate / needs visual validation** |
| Photo Break | No rendered owner in current `HomeV2Page.jsx` | No `[data-home-v2-photo-break]` exists on EN or RU at audited widths. One current test explicitly expects count `0`; a later stale test still expects the removed image, so the test file contains contradictory historical expectations. | Not rendered. | Not rendered. | Decide whether this row should be removed from the future plan or the section intentionally restored. **needs confirmation**; no Stage 0 implementation. |
| Reviews | `HomeV2ContentSections.jsx` / `HomeV2Reviews` | `>=1440`: centered fixed `1440x684` canvas; card group is `1093.458px` at `left:173px`, cards are about `320-335px`, trust/CTA and bridge illustration use absolute offsets (illustration `left:870; top:-139`). `640-1439`: `.home-v2-container`, cards switch 1/2/3 columns at 900/1200. Mobile EN uses a `390px` max canvas. | Approved 3-card row and bridge align to the anchor. | Card group remains about 1093px, so usable width drops to about 57%/43% of 1920/2560. | Extend the adaptive card grid to large screens with readable card minimums; re-anchor the bridge decoration. Review text should keep a readable measure. |
| FAQ | `HomeV2ContentSections.jsx` / `HomeV2FAQ` | `>=1440`: centered fixed `1440px` desktop canvas; illustration at `left:126px`; accordion wrapper `margin-left:591px; width:691.2px`; questions are `white-space:nowrap`, controls have fixed offsets. Adaptive uses `.home-v2-container` with a `0.34fr/0.66fr` grid from 900px. | Intentionally narrower reading surface within the anchor. | Whole 1440 canvas remains centered; accordion width stays 691px. | Keep the accordion deliberately narrow/readable, but align it to the fluid page grid; remove nowrap/fixed control positions where RU or wider copy requires flow. |
| Events | `HomeV2ContentSections.jsx` / `HomeV2Events` | `>=1440`: fixed/max `1440x1270` canvas with absolute poster cards (featured about `668px`, secondary about `395-404px`). `640-1439`: `max-w-7xl` (1280) adaptive grid; mobile EN uses `max-width:390px` and fixed absolute card geometry. | Approved asymmetric poster collage fills the anchor. | Entire collage stays 1440; featured/secondary cards do not use extra space. | Convert the desktop composition to a fluid editorial grid while retaining hierarchy; fixed rotations, CTA offsets, and card heights require section-specific rules. |
| Gallery | `HomeV2ContentSections.jsx` / `HomeV2Gallery` | `>=1440`: fixed/max `1440x1062` canvas; image grid is fixed `1241x600px` at `left:99px`, with one `600px` tile and four `290px` tiles; filters are a fixed `896.559px` absolute group. Adaptive canvas is `max-w-7xl`; mobile EN uses fixed absolute crops in a fluid-width shell. | Approved mosaic occupies the anchor. | Canvas stays 1440 and actual mosaic 1241px (about 64.6%/48.5% of 1920/2560). | Let the media mosaic expand with `minmax()` tracks and controlled aspect/crops; keep controls bounded and revalidate every absolute image crop. |
| Footer | `HomeV2Footer.jsx` | Map is full bleed. Footer body is `max-width:1440px`; at `>=1440`, main content is fixed `975px` at `left:233px`, with three absolute columns; surfboard is edge-offset and the decorative wave is fixed `1740px`. Below 1440, body uses 20px padding and a responsive 3-column grid from `md`. | Map spans viewport; content uses approved 1440 anchor. | Map remains full bleed, but body stays 1440 and main content only 975px; decorative wave/board stay tied to old edges. | Keep map full bleed; align footer columns to the fluid grid while preserving readable link/contact measures. Re-anchor the fixed wave and surfboard decoration. |

---

## 10. Root-cause summary

At the end of Stage 0, write a short factual summary answering:

1. Is the narrow appearance caused by one shared wrapper, repeated local wrappers, section-specific fixed geometry, or a combination?
2. Which constraints should be removed entirely?
3. Which constraints should become fluid?
4. Which content still needs a readable max measure even in a full-width layout?
5. Which sections are most likely to expose problems when the global width system changes?
6. Can the fluid-layout foundation be centralized in existing Home V2 primitives, or are section-specific rules unavoidable?
7. Are any current decorative/absolute-positioned elements coupled to a specific canvas width?

Do not propose a large refactor unless the audit proves it is necessary.

### Verified conclusion

The narrow appearance is a combination, not one universal wrapper:

1. A shared adaptive constraint exists: `.home-v2-container` and repeated `max-w-7xl` wrappers cap content at `1280px`.
2. At `1440px`, most major sections stop using those adaptive layouts and switch to section-specific fixed `1440px` canvases. Those canvases remain `1440px` at 1920 and 2560.
3. Several sections are narrower again inside the 1440 canvas: Conditions is about `1148px`, Reviews cards about `1093px`, Rentals offer `909px`, FAQ accordion `691.2px`, Footer main content `975px`, and Gallery mosaic `1241px`.
4. Available width is therefore lost first outside the centered 1440 canvas, then again inside local fixed-width clusters. Full-width section backgrounds can hide this structurally, but they do not add useful composition space.
5. Constraints likely removable later: duplicate desktop `width:1440px` artboards used only as positioning coordinate systems, absolute centering via `left:50%/translateX(-50%)`, and local `max-w-7xl` caps on image-led/artboard surfaces.
6. Constraints that should become fluid later: outer gutters, grid tracks, card/media widths, gaps, section spacing, and large decorative spans. They should not all scale uniformly.
7. Max-width remains appropriate for prose, review copy, FAQ answers/questions, attribution text, lesson/rental decision copy, and compact CTA groups. Those should become deliberately narrower nested content, not page-level caps.
8. First likely breakpoints after expansion: Header/Hero; Lessons; Rentals; the combined LiveCam/Forecast Conditions artboard; then Reviews/Events/Gallery. These depend most heavily on absolute offsets, fixed heights, image crops, or fixed interaction panels.
9. A shared fluid foundation can live in the existing Home V2 container/spacing system, but section-specific rules remain necessary for poster silhouettes and utility minimums. A single universal component template would be inappropriate.
10. Canvas-coupled decorations include the Hero lockup/benefits and shader/video relationship, How wave, Included marquee, surf-stack contour, Conditions waves/stats, Reviews bridge illustration, Events rotated cards, Gallery crop offsets, and Footer wave/surfboard.
11. `HomeV2UtilitySections.jsx` is not the current owner of LiveCam/Forecast layout. `HomeV2Page.jsx` renders `HomeV2Conditions.jsx`; audit and future migration must follow the latter unless composition changes are explicitly approved.
12. Photo Break is not currently rendered. Planning and tests contain stale/contradictory references and need a product decision before any future layout work.

---

## 11. Approved layout contract

Stage 0 proposed the Home V2 layout contract below. Stage 1 approval made its shared foundation values authoritative; section-specific values remain subject to Pilot validation.

The proposal should cover:

- outer viewport gutter strategy;
- desktop grid model;
- tablet grid model;
- mobile behavior;
- whether a hard global `max-width` should exist at all;
- readable text measure;
- fluid gap strategy;
- fluid section spacing;
- `clamp()` usage;
- `minmax()` usage;
- large-screen behavior at 1920px and 2560px;
- handling of full-bleed media / poster surfaces;
- handling of deliberately narrower nested content.

Use exact shared values where Stage 1 approved them. Keep section-specific values marked as **candidate / needs visual validation** until their migration checkpoint.

### Stage 1 foundation contract

- **Full-bleed ownership:** section backgrounds, media, poster surfaces, wave/marquee layers, and map/gallery fields may span the viewport. The shared root must not impose a hard page-wide `max-width`.
- **Outer gutters:** retain the proven mobile/tablet/desktop anchors of `16/24/32px`. From the 1440 anchor, use `clamp(32px, calc(4vw - 25.6px), 64px)` for controlled growth instead of unused centered margins.
- **Desktop grid:** use a shared 12-column fluid alignment grid, `repeat(12, minmax(0, 1fr))`, from `1200px`. It provides alignment and does not force every section into the same silhouette.
- **Tablet grid:** use `repeat(8, minmax(0, 1fr))` from `640px` with section-specific spans. Conditions remains stacked until its real panel minimums fit.
- **Mobile behavior:** preserve `390px` as the approved EN anchor, but widths `375-639px` should flow in one column and must not rely on a clipped fixed 390px canvas. Absolute collage offsets should be proportional, reduced, or replaced with normal flow where necessary. RU remains a separate wrapping check.
- **Global max-width:** no hard global maximum for the full-bleed canvas. Optional composition bounds may remain only where a section proves it needs them; they must not default to 1280/1440 for every section.
- **Readable measure:** prose and utility attribution use a nested `68ch` maximum rather than the page width. Compact cards, decision panels, and CTA groups may use a smaller section-specific measure.
- **Gaps:** promote existing fluid internal tokens (`16-24px` and `24-48px`) as starting evidence. Add large-screen growth only where the composition gains useful separation. Exact caps are **candidate / needs visual validation**.
- **Section spacing:** keep the existing `compact 40-64px`, `standard 56-88px`, and `feature 72-112px` tokens as the initial contract. Any wider-screen extension is **candidate / needs visual validation** and must not alter approved 390/1440 joins without review.
- **Use `clamp()` for:** viewport gutters, grid gaps, section spacing, image-led headings, media height within safe aspect bounds, and decorative offsets that should grow but stop. Do not use it to scale every fixed pixel value proportionally.
- **Use `minmax()` for:** grid tracks, card minimums, selector/media splits, and the LiveCam/Forecast pair. Existing evidence supports `minmax(0, 1fr)` for flexible tracks and a `238-254px` How-card range; any new minimums are **candidate / needs visual validation**.
- **1920 and 2560:** preserve text sizes/readability while giving extra space to media, gaps, asymmetric poster composition, and full-bleed layers. Do not merely center the 1440 canvas or globally scale it up.
- **Full-bleed media:** Hero video/shader, Rentals photo field, Gallery mosaic, Footer map, Included marquee, and large decorative waves are candidates to span the section or a fluid grid edge. Crops must be revalidated at 1920 and 2560.
- **Deliberately narrower nested content:** FAQ accordion, review text, lesson/rental decision panels, provider attribution, and CTA groups should remain narrower than their media/artboard parent and align to shared grid lines.
- **Centralization boundary:** evolve `.home-v2-container` into a small set of Home V2-only layout utilities/tokens in the existing primitive layer. Do not create a new universal poster component or move section-specific absolute art direction into a global production token system.

### Highest-risk migration areas

1. Header + Hero desktop: exact 1440 absolute coordinates, fixed video/body height, and a full-width shader layered against a fixed inner canvas.
2. Lessons: fixed selector/detail geometry, fixed-height artboard, interactive state, image crop, prices/CTA, and separate RU/mobile compositions.
3. Rentals: multiple clipped 1440 media layers plus fixed heading, intro, price, and CTA coordinates.
4. LiveCam + Forecast: fixed 503px utility panels, 140px pair gap, iframe aspect ratios, attribution footer, fixed stats, and the stacked-to-two-column threshold.
5. Reviews / Events / Gallery decorations and crops: bridge illustration, rotated poster cards, absolute mosaic crops, and fixed section heights are tightly coupled to the current canvas.

---

## 12. Stage 0 acceptance checklist

- [x] Current branch / HEAD / dirty state recorded
- [x] No unrelated files changed
- [x] `/home-v2` inspected
- [x] `/ru/home-v2` still renders
- [x] Baseline reviewed at 390
- [x] Baseline reviewed at 768
- [x] Baseline reviewed at 1024
- [x] Baseline reviewed at 1440
- [x] Baseline reviewed at 1920
- [x] Baseline reviewed at 2560
- [x] Width-constraint inventory completed
- [x] Every visible section accounted for; Photo Break recorded as currently absent
- [x] Root causes identified
- [x] Draft layout contract written
- [x] Risky sections identified
- [x] No layout implementation performed
- [x] No functionality changed
- [x] No section order changed
- [x] No production route changed
- [x] No global production design tokens changed

---

## 13. Mandatory Stage 0 stop

**STOP AFTER THE AUDIT.**

Do not implement the fluid grid.

Do not modify Home V2 section layout.

Do not “fix obvious issues while here”.

Do not start Hero, Lessons, Rentals, LiveCam, Forecast, or any other migration.

Do not proceed to Stage 1 until the audit findings and draft layout contract have been reviewed and explicit approval is given.

The only intended repository content change during Stage 0 is updating this planning document with verified audit findings, if needed.

---

# IMPLEMENTATION STAGES

## Stage 1 — Layout foundation

Status: **COMPLETE — APPROVED FOR PILOT**

Implemented foundation:

- `--home-v2-fluid-gutter` preserves the existing `16px / 24px / 32px` mobile, tablet, and desktop anchors without changing the legacy `.home-v2-container` contract;
- at `>=1440px`, the future fluid frame uses `clamp(32px, calc(4vw - 25.6px), 64px)`, which remains `32px` at the 1440 anchor and grows gradually before capping at `64px`;
- `.home-v2-fluid-frame` provides a full-width inner alignment frame with controlled gutters and no page-wide `max-width`;
- `.home-v2-fluid-grid` is one fluid track on mobile, `repeat(8, minmax(0, 1fr))` from `640px`, and `repeat(12, minmax(0, 1fr))` from `1200px`;
- `--home-v2-grid-gap` reuses the existing fluid internal spacing token instead of introducing a second spacing scale;
- `.home-v2-readable` provides a deliberately nested `68ch` maximum measure for prose-like content while retaining `width: 100%` on narrow screens;
- no new JSX abstraction was added because Stage 2 can compose these small utilities directly and section-specific poster silhouettes must remain local.

Deliberately left section-specific:

- column spans and asymmetric composition;
- media/content split minimums;
- card minimum widths;
- decorative offsets and crops;
- fixed utility-panel fit thresholds;
- all existing 1440px artboards and absolute geometry until their reviewed migration stage.

Stage 1 verification:

- [x] Foundation is scoped under `[data-home-v2-root]`
- [x] No global production token changed
- [x] Legacy `.home-v2-container` remains unchanged
- [x] No Home V2 section component changed or migrated
- [x] No section order or functionality changed
- [x] Photo Break remains unrendered
- [x] EN and RU routes render at 390, 1440, 1920, and 2560
- [x] No document-level horizontal overflow at the required widths
- [x] No unintended section-composition shift detected
- [x] `git diff --check` passes

Checkpoint: architecture/layout foundation review before section migration.

---

## Stage 2 — Pilot sections

Status: **PILOT APPROVED — COMPLETE**

### Stage 2A — Hero migration

Scope:

- migrate only the rendered Home V2 Hero onto the approved fluid foundation;
- preserve current content, functionality, image/video assets, shader behavior, benefit cards, CTA behavior, tracking, language behavior, and section order;
- preserve the approved 390px mobile composition as closely as practical;
- preserve the 1440px composition as the visual anchor while allowing 1920px and 2560px to use additional useful width;
- do not migrate Header, Lessons, Rentals, Conditions, or any later section in Stage 2A.

Required visual checkpoint:

- 390
- 768
- 1024
- 1440
- 1920
- 2560

Acceptance intent:

- Hero media/background may become full bleed;
- Hero lockup and benefits align to the fluid grid instead of fixed 1440px x-offsets;
- readable copy remains controlled;
- no horizontal overflow;
- no unintended change to mobile/1440 visual identity;
- no section below Hero is migrated.

Stage 2A implementation results:

- removed the desktop Hero's fixed `1440px` wrapper width and centered-artboard margin;
- made the existing video strip and desktop body span the full Hero width while preserving the `176px + 550px` vertical split and fixed `726px` desktop height;
- connected the desktop content layer to the Stage 1 `.home-v2-fluid-frame` and `.home-v2-fluid-grid` utilities;
- aligned the `304px` lockup to columns `1-4` and the controlled `464px` benefits block to columns `8-12` without scaling typography or copy width;
- retained Hero-specific logo geometry, benefit vertical offsets, video crop behavior, shader/dithering component, assets, copy, and all mobile/tablet branches;
- left Header on its current fixed desktop frame, as required by the Stage 2A scope.

Measured desktop behavior (`left` and `right` are viewport-edge distances):

| Viewport | Media before → after | Lockup left before → after | Benefits right before → after | Benefits width |
|---|---:|---:|---:|---:|
| 1440 | `1440px → 1440px` | `99px → 101.3px` | `101px → 79.7px` | `464px` |
| 1920 | `1440px → 1920px` | `339px → 194.1px` | `341px → 190.9px` | `464px` |
| 2560 | `1440px → 2560px` | `659px → 309.3px` | `661px → 331.7px` | `464px` |

Known visual compromises:

- at the 1440 anchor, benefits sit `21.3px` farther toward the viewport edge because the block is centered within its five-column grid span; lockup differs by only `2.3px`;
- Header remains on its fixed desktop frame, so its alignment intentionally differs from the fluid Hero at 1920/2560 until a separately approved migration;
- ultrawide lockup and benefits align through centered grid spans rather than directly to the outer gutter, preventing both controlled-content zones from drifting excessively toward the edges.

Stage 2A verification:

- [x] EN checked at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU checked at 390, 1440, and 1920
- [x] Required screenshots captured as QA-only files under `tmp/home-v2-stage2a-qa/after/`
- [x] `/home-v2` and `/ru/home-v2` return HTTP 200
- [x] Document-level horizontal overflow is `0` at every required viewport
- [x] Desktop video and shader layers span the full Hero width
- [x] Desktop height remains `726px`
- [x] Benefits width remains `464px`
- [x] Mobile and tablet Hero branches remain unchanged in source
- [x] Hero assets, copy, shader behavior, and business handlers remain unchanged
- [x] No Header or later-section migration performed
- [x] `npm run lint` passes
- [x] `git diff --check` passes

**Stage 2A APPROVED by visual review. Proceed to Stage 2B only.**


### Stage 2B — Lessons migration

Scope:

- migrate only the rendered Home V2 Lessons section onto the approved fluid foundation;
- preserve current lesson content, selector behavior, booking behavior, prices, imagery, CTA behavior, tracking, language behavior, and section order;
- preserve the approved 390px mobile composition as closely as practical;
- preserve the 1440px composition as the visual anchor while allowing 1920px and 2560px to use additional useful width;
- do not migrate Included, Rentals, Conditions, Reviews, or any later section in Stage 2B.

Required technical checkpoint:

- 390
- 768
- 1024
- 1440
- 1920
- 2560
- EN and RU render
- horizontal overflow = 0
- lesson switching works
- booking CTA works
- no unintended changes outside Lessons

Acceptance intent:

- remove dependence on the fixed 1440px desktop artboard for the Lessons composition;
- use the approved fluid frame/grid for selector and detail alignment;
- keep the decision/text panel deliberately controlled rather than stretching it with the viewport;
- allow the media side to gain useful width on 1920/2560;
- keep 1440 visually close to the approved composition;
- keep mobile/tablet behavior intact unless a change is required to prevent regression.

Stage 2B implementation results:

- removed the desktop Lessons presentation's fixed centered `1440px` artboard and `translateX(-50%)` positioning;
- connected the desktop composition directly to `.home-v2-fluid-frame` and `.home-v2-fluid-grid`;
- placed the controlled `405.9px` selector in columns `1-5` and the detail surface in columns `6-12`;
- replaced the fixed `682px` detail width with `clamp(682px, 48vw, 1280px)` inside its seven-column region;
- replaced the fixed/overlapped `360px + 325px` detail internals with `minmax(360px, 1fr) 325px`, so only media expands while the info, price, features, and CTA geometry remain controlled;
- preserved the `843px` section height, `615px` detail height, selector width, lesson order, copy, prices, images, CTA handlers, tracking, and mobile/tablet branches.

Measured desktop behavior:

| Viewport | Section width | Fluid content width / left | Selector width / left | Detail width / left | Media width | Info width | Selector → detail gap |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1440px` | `1376px / 32px` | `405.9px / 108.7px` | `691.2px / 666.1px` | `366.2px` | `325px` | `151.5px` |
| 1920 | `1920px` | `1817.6px / 51.2px` | `405.9px / 219.9px` | `921.6px / 882.9px` | `596.6px` | `325px` | `257.1px` |
| 2560 | `2560px` | `2432px / 64px` | `405.9px / 360.7px` | `1228.8px / 1177.3px` | `903.8px` | `325px` | `410.7px` |

Stage 0 comparison: before migration, selector/detail/media/info remained `405.9/682/360/325px` and their gap stayed `153.1px` at 1440, 1920, and 2560. Stage 2B keeps the controlled selector/info dimensions while assigning large-screen growth to media and breathing room.

Technical compromises:

- at 1440, the selector moves from `100px` to `108.7px`, detail from `659px` to `666.1px`, and detail grows by `9.2px`; these are the small anchor adjustments required by the approved grid;
- the former `3px` photo/info overlap is removed in favor of clean adjacent grid tracks;
- selector and info stay fixed-width by design, so ultrawide expansion is intentionally asymmetric and concentrated in media/gap rather than controls or prose.

Stage 2B verification:

- [x] EN routes return HTTP 200 at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU routes return HTTP 200 at 390, 1440, and 1920
- [x] Document-level horizontal overflow is `0` at every required viewport
- [x] Lessons section, price, photo, and CTA remain present in every tested state
- [x] All five states work: `group`, `split`, `private`, `surf_skate`, and `lineup_pro`
- [x] Active state, detail title/photo, price, and CTA update together in EN and RU
- [x] Booking modal opens from booking lesson CTAs; EN booking states were also verified through modal close/detach
- [x] `surf_skate` and `lineup_pro` remain WhatsApp link actions
- [x] Mobile/tablet presentation branches remain source-identical
- [x] Approved Hero source and geometry remain unchanged
- [x] No other section migration performed
- [x] `npm run lint` passes
- [x] `git diff --check` passes

### Stage 2B.1 — Lessons horizontal balance polish

User visual review found the migrated Lessons composition visually shifted to the right on a 2K display. This is consistent with the measured geometry: the fixed-width selector is centered inside columns 1–5, the growing detail occupies columns 6–12, and the selector→detail gap grows from `151.5px` at 1440 to `410.7px` at 2560.

Scope:

- correct only the horizontal balance of the desktop/ultrawide Lessons composition;
- keep the approved selector width, info width, lesson states, media behavior, heights, content, styling, mobile/tablet branches, functionality, and Stage 2A Hero unchanged;
- do not migrate any additional section.

Acceptance intent:

- the visual bounding box of selector + gap + detail should remain centered, or very close to centered, within the fluid frame at 1440, 1920, and 2560;
- 1440 should remain close to the approved original anchor;
- additional width should continue to benefit media and breathing room;
- the selector→detail gap must not grow so aggressively that it creates a visibly right-heavy composition;
- do not solve this with viewport-specific pixel nudges or transforms.

Technical cause:

- Stage 2B centered the selector and detail independently inside asymmetric `1–5 / 6–12` column spans;
- the detail continued to expand while the two span-local centers moved apart, causing the selector→detail gap and the combined composition's rightward offset to grow with viewport width.

Stage 2B.1 solution:

- retained `.home-v2-fluid-frame` and the 12-column grid as page-level alignment;
- added a section-local composition wrapper spanning the grid and centered the complete `selector | controlled gap | detail` silhouette as one unit;
- preserved the `405.9px` selector, `325px` info panel, `clamp(682px, 48vw, 1280px)` detail, expanding media, section/detail heights, and vertical anchors;
- controlled the internal gap with `clamp(150px, calc(8.333vw + 30px), 240px)`, producing approximately `150 / 190 / 240px` at the measured desktop widths;
- added no global primitive, viewport-specific offset, transform nudge, or mobile/tablet change.

Measured desktop behavior after Stage 2B.1:

| Viewport | Selector left / width | Detail left / width / right | Gap | Outer left / right margin | Composition center offset |
|---|---:|---:|---:|---:|---:|
| 1440 | `96.5 / 405.9px` | `652.3 / 691.2 / 1343.5px` | `150px` | `96.5 / 96.5px` | `-0.01px` |
| 1920 | `201.3 / 405.9px` | `797.1 / 921.6 / 1718.7px` | `190px` | `201.3 / 201.3px` | `0px` |
| 2560 | `342.7 / 405.9px` | `988.5 / 1228.8 / 2217.3px` | `240px` | `342.7 / 342.7px` | `0px` |

The 1440 anchor remains close to the approved original (`100px` selector left, `659px` detail left, approximately `153px` gap), while the previous wide-screen offsets of approximately `+52px` and `+103px` are eliminated.

Stage 2B.1 verification:

- [x] EN routes return HTTP 200 at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU routes return HTTP 200 at 390, 1440, and 1920
- [x] Document-level horizontal overflow is `0` at every required viewport
- [x] All five lesson states keep synchronized photo, title, price, and CTA content
- [x] `group`, `split`, and `private` booking CTAs open the expected Alteg iframe URLs
- [x] `surf_skate` and `lineup_pro` remain localized WhatsApp link actions
- [x] Selector width remains `405.9px`, info width remains `325px`, and media expands to `366.2 / 596.6 / 903.8px`
- [x] Mobile/tablet presentation code remains unchanged
- [x] Stage 2A Hero and all other sections remain unchanged by Stage 2B.1
- [x] `npm run lint` passes
- [x] `git diff --check` passes

Final status: `Stage 2B.1 complete — visually approved by user`

**Stage 2B.1 APPROVED by user visual review. Proceed to Stage 2C only.**


### Stage 2C — Rentals + Conditions migration

Scope:

- migrate only the rendered Home V2 Rentals section and the rendered Home V2 Conditions section (`LiveCam + Forecast`) onto the approved fluid foundation;
- preserve current content, business behavior, booking/rental/messenger/analytics behavior, assets, iframe/map behavior, locale behavior, and section order;
- preserve the 1440px composition as the visual anchor while allowing 1920px and 2560px to use additional useful width;
- keep mobile/tablet branches as close to source-identical as practical;
- do not migrate Included, Reviews, FAQ, Events, Gallery, Footer, Header, or any other section in Stage 2C.

Rentals acceptance intent:

- remove dependence on the fixed centered `1440x900` artboard as the desktop positioning system;
- let the photo/media field and large decorative layers use the full section width;
- align intro/heading and offer panel to the approved fluid frame/grid;
- keep the rental offer / price / CTA content controlled and readable rather than stretching it with the viewport;
- preserve the approved 1440 composition closely;
- allow 1920/2560 growth to benefit media, poster surface, composition breathing room, and selected section-local spacing.

Conditions acceptance intent:

- migrate the actual rendered owner `HomeV2Conditions.jsx`, not the unused `HomeV2UtilitySections.jsx`;
- remove the fixed `1440px` outer cap and `1148px` inner composition cap from the desktop/ultrawide layout;
- keep LiveCam and Forecast as a balanced two-panel composition when both minimum panel sizes fit;
- preserve LiveCam preview aspect ratio, provider attribution, Forecast map aspect ratio, stats, CTA behavior, and current stacking behavior below the desktop fit threshold;
- use section-local controlled gap / panel sizing rather than allowing the pair to drift apart or become excessively large on ultrawide;
- preserve the 1440 visual anchor closely.

Required technical checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- HTTP 200
- horizontal overflow = 0
- rental CTA / rental modal works
- LiveCam preview and outbound/provider links still work
- Forecast/map behavior still works
- messenger CTA behavior still works
- Hero and Lessons remain unchanged
- no additional section migration

Required measured report:

Rentals, at 1440 / 1920 / 2560:
- section/media width
- intro/heading usable width and left position
- offer panel width and left position
- outer visual margins / center offset where meaningful

Conditions, at 1440 / 1920 / 2560:
- overall composition width
- LiveCam panel width
- Forecast panel width
- panel gap
- outer left/right margins
- composition center offset

Stage 2C implementation results:

Rentals:

- removed the fixed centered `1440x900` desktop artboard as a horizontal positioning system while preserving the `900px` section height;
- expanded the existing background photo and overlay layers to the full section width with the approved media remaining `object-cover` and top-anchored;
- placed desktop heading, intro, and offer surfaces inside `.home-v2-fluid-frame` / `.home-v2-fluid-grid` rather than viewport-specific absolute x-offsets;
- kept the intro centered with bounded fluid width `min(100%, clamp(1241px, 72vw, 1600px))`;
- allowed the offer surface to grow moderately with `clamp(909px, 52vw, 1120px)`, while retaining a centered `909px` transactional core so price, copy, catalog CTA, and rental CTA keep their approved geometry;
- preserved assets, copy, locale behavior, catalog routes, rental handler, analytics calls, and all mobile/tablet branches.

Measured Rentals desktop behavior:

| Viewport | Section / media width | Heading left / width | Intro left / usable width | Offer left / width / right margin | Offer center offset |
|---|---:|---:|---:|---:|---:|
| 1440 | `1440 / 1440px` | `133.3 / 356.6px` | `99.5 / 1241px` | `265.5 / 909 / 265.5px` | `-0.02px` |
| 1920 | `1920 / 1920px` | `244.5 / 356.6px` | `268.8 / 1382.4px` | `460.8 / 998.4 / 460.8px` | `-0.01px` |
| 2560 | `2560 / 2560px` | `385.3 / 356.6px` | `480 / 1600px` | `720 / 1120 / 720px` | `0px` |

Conditions:

- migrated the actual rendered `HomeV2Conditions.jsx`; the unused `HomeV2UtilitySections.jsx` remains untouched;
- removed the desktop/ultrawide `1440px` outer cap and `1148px` pair cap;
- retained stacked behavior through `1199px`, then enabled one centered section-local pair at `1200px` when both factual `503px` minimum panels fit;
- sized both panels with `clamp(503px, 33vw, 650px)` and controlled their shared gap with `clamp(125px, calc(6.25vw + 50px), 210px)`;
- made the LiveCam preview follow its existing aspect ratio as the panel grows, expanded the provider footer only with the panel, and retained its controlled identity/actions content;
- kept the Forecast map on its existing `503 / 376` aspect ratio while stats, wave callout, conditions CTA, and text remain fixed/readable internal units;
- allowed the desktop section minimum height to grow only as needed for the aspect-linked map, capped at `850px`.

Measured Conditions desktop behavior:

| Viewport | Pair width | LiveCam width | Forecast width | Gap | Outer left / right margin | Center offset |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1146px` | `503px` | `503px` | `140px` | `147 / 147px` | `0px` |
| 1920 | `1437.2px` | `633.6px` | `633.6px` | `170px` | `241.4 / 241.4px` | `0px` |
| 2560 | `1510px` | `650px` | `650px` | `210px` | `525 / 525px` | `0px` |

Stage 2C verification:

- [x] EN routes return HTTP 200 at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU routes return HTTP 200 at 390, 1440, and 1920
- [x] Document-level horizontal overflow is `0` at every required viewport
- [x] Rentals media uses the full `1440 / 1920 / 2560px` section width
- [x] Rental CTA and catalog CTA remain visible at every required width
- [x] Rental modal opens and closes in EN and RU at both 390 and 1440; WhatsApp, Telegram, and Zalo actions remain present
- [x] EN/RU catalog routes remain `/surfboard-rental-danang` and `/ru/surfboard-rental-danang`
- [x] LiveCam preview/iframe, provider identity, attribution, full-stream link, and support link remain present with original URLs
- [x] Conditions WhatsApp action retains localized messages and its original tracking handler
- [x] Forecast retains the Windy iframe URL, map aspect, four stats, wave treatment, and CTA
- [x] LiveCam preview ratio remains approximately `1.5357`; Forecast map ratio remains approximately `1.3378`
- [x] Approved Hero desktop measurements remain unchanged
- [x] Approved Lessons 2B.1 measurements remain unchanged
- [x] Mobile/tablet Rentals markup remains source-identical; Conditions stays stacked below 1200
- [x] No CSS foundation changes or additional section migrations were required
- [x] `npm run lint` passes
- [x] `git diff --check` passes

Known technical compromises:

- Rentals heading moves from the original `118.7px` left anchor to `133.3px` at 1440 because it is centered in a fluid five-column region; intro and offer retain their factual 1440 anchors almost exactly;
- the initial Stage 2C ultrawide Rentals implementation used independently computed top/bottom `object-cover` crops; user visual review identified their registration regression and Stage 2C.1 supersedes that media geometry with one shared scene;
- the offer surface gains breathing room, but its `909px` transactional core deliberately does not scale;
- Conditions panel growth caps at `650px` and gap at `210px`, leaving intentional outer space at 2560 instead of producing oversized utility surfaces;
- the Conditions section minimum height grows from `790px` at 1440 to `844.8px` at 1920 and caps at `850px` to preserve the map aspect without clipping.

Stage 2C remained technically complete, but Rentals was not visually approved because its color/B&W media registration regressed on wide viewports.

### Stage 2C.1 — Rentals color / B&W media registration fix

User visual review found that the color and monochrome representations of the Rentals scene no longer continued through their boundary as one registered frame. Conditions remained technically complete and was explicitly out of scope for this correction.

Actual media assets:

- color: `/design/home-v2/rentals/rentals-background-photo.jpg` (`4096x2304`, 16:9);
- monochrome/alpha overlay: `/design/home-v2/rentals/rentals-background-overlay.png` (`1024x576`, 16:9).

Original approved registration discovered from `HEAD`:

- both assets represented the same full 16:9 scene and shared a nominal `1440x810px` coordinate system;
- the monochrome layer filled a `1440x810px` box with `object-cover object-bottom`;
- the color layer was explicitly rendered at `1440x810.76px`, `top:-0.37px`, with no transform, inside a `1440x366px` clipping wrapper;
- therefore both layers used effectively the same source-to-screen scale and origin at the 1440 anchor, while the wrapper only controlled color visibility above the boundary.

Stage 2C regression cause:

- the monochrome asset became `object-cover object-bottom` inside a full-width but fixed-height `810px` box;
- the color asset independently became `object-cover object-top` inside a full-width `366px` box;
- at 1440 the two 16:9 calculations happened to align, but at 1920 the monochrome rendered object moved approximately `270px` upward and at 2560 approximately `630px` upward while the color object stayed top-anchored;
- wall edges, central and adjacent boards, and background details therefore mapped to different screen coordinates.

Stage 2C.1 shared scene solution:

- retained the Stage 2C full-bleed section/media width, section height, heading, intro, offer, transactional core, and mobile/tablet branches;
- created one section-local full-width `aspect-ratio:16/9` scene coordinate box;
- made the monochrome and color Images direct siblings of that same parent with identical `fill`, `object-fit:fill`, `object-position:50% 50%`, and no transform;
- used the color layer's `clip-path: inset(0 0 calc(100% - 366px) 0)` as the only geometric difference, so it exposes the intended upper color region without changing the underlying scene mapping;
- preserved both original assets, alpha/treatment, and opacity values.

Measured desktop registration:

| Viewport | Shared scene rect | Monochrome rect | Color rect | Rect delta | Shared fit / position / transform | Transform origin |
|---|---:|---:|---:|---:|---|---:|
| 1440 | `0, 0, 1440x810px` | `1440x810px` | `1440x810px` | `0 / 0 / 0 / 0px` | `fill / 50% 50% / none` | `720px 405px` |
| 1920 | `0, 0, 1920x1080px` | `1920x1080px` | `1920x1080px` | `0 / 0 / 0 / 0px` | `fill / 50% 50% / none` | `960px 540px` |
| 2560 | `0, 0, 2560x1440px` | `2560x1440px` | `2560x1440px` | `0 / 0 / 0 / 0px` | `fill / 50% 50% / none` | `1280px 720px` |

The absolute page `top` varies with preceding content, but both layers and their shared parent have the same top at every viewport. Because both assets contain the same aligned 16:9 frame and now use the same normalized mapping, any source landmark `(u, v)` maps to the same screen coordinate in both layers; only the color visibility clip differs.

Stage 2C.1 verification:

- [x] Both layer asset paths, shared containing-block rect, rendered rect, object fit, object position, transform, transform origin, opacity, and color clip were recorded at 1440, 1920, and 2560
- [x] Layer rect delta is exactly `0` for left, top, width, and height at every desktop viewport
- [x] Stage 2C heading, intro, offer, transactional core, and full-bleed widths remain unchanged
- [x] EN returns HTTP 200 with overflow `0` at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU returns HTTP 200 with overflow `0` at 390, 1440, and 1920
- [x] Rent Now and catalog actions remain available at every required viewport
- [x] Rental modal opens and closes in EN/RU; WhatsApp, Telegram, and Zalo remain present
- [x] Conditions and all other sections were untouched by Stage 2C.1
- [x] `npm run lint` passes
- [x] `git diff --check` passes

Final status: `Stage 2C.1 complete — visually approved by user; Pilot approved`

**Stage 2C.1 APPROVED by user visual review. Pilot APPROVED. Proceed to Stage 3 rollout.**

Pilot:

1. Hero
2. Lessons
3. Rentals / LiveCam / Forecast composition

Purpose:

Validate three different composition types before touching the whole page.

Required visual checkpoint at:

- 390
- 1440
- 1920
- 2560

**STOP for visual approval after the pilot.**

---

## Stage 3 — Remaining section rollout

Status: **COMPLETE — STAGE 3D.1 APPROVED; STAGE 4 AUTHORIZED**

Pilot is visually approved. Roll out the approved fluid-layout system to the remaining rendered Home V2 sections without changing business behavior or section order.

### Stage 3A — Header + How It Works + Included

Scope:

- migrate only the Home V2 Header presentation, HomeV2HowItWorks, and HomeV2Included;
- preserve the already approved Hero, Lessons, Rentals, and Conditions geometry;
- preserve production Header behavior and styling outside the Home V2 variant/scope;
- preserve all content, navigation, language switching, booking behavior, tracking, assets, section order, and mobile/tablet behavior unless a layout regression requires a narrowly scoped correction.

Header acceptance intent:

- keep the header strip full bleed;
- remove the fixed 1440px Home V2 desktop frame and absolute x-offset dependence;
- align logo, nav, language control, and booking CTA to the approved fluid frame/grid;
- keep the 1440 visual anchor close to the approved composition;
- make 1920/2560 align naturally with the approved fluid Hero rather than remaining inside a centered 1440px frame;
- do not alter production/default Header presentation.

How It Works acceptance intent:

- remove dependence on the fixed centered 1440x720 desktop canvas;
- reuse the existing adaptive card-grid behavior on large screens instead of preserving fixed card x-coordinates;
- keep card text/readable widths controlled;
- keep the decorative wave visually tied to the fluid composition rather than to the old fixed canvas;
- preserve the approved 1440 character and existing mobile/tablet behavior.

Included acceptance intent:

- remove dependence on the fixed centered 1440x639 desktop canvas;
- promote the existing adaptive feature-grid behavior to large screens;
- keep short feature descriptions deliberately narrow;
- make the marquee / large horizontal decorative treatment full bleed or fluid where appropriate;
- keep the callout and main description aligned to the approved fluid composition;
- preserve the approved 1440 character and existing mobile/tablet behavior.

Required technical checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- HTTP 200
- horizontal overflow = 0
- Header navigation / language switch / Book Now behavior preserved
- no production Header regression
- How cards present and readable
- Included features/callout/marquee preserved
- Hero / Lessons / Rentals / Conditions unchanged
- no additional section migration

**STOP after Stage 3A for user visual review before Stage 3B.**

Stage 3A implementation results:

Header isolation and geometry:

- reused the existing `variant="homeV2"` contract and Home V2-only `data-home-v2-*` hooks; shared `Header.jsx` was not changed;
- retained the full-bleed `86px` strip and moved only the `>=1440px` Home V2 inner presentation from a fixed `1440px` absolute-coordinate frame to the approved fluid gutter plus 12-column grid;
- kept logo, navigation, language control, booking CTA, colors, labels, heights, destinations, tracking callbacks, and booking behavior unchanged;
- production `/` and `/ru` retain the default fixed `80px` Header, have no Home V2 hooks, return HTTP 200 with overflow `0`, and open the existing booking iframe.

Measured Home V2 Header behavior:

| Viewport | Inner composition width | Logo left | Nav left / right / width | Language left / right | Booking left / right | Fluid-frame outer margins |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1376px` | `97.1px` | `450.5 / 989.5 / 539px` | `1163 / 1204px` | `1215 / 1327px` | `32 / 32px` |
| 1920 | `1817.6px` | `153.1px` | `690.5 / 1229.5 / 539px` | `1568.6 / 1609.6px` | `1620.6 / 1732.6px` | `51.2 / 51.2px` |
| 2560 | `2432px` | `217.1px` | `1010.5 / 1549.5 / 539px` | `2119 / 2160px` | `2171 / 2283px` | `64 / 64px` |

How It Works:

- removed the rendered fixed `1440x720` coordinate artboard and promoted the existing adaptive card-grid branch to desktop/ultrawide;
- retained the `720px` desktop section anchor, heading hierarchy, four assets/cards, copy, card height, photo/text treatment, and decorative wave asset;
- kept each desktop card at the proven `254px` maximum while the centered visual group grows with `clamp(1240px, 75vw, 1600px)` and distributes extra width through gaps;
- tied the wave to the fluid section width instead of the retired fixed canvas;
- enabled the same adaptive How branch on RU mobile because the previous branch selection left RU `390px` with no visible How cards; EN mobile remains on its approved dedicated presentation.

Measured How It Works desktop behavior:

| Viewport | Section / fluid content width | Card-group width | Card widths | Gaps | Outer margins | Center offset |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1440 / 1376px` | `1240px` | `254 / 254 / 254 / 254px` | `74.7 / 74.6 / 74.7px` | `100 / 100px` | `0px` |
| 1920 | `1920 / 1817.6px` | `1440px` | `254 / 254 / 254 / 254px` | `141.3 / 141.4 / 141.3px` | `240 / 240px` | `0px` |
| 2560 | `2560 / 2432px` | `1600px` | `254 / 254 / 254 / 254px` | `194.7 / 194.6 / 194.7px` | `480 / 480px` | `0px` |

Included:

- removed the rendered fixed `1440x639` coordinate artboard and promoted the existing adaptive four-feature grid to desktop/ultrawide;
- retained all four feature assets, labels, descriptions, board tilt, callout, main copy, section height, and palette;
- centered the feature group with `clamp(1240px, 75vw, 1600px)` while every feature description remains capped at `220px`;
- kept the message composition controlled and capped the main description at its factual `781px` desktop measure;
- made the existing logo marquee genuinely full bleed at every large-desktop width without changing its asset or text content.

Measured Included desktop behavior:

| Viewport | Feature-group width | Feature track widths | Gaps | Callout / main description width | Marquee width | Outer margins / center offset |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1240px` | `284.5px × 4` | `34px × 3` | `300.8 / 639.2px` | `1440px` | `100 / 100px / 0px` |
| 1920 | `1440px` | `334.5px × 4` | `34px × 3` | `380.4 / 781px` | `1920px` | `240 / 240px / 0px` |
| 2560 | `1600px` | `374.5px × 4` | `34px × 3` | `422.4 / 781px` | `2560px` | `480 / 480px / 0px` |

Stage 3A verification:

- [x] EN returns HTTP 200 with document overflow `0` at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU returns HTTP 200 with document overflow `0` at 390, 1440, and 1920
- [x] Four visible How cards and four visible Included features are present at every required EN/RU width
- [x] EN/RU Header navigation retains six correct locale-aware destinations
- [x] EN/RU language switch retains `/home-v2` ↔ `/ru/home-v2`
- [x] EN/RU Home V2 Book Now opens the booking iframe
- [x] Production `/` and `/ru` Headers retain default presentation, no Home V2 hooks, and working booking behavior
- [x] Approved Hero measurements remain `101.3 / 194.1 / 309.3px` lockup-left and `79.7 / 190.9 / 331.7px` benefits-right at 1440 / 1920 / 2560
- [x] Approved Lessons composition remains centered with `96.5 / 201.3 / 342.7px` equal outer margins
- [x] Approved Rentals heading/intro/offer measurements exactly match the Stage 2C.1 report
- [x] Approved Conditions pair/panel/gap measurements exactly match the Stage 2C report
- [x] `npm run lint` passes
- [x] `git diff --check` passes
- [x] No Reviews, FAQ, Events, Gallery, Footer, or other section migration was performed
- [x] Stage 3B was not started

Known compromises:

- the Header language/booking group sits approximately `13px` left of the former fixed 1440 anchor so it can occupy one controlled three-column grid region without viewport-specific coordinate nudges;
- How cards deliberately stop at `254px`; the 2560 layout uses a capped `1600px` group and approximately `195px` gaps rather than oversized cards;
- Included feature tracks grow on wide screens, but icons, `220px` feature descriptions, and the `781px` main description remain controlled; the measured track width is not the text measure;
- RU 390 uses the existing adaptive How composition because no dedicated RU mobile presentation existed.

### Stage 3A.1 — How cards + Included BOARD polish

User visual review approved the Home V2 Header but identified two remaining issues before Stage 3B:

1. How It Works cards are too small on wide desktop because Stage 3A kept every card capped at `254px` while most additional width went into gaps.
2. The Included `BOARD` feature icon has incorrect scale/position after the grid migration.

Header status:

- Home V2 Header is visually approved.
- Do not change Header geometry or behavior in Stage 3A.1.

How It Works polish intent:

- increase desktop/ultrawide card width moderately instead of preserving the `254px` cap forever;
- make the complete four-card group approximately match the approved Lessons composition width at the same viewport;
- use the approved Lessons silhouette as the horizontal reference:
  - ~`1247px` at 1440;
  - ~`1517px` at 1920;
  - ~`1875px` at 2560;
- keep the four-card group centered;
- keep gaps controlled rather than letting them absorb nearly all extra width;
- increase the lower text/body container together with the card width so the card remains one coherent surface;
- center the card title and description/subtitle horizontally within each card;
- preserve assets, copy, card count, section height/character, wave treatment, and mobile/tablet behavior unless a narrow regression fix is required.

Included BOARD polish intent:

- correct only the `BOARD` feature visual;
- recover its factual pre-Stage-3A size, transform/tilt, and local position from the existing diff / pre-Stage-3A implementation rather than guessing from screenshots;
- adapt that approved board-specific geometry to the new fluid feature track;
- keep the other three Included feature icons unchanged;
- preserve Included copy, feature order, callout, main description, marquee, and fluid group geometry.

Required checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- horizontal overflow = 0
- Header unchanged
- How four-card group centered
- How group width approximately tracks the approved Lessons composition width on 1440/1920/2560
- How title and body copy centered in each card
- Included BOARD scale/position restored without changing the other three features
- approved Pilot sections unchanged
- no Stage 3B work

**STOP after Stage 3A.1 for user visual review before Stage 3B.**

Final status: `Stage 3A.1 complete — visually approved; Stage 3A.2 authorized`


### Stage 3A.1 implementation results

How It Works scale and horizontal balance:

- replaced the Stage 3A `254px` desktop card cap with controlled fluid card growth;
- matched the complete four-card group approximately to the already approved Lessons visual width at the same viewport;
- kept the group centered with no viewport-specific x-offset nudges;
- expanded the lower body surface together with card width and centered both title and body copy;
- preserved assets, copy, wave treatment, heading geometry, mobile/tablet branches, and all approved earlier sections.

Measured Stage 3A.1 How geometry:

| Viewport | Group width | Approved Lessons reference | Difference | Card width | Body inner width | Gap | Center offset |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1246.4px` | `1247.1px` | `-0.7px` | `264.2px` | `258.2px` | `63.2px` | `0px` |
| 1920 | `1515.2px` | `1517.5px` | `-2.3px` | `302.6px` | `296.6px` | `101.6px` | `0px` |
| 2560 | `1873.6px` | `1874.7px` | `-1.1px` | `353.8px` | `347.8px` | `152.8px` | `0px` |

Included BOARD restoration:

- asset: `/design/home-v2/included/included-icon-board.svg`;
- factual pre-Stage-3A frame: `333.864 × 333.864px`;
- factual artwork size: `258.404 × 258.404px`;
- factual rotation: `21.01deg`;
- Stage 3A had reduced the frame/artwork presentation to `300 × 300px`, producing the visual regression;
- Stage 3A.1 restored the approved `333.864px` frame, `258.404px` artwork, and `21.01deg` rotation inside the new fluid Included track;
- browser-rounded artwork measured approximately `258.391 × 258.391px`; rotated bounds approximately `333.853 × 333.854px`;
- the other three Included icons remained `210 × 210px` and were not changed.

Stage 3A.1 verification:

- [x] EN checked at 390, 768, 1024, 1440, 1920, and 2560 with HTTP 200 and overflow `0`
- [x] RU checked at 390, 1440, and 1920 with HTTP 200 and overflow `0`
- [x] Four How cards remain present and centered
- [x] Header geometry remains unchanged and visually approved
- [x] BOARD geometry restored; the other three Included icons remain unchanged
- [x] Hero, Lessons, Rentals, and Conditions remain unchanged
- [x] `npm run lint` passes
- [x] `git diff --check` passes

Final status: `Stage 3A.1 complete — visually approved; Stage 3A.2 authorized`

### Stage 3A.2 — How typography + Included marquee clearance polish

User visual review approved:

- Home V2 Header;
- Stage 3A.1 How card/group scale and horizontal balance;
- Included BOARD visual geometry.

Two remaining issues must be fixed before Stage 3B:

1. The text inside the enlarged How It Works cards is now visually too small relative to the new card size on wide desktop.
2. The Included full-bleed `SURF SCHOOL` marquee overlaps the lower callout/main-description area.

How typography intent:

- keep the approved Stage 3A.1 card widths, group widths, gaps, centering, assets, wave and section-level composition;
- increase desktop/ultrawide card title and especially lower description typography in a controlled fluid way;
- increase the corresponding title/description container heights/padding so the typography has enough breathing room;
- preserve centered title and centered body copy;
- do not enlarge typography by scaling the whole card;
- keep 1440 restrained and let 1920/2560 gain modest additional type size;
- preserve mobile/tablet branches unless a narrow regression fix is required.

Included clearance intent:

- keep the approved four-feature grid, BOARD geometry, callout/main-description widths, marquee content/style, and full-bleed behavior;
- identify the actual vertical-positioning cause of the collision;
- reserve explicit vertical space for the callout/main-description block before the marquee;
- move/reflow the marquee below the message block or increase the section's desktop min-height if required;
- do not solve with z-index hiding, clipping, or arbitrary breakpoint-specific top nudges;
- keep the transition into Rentals clean and preserve the existing section order.

Required checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- horizontal overflow = 0
- How Stage 3A.1 group/card geometry unchanged
- How card title/body typography visibly larger on desktop/ultrawide and centered
- no text clipping in any How card
- Included BOARD and other feature icons unchanged
- Included callout/main description do not overlap the marquee
- marquee remains full bleed and readable
- Rentals starts cleanly below Included
- Header and approved Pilot unchanged
- no Stage 3B work

**STOP after Stage 3A.2 for user visual review before Stage 3B.**

Stage 3A.2 implementation results:

How typography and internal capacity:

- kept the approved Stage 3A.1 four-card group widths, individual card widths, gaps, horizontal centering, images/crops, wave, and section-level composition unchanged;
- retained the `260px` desktop photo region and increased only the complete card height plus title/body regions so the larger type has real layout space rather than relying on clipping or transforms;
- made desktop card height fluid from `444px` at 1440 to `456px` at 1920 and `472px` at 2560;
- made title size fluid from approximately `20px` to `24.75px`, with a `1.15` line-height and a title region that grows from `78px` to `92px`;
- made EN body type fluid from `14px` to `18px`; RU uses a slightly more conservative `13px` to `17px` range; the shared body line-height grows from `24px` to `31px`;
- increased title/body horizontal and vertical padding with bounded `clamp()` values; centered title and body alignment remains unchanged;
- no mobile/tablet typography or layout branch was modified.

Measured How desktop result:

| Viewport | Approved group width | Card width / gap | Card height | Title size / line-height / region | EN body size / line-height | Body region / vertical padding |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1246.4px` | `264.2px / 63.2px` | `444px` | `20.05 / 23.06 / 78px` | `14 / 24px` | `184 / 16px` |
| 1920 | `1515.2px` | `302.6px / 101.6px` | `456px` | `22.06 / 25.37 / 84px` | `17 / 27px` | `196 / 19.99px` |
| 2560 | `1873.6px` | `353.8px / 152.8px` | `472px` | `24.75 / 28.46 / 92px` | `18 / 31px` | `212 / 24px` |

The pre-polish desktop baseline was a fixed `19.1px` title, `12/24px` body, approximately `27px` title container, `156px` body panel, and `394px` total card height at all three desktop widths. The new ranges are deliberately restrained at 1440 and add capacity progressively at 1920/2560.

Included marquee clearance:

- verified the collision cause as a fixed `639px` desktop section combined with an absolutely positioned marquee at `bottom:70px`; the normal-flow message could grow into the marquee's fixed vertical band;
- changed the desktop section to a `700px` minimum height and returned the marquee to normal flow after the message with a structural `32px` top margin;
- removed the desktop overflow-hiding dependency; the callout/main description now reserves its own height and the marquee follows it naturally;
- preserved the feature grid, BOARD and other icon geometry, message widths, marquee content/style/full-bleed width, and section order;
- Rentals remains separated from Included by the existing `32px` section gap. Its internal geometry is unchanged; its absolute page position moves down only because Included now owns the required extra height.

Measured Included desktop clearance:

| Viewport | Before message bottom / marquee top / overlap | After message bottom / marquee top / overlap | Section height | Included → Rentals gap |
|---|---:|---:|---:|---:|
| 1440 | `597.5 / 539 / 58.5px` | `597.5 / 652.3 / 0px` | `700px` | `32px` |
| 1920 | `564 / 539 / 25px` | `564 / 628 / 0px` | `700px` | `32px` |
| 2560 | `564 / 539 / 25px` | `564 / 628 / 0px` | `700px` | `32px` |

Stage 3A.2 verification:

- [x] EN returns HTTP 200 with document overflow `0` at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU returns HTTP 200 with document overflow `0` at 390, 1440, and 1920
- [x] Four visible How cards remain present; all cards have equal height at every required viewport
- [x] No title, title region, body panel, or body copy clipping occurs at any required EN/RU viewport
- [x] Approved desktop How group/card widths, gaps, and exact horizontal centering remain unchanged
- [x] Included message-to-marquee overlap is `0px` at every required EN/RU viewport
- [x] BOARD remains `333.9 × 333.9px` in rotated bounds with its `21.01deg` rotation; the other three icons remain `210 × 210px`
- [x] Header measurements exactly match the approved Stage 3A result at 1440, 1920, and 2560
- [x] Approved Hero, Lessons, Rentals, and Conditions horizontal/internal geometry remains unchanged
- [x] `npm run lint` passes
- [x] `git diff --check` passes
- [x] No Reviews, FAQ, Events, Gallery, Footer, or other Stage 3B+ migration was performed
- [x] No QA screenshots were added

Final status: `Stage 3A.2 complete — visually approved by user; Stage 3A complete`

### Stage 3B — Reviews + FAQ

Status: **TECHNICALLY COMPLETE — VISUAL FIXES DEFERRED**

User visual review identified remaining visual issues in Reviews / FAQ, but explicitly chose to defer those corrections and continue the main fluid-layout rollout.

Rules while Stage 3C is active:

- do not modify Reviews or FAQ;
- do not treat Stage 3B as visually approved;
- preserve the current Stage 3B implementation exactly unless a later dedicated correction stage explicitly reopens it;
- record the future correction as deferred visual debt rather than mixing it into Events / Gallery work.

Stage 3A remains visually approved. Stage 3B migrated only Reviews and FAQ in `HomeV2ContentSections.jsx`; mobile/tablet presentation branches and all approved sections remain source-identical to their pre-Stage-3B state.

Reviews migration:

- replaced the fixed centered `1440px` desktop canvas dependency with the approved fluid outer frame;
- changed the old `1093.458px` absolute card group into a centered three-column group that grows from `1150px` to `1640px`;
- distributed added width between moderate card-surface growth and controlled `43.2-56px` gaps;
- kept all three cards equal-height at `220px`; each quote remains constrained to `320px` inside the wider surface;
- preserved review content, names, dates, ratings, divider artwork variants, outline rotations, CTA URL/style, colors, type hierarchy, and section order;
- moved trust and CTA into one compact section-local row instead of independent fixed canvas x-coordinates;
- anchored the existing surf-family bridge to the Reviews fluid composition at `63%`, with bounded width growth from `364px` to `420px`; no new asset or artwork change was made.

Measured Reviews desktop geometry:

| Viewport | Section / fluid width | Card group | Card width | Gap | Outer margins | Center offset | Trust / CTA region | Bridge rect (section-local) |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1440 / 1376px` | `1150px` | `354.5px` | `43.2px` | `145 / 145px` | `0px` | `x 438.2-1001.8; y 503-591.9px` | `x 898.9-1262.9; y -139-198.6px` |
| 1920 | `1920 / 1817.6px` | `1384.8px` | `424.3px` | `56px` | `267.6 / 267.6px` | `0px` | `x 659.8-1260.3; y 503-591.9px` | `x 1196.3-1580.3; y -139-217.1px` |
| 2560 | `2560 / 2432px` | `1640px` | `509.3px` | `56px` | `460 / 460px` | `0px` | `x 979.8-1580.3; y 503-591.9px` | `x 1596.2-2016.2; y -139-250.5px` |

FAQ migration:

- replaced independently positioned illustration and fixed `margin-left:591px` accordion with one centered `illustration | controlled gap | accordion` composition;
- preserved the existing illustration, EPIC logo, control surfaces, plus icon behavior, typography, content, accordion semantics, and single-open-item state;
- kept the accordion at the verified readable `691.2px` anchor at 1440, allowed modest growth to `753.6px` at 1920, and capped it at `760px`;
- removed desktop `white-space: nowrap` and fixed control x-offset assumptions; the question/control button is now a local two-column grid with normal wrapping;
- changed desktop rows from absolute fixed-height controls to natural flow with `min-height`, so answers enlarge the section and cannot overlap Events.

Measured FAQ desktop geometry:

| Viewport | Whole group | Illustration left / width | Gap | Accordion left / width / right | Outer margins | Center offset |
|---|---:|---:|---:|---:|---:|---:|
| 1440 | `1156.2px` | `141.9 / 268px` | `197px` | `606.9 / 691.2 / 1298.1px` | `141.9 / 141.9px` | `0px` |
| 1920 | `1233px` | `343.5 / 268px` | `211.4px` | `822.9 / 753.6 / 1576.5px` | `343.5 / 343.5px` | `-0.01px` |
| 2560 | `1248px` | `656 / 268px` | `220px` | `1144 / 760 / 1904px` | `656 / 656px` | `0px` |

FAQ wrapping and interaction verification:

- longest EN question: `How long does it take to stand up on the board?`; allocated rendered text box `618.2 / 680.6 / 687px` at 1440/1920/2560, one line at current copy, no clipping, no control overlap;
- longest RU question: `Сколько нужно заниматься, чтобы встать на доску?`; allocated rendered text box `618.2 / 680.6px` at 1440/1920, one line at current copy, no clipping, no control overlap;
- normal wrapping remains enabled for future/longer translations rather than relying on `nowrap`;
- every FAQ item was opened and closed once at every required EN/RU viewport; every answer was visible and unclipped; the following Events section remained directly after FAQ with no overlap.

Responsive and regression verification:

- [x] EN HTTP 200 and document overflow `0` at 390, 768, 1024, 1440, 1920, and 2560
- [x] RU HTTP 200 and document overflow `0` at 390, 1440, and 1920
- [x] exactly three visible review cards with complete content at every required viewport
- [x] Reviews card group is centered with equal card heights and no CTA/trust/bridge collision
- [x] FAQ controls remain buttons with `aria-expanded` / `aria-controls`; open and close behavior passes for all four items
- [x] mobile/tablet Reviews and FAQ branches were not redesigned
- [x] Header, Hero, How, Lessons, Included, Rentals, and Conditions source geometry was not changed during Stage 3B
- [x] Events, Gallery, Footer, Photo Break, and Stage 3C+ were not touched

Known compromises:

- the 2560 review surfaces reach approximately `509px`, but quote measure stays capped at `320px`; this intentionally uses extra space without creating long prose lines;
- FAQ group caps at `1248px` and deliberately leaves substantial ultrawide outer whitespace because the accordion is a reading surface, not a full-width panel;
- the repository's existing exact-geometry Playwright tests still encode pre-approved Stage 3A geometry/data labels. A targeted run of eight approved-section tests failed on those stale expectations; they were not changed because test maintenance was outside Stage 3B scope and unrelated dirty failures must not be repaired here.

Stage 3B technical implementation is frozen for now. User visual corrections are deferred to a dedicated later checkpoint.

Final status: `Stage 3B technically complete — visual fixes deferred; Stage 3C authorized`

### Stage 3C — Events + Gallery

Status: **COMPLETE — VISUALLY APPROVED**

Scope:

- migrate only `HomeV2Events` and `HomeV2Gallery`;
- preserve Header, Hero, How, Lessons, Included, Rentals, Conditions, Reviews, FAQ, and all current behavior;
- Reviews / FAQ have deferred visual issues and are strictly off-limits during Stage 3C;
- preserve copy, assets, CTAs, links, filters, analytics, locale behavior, section order, and mobile/tablet behavior unless a narrowly scoped regression fix is required.

Events acceptance intent:

- remove dependence on the fixed/max `1440x1270` desktop canvas and absolute poster-card coordinates;
- preserve the asymmetric editorial hierarchy: one large featured event plus smaller supporting cards;
- convert the desktop poster collage into a section-local fluid editorial grid rather than scaling the whole 1440 artboard;
- keep card rotations, poster styling, CTA hierarchy, copy, images, and visual character;
- allow the featured card and surrounding composition to use more width at 1920/2560 without making secondary cards oversized;
- keep the complete Events composition centered/balanced with controlled gaps and no viewport-specific nudges;
- preserve the 1440 visual anchor as closely as practical.

Gallery acceptance intent:

- remove dependence on the fixed/max `1440x1062` desktop canvas;
- convert the fixed `1241x600` mosaic into a fluid media mosaic using section-local `minmax()` / fractional tracks;
- preserve the hierarchy of one large tile plus four smaller tiles and preserve all existing image assets/crops unless crop recalibration is required by the fluid geometry;
- allow the mosaic to gain useful width at 1920/2560 while capping extreme tile sizes if needed;
- keep filter controls deliberately bounded and centered rather than stretching them to full viewport width;
- preserve filter behavior, active state, analytics, image order/content, and mobile/tablet behavior;
- revalidate every desktop crop at 1440/1920/2560.

Required technical checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- HTTP 200
- horizontal overflow = 0
- all Events cards/CTAs remain present and functional
- Gallery filter controls remain functional
- Gallery tile count/order/content remain correct for every filter state
- no Reviews/FAQ changes
- no Footer migration
- approved earlier sections unchanged

Required Events measured report at 1440 / 1920 / 2560:

- section/fluid width
- overall poster-composition width
- featured card width/height and left position
- secondary card widths/heights
- principal gaps
- outer left/right margins
- center offset / balance
- CTA bounding region
- rotated-card bounding boxes where relevant

Required Gallery measured report at 1440 / 1920 / 2560:

- section/fluid width
- mosaic width/height
- large-tile width/height
- small-tile widths/heights
- grid gaps
- filter-group width
- outer left/right margins
- center offset
- effective image crop/object-position values

Implementation summary:

- migrated only `HomeV2Events` and `HomeV2Gallery` in `HomeV2ContentSections.jsx`;
- left the 390/768/1024 presentation branches source-identical and changed only the `min-width: 1440px` geometry;
- kept Reviews and FAQ frozen in their Stage 3B state, including the deferred visual issues;
- did not modify Footer, tests, global styles, assets, copy, event order, Gallery order, analytics, links, or locale behavior;
- kept Events in normal flow so Gallery begins after the real rotated-card composition rather than after a fixed `1270px` artboard;
- kept Gallery in normal flow and replaced the fixed `1241x600px` desktop mosaic with a fractional `1 + 0.483 + 0.483` three-track, two-row media grid;
- preserved all existing rotations and poster CTA surfaces while anchoring CTA geometry locally to each card.

Measured Events desktop geometry (browser layout area is nominal viewport minus the `15px` vertical scrollbar):

| Nominal viewport | Section / fluid frame | Composition | Featured layout size / rotated rect left | Secondary layout sizes | Horizontal / secondary vertical gaps | Outer margins | Center offset |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1425 / 1361px` | `1236 x 962px` | `723 x 860px / x 91.92px` | `395 x 292px` each | `118px / 43.2px` | `94.5 / 94.5px` | `0px` |
| 1920 | `1905 / 1802.59px` | `1536 x 1037px` | `960 x 922px / x 181.74px` | `422 x 307px` each | `153.6px / 57.6px` | `184.5 / 184.5px` | `0px` |
| 2560 | `2545 / 2417px` | `1680 x 1046px` | `1035 x 960px / x 429.63px` | `440 x 310px` each | `204.8px / 58px` | `432.5 / 432.5px` | `0px` |

Featured photo layout sizes are `717x590`, `954x614`, and `1029x650px`. Secondary photo layout sizes are approximately `389x145`, `416x157`, and `434x160px`. The featured surface gains useful width while secondary cards remain capped at `440px`.

Rotated Events bounding rects (`x / section-local y / width x height`):

| Viewport | Featured | Secondary 1 | Secondary 2 | Secondary 3 |
|---|---:|---:|---:|---:|
| 1440 | `91.92 / 204.00 / 728.15x864.33` | `934.23 / 204.44 / 397.54x295.44` | `932.44 / 537.17 / 401.13x300.34` | `935.28 / 876.23 / 395.45x292.61` |
| 1920 | `181.74 / 203.28 / 965.53x927.34` | `1296.77 / 204.31 / 425.06x310.87` | `1294.89 / 566.47 / 428.84x316.11` | `1297.87 / 935.39 / 422.86x307.84` |
| 2560 | `429.63 / 203.06 / 1040.95x966.20` | `1671.15 / 204.24 / 442.69x313.84` | `1669.25 / 569.51 / 446.50x319.30` | `1672.26 / 941.82 / 440.48x310.68` |

Events CTA bounds remain local to their cards. Featured CTA layout size stays `130x43px`; secondary CTAs stay `109x36px`. The combined CTA region remains within the section at every desktop checkpoint. All four CTA actions were clicked at EN 390/1440 and RU 1440 and selected the expected Gallery keys: `surf-fest`, `birthday`, `sunset`, and `community`.

Measured Gallery desktop geometry:

| Nominal viewport | Section / fluid frame | Mosaic | Large tile | Small tiles | Gap | Filter group | Outer margins | Center offset |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1425 / 1361px` | `1248 x 604px` | `611 x 604px` | `295 x 290px` | `23.76px` | `896.55 x 45.06px` | `88.5 / 88.5px` | `0px` |
| 1920 | `1905 / 1802.59px` | `1728 x 836px` | `847 x 836px` | `409 x 402px` | `31.68px` | `896.55 x 45.06px` | `88.5 / 88.5px` | `0px` |
| 2560 | `2545 / 2417px` | `1900 x 919px` | `934 x 919px` | `451 x 444px` | `32px` | `896.55 x 45.06px` | `322.5 / 322.5px` | `0px` |

Gallery crop strategy:

| Tile | object-fit | object-position | transform | Intent |
|---|---|---|---|---|
| 1 (dominant) | `cover` | `47% 50%` | `none` | retains the slightly left-weighted large-event crop |
| 2 | `cover` | `35% 40%` | `none` | preserves the previous left/up crop bias |
| 3 | `cover` | `28% 20%` | `none` | preserves the high, left-weighted portrait crop |
| 4 | `cover` | `35% 15%` | `none` | keeps the subject high in the lower-left support tile |
| 5 | `cover` | `23% 23%` | `none` | preserves the strongly left-weighted final crop |

Filter and responsive verification:

- all current keys (`all`, `surf-fest`, `birthday`, `sunset`, `community`) were clicked at every required EN/RU checkpoint;
- each clicked control reported `aria-pressed=true`, rendered five visible tiles, retained the current per-group order, and kept document overflow at `0`;
- EN passed at 390, 768, 1024, 1440, 1920, and 2560; RU passed at 390, 1440, and 1920;
- both routes returned HTTP `200`;
- all four Events cards and CTAs were visible at every checkpoint;
- `npm run lint` and `git diff --check` pass.

Known compromises:

- the browser's `15px` vertical scrollbar makes measured content width `viewport - 15px`; centering is exact within that real layout area;
- Events composition caps at `1680px` and secondary cards at `440px`, so 2560px uses added space as controlled editorial breathing room instead of oversized supporting posters;
- Gallery mosaic caps at `1900px`; it still grows from `1248px` at 1440 to `1728px` at 1920 and `1900px` at 2560 without allowing crops to become unbounded;
- Gallery filters intentionally remain `896.55px` wide at desktop sizes;
- existing exact-geometry tests remain stale and were not changed during Stage 3C.

Final status: `Stage 3C complete — visually approved by user; Stage 3D authorized`

**Stage 3C APPROVED by user visual review. Proceed to Stage 3D only.**

### Stage 3D — Footer

Status: **COMPLETE — VISUALLY APPROVED**

Stage 3C (Events + Gallery) is visually approved. Stage 3D is the final section-rollout step before the dedicated responsive pass.

Scope:

- migrate only the rendered Home V2 Footer presentation;
- first verify the factual current owner (`Footer.jsx`, a Home V2 variant, `HomeV2Footer.jsx`, or another current owner) from source before editing;
- preserve Header, Hero, How, Lessons, Included, Rentals, Conditions, Reviews, FAQ, Events, Gallery, Messenger FAB, Booking Modal, and Rental Modal;
- Reviews / FAQ retain deferred visual issues and remain off-limits during Stage 3D;
- preserve footer content, links, social actions, contact data, map behavior, tracking, locale behavior, assets, section order, and all production/default Footer behavior outside Home V2.

Verified Stage 0 Footer baseline:

- map surface is already full bleed;
- desktop Footer body is capped by a `1440px` composition;
- at `>=1440px`, main content is approximately `975px` wide and starts around `left:233px`;
- the main content uses three desktop columns tied to fixed/absolute geometry;
- decorative surfboard is edge-offset;
- decorative wave is tied to a fixed approximately `1740px` geometry;
- below the large-desktop branch, the Footer already has a responsive presentation with approximately `20px` side padding and a three-column layout from `md`.

Footer acceptance intent:

- keep the map full bleed;
- remove the fixed `1440px` Home V2 desktop body as the primary positioning coordinate system;
- align the complete footer information architecture to the approved Home V2 fluid frame/grid;
- keep the three information columns readable and controlled instead of stretching individual text/link columns across ultrawide screens;
- let useful composition width increase on 1920/2560 through column placement, inter-column breathing room, and decorative span rather than oversized typography;
- preserve the 1440 visual character as closely as practical;
- re-anchor the decorative wave and surfboard to the fluid Footer composition / section edges rather than old fixed-canvas coordinates;
- avoid viewport-specific manual x-offset nudges;
- preserve current footer/map heights unless natural-flow requirements prove a narrowly scoped change necessary;
- do not redesign social controls, link hierarchy, map, typography, colors, or footer artwork.

Production isolation:

- if the factual owner is shared with production, changes must be strictly scoped to the existing Home V2 variant/data hooks;
- `/` and `/ru` production Footer presentation and functionality must remain unchanged;
- do not add `/home-v2` or `/ru/home-v2` to public navigation, sitemap, SEO link sets, or production footer links;
- Home V2 remains a hidden `noindex, nofollow` experiment.

Map requirements:

- preserve the current map/iframe source and location;
- preserve full-bleed width;
- preserve loading/iframe attributes and current interaction behavior;
- do not replace the map provider or redesign the map treatment.

Footer content requirements:

- preserve all current navigation destinations;
- preserve locale-aware links;
- preserve contact address/email/phone;
- preserve partner link behavior;
- preserve social destinations and Telegram Channel action;
- preserve analytics/tracking hooks where currently present;
- preserve copyright content.

Desktop/ultrawide composition direction:

- use the approved Home V2 fluid frame as page-level alignment;
- a section-local controlled composition wrapper is allowed where useful;
- keep content columns themselves intentionally bounded;
- additional width at 1920/2560 should improve layout breathing room without pushing the three columns so far apart that the footer feels disconnected;
- decorative art may extend beyond the controlled text composition while remaining inside the section and without horizontal overflow.

Mobile / tablet:

- verify 390 / 768 / 1024;
- if current mobile/tablet Footer behavior works, keep it maximally source-identical;
- do not redesign the mobile Footer during Stage 3D.

Required measured report at 1440 / 1920 / 2560:

- full Footer/body width;
- fluid frame width;
- main content-group width;
- main content-group left/right outer margins;
- each of the three content-column left positions and widths;
- principal inter-column gaps;
- content-group center offset;
- map width;
- decorative wave bounding rect;
- surfboard/decorative board bounding rect;
- any Footer bottom/copyright region width and alignment.

Required technical checkpoint:

- EN: 390 / 768 / 1024 / 1440 / 1920 / 2560
- RU: 390 / 1440 / 1920
- HTTP 200
- horizontal overflow = 0
- map remains present and full bleed
- all current Footer links remain present
- locale-aware links remain correct
- social/contact actions remain correct
- production `/` and `/ru` Footer remains unchanged if shared ownership is involved
- no Reviews/FAQ deferred fixes
- no earlier approved-section changes
- no Stage 4 tuning

Checks:

- `npm run lint`
- `git diff --check`
- use targeted Playwright/DOM checks where useful for Footer links and geometry;
- do not repair stale unrelated exact-geometry expectations in `tests/home-v2.spec.js`;
- do not touch the Photo Break test conflict.

Final status after implementation:

`Stage 3D complete — awaiting user visual review before Stage 4`

**STOP after Stage 3D for user visual review. Do not begin Stage 4 or Stage 5.**

Stage 3D factual ownership and implementation:

- traced the active render path from `HomeV2Page.jsx` to the dedicated `app/components/home-v2/HomeV2Footer.jsx` component;
- production `/` and `/ru` continue to render the separate shared `app/components/Footer.jsx`; no production Footer component, variant, CSS hook, route, sitemap, canonical, or SEO link set was changed;
- changed only the Home V2 Footer desktop/ultrawide presentation at `>=1440px`; the existing 390/768/1024 body padding, stacking, three-column tablet grid, artwork sizes, and content flow remain source-identical;
- replaced the fixed centered `max-width:1440px` body and absolute `left:233px / width:975px` main canvas with the approved Home V2 fluid frame/grid contract plus one centered section-local three-column composition;
- kept the brand column at `306px`, allowed quick links to grow only from `191px` to `280px`, contacts only from `228px` to `320px`, and assigned most additional width to a controlled `125-230px` inter-column gap;
- preserved Footer/map heights (`562px` total desktop Footer, `189px` map, `373px` body), typography, colors, copy, link order, social controls, Telegram Channel control, contact presentation, artwork, tracking handlers, and copyright treatment;
- retained the exact map iframe source, attributes, lazy loading, grayscale treatment, and full-bleed width;
- replaced the fixed `1740px / left:-70px` desktop wave canvas with the same existing SVG paths stretched across the Footer section width;
- re-anchored the unchanged `163px` surfboard artwork to `--home-v2-fluid-gutter` while preserving its historical `bottom:-12px` visual placement;
- aligned the copyright region to the same fluid left/right gutters and kept the text centered.

Old → new desktop Footer geometry:

| Geometry | Before | After |
|---|---:|---:|
| Footer/map width | full viewport | full viewport (unchanged) |
| Footer body | centered, capped at `1440px` | full Footer width with a fluid inner frame |
| Main group | fixed `975px`, absolute `left:233px` in the 1440 canvas | centered `975 / 1164.19 / 1366px` at 1440 / 1920 / 2560 |
| Main columns | fixed `306 / 191 / 228px` with absolute x offsets | controlled grid tracks `306 / 191-280 / 228-320px` |
| Principal gaps | `125 / 125px` at every desktop width | `125 / 179.5 / 230px` at 1440 / 1920 / 2560 |
| Decorative wave | fixed `1740x83px`, desktop `left:-70px` | section-relative `100% x 83px`, `left:0` |
| Surfboard | fixed `right:25px`, `bottom:-12px` | fluid-gutter right anchor `32 / 51.2 / 64px`, same `bottom:-12px` |

Measured desktop geometry (all x values are Footer/viewport-relative because the Footer is full bleed):

| Viewport | Footer / map / body | Fluid frame width / left | Main group width / left-right margins / center offset | Brand left / width | Quick left / width | Contacts left / width | Gaps |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `1440 / 1440 / 1440px` | `1376 / 32px` | `975 / 232.5-232.5 / 0px` | `232.5 / 306px` | `663.5 / 191px` | `979.5 / 228px` | `125 / 125px` |
| 1920 | `1920 / 1920 / 1920px` | `1817.59 / 51.2px` | `1164.19 / 377.91-377.91 / 0px` | `377.91 / 306px` | `863.41 / 230.39px` | `1273.3 / 268.8px` | `179.5 / 179.5px` |
| 2560 | `2560 / 2560 / 2560px` | `2432 / 64px` | `1366 / 597-597 / 0px` | `597 / 306px` | `1133 / 280px` | `1643 / 320px` | `230 / 230px` |

Decorative and bottom-region measurements (`x / Footer-local y / width x height`):

| Viewport | Wave | Surfboard layout rect | Copyright fluid region |
|---|---:|---:|---:|
| 1440 | `0 / 479 / 1440x83px` | `1245 / 411 / 163x163px` | `32 / 521 / 1376x10px` |
| 1920 | `0 / 479 / 1920x83px` | `1705.81 / 411 / 163x163px` | `51.19 / 521 / 1817.63x10px` |
| 2560 | `0 / 479 / 2560x83px` | `2333 / 411 / 163x163px` | `64 / 521 / 2432x10px` |

Stage 3D responsive and functional QA:

- EN `/home-v2`: HTTP `200`, document overflow `0`, full-width map, visible/unclipped links and contacts at 390, 768, 1024, 1440, 1920, and 2560;
- RU `/ru/home-v2`: HTTP `200`, document overflow `0`, full-width map, visible/unclipped links and contacts at 390, 1440, and 1920;
- map iframe remains present at every checkpoint with the original Google Maps embed URL, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`, full-width geometry, and pointer interaction surface;
- all four social links retain their original destinations and `_blank` behavior; Telegram Channel remains `https://t.me/surfdanang`;
- email remains `mailto:epicsurf@gmail.com`, phone remains `tel:+84383880164`, EN Partners remains `/partners`, and RU Partners remains `/ru/partners`;
- EN internal Footer destinations, `/partners`, `/ru/partners`, and both EN/RU rental destinations returned HTTP `200`;
- the four pre-existing RU SEO destinations `/ru/surf-lessons-danang`, `/ru/surfing-danang`, `/ru/my-khe-beach-surfing`, and `/ru/surf-guide` still return HTTP `404`; Stage 3D deliberately preserved their existing locale-aware hrefs and did not expand into forbidden routing/SEO work;
- production `/` and `/ru` return HTTP `200`, have document overflow `0`, render the default production Footer classes, and contain no `data-home-v2-footer` hook;
- source diff confirms Header, Hero, How, Lessons, Included, Rentals, Conditions, Reviews, FAQ, Events, Gallery, Messenger FAB, Booking Modal, Rental Modal, tests, assets, and `app/globals.css` were not changed by Stage 3D;
- `npm run lint` passes;
- `git diff --check` passes;
- the historical exact-geometry assertions in `tests/home-v2-footer.spec.js` now fail at the intentionally changed fixed desktop anchors and were not modified, per the stale-test constraint.

Known compromises:

- the 1440 main-group anchor moves only `0.5px` from the factual old `left:233px` to exact centering at `232.5px`;
- text/control sizes remain unchanged by design, so the 2560 composition uses a capped `1366px` group and `230px` gaps rather than stretching individual content excessively;
- the wave uses the same artwork but its repeated shape stretches with the section, so individual wave periods are narrower at 1440 and wider at 1920/2560 than the former fixed `1740px` canvas;
- the surfboard retains the approved historical `bottom:-12px` layout rect and is clipped by the Footer's existing `overflow-hidden`; its visible artwork stays inside the section and creates no document overflow;
- pre-existing RU SEO-route 404s are documented above and remain outside Stage 3D scope;
- Reviews/FAQ deferred visual issues remain untouched.

Final status: `Stage 3D complete — visually approved by user; Stage 3D.1 authorized before Stage 4`

---

### Stage 3D.1 — Header Rentals navigation

Status: **COMPLETE — VISUALLY/FUNCTIONALLY APPROVED**

Implementation record (2026-08-29):

- factual desktop and mobile/tablet navigation owner is the shared `app/components/Header.jsx`; `HomeV2Page.jsx` invokes it with `variant="homeV2"` and locale-specific `sectionHrefBase`, while the same `navItems` array feeds the desktop navigation and the animated mobile menu;
- existing Lessons, Process, Forecast, Events, and Map items use normal locale-preserving hash hrefs generated by `sectionHref(...)`; Partners remains the locale-specific `/partners` or `/ru/partners` route;
- the factual Rentals root is the existing `<section id="rentals" data-home-v2-rentals-block>` in `HomeV2LessonsRentals.jsx`; the stable anchor already existed before Stage 3D.1, so that dirty file was not edited by this stage and no wrapper or scrolling architecture was added;
- the Home V2-only Rentals item is injected immediately after Lessons through the existing `variant="homeV2"` contract and uses the existing localized `t.navRentals` value (`Rentals` / `Аренда`);
- `app/globals.css` required one factual Home V2-only desktop adjustment because the approved Stage 3A `>=1440px` nav uses absolute `nth-child` positions rather than the apparent JSX flex classes: the EN group widened from `539px` to `639px`, retained the existing approximately `41px` item rhythm, and gained one seventh position; RU uses `663px` so its existing `Для партнеров` treatment remains unclipped;
- no viewport-specific x nudges, transforms, analytics events, custom scrolling, or production selectors were added.

Exact Stage 3D.1 files changed:

- `app/components/Header.jsx`;
- `app/globals.css` (Home V2 Header selectors only);
- `tests/home-v2.spec.js` (targeted Header → Rentals coverage only; pre-existing unrelated edits preserved);
- `docs/design-experiments/home-v2/fluid-layout-plan.md`.

Final navigation order:

- EN: `LESSONS → RENTALS → PROCESS → FORECAST → EVENTS → MAP → PARTNERS`;
- RU: `УРОКИ → АРЕНДА → ПРОЦЕСС → ПРОГНОЗ → ЭВЕНТЫ → КАРТА → ДЛЯ ПАРТНЕРОВ`.

Measured EN desktop Header geometry (viewport-relative; nav group stays exactly centered):

| Viewport | Nav left / right / width before | Nav left / right / width after | Logo region → nav before / after | Nav → language before / after | Collision / clipping |
|---|---:|---:|---:|---:|---:|
| 1440 | `450.48 / 989.48 / 539px` | `400.48 / 1039.48 / 639px` | `274.23 / 224.23px` | `173.52 / 123.52px` | none |
| 1920 | `690.48 / 1229.48 / 539px` | `640.48 / 1279.48 / 639px` | `458.23 / 408.23px` | `339.11 / 289.11px` | none |
| 2560 | `1010.5 / 1549.5 / 539px` | `960.5 / 1599.5 / 639px` | `714.25 / 664.25px` | `569.5 / 519.5px` | none |

Final EN desktop item geometry (`left / right / width`):

| Viewport | Lessons | Rentals | Process | Forecast | Events | Map | Partners |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440 | `400.48 / 460.48 / 60` | `501.48 / 561.48 / 60` | `602.48 / 662.48 / 60` | `703.48 / 771.48 / 68` | `812.48 / 862.48 / 50` | `903.48 / 932.48 / 29` | `973.48 / 1039.48 / 66` |
| 1920 | `640.48 / 700.48 / 60` | `741.48 / 801.48 / 60` | `842.48 / 902.48 / 60` | `943.48 / 1011.48 / 68` | `1052.48 / 1102.48 / 50` | `1143.48 / 1172.48 / 29` | `1213.48 / 1279.48 / 66` |
| 2560 | `960.5 / 1020.5 / 60` | `1061.5 / 1121.5 / 60` | `1162.5 / 1222.5 / 60` | `1263.5 / 1331.5 / 68` | `1372.5 / 1422.5 / 50` | `1463.5 / 1492.5 / 29` | `1533.5 / 1599.5 / 66` |

RU desktop post-change geometry:

- 1440: nav `388.48 / 1051.48 / 663px`, logo-to-nav `212.23px`, nav-to-language `111.52px`;
- 1920: nav `628.48 / 1291.48 / 663px`, logo-to-nav `396.23px`, nav-to-language `277.11px`;
- all seven RU items are single-line and unclipped.

Mobile/tablet behavior and responsive QA:

- the factual animated menu in `Header.jsx` renders the same seven-item order at 390, 768, and 1024;
- open menu → click Rentals/Аренда → normal hash navigation reaches the factual `#rentals` section → the existing `setIsMenuOpen(false)` close behavior completes normally;
- EN `/home-v2` passed at 390, 768, 1024, 1440, 1920, and 2560; RU `/ru/home-v2` passed at 390, 1440, and 1920;
- every checkpoint returned HTTP `200`, document horizontal overflow `0`, a full-width unclipped Header, the correct seven labels/hrefs, the factual Rentals target, all pre-existing section anchors, the correct language href, and a working Book Now modal;
- direct EN and RU desktop clicks verified Lessons, Process, Forecast, Events, and Map hashes/targets; `/partners` and `/ru/partners` returned HTTP `200`;
- actual language-switch clicks verified `/home-v2 → /ru/home-v2` and `/ru/home-v2 → /home-v2`.

Production isolation and checks:

- `/` and `/ru` returned HTTP `200`, document overflow `0`, no `data-home-v2-header` hook, and their unchanged six-item navigation sets; neither production Header gained Rentals;
- production Book Now and language hrefs remain functional;
- targeted Playwright: `4 passed` (EN/RU desktop Rentals click plus EN/RU mobile menu order, Rentals click, target, and close state);
- `npm run lint`: pass;
- `git diff --check`: pass (line-ending warnings only, no whitespace errors);
- Hero, How It Works, Lessons, Included, Rentals, Conditions, Reviews, FAQ, Events, Gallery, Footer, Messenger FAB, Booking Modal, and Rental Modal were not changed by Stage 3D.1; Reviews/FAQ deferred issues remain untouched;
- known compromise: the centered EN desktop nav grows by exactly `100px`, reducing each adjacent clearance by `50px`; the minimum required clearance remains `123.52px` at 1440 EN and `111.52px` at 1440 RU, so no style, height, control, or frame change was needed.

Purpose:

Add a direct in-page navigation entry from the Home V2 Header to the rendered Home V2 Rentals section before the global Stage 4 responsive pass.

This is a narrow navigation enhancement, not a new layout migration or visual redesign.

Scope:

- Home V2 Header navigation only;
- both desktop and mobile/tablet navigation presentations;
- EN and RU labels/destinations;
- the actual rendered Home V2 Rentals section anchor only if a stable anchor does not already exist;
- canonical `fluid-layout-plan.md` status/report.

Required source verification before editing:

- trace the actual Home V2 Header ownership and desktop/mobile nav-item source from the current repository;
- verify how existing `LESSONS`, `PROCESS`, `FORECAST`, `EVENTS`, `MAP`, and `PARTNERS` items navigate;
- inspect the actual rendered Rentals owner in `HomeV2LessonsRentals.jsx`;
- verify whether Rentals already has a stable `id` / anchor target;
- reuse the existing navigation mechanism rather than adding a second scrolling system.

Navigation contract:

- add the new item immediately after `LESSONS`;
- EN label: `RENTALS`;
- RU label: `АРЕНДА`;
- target: the Home V2 Rentals section on the current locale page;
- this is an in-page section navigation action, not a link to `/surfboard-rental-danang` or `/ru/surfboard-rental-danang`;
- if no stable anchor exists, add the smallest possible section-local anchor, preferably `id="rentals"` on the factual Rentals section root;
- use the same href/hash/scroll behavior as the existing Home V2 section-navigation items;
- do not introduce custom JS scrolling if normal existing anchor navigation already provides the required behavior;
- preserve existing analytics behavior; do not invent a new event unless the current nav system already tracks nav-item clicks consistently.

Header visual constraints:

- preserve the approved Stage 3A Header style, strip height, logo, typography, colors, language control, and Book Now control;
- fit seven navigation items without collision or clipping;
- keep the nav composition balanced at 1440, 1920, and 2560;
- do not use viewport-specific manual x-position nudges;
- minor section-local nav width/gap adjustment is allowed only if required to accommodate the added item cleanly;
- production/default Header presentation must remain unchanged.

Mobile/tablet requirements:

- add the same Rentals item to the actual mobile/tablet Home V2 menu/navigation;
- preserve current menu open/close behavior;
- preserve item order and visual treatment;
- clicking Rentals must navigate/scroll to the Rentals section and leave the menu in the same post-click state as existing items;
- do not redesign the mobile Header/menu.

Production isolation:

- `/` and `/ru` production Header must not gain this Home V2-only experimental navigation change unless the current component architecture proves the navigation list is intentionally shared and the task can be isolated safely;
- preserve all production navigation destinations and behavior;
- do not expose `/home-v2` or `/ru/home-v2` in any public navigation, sitemap, footer, or SEO link set;
- Home V2 remains `noindex, nofollow`.

Frozen areas:

- Hero
- How It Works
- Lessons content/layout
- Included
- Rentals layout/content/CTA behavior (except the smallest stable root anchor if required)
- Conditions
- Reviews
- FAQ
- Events
- Gallery
- Footer
- Messenger FAB
- Booking Modal
- Rental Modal

Reviews/FAQ deferred visual issues remain untouched.

Required QA:

EN:
- 390
- 768
- 1024
- 1440
- 1920
- 2560

RU:
- 390
- 1440
- 1920

At every required checkpoint:

- HTTP 200
- document horizontal overflow = 0
- Home V2 Header remains visible and unclipped
- Rentals navigation item is present in the correct presentation
- label is correct for locale
- clicking the Rentals item reaches the actual Rentals section
- existing Lessons / Process / Forecast / Events / Map / Partners navigation still works
- language switch still works
- Book Now still works

Desktop measured report at 1440 / 1920 / 2560:

- complete nav-group left / right / width;
- individual nav-item labels and widths if relevant;
- minimum gap between nav group and language control;
- minimum gap between nav group and logo region;
- evidence of no collision/clipping;
- compare approved Stage 3A Header geometry before/after and explain only the minimal intentional change required by the seventh item.

Mobile/tablet report:

- identify the factual menu owner/presentation;
- show final item order;
- verify open → Rentals click → section navigation → expected menu-close behavior;
- verify EN/RU labels.

Checks:

- `npm run lint`
- `git diff --check`
- targeted Playwright/DOM checks for the new Header → Rentals navigation are allowed and preferred;
- do not repair unrelated stale exact-geometry tests;
- do not touch the Photo Break conflict.

Plan update after implementation:

Record:

- factual Header nav ownership;
- factual Rentals anchor target;
- exact files changed;
- final EN/RU item labels/order;
- desktop nav geometry before/after;
- mobile/tablet behavior;
- production isolation result;
- responsive QA;
- lint/diff checks.

Final status:

`Stage 3D.1 complete — visually/functionally approved by user; Stage 4 authorized`

**STOP after Stage 3D.1. Do not begin Stage 4 or Stage 5.**


## Stage 4 — Responsive pass

Status: **COMPLETE — VISUALLY APPROVED**

Stage 3D.1 is visually/functionally approved by the user. The section rollout is now complete. Stage 4 is the dedicated whole-page responsive polish pass before regression/test maintenance in Stage 5.

### Stage 4 purpose

Validate the current Home V2 as one complete page across the required responsive range and correct only factual visual/responsive defects.

This is **not** another design migration and **not** a broad redesign.

Stage 4 may tune already migrated sections only where the current complete-page composition proves that responsive geometry, spacing, wrapping, clipping, stacking, or visual balance is wrong.

### Important deferred debt now reopened

Reviews and FAQ were technically migrated in Stage 3B but never visually approved. Their visual corrections were intentionally deferred until after the remaining page rollout.

Stage 4 is the first stage authorized to reopen them.

For Reviews / FAQ:

- inspect the current complete-page result at every required viewport;
- identify the factual visual problems from the rendered page/current source;
- correct those problems as part of the responsive pass;
- preserve content, interactions, visual language, assets, CTA behavior, review data, accordion semantics, and section order;
- do not redesign them into new section concepts;
- report explicit before → after geometry / behavior for every correction.

Do not assume the exact defect from old screenshots. Verify the current rendered result first.

### Required source/preflight

Before edits:

- verify current branch;
- verify current HEAD;
- record `git status --short`;
- inspect the relevant current diff;
- identify the factual component/style owner before changing each problem;
- treat the latest terminal output and current repository state as authoritative.

Expected branch remains:

`design/home-v2-poster-collage`

If the branch is different, STOP.

The working tree is already dirty. Do not discard or normalize unrelated work.

Never use:

- `git stash`;
- `git reset`;
- `git restore`;
- `git clean`;
- automatic branch switching;
- `git add -A`.

### Required viewport matrix

Primary EN route:

- 390
- 768
- 1024
- 1440
- 1920
- 2560

RU route:

- 390
- 768
- 1024
- 1440
- 1920
- 2560

Use a consistent viewport height where practical.

The goal is not merely `overflow = 0`. Stage 4 is a visual/responsive pass.

### Whole-page audit order

Audit the rendered complete page in this exact order:

1. Header
2. Hero
3. How It Works
4. Lessons
5. Included
6. Rentals
7. LiveCam
8. Forecast
9. Reviews
10. FAQ
11. Events
12. Gallery
13. Footer
14. Messenger FAB
15. Booking Modal
16. Rental Modal

Photo Break remains intentionally not rendered and is outside Stage 4.

### What to inspect in every visible section

At each relevant viewport verify:

- horizontal overflow;
- accidental internal overflow;
- clipped text;
- clipped controls / CTAs;
- headings colliding with content;
- text too small or disproportionately large for the surface;
- bad line wrapping;
- overly long prose measures;
- card/panel height mismatches;
- image crop regressions;
- poster rotations crossing unrelated content;
- decorations covering functional content;
- accidental large empty zones caused by fixed height;
- section-to-section overlap;
- section-to-section spacing that becomes visually broken at a breakpoint;
- bad centering / left-right imbalance;
- mobile content requiring horizontal scrolling;
- desktop composition accidentally reused on mobile;
- tablet layouts that feel like broken desktop or oversized mobile;
- overly large ultrawide expansion;
- modal viewport clipping;
- FAB collision with primary controls/footer;
- Header mobile-menu fit and close behavior.

### Preserve approved design anchors

The following were already visually approved and should be treated as baseline, not casually redesigned:

- Stage 2A Hero;
- Stage 2B.1 Lessons;
- Stage 2C.1 Rentals;
- Stage 2C Conditions;
- Stage 3A Header;
- Stage 3A.2 How / Included;
- Stage 3C Events / Gallery;
- Stage 3D Footer;
- Stage 3D.1 Header Rentals navigation.

If one of these needs a Stage 4 correction, first prove the responsive defect in the current rendered page and make the smallest section-local change that fixes it.

Do not globally rescale previously approved desktop compositions just for visual uniformity.

### Responsive intent by range

#### Mobile — 390

- one-column reading flow where appropriate;
- no fixed desktop canvas dependence;
- no horizontal scrolling;
- controls comfortably tappable;
- text remains readable without excessive shrinking;
- poster/collage character may remain, but must not obscure content;
- menu, booking, rental and accordion interactions must remain usable.

#### Tablet — 768 / 1024

Treat these as real layouts, not merely interpolation between mobile and desktop.

Verify:

- grid transitions;
- two-column / stacked decisions;
- section heights;
- text wrapping;
- navigation/menu behavior;
- utility panel sizing;
- Events/Gallery composition;
- Footer columns;
- no awkward half-desktop geometry.

Only change breakpoints where the current rendered result proves the breakpoint is wrong.

#### Desktop anchor — 1440

- preserve the approved visual character;
- Stage 4 should mainly catch joins, wrapping, clipping, full-page rhythm and regressions created by later stages;
- do not use 1440 cleanup as an excuse to redesign approved sections.

#### Wide desktop — 1920 / 2560

Verify:

- controlled use of available width;
- no isolated narrow 1440 artboard regression;
- no uncontrolled oversized cards/panels;
- readable text measures;
- balanced gutters;
- correct full-bleed media;
- preserved image registration/crops;
- controlled decorations and poster silhouettes.

### Reviews specific checks

Because visual approval was deferred, inspect especially:

- complete three-card composition width and scale;
- quote typography relative to card size;
- quote/name/date vertical rhythm;
- equal-height surfaces;
- excessive empty card area on ultrawide;
- trust/rating + Google Maps CTA relationship;
- bridge illustration placement and opacity;
- transition from Conditions into Reviews;
- transition from Reviews into FAQ;
- EN/RU wrapping.

Do not change review content or Google Maps destination.

### FAQ specific checks

Inspect especially:

- relationship between FAQ heading/illustration and accordion;
- total composition centering/balance;
- question typography;
- plus control alignment;
- row padding / separators;
- longest EN/RU questions;
- open-answer spacing;
- natural section-height expansion;
- transition into Events;
- no answer clipping or overlap.

Preserve:

- button semantics;
- `aria-expanded`;
- `aria-controls`;
- single-open-item behavior;
- existing copy.

### Functional smoke checks during Stage 4

Do not run the entire Stage 5 regression suite yet, but verify affected behavior while checking layout:

- Header navigation including Rentals;
- language switch;
- Book Now;
- all five lesson states;
- booking lesson CTA;
- Surf-skate / Line-up actions;
- rental catalog CTA;
- rental modal;
- LiveCam/provider actions;
- Conditions messenger CTA;
- Forecast iframe presence;
- Reviews Google Maps CTA;
- every FAQ item open/close;
- all four Events gallery actions;
- all five Gallery filters;
- Footer primary links/contact/social actions;
- Messenger FAB.

### Production isolation

Home V2 remains an experiment.

Keep unchanged:

- `/`;
- `/ru`;
- production Header/Footer presentation;
- public routing;
- canonicals;
- sitemap;
- robots behavior;
- analytics / attribution contract.

`/home-v2` and `/ru/home-v2` remain hidden `noindex, nofollow` routes.

Do not add them to public navigation or sitemap.

### Allowed Stage 4 edits

Change only files that factually own a verified responsive defect.

Likely owners may include:

- `app/components/Header.jsx` only for Home V2 variant-specific responsive defects;
- `app/components/home-v2/HomeV2Page.jsx`;
- `app/components/home-v2/HomeV2Footer.jsx`;
- `app/components/home-v2/sections/HomeV2Hero.jsx`;
- `app/components/home-v2/sections/HomeV2ContentSections.jsx`;
- `app/components/home-v2/sections/HomeV2LessonsRentals.jsx`;
- `app/components/home-v2/sections/HomeV2Conditions.jsx`;
- Home V2-scoped rules in `app/globals.css`.

Do not edit a file merely because it is in this list.

Before edits, state the exact defect → factual owner → intended smallest correction.

### Test-file rule

Stage 4 may add or adjust narrowly targeted responsive assertions for defects it actually fixes.

Do **not** perform broad historical test cleanup here.

Existing stale exact-geometry expectations from pre-migration stages and the Photo Break contradiction remain Stage 5 work unless a targeted Stage 4 correction directly requires one assertion to be updated.

### Screenshot / visual QA rule

Use browser screenshots only as QA evidence.

Do not commit them.

Prefer targeted section screenshots for actual changed areas rather than generating a huge redundant screenshot set.

At minimum, visually review the complete EN page at all six widths.

For every Stage 4-modified section, also visually check RU at the widths where translation length is most likely to matter.

Automated DOM measurements do not replace visual review.

### Stage 4 acceptance criteria

- [x] EN 390 passes visual + technical responsive review
- [x] EN 768 passes visual + technical responsive review
- [x] EN 1024 passes visual + technical responsive review
- [x] EN 1440 passes visual + technical responsive review
- [x] EN 1920 passes visual + technical responsive review
- [x] EN 2560 passes visual + technical responsive review
- [x] RU 390 passes
- [x] RU 768 passes
- [x] RU 1024 passes
- [x] RU 1440 passes
- [x] RU 1920 passes
- [x] RU 2560 passes
- [x] document horizontal overflow = 0 everywhere
- [x] no clipped CTAs/controls
- [x] no text clipping
- [x] no section overlap
- [x] mobile/menu interactions usable
- [x] tablet compositions intentional
- [x] 1440 approved character preserved
- [x] ultrawide compositions remain controlled
- [x] Reviews visual debt resolved and ready for user review
- [x] FAQ visual debt resolved and ready for user review
- [x] production `/` and `/ru` remain unchanged
- [x] Home V2 SEO isolation remains unchanged
- [x] `npm run lint` passes
- [x] `git diff --check` passes

### Required Stage 4 report

Report:

1. branch + HEAD;
2. initial `git status --short`;
3. exact responsive audit findings by viewport;
4. exact defects chosen for correction;
5. exact files changed;
6. each correction: cause → change → before/after;
7. Reviews before/after;
8. FAQ before/after;
9. approved sections that required no change;
10. EN viewport QA results;
11. RU viewport QA results;
12. interaction smoke results;
13. production isolation result;
14. `npm run lint`;
15. `git diff --check`;
16. final `git status --short`;
17. known remaining visual compromises;
18. explicit confirmation that Photo Break was not restored;
19. explicit confirmation Stage 5 was not started.

Update this canonical plan with the verified Stage 4 result.

Final status:

`Stage 4 complete — awaiting user visual approval before Stage 5`

### Stage 4 verified result — 2026-08-29

#### Preflight and scope

- Branch: `design/home-v2-poster-collage`.
- HEAD at Stage 4 start: `905b5e1e8475201222a2402125ada878ce481236`.
- Initial dirty tree was preserved exactly as found. `git status --short` contained modified Home V2 rollout files (`Header.jsx`, `HomeV2Footer.jsx`, Conditions, ContentSections, Hero, Lessons/Rentals, `globals.css`, package files and `tests/home-v2.spec.js`) plus existing untracked design-lab, QA, screenshot, test-result and temporary artifacts. No stash, reset, restore, clean, branch switch or broad staging was used.
- Stage 4 changed only the factual owners of verified Reviews/FAQ defects: `app/components/home-v2/sections/HomeV2ContentSections.jsx`, `public/design/home-v2/reviews/surf-family-bridge-full-v2.svg`, and `public/design/home-v2/faq/faq-illustration.svg`, plus this canonical plan.

#### Whole-page responsive audit

- EN 390: intentional one-column composition; no horizontal overflow or clipped controls. Verified defect: the mobile Reviews composition omitted its section heading; FAQ heading contrast was too weak.
- EN 768: intentional tablet stacking and grids; no overflow, clipping, collision or bad half-desktop geometry. Only the same Reviews/FAQ debt applied.
- EN 1024: intentional tablet/compact-desktop composition; no overflow or clipping. FAQ illustration was present but visually too faint.
- EN 1440: approved desktop character and section joins remained intact; no overflow or clipping. Reviews quote metadata was at the low end of acceptable scale and both reopened illustrations were too faint.
- EN 1920: no overflow. Verified Reviews defect: cards widened while the quote measure/type remained effectively narrow and small, creating excessive empty surface; trust/CTA spacing was disconnected.
- EN 2560: no overflow. The same Reviews imbalance became strongest; the bridge needed a controlled width cap to avoid touching the third card. The apparent partial Rentals image in one tiled full-page capture was disproved by targeted DOM/viewport inspection: both scene layers rendered at full section width.
- RU 390/768/1024/1440/1920/2560: no horizontal overflow, clipped controls, clipped review copy or FAQ answers. Longer RU questions wrap naturally; the same factual Reviews/FAQ fixes improve both locales without locale-specific redesign.

#### Corrections: cause → change → verified before/after

- Mobile EN Reviews: the dedicated mobile renderer never rendered the supplied title → passed and rendered the existing localized Reviews title and moved the unchanged card/rating/CTA composition down by 72 px → heading is now present at 390, section height grows from 853 px to 925 px, with no overlap or overflow.
- Desktop Reviews typography: card width expanded from 355 px at 1440 to 424 px at 1920 and 509 px at 2560 while the quote stayed approximately 15 px in a 320 px measure → quote measure now scales to 440 px, EN quote size scales 16–21 px, RU 15–19 px, and name/date/divider rhythm scales within the same cards → at 2560 the EN quote measures about 437 px at 21 px (RU 19 px), filling the 509 px cards without clipping; 1440 remains controlled at about 16 px.
- Reviews lower composition: the trust block and Google Maps CTA were separated by an oversized 96–152 px gap → reduced the responsive gap to 48–96 px → CTA reads as part of the trust unit while preserving destination and content.
- Reviews bridge: the asset's internal artwork opacity was `0.1`, making it nearly invisible, and uncapped ultrawide scaling could contact a review card → raised only the internal group opacity to `0.24` and capped rendered width at 397 px → illustration is legible and remains clear of the 2560 card row.
- FAQ heading/illustration: EN mobile/adaptive headings used low-contrast gray on the dark surface and the SVG artwork also used internal opacity `0.1` → changed those headings to the existing white token and the SVG internal opacity to `0.24` → heading and illustration are legible at all ranges without changing accordion geometry, copy or semantics.

#### Preserved approved sections

Header, Hero, How It Works, Lessons, Included, Rentals, LiveCam, Forecast/Conditions, Events, Gallery, Footer, Messenger FAB, Booking Modal and Rental Modal required no Stage 4 layout change. Their approved design anchors, copy, ordering, media crops and behavior were preserved. Photo Break remains intentionally absent.

#### QA and interaction verification

- Complete visual EN review passed at 390, 768, 1024, 1440, 1920 and 2560; complete visual RU review passed at the same six widths.
- At every width, document `scrollWidth === clientWidth`; no clipped text/CTA/control, section overlap, unintended horizontal scrolling or uncontrolled ultrawide expansion was found after correction.
- Reviews desktop cards remain equal-height at 220 px; mobile/RU card content is unclipped. FAQ longest EN/RU questions and open answers fit naturally.
- Header Rentals navigation, language switch, Header Book Now, all five lesson states, lesson booking CTA, Surf-skate/Line-up WhatsApp actions, rental catalog and rental modal were exercised.
- Windy/provider presence, live-cam/provider links, Conditions WhatsApp CTA, Forecast iframe, Reviews Google Maps CTA, every FAQ item open/close, all four Events→Gallery actions, all five Gallery filters, Footer primary/contact/social links and Messenger FAB links were verified.
- FAQ retains button semantics, `aria-expanded`, `aria-controls`, single-open behavior and close-on-second-click. Each Events action selected its matching Gallery filter; every filter produced five visible images.
- At 390 the mobile menu opens/closes with Rentals present. Booking modal measured 359 × 717 px within the 375 × 844 layout viewport; rental modal card measured about 345 × 599 px within the same viewport. No modal clipping or FAB collision was found.
- External-provider compromise: Windy rendered; the Da Nang Surf Cam iframe can refuse embedding from localhost while its preview, attribution and direct provider actions remain usable. This is provider policy, not responsive layout failure.

#### Production isolation and checks

- `/` and `/ru` render their production pages with `index, follow`, no Home V2 root/header markers and no horizontal overflow.
- `/home-v2` and `/ru/home-v2` retain `noindex, nofollow`; no production route, canonical, sitemap, robots or public-navigation change was made.
- `npm run lint`: PASS.
- `git diff --check`: PASS (only existing line-ending warnings were emitted).
- Known remaining compromise: third-party iframe live content depends on provider embedding/availability; no unresolved Stage 4-owned visual defect remains.
- Photo Break was not restored.
- Stage 5 was not started; no broad historical test maintenance or regression-suite work was performed.

### Mandatory Stage 4 stop

**STOP after Stage 4.**

Do not begin:

- Stage 5 regression / historical test maintenance;
- production rollout;
- merge to `main`;
- route replacement;
- Photo Break restoration;
- unrelated redesign / copy work.

Wait for user visual approval of the final responsive Home V2 page.

---

## Stage 5 — Regression / QA

Status: **COMPLETE — AWAITING USER REVIEW BEFORE PRODUCTION-ROLLOUT PLANNING**

Stage 4 has been visually approved by the user. The current Home V2 presentation is now the frozen visual baseline for regression work.

Stage 5 is a **test/regression maintenance phase**, not a design phase.

### Stage 5 purpose

Bring the Home V2 automated regression suite into alignment with the now-approved fluid implementation and prove that the final Home V2 experiment is technically stable before any production-rollout decision.

The current rendered UI should be treated as approved unless a failing test reveals a genuine functional/runtime regression.

### Hard freeze

Do not redesign or visually polish:

- Header;
- Hero;
- How It Works;
- Lessons;
- Included;
- Rentals;
- LiveCam;
- Forecast / Conditions;
- Reviews;
- FAQ;
- Events;
- Gallery;
- Footer;
- Messenger FAB;
- Booking Modal;
- Rental Modal.

Do not change layout merely to satisfy an old exact-geometry assertion.

If a test encodes retired pre-fluid geometry, update the test to the approved implementation.

If a test exposes a real regression, identify it explicitly as a **real source regression** before changing application code.

### Required preflight

Before any changes:

- verify current branch;
- verify current HEAD;
- record `git status --short`;
- inspect relevant diffs;
- enumerate factual Home V2 test files currently present in `tests/`;
- inspect current npm scripts relevant to lint/build/test.

Expected branch:

`design/home-v2-poster-collage`

If branch differs, STOP.

The repository is already dirty. Preserve all existing work.

Never use:

- `git stash`;
- `git reset`;
- `git restore`;
- `git clean`;
- automatic branch switching;
- `git add -A`.

Do not delete existing untracked QA/design files merely to obtain a clean status.

### Known stale-test debt to resolve

Stage 5 must inspect and resolve the already documented stale regression expectations rather than blindly preserving them.

Known areas include:

1. **Pre-fluid exact geometry in `tests/home-v2.spec.js`**
   - older assertions may still encode geometry/data labels from before approved Stage 3A/Stage 4;
   - update only assertions proven stale against the approved implementation;
   - prefer behavior/invariant assertions over brittle pixel snapshots where exact geometry is no longer a product contract.

2. **Footer exact geometry**
   - `tests/home-v2-footer.spec.js` historically expected the retired fixed desktop Footer anchors such as the old `left:233px` and fixed decorative wave geometry;
   - update those expectations to validate the approved fluid Footer contract instead of reverting application code.

3. **Photo Break contradiction**
   - Photo Break is intentionally **not rendered** in the approved Home V2 composition;
   - remove/update any stale assertion that expects the removed Photo Break asset/section;
   - retain a clear regression assertion that Photo Break is absent if such coverage is useful;
   - do **not** restore Photo Break to make a historical test pass.

Do not assume these are the only stale tests. Classify every failure from the factual current suite.

### Failure classification rule

For every failing test, classify it before editing:

- **A — stale expectation:** test represents retired/pre-fluid geometry or removed behavior → update test only;
- **B — real regression:** approved current behavior/functionality is actually broken → minimally fix source, then update/add regression coverage;
- **C — environment/external provider:** failure depends on localhost iframe/provider/network policy → make test resilient to the factual contract without pretending external content is guaranteed;
- **D — unrelated/pre-existing:** outside Home V2 Stage 5 scope → report; do not repair opportunistically.

No test should be made green by weakening it into a meaningless assertion.

### Test-design direction

Prefer durable contracts such as:

- route renders successfully;
- correct section exists;
- correct EN/RU labels;
- correct anchor/href;
- no horizontal overflow at contract widths;
- composition remains centered within a small tolerance where centering is an approved invariant;
- controlled max/min ranges rather than one historical pixel coordinate where fluid growth is intentional;
- cards/items/count/order are correct;
- modal opens/closes;
- correct booking/rental/provider destination;
- accordion ARIA/state behavior;
- Gallery filter state/content;
- production isolation;
- Home V2 `noindex, nofollow`;
- production `/` and `/ru` remain indexable;
- hidden Home V2 routes remain outside public production navigation/sitemap.

Use exact pixel assertions only where the approved plan explicitly treats that value as a stable contract.

### Required viewport regression matrix

At minimum cover the approved responsive anchors:

EN `/home-v2`:

- 390
- 768
- 1024
- 1440
- 1920
- 2560

RU `/ru/home-v2`:

- 390
- 768
- 1024
- 1440
- 1920
- 2560

Do not create huge redundant tests for every property at every width. Use a compact matrix plus targeted section checks.

### Required functional regression coverage

Verify factual current behavior for:

- Home V2 Header navigation;
- `RENTALS` / `АРЕНДА` → `#rentals`;
- mobile menu open → navigation → close;
- language switch;
- Book Now modal;
- all five lesson states;
- group/split/private booking destinations;
- Surf-skate / Line-up messaging actions;
- Rentals catalog destination;
- Rental modal;
- LiveCam preview/attribution/direct-provider actions;
- Conditions messenger CTA;
- Forecast iframe presence;
- Reviews Google Maps CTA;
- all FAQ controls and ARIA state;
- Events → corresponding Gallery filter;
- all five Gallery filters;
- Footer internal/SEO/contact/social/partner links;
- Messenger FAB;
- booking/rental modal close behavior.

For third-party iframe content, test the owned integration surface and provider links/attributes. Do not require localhost to successfully render provider-controlled embedded live content if the provider can block it.

### Routing / SEO isolation regression

Verify:

- `/home-v2` HTTP 200;
- `/ru/home-v2` HTTP 200;
- both remain `noindex, nofollow`;
- `/` HTTP 200;
- `/ru` HTTP 200;
- production pages remain indexable according to current production contract;
- production Header does not gain the Home V2-only Rentals nav item;
- production Footer remains the production Footer;
- Home V2 routes are not exposed in public navigation;
- Home V2 routes are not added to sitemap.

Do not expand Stage 5 into fixing unrelated historical RU SEO-route 404s documented earlier unless the current Home V2 regression suite legitimately owns one and the user explicitly authorizes routing work.

### Required commands

First inspect the factual Home V2 test inventory.

Then run the relevant targeted suites.

At minimum:

```bash
npm run lint
npx playwright test tests/home-v2.spec.js
```

If `tests/home-v2-footer.spec.js` still exists, include it in the Home V2 regression run.

Run any other factual `home-v2`-specific test file found during preflight if it belongs to the active implementation.

After test maintenance, rerun the complete factual Home V2 test set, not just the previously failing cases.

Also run:

```bash
git diff --check
```

If the repository provides a normal production build script, run:

```bash
npm run build
```

Do not change application behavior merely to work around a build environment issue; classify and report it.

### Browser verification after automated suite

After all Stage 5 tests are green, perform a concise final browser smoke:

- EN 390;
- EN 1440;
- EN 2560;
- RU 390;
- RU 1440;
- RU 2560.

Verify:

- render;
- overflow;
- Header;
- Lessons;
- Rentals;
- Conditions;
- Reviews;
- FAQ;
- Events/Gallery;
- Footer;
- modal/FAB access.

This is regression confirmation, not another visual-polish iteration.

### Allowed Stage 5 edits

Primary expected edits are test files and this canonical plan.

Application/source files may change only for a proven **real regression**.

Likely test owners may include:

- `tests/home-v2.spec.js`;
- `tests/home-v2-footer.spec.js`;
- other factual Home V2-specific test files discovered during preflight.

Do not edit tests unrelated to Home V2 merely because the repository is dirty.

### Acceptance criteria

- [x] factual Home V2 test inventory recorded
- [x] every failing assertion classified
- [x] stale pre-fluid expectations updated
- [x] Photo Break contradiction resolved in favor of the approved absent section
- [x] Footer stale fixed-coordinate expectations updated
- [x] no approved UI reverted to satisfy old tests
- [x] EN/RU Home V2 routes pass regression checks
- [x] required responsive anchors retain zero document horizontal overflow
- [x] Header/Rentals navigation passes
- [x] lesson states/actions pass
- [x] rental flow passes
- [x] Conditions integration surfaces pass
- [x] Reviews CTA passes
- [x] FAQ ARIA/interaction passes
- [x] Events/Gallery relationship and filters pass
- [x] Footer links/actions pass
- [x] modal/FAB behavior passes
- [x] production isolation passes
- [x] Home V2 noindex/sitemap isolation passes
- [x] complete factual Home V2 Playwright set passes
- [x] `npm run lint` passes
- [x] `git diff --check` passes
- [x] `npm run build` passes, or a factual environment reason is documented
- [x] final browser smoke passes
- [x] Photo Break remains not rendered
- [x] no production rollout performed

### Verified Stage 5 result — 2026-08-29

- Preflight confirmed branch `design/home-v2-poster-collage` at `905b5e1e8475201222a2402125ada878ce481236`; the existing dirty working tree was preserved.
- The factual suite contained 18 Home V2 spec files. The approved contracts were consolidated around responsive invariants and behavior rather than retired fixed coordinates.
- Initial failures were classified before maintenance: 84 stale/pre-fluid assertions across the main and section suites; one screenshot timeout and provider-controlled iframe/network behavior were classified as environment/external-provider issues; no real application regression and no unrelated failure requiring repair were found.
- `tests/home-v2.spec.js` now covers the EN/RU 390/768/1024/1440/1920/2560 matrix, zero horizontal overflow, Header navigation, language/mobile behavior, booking and rental flows, five lesson states, provider integration surfaces, Reviews, FAQ, Events/Gallery, Footer/FAB, noindex, sitemap, and production isolation.
- Footer coverage now validates the approved fluid full-bleed/centered contract at 1440 and 2560 instead of retired exact anchors.
- The Photo Break contradiction was resolved by asserting that the retired section is absent. Photo Break was not restored.
- Provider tests validate owned iframe URLs, attribution, fallback links, and CTAs without requiring localhost to render provider-controlled content.
- Final complete factual Playwright run: **79 passed (2.4m)**.
- `npm run lint`: **passed**.
- `npm run build`: **passed**; all 20 static pages generated successfully.
- `git diff --check`: **passed**.
- Final production-browser smoke passed for EN and RU at 390, 1440, and 2560. No redesign or new responsive polish was performed.
- `/home-v2` and `/ru/home-v2` remain hidden `noindex, nofollow` experiment routes; `/` and `/ru`, public navigation, sitemap, and canonical production ownership were not changed.
- No merge to `main`, route replacement, sitemap change, or production rollout was performed.

### Required Stage 5 report

Report:

1. branch + HEAD;
2. initial `git status --short`;
3. factual Home V2 test-file inventory;
4. exact commands run;
5. initial failures;
6. classification of every failure: stale / real regression / provider / unrelated;
7. exact files changed;
8. stale `home-v2.spec.js` expectations updated;
9. Footer-test maintenance result;
10. Photo Break test resolution;
11. any actual source regression found and fixed;
12. final complete Playwright result;
13. EN/RU responsive regression result;
14. functional regression result;
15. routing/SEO/production-isolation result;
16. `npm run lint`;
17. `npm run build`;
18. `git diff --check`;
19. final browser smoke;
20. final `git status --short`;
21. remaining known external/environment compromises;
22. explicit confirmation that approved visual layout was not redesigned;
23. explicit confirmation that Photo Break was not restored;
24. explicit confirmation that no production rollout / merge to `main` was performed.

Update this canonical plan with verified Stage 5 results.

Final status:

`Stage 5 complete — awaiting user review before production-rollout planning`

### Mandatory Stage 5 stop

**STOP after Stage 5.**

Do not:

- merge to `main`;
- replace `/` or `/ru`;
- expose Home V2 routes publicly;
- change sitemap/canonical production ownership;
- deploy production rollout;
- restore Photo Break;
- perform unrelated cleanup/refactor.

Wait for explicit user approval before any production-rollout plan.

---

## 14. Decision log

Add concise verified decisions here as the project progresses.

### 2026-08-28

- Fluid-layout project initiated.
- Functionality remains unchanged.
- Section order remains unchanged for this project phase.
- Figma is not part of the initial workflow.
- First step is source-based layout audit, not implementation.
- Work remains isolated to Home V2.
- Stage 0 source and DOM baseline audit completed at 390, 768, 1024, 1440, 1920, and 2560.
- Root cause verified as a combination of a repeated 1280px adaptive cap, fixed 1440px desktop canvases, and narrower section-local geometry.
- Current rendered utility owner is `HomeV2Conditions.jsx`; `HomeV2UtilitySections.jsx` is not in the Home V2 composition.
- Photo Break is not rendered in the current composition and requires confirmation before future planning.
- No layout implementation was performed; Stage 1 remains blocked pending review.
- Stage 1 approval received; the layout foundation was implemented without connecting any existing section to it.
- The future fluid gutter keeps the existing `16/24/32px` anchors and uses `clamp(32px, calc(4vw - 25.6px), 64px)` from 1440px upward; this gives large displays useful room without recreating a large centered margin.
- The shared grid contract is one mobile track, 8 tablet columns from 640px, and 12 desktop columns from 1200px, all using `minmax(0, 1fr)`.
- Readable nested content uses a `68ch` maximum measure; compact decision panels and CTA groups remain section-specific.
- Existing fixed artboards, section geometry, visual composition, and functionality were intentionally left untouched.
- Stage 1 foundation reviewed and approved for Pilot.
- Stage 2A activated: Hero is the only section authorized for migration before the next visual checkpoint.
- Stage 2A migrated only the desktop Hero geometry: media is full bleed and controlled content uses the approved fluid frame and 12-column grid.
- The 1440 visual anchor remains close to the approved composition; 1920 and 2560 now use the full viewport for media and redistribute the fixed-size content zones through fluid grid spans.
- Mobile/tablet branches, Header, every later section, functionality, copy, assets, shader behavior, routing, and SEO remain unchanged.
- Stage 2A Hero migration was visually reviewed and approved by the user.
- Stage 2B activated: Lessons is the only section authorized for migration before the next checkpoint.
- The active planning document is restored to the canonical `docs/design-experiments/home-v2/fluid-layout-plan.md` path.
- Stage 2B migrated only desktop Lessons geometry onto the approved fluid frame/grid; selector and info remain controlled while media and composition gaps grow at 1920/2560.
- All five lesson states, prices, photos, CTAs, EN/RU rendering, booking/modal behavior, and WhatsApp actions remain functional.
- Stage 2B technical migration completed, but user visual review identified a rightward horizontal-balance issue on wide screens.
- Stage 2B.1 activated to correct only Lessons horizontal balance before Stage 2C.
- Stage 2B.1 now centers the complete selector/gap/detail group and caps the gap at `240px`; measured composition center offset is effectively `0px` at 1440, 1920, and 2560.
- Stage 2B.1 technical QA completed for all required EN/RU widths and lesson actions.
- Stage 2B.1 was visually reviewed and approved by the user.
- Stage 2C activated: Rentals and the actual rendered Conditions (`LiveCam + Forecast`) are the only sections authorized for migration before the full Pilot review.
- Stage 2C moved Rentals media to full bleed while keeping its intro and transactional offer controlled inside the approved fluid frame.
- Stage 2C moved the rendered Conditions pair to a centered, bounded two-panel composition with preserved media aspects and a controlled gap.
- Stage 2C technical QA completed for all required EN/RU widths, rental modal, LiveCam/provider actions, Forecast, and conditions WhatsApp behavior.
- User visual review did not approve Rentals because the independently responsive color/B&W crops lost spatial registration on wide viewports.
- Stage 2C.1 restored one shared 16:9 scene coordinate system for both Rentals media layers while retaining the Stage 2C full-bleed composition.
- Stage 2C.1 technical QA completed; Conditions and all other sections remained untouched.
- Stage 2C.1 was visually reviewed and approved by the user.
- The complete Pilot (Hero, Lessons, Rentals, Conditions) is now approved.
- Stage 3A activated: Header, How It Works, and Included are the only sections authorized for the next rollout checkpoint.
- Stage 3A visual review approved the Home V2 Header.
- Stage 3A.1 activated before Stage 3B to enlarge/rebalance How cards and restore the Included BOARD feature's approved scale/position.
- Stage 3A.1 visual review approved the How card/group scale and the restored BOARD geometry.
- Stage 3A.2 activated to increase How card typography/container capacity and remove the Included message/marquee vertical collision.
- Stage 3A.2 increased only desktop/ultrawide How typography and the title/body layout capacity while preserving the Stage 3A.1 horizontal geometry and mobile/tablet branches.
- The Included collision was traced to a fixed-height section plus an absolutely bottom-positioned marquee; the marquee now follows the message in normal flow inside a `700px` desktop minimum height.
- Stage 3A.2 technical QA completed for every required EN/RU viewport with zero overflow, zero How clipping, equal card heights, and zero Included message/marquee overlap.
- Stage 3A.2 was visually reviewed and approved by the user.
- Stage 3A is now fully approved.
- Stage 3B (Reviews + FAQ) was authorized as the next checkpoint and started from this canonical plan.
- Stage 3B migrated desktop/ultrawide Reviews to a centered `1150-1640px` three-card group with controlled gaps, bounded prose, a section-local trust/CTA row, and a fluid bridge anchor.
- Stage 3B migrated desktop/ultrawide FAQ to one centered illustration/accordion composition, capped the accordion at `760px`, enabled safe question wrapping, and changed open answers to natural vertical flow.
- Stage 3B EN/RU responsive and accordion interaction QA passed at every required viewport with HTTP 200, zero horizontal overflow, and no clipping/overlap.
- Existing pre-Stage-3A exact-geometry tests remain stale and were intentionally left untouched.
- Stage 3B technical implementation completed.
- User visual review identified remaining Reviews/FAQ issues, but chose to defer those corrections and continue the rollout.
- Reviews/FAQ are frozen during Stage 3C and will be reopened only in a dedicated later correction checkpoint.
- Stage 3C (Events + Gallery) is authorized as the next rollout step.
- Stage 3C migrated Events to a centered fluid editorial poster grid and Gallery to a fluid capped mosaic while preserving all event/gallery interactions.
- Stage 3C technical QA passed for required EN/RU viewports with zero horizontal overflow.
- Stage 3C was visually reviewed and approved by the user.
- Stage 3D (Footer) is authorized as the final section-rollout checkpoint before Stage 4.
- Reviews/FAQ deferred visual issues remain frozen during Stage 3D.
- Stage 3D Footer was visually reviewed and approved by the user.
- Before Stage 4, a narrow Stage 3D.1 navigation enhancement was authorized: add `RENTALS` / `АРЕНДА` to the Home V2 Header desktop and mobile navigation and target the rendered Rentals section.
- Stage 3D.1 must remain isolated to Home V2 navigation plus the smallest Rentals anchor change if required; production Header, routing/SEO, and deferred Reviews/FAQ fixes remain out of scope.
- Stage 3D.1 reused the shared Header's existing Home V2 variant, localized nav data, hash navigation, and mobile close behavior; the pre-existing `#rentals` section anchor required no edit.
- Stage 3D.1 responsive, navigation, production-isolation, targeted Playwright, lint, and diff checks passed; it is complete and awaiting user visual/functional approval.
- Stage 4 remained blocked until Stage 3D.1 received user visual/functional approval.
- Stage 3D.1 was visually/functionally reviewed and approved by the user.
- Stage 4 is now authorized as one whole-page responsive polish pass before Stage 5.
- Stage 4 explicitly reopens the deferred Stage 3B Reviews/FAQ visual debt, but only for verified visual/responsive corrections rather than redesign.
- Photo Break remains not rendered and outside Stage 4.
- Stage 4 responsive pass was visually reviewed and approved by the user.
- The deferred Stage 3B Reviews/FAQ visual debt is considered resolved by the approved Stage 4 corrections.
- Stage 5 is authorized as regression/test maintenance only; the approved Home V2 visual presentation is frozen.
- Stage 5 must resolve stale pre-fluid test expectations, including Footer geometry and the Photo Break contradiction, without restoring retired UI or redesigning approved sections.
- Stage 5 regression / QA is complete: the 18-file factual Home V2 suite passes 79 tests, lint/build/diff checks pass, and the six-anchor EN/RU browser smoke confirms the frozen approved layout.
- No real source regression was found; Stage 5 changed test contracts and this canonical plan only, kept Photo Break absent, and performed no production rollout.

---

# STAGE 5.1 — ZOOM / REFLOW BREAKPOINT CORRECTION

## Factual cause

The user-reported 175% → 200% Chrome zoom regression was reproduced as a CSS layout-viewport breakpoint change, not as a browser-zoom API problem. On a nominal 2560px display the useful equivalent widths are approximately `1463px` at 175% and `1280px` at 200%; the factual boundary was the existing `1439 ↔ 1440` ownership switch.

Before correction:

- Hero kept desktop, adaptive, and mobile renderers mounted and CSS hid the approved desktop renderer below `1440px`;
- Lessons used `matchMedia("(min-width: 1440px)")` and mounted a different adaptive JSX renderer below the breakpoint;
- Events and Gallery used one JSX tree, but their approved editorial card, CTA-surface, filter, and mosaic treatments were gated almost entirely by `min-[1440px]`, exposing the retired generic card/grid presentation below it;
- the same factual ownership defect existed in Rentals, Included, Reviews, and FAQ: their approved Stage 2C/3A/3B owners were selected only at `>=1440px` while older adaptive branches appeared through `1024–1439px`.

The audit classified Header, How It Works, Conditions, and Footer as safe. They keep one current visual system across compact desktop; Conditions' `1200px` two-panel fit threshold remains intentional.

No zoom detection, `CSS zoom`, fixed 1440px canvas, horizontal scrolling, transform scaling, global breakpoint replacement, or viewport-specific JS nudge was introduced.

## Files changed in Stage 5.1

- `app/components/home-v2/sections/HomeV2LessonsRentals.jsx`
- `app/components/home-v2/sections/HomeV2ContentSections.jsx`
- `app/globals.css`
- `tests/home-v2-responsive-ownership.spec.js`
- `docs/design-experiments/home-v2/fluid-layout-plan.md`

The other dirty working-tree files predate Stage 5.1 and were preserved.

## New responsive ownership and section strategy

- Hero: the approved EPIC lockup / benefits / full-bleed video / shader owner now owns widths from `900px`; compact desktop uses the same 12-track relationship with bounded lockup and benefits widths. The approved `>=1440px` geometry remains unchanged.
- Lessons: one current selector/detail renderer owns `>=900px`. At `900–1199px` it stacks the complete approved selector and full photo/info/price/features/CTA detail; at `>=1200px` it becomes a fitted row with a continuous controlled gap; the exact 1440 anchor and ultrawide gap behavior are retained. The approved EN mobile renderer remains at `<=639px`.
- Rentals and Included: their approved current owners now cover compact desktop. Rentals keeps the registered shared 16:9 color/B&W scene and fits its transactional core inside the available frame; Included retains the four-feature system, restored BOARD treatment, message, and marquee.
- Reviews and FAQ: the approved fluid review cards/trust row and illustration/accordion owners cover compact desktop; section-local widths/gaps compact without restoring generic adaptive boxes.
- Events: the approved editorial hierarchy and CTA artwork cover `900–1439px`; tracks and gaps compact locally. The complete group caps at `1236px` approaching 1440 for boundary continuity.
- Gallery: EPIC MOMENTS, all five current filters, and the approved three-track mosaic cover `900–1439px`; the mosaic caps at `1248px` approaching 1440. The intentional mobile composition remains at 390.

## Verified measurements and continuity

All measurements below are final production-build DOM measurements; document overflow is `0` at every row.

| CSS viewport | Hero owner / width | Lessons composition | Events layout / featured | Gallery mosaic |
|---|---:|---:|---:|---:|
| 1024 | current desktop / `1024px` | stacked `976px`; selector `405.9px`; detail `682px` | `976px / 599.1px` | `976 × 472.2px` |
| 1280 | current desktop / `1280px` | row `1169.9px`; selector `405.9px`; detail `682px` | `1216px / 749.3px` | `1216 × 588.3px` |
| 1439 | current desktop / `1439px` | row `1246.2px`; selector `405.9px`; detail `690.7px` | `1236px / 760.1px` | `1248 × 603.8px` |
| 1440 | current desktop / `1440px` | row `1247.1px`; selector `405.9px`; detail `691.2px` | `1236px / 728.2px` | `1248 × 603.8px` |

At `1439 ↔ 1440`, Hero ownership is identical, Lessons changes by less than `1px` in total composition width, Events keeps the same `1236px` group, and Gallery keeps the same `1248 × 603.8px` mosaic. The retired visual implementations no longer appear at that boundary.

The final EN CSS viewport sweep returned HTTP 200 and zero document overflow at `390, 768, 900, 1024, 1100, 1199, 1200, 1280, 1366, 1439, 1440, 1920, 2560`. Current desktop ownership is continuous from `900px`; the approved mobile/tablet compositions remain below the factual compact-desktop fit threshold.

## Functional and isolation verification

- Hero video/shader and reduced-motion ownership remain present.
- All five Lessons states pass; Group, Split, and Private retain booking iframe destinations; Surf-skate and Line-up / Pro retain localized WhatsApp destinations.
- Rental catalog and modal open/close behavior pass.
- All four Events VIEW PHOTOS actions retain their Gallery mapping.
- All five Gallery filters remain functional with five visible image slots.
- Header, language switch, Book Now, Conditions integrations, FAQ ARIA/interaction, Footer links/contact/socials, and Messenger FAB pass.
- `/home-v2` and `/ru/home-v2` remain `noindex, nofollow`, absent from sitemap and public production navigation.
- `/`, `/ru`, production Header/Footer, analytics, partner attribution, canonical, robots, and sitemap source were not changed by Stage 5.1.
- Photo Break remains absent.

## Final verification

- Targeted compact-desktop ownership regression: `4 passed` at `1024, 1280, 1439, 1440`.
- Complete factual Home V2 Playwright suite: **83 passed (3.0m)** across all 18 spec files (previous Stage 5 baseline: 79 passed).
- `npm run lint`: **passed**.
- `npm run build`: **passed**; all `20/20` static pages generated.
- `git diff --check`: **passed** (only pre-existing Windows line-ending warnings were emitted by adjacent diff/status commands).
- Browser zoom was not detected or controlled with JS. The equivalent factual CSS layout widths were verified directly, including `1280px` for the reported 200% 2K case and both sides of the `1439/1440` boundary.

Final status: `Stage 5.1 complete — awaiting user visual review before approved checkpoint commit`

No commit, push, merge, or production rollout was performed.

## Final approval record

- Stage 5.1 was visually approved by the user.
- The zoom/reflow correction was approved at 175%, 200%, and 250% Chrome zoom.
- The current Home V2 is ready for a Git checkpoint and Vercel Preview review.
