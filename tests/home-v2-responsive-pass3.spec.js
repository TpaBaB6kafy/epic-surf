const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const width of [390, 656, 904, 1200, 1440, 2560]) {
  test(`Lessons, Included, and Rentals retain their approved sequence at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await ready(page);
    const lessons = page.locator("[data-home-v2-lessons-block]");
    const included = page.locator("[data-home-v2-included]");
    const rentals = page.locator("[data-home-v2-rentals-block]");
    await expect(lessons.locator("[data-home-v2-lesson-selector] button:visible")).toHaveCount(5);
    const order = await page.evaluate(() => [
      document.querySelector("[data-home-v2-lessons-block]").getBoundingClientRect().top,
      document.querySelector("[data-home-v2-included]").getBoundingClientRect().top,
      document.querySelector("[data-home-v2-rentals-block]").getBoundingClientRect().top,
    ]);
    expect(order[0]).toBeLessThan(order[1]);
    expect(order[1]).toBeLessThan(order[2]);
    await expect(included).toBeVisible();
    await expect(rentals).toBeVisible();
    await expectNoOverflow(page);
  });
}
