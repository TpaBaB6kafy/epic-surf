const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} Rentals keeps catalog and modal actions at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, route);
    const rentals = page.locator("[data-home-v2-rentals-block]");
    await expect(rentals.locator("[data-home-v2-rental-catalog-cta]:visible")).toHaveAttribute("href", route.startsWith("/ru") ? "/ru/surfboard-rental-danang" : "/surfboard-rental-danang");
    await expect(rentals.locator("[data-home-v2-rental-cta]:visible")).toHaveCount(1);
    await expectNoOverflow(page);
  });
}
