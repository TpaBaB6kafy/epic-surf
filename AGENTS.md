# EPIC Surf: repository instructions

## UI and page design

Before creating or changing a page, section, layout, card or button, read [the approved layout and scale standard](docs/design/layout-and-scale.md). Apply it to the homepage, board rental pages, landing pages and guides in both EN and RU.

Use the approved homepage as the visual reference. Keep its palette, imagery and composition unless the user's current request changes them. Reuse its bounded desktop width, common content edges and controlled vertical spacing; do not copy a legacy narrow container or scale the whole page with CSS zoom/transform.

The standard describes the approved target for future work. Existing rental/landing pages have not all been migrated. Update only the pages and breakpoints authorized by the current task.

Old handoff coordinates, QA screenshots, release reports and documents under docs/archive are historical evidence, not current design instructions. The user's latest instructions take precedence. Do not ask for approval again when the current request already authorizes the work.

## Preserve working behavior

Keep public routes, EN/RU alternates, canonical URLs, structured data, booking/rental flows, messenger links, tracking and partner attribution intact when changing visuals. Inspect the actual owning components before editing; some older project-context documents describe the retired homepage.

Respect unrelated edits in the shared workspace. Commit, push and deploy when requested by the user; do not treat approval of a visual preview as an automatic request to publish.
