# Codex Working Rules

## Before changes

- Analyze the current code first.
- Identify the files that own the behavior.
- Propose a short plan for non-trivial changes.
- Mark unknowns as `needs confirmation` instead of guessing.

## Architecture

- Do not change routing structure without a clear reason.
- Do not rename `/`, `/ru`, `/partners`, or `/ru/partners` routes casually.
- Do not introduce new architecture when existing components/data files are enough.
- Do not create extra components for one-off markup unless it reduces real complexity.

## Home V2 branch rules

- Work on Home V2 only in branch `design/home-v2-poster-collage`.
- Перед визуальными изменениями Home V2 обязательно прочитать `docs/design-experiments/home-v2/workflow.md`, `docs/design-experiments/home-v2/brief.md` и `docs/design-experiments/home-v2/style-system/README.md`.
- Treat `/home-v2` and `/ru/home-v2` as hidden test routes for the future homepage.
- Vercel Preview opens `/`, which still shows the old homepage; manually check `/home-v2` and `/ru/home-v2` on the preview domain.
- Keep `/` and `/ru` unchanged until Home V2 is approved.
- Do not merge `design/home-v2-poster-collage` into `main` until approval.
- Keep Home V2 routes `noindex, nofollow`.
- Never add `/home-v2` or `/ru/home-v2` to the sitemap while the experiment is active.

## Home V2 responsive migration rules

- Implement the responsive migration in reviewable checkpoints; do not migrate all sections in one pass.
- Preserve `390px` as the exact approved Mobile EN geometry anchor. Other widths from `375px` through `639px` must use the same visual language in a fluid layout, not a fixed `390px` canvas.
- Preserve `1440px` as the exact approved Desktop EN geometry anchor. Widths from `1200px` through `1439px` must use a fluid desktop-derived layout, not a fixed or scaled `1440px` canvas.
- Apply semantic section-gap tokens primarily to adaptive ranges. Do not change approved joins or section heights at the exact `390px` and `1440px` anchors merely to adopt spacing tokens.
- Keep Conditions stacked through `1199px`. Enable its two-column composition at `1200px` only when browser bounds confirm that both panels fit.
- Extend the approved Mobile EN alternating-card language for How It Works through `899px`; use `2x2` at `900-1199px` and a fluid four-card composition at `1200-1439px`.
- Let Reviews choose a three-card row only when readable card minimums fit; otherwise use `2+1` without introducing a separate presentation design.
- Run the full `375-1440px` automated width sweep only after the main adaptive migration. During section checkpoints, test `390`, `904`, `1200`, `1440`, and the relevant breakpoint edges.
- Do not delete `app/components/home-v2/sections/HomeV2UtilitySections.jsx` during the responsive migration. Any unused-code cleanup is a separate post-stabilization task.
- After the Header/Hero checkpoint, stop for review before changing How It Works or later sections.

## Design

- Reuse existing Tailwind theme tokens.
- Do not change colors, fonts, or core visual direction without confirmation.
- Keep surf imagery and current brand style.
- Avoid unrelated palettes, decorative blobs, and generic abstract visuals.

## Content and SEO

- Keep EN/RU SEO alternates intact.
- Do not change canonical domain without confirming deployment/DNS.
- Be careful with Russian text because current source appears encoding-corrupted.
- Do not rewrite business copy unless requested.

## Analytics

- Preserve `trackEvent()` behavior.
- Preserve partner attribution scope.
- Booking and messenger links must keep working even if analytics env vars are missing.

## Verification

- After code changes, run `npm run lint` and/or `npm run build` when possible.
- For routing, SEO, or UI changes, manually check affected routes when possible.
- If verification cannot be run, state that clearly.

## Last updated

2026-06-24
