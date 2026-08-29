const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

test("Gallery keeps five filters, five visible slots, and Events integration", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await ready(page);
  const gallery = page.locator("[data-home-v2-gallery]");
  const filters = gallery.locator("[data-home-v2-gallery-filter]");
  await expect(filters).toHaveCount(5);
  expect(await filters.evaluateAll((nodes) => nodes.map((node) => node.dataset.homeV2GalleryFilter))).toEqual([
    "all", "surf-fest", "birthday", "sunset", "community",
  ]);
  for (let index = 0; index < 5; index += 1) {
    await filters.nth(index).click();
    await expect(filters.nth(index)).toHaveAttribute("aria-pressed", "true");
    await expect(gallery.locator("[data-home-v2-gallery-item]")).toHaveCount(5);
  }
  await page.locator('[data-home-v2-event-card="featured"] [data-home-v2-event-cta]').click();
  await expect(gallery.locator('[data-home-v2-gallery-filter="surf-fest"]')).toHaveAttribute("aria-pressed", "true");
  await expectNoOverflow(page);
});
