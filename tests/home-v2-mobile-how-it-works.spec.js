const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const width of [390, 640, 899, 900, 1199, 1200, 1439, 1440, 2560]) {
  test(`How It Works has one visible four-card presentation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page);
    const how = page.locator("[data-home-v2-how-it-works]");
    await expect(how).toBeVisible();
    await expect(how.locator("[data-home-v2-how-mobile-card]:visible, [data-home-v2-how-adaptive-card]:visible, [data-home-v2-how-fluid-card]:visible")).toHaveCount(4);
    await expectNoOverflow(page);
  });
}
