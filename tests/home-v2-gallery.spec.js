const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 2) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

test("matches the desktop EN Gallery handoff and preserves Events integration", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; } nextjs-portal, [data-home-v2-messenger] { display: none !important; }" });

  const gallery = page.locator("[data-home-v2-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toBeVisible();

  const geometry = await gallery.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };

    return {
      root: { width: rootRect.width, height: rootRect.height },
      heading: relativeBox(root.querySelector("[data-home-v2-gallery-heading]")),
      filters: relativeBox(root.querySelector("[data-home-v2-gallery-filters]")),
      filterButtons: [...root.querySelectorAll("[data-home-v2-gallery-filter]")].map(relativeBox),
      grid: relativeBox(root.querySelector("[data-home-v2-gallery-grid]")),
      items: [...root.querySelectorAll("[data-home-v2-gallery-item]")].map(relativeBox),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  closeTo(geometry.root.width, 1440, 1);
  closeTo(geometry.root.height, 1062, 1);
  closeTo(geometry.heading.left, 510, 1);
  closeTo(geometry.heading.top, 89.36, 1);
  closeTo(geometry.filters.left, 269.035, 1);
  closeTo(geometry.filters.top, 172.576, 1);
  closeTo(geometry.grid.left, 99, 1);
  closeTo(geometry.grid.top, 262, 1);
  closeTo(geometry.grid.width, 1241, 1);
  closeTo(geometry.grid.height, 600.36, 1);
  expect(geometry.filterButtons).toHaveLength(5);
  expect(geometry.items).toHaveLength(5);
  expect(geometry.overflow).toBeLessThanOrEqual(1);
  closeTo(geometry.items[0].width, 600, 1);
  closeTo(geometry.items[0].height, 600, 1);
  geometry.items.slice(1).forEach((item) => {
    closeTo(item.width, 290, 1);
    closeTo(item.height, 290, 1);
  });
  await expect(gallery.locator('[data-home-v2-gallery-filter="all"]')).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator('[data-home-v2-gallery-item="5"] img')).toBeVisible();
  await gallery.screenshot({ path: "test-results/home-v2-gallery-focused.png" });

  await gallery.locator('[data-home-v2-gallery-filter="birthday"]').click();
  await expect(gallery.locator('[data-home-v2-gallery-filter="birthday"]')).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator('[data-home-v2-gallery-item="1"] img')).toHaveAttribute("src", /epic-birthday-4/);

  const events = page.locator("[data-home-v2-events]");
  await events.locator('[data-home-v2-event-card="featured"] [data-home-v2-event-cta]').click();
  await expect(gallery.locator('[data-home-v2-gallery-filter="surf-fest"]')).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator('[data-home-v2-gallery-item="1"] img')).toHaveAttribute("src", /danang-open-2025-1/);

  await page.setViewportSize({ width: 1440, height: 700 });
  await events.evaluate((node) => window.scrollTo(0, node.offsetTop + node.offsetHeight - 180));
  await page.screenshot({ path: "test-results/home-v2-events-gallery-integration.png" });
});
