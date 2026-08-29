const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const width of [390, 904, 1440, 2560]) {
  test(`Included keeps four features and a separated message at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page);
    const included = page.locator("[data-home-v2-included]");
    await expect(included.locator("[data-home-v2-included-adaptive-feature]:visible, [data-home-v2-included-mobile-feature]:visible")).toHaveCount(4);
    await expect(included.locator("[data-home-v2-included-adaptive-message]:visible, [data-home-v2-included-mobile-callout]:visible")).toHaveCount(1);
    await expectNoOverflow(page);
  });
}
