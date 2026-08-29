const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} mobile Gallery retains controls and image slots`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, route);
    const gallery = page.locator("[data-home-v2-gallery]");
    await expect(gallery.locator("[data-home-v2-gallery-filter]")).toHaveCount(5);
    await expect(gallery.locator("[data-home-v2-gallery-item]")).toHaveCount(5);
    await gallery.locator('[data-home-v2-gallery-filter="birthday"]').click();
    await expect(gallery.locator('[data-home-v2-gallery-filter="birthday"]')).toHaveAttribute("aria-pressed", "true");
    await expectNoOverflow(page);
  });
}
