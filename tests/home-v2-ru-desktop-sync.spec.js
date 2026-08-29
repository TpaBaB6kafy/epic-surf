const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

test("RU desktop uses the approved shared fluid sections and localized actions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await ready(page, "/ru/home-v2");
  for (const selector of [
    "[data-home-v2-hero]", "[data-home-v2-how-it-works]", "[data-home-v2-lessons-block]",
    "[data-home-v2-included]", "[data-home-v2-rentals-block]", "[data-home-v2-live-cam]",
    "[data-home-v2-reviews]", "[data-home-v2-faq]", "[data-home-v2-events]",
    "[data-home-v2-gallery]", "[data-home-v2-footer]",
  ]) await expect(page.locator(selector)).toBeVisible();
  await expect(page.locator('[data-home-v2-header="true"] a[href="/ru/home-v2#rentals"]')).toHaveText("Аренда");
  await expect(page.locator("[data-home-v2-lessons-block] [data-home-v2-lesson-selector] button:visible")).toHaveCount(5);
  await expect(page.locator("[data-home-v2-rentals-block] [data-home-v2-rental-catalog-cta]:visible")).toHaveAttribute("href", "/ru/surfboard-rental-danang");
  await expect(page.locator("[data-home-v2-photo-break]")).toHaveCount(0);
  await expectNoOverflow(page);
});
