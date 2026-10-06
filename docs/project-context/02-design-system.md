# Design System

Current design authority: [EPIC layout and scale standard](../design/layout-and-scale.md), approved 2026-10-05. Read it before changing any page UI. It replaces the older composition and sizing guidance in this file and historical briefs.

Complete system context: [design-system documentation](../design/README.md). Foundations, component ownership, measured homepage styles and pending decisions are maintained there; the layout standard remains authoritative for geometry.

## Brand foundations

Theme tokens remain in app/globals.css:

- epicDark: #2E2E2E
- epicRed: #FE746A
- epicWhite: #F6F6F6
- epicMint: #AAFFC7
- epicGray: #585858

Retain the existing teal surfaces, texture and sunset treatment where approved. No new palette or blanket recoloring as part of layout work.

Current V5 uses Home V5 Recursive headings, Home V2 Lessons Chivo copy and Home V2 Lessons Montserrat labels/cards, with section-specific existing treatments. Legacy Arial/system declarations are fallbacks or belong to older components; do not treat them as a mandate to replace the current fonts. Inspect the affected component's computed styles.

## Shared layout

Desktop >=1200px: bounded stage min(94vw, 2160px); content is 83.2% of that stage. Full-width decorative backgrounds are separate from foreground geometry. Use the same edges for rental, landing and homepage content, with readable text columns inside that frame.

The old 1248/1280px whole-page landing container and unlimited viewport scaling are not the target for new redesigns. Some existing pages still use them; migrate only within the authorized task.

Use the canonical standard for vertical spacing, photo proportions, responsive behavior and verification. Do not duplicate its full numeric rules here.

## Components and behavior

Use the approved rounded cards and dimensional coral/graphite CTAs. Reuse working components, colors and handlers where appropriate. Preserve EN/RU content, navigation anchors, tracking, forms, messenger links and accessible interaction states.

Homepage composition lives in app/components/home-v2/HomeV2Page.jsx, not the retired LandingPage.jsx. Homepage-specific selectors must not be attached to unrelated pages merely to inherit styles.

## Last updated

2026-10-05
