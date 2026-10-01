# V5 Rentals, Conditions and Reviews

Source: local Figma handoff `tmp/figma-handoff/v5/rentals-conditions-reviews`, exporter 2.3.1, root `2197:58`, 1440 × 2203.

- SVGs are the original textless export surfaces. Live labels and review text are rendered in HTML.
- `boards.webp`: high-quality WebP conversion of `boards-photo-artwork@2x.png` (2060 × 1184). The source's circular mask failed standalone export; CSS reconstructs the 1030 × 1030 circle at x288, y−438, with the clipped photo starting at y0.
- `reviews-wave.webp`: WebP conversion of the exported collage `607e7e19-253e-4ca0-9c7d-3d88f2cfe3aa-2@2x.png` (2880 × 782). Its actual clipped size is 1440 × 391, placed at x0, y228 within Reviews.
- Background shape SVGs and marquee SVGs are already clipped to their individual Figma frames. Their native export dimensions are used; the nominal untrimmed node bounds must not be used to stretch them.
- The three unresolved `[Copy] Logo Artwork` nodes are outside the Conditions frame. Visible lettering is present in the two exported marquee composites, which align across the section seam.
- Camera and map screenshots are reference only. The site retains the original live camera/provider links and Windy embed instead of rendering screenshot substitutes.

Desktop layout starts at 1200px. Existing compact/tablet/mobile layouts remain active below that breakpoint.
