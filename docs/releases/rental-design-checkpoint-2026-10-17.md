# Rental design checkpoint — 2026-10-17

The user approved the current rental design as a checkpoint and explicitly requested commit, push and deployment. EN/RU public routes retain their canonical URLs, alternates, structured data, 15-board inventory, prices, rental dialogs, messenger tracking and partner attribution.

The page now uses the approved photo-led rental composition, shared header and collapsible footer, stable desktop gallery/information heights, bounded CTA widths and mobile swipe selection. The mobile hero displays all seven boards. The desktop comparison integrates its schematic map on the right; the clickable EPIC marker opens the confirmed school point at 16.0464674, 108.2504812. Existing FAQ, pickup/conditions, camera and related resources remain. Main surfaces match partner graphite; the lower accent reuses its sea texture.

Only active rental assets and rental-related source/documentation are included. Independent homepage sunset edits, partner changes, guide prototypes and local output/tmp artifacts are excluded. Future visual refinement can continue from this checkpoint.

Validation before packaging: production build (25 routes), scoped ESLint, 300 board states, 14 EN/RU map layout cases, keyboard Maps activation and the rental QA suite (18 responsive cases and 44 behavior checks). External widgets are fixed during automated behavior checks; no messages or rental requests were submitted. Current local evidence: `output/rental-polish-2026-10-17` and `output/rental-map-integration-2026-10-17`.

Deployment uses the existing GitHub/Vercel integration on main. Exact staged-source validation, deployment status and public EN/RU checks are recorded after publication.

The exact staged source was exported into an isolated release snapshot, excluding unrelated uncommitted code. Its default production build passed (24 routes; the local guide prototype is excluded), and the compiled production server passed all 18 responsive cases and 44 behavior checks. Scoped ESLint and staged whitespace validation passed. Evidence: `output/rental-checkpoint-2026-10-17/staged-qa/report.json`. Checkpoint tag: `checkpoint-rental-design-2026-10-17`.
