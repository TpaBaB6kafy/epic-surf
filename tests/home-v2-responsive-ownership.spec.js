const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const width of [375, 390, 640, 768, 904, 1200, 1440, 1920, 2560]) {
  test(`the approved flow has one visible section owner at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page);
    for (const selector of [
      "[data-home-v2-hero]", "[data-home-v2-how-it-works]", "[data-home-v2-lessons-block]",
      "[data-home-v2-included]", "[data-home-v2-rentals-block]", "[data-home-v2-reviews]",
      "[data-home-v2-faq]", "[data-home-v2-events]", "[data-home-v2-gallery]", "[data-home-v2-footer]",
    ]) await expect(page.locator(`${selector}:visible`)).toHaveCount(1);
    await expect(page.locator("[data-home-v2-photo-break]")).toHaveCount(0);
    await expectNoOverflow(page);
  });
}

for (const width of [1024, 1280, 1439, 1440]) {
  test(`the current Home V2 visual owners survive compact-desktop reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page);

    await expect(page.locator("[data-home-v2-hero-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-hero-adaptive]:visible")).toHaveCount(0);

    await expect(page.locator("[data-home-v2-lessons-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-lessons-adaptive]:visible")).toHaveCount(0);
    await expect(page.locator("[data-home-v2-lesson-selector]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-lesson-detail]:visible")).toHaveCount(1);

    await expect(page.locator("[data-rentals-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-rentals-adaptive]:visible")).toHaveCount(0);
    await expect(page.locator("[data-home-v2-included-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-reviews-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-reviews-adaptive]:visible")).toHaveCount(0);
    await expect(page.locator("[data-home-v2-faq-desktop]:visible")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-faq-adaptive]:visible")).toHaveCount(0);

    await expect(page.locator("[data-home-v2-events-mobile]:visible")).toHaveCount(0);
    await expect(page.locator("[data-home-v2-events-heading] > span").first()).toBeVisible();
    await expect(page.locator("[data-home-v2-event-cta] img").first()).toBeVisible();

    await expect(page.locator("[data-home-v2-gallery-heading] > span").first()).toBeVisible();
    await expect(page.locator("[data-home-v2-gallery-grid]")).toHaveCSS("display", "grid");
    await expect(page.locator("[data-home-v2-gallery-instagram]")).toBeHidden();
    expect(await page.locator("[data-home-v2-gallery-grid]").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length)).toBe(3);

    await expectNoOverflow(page);
  });
}
