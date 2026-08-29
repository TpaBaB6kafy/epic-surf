const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} Reviews keeps three cards and Google Maps CTA at 390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, route);
    const reviews = page.locator("[data-home-v2-reviews]");
    await expect(reviews.locator("[data-home-v2-review-card]:visible")).toHaveCount(3);
    await expect(reviews.locator("[data-google-maps-cta]:visible, [data-google-maps-cta-mobile]:visible")).toHaveAttribute("href", /google\.com\/maps/);
    await expectNoOverflow(page);
  });
}
