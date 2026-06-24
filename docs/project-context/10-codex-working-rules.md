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
- Treat `/home-v2` and `/ru/home-v2` as hidden test routes for the future homepage.
- Vercel Preview opens `/`, which still shows the old homepage; manually check `/home-v2` and `/ru/home-v2` on the preview domain.
- Keep `/` and `/ru` unchanged until Home V2 is approved.
- Do not merge `design/home-v2-poster-collage` into `main` until approval.
- Keep Home V2 routes `noindex, nofollow`.
- Never add `/home-v2` or `/ru/home-v2` to the sitemap while the experiment is active.

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
