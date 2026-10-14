# EPIC rental boards — 2026-10-14

The approved rental catalogue adds Fish Epic Surf (5'6, Twin Fin), Longboard EPIC Surf 9'0 (2+1), and Longboard EPIC Surf (9'0, Single Fin). Russian descriptions and characteristics follow the owner's corrected copy; English translations match it. The 2+1 board suits beginner/intermediate surfers, and the single-fin board suits all levels. Rental remains 350,000 VND per two hours.

Six supplied photos produce 21 WebP assets: catalogue images, thumbnails, tail/fin-box details, and enlarged views. The fish's second photograph is another deck angle and is labelled accordingly. Image preparation can be repeated with `node scripts/process-new-epic-board-images.mjs` and `NEW_EPIC_BOARD_SOURCE_DIR`.

New-board specifications show the fin setup and suitable waves, with wrapping for long EN/RU values. The rental dialog uses the same corrected level labels. Existing board IDs, tracking categories, public routes, canonical/hreflang metadata, pricing, messenger flows, and partner attribution are preserved.

Before publication, scoped ESLint and the production build passed. All three boards were checked on EN/RU at 390, 1024, 1440, 1920, and 2560 CSS px, including image galleries, rental selection, copy, specifications, wrapping, and overflow. External resources were stubbed; no messages or bookings were sent. Local evidence is in `output/new-rental-boards-2026-10-14`.

This release includes only the approved rental changes and images. Unrelated shared-workspace edits and local QA artifacts are excluded. Publishing uses the existing GitHub/Vercel integration on main; deployment status and public EN/RU pages are verified after push.
