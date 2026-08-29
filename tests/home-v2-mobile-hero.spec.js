const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} Hero keeps its owned mobile media and benefits in bounds`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, route);
    const hero = page.locator("[data-home-v2-hero]");
    await expect(hero).toBeVisible();
    await expect(hero.locator("video:visible").first()).toHaveAttribute("autoplay", "");
    await expect(hero.locator("[data-home-v2-benefit-card]:visible, [data-home-v2-mobile-benefit]:visible")).toHaveCount(3);
    await expectNoOverflow(page);
  });
}

test("desktop Hero media stays full bleed at ultrawide width", async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1000 });
  await ready(page);
  const hero = await page.locator("[data-home-v2-hero]").boundingBox();
  const video = await page.locator("[data-home-v2-hero] video:visible").boundingBox();
  expect(hero.width).toBeCloseTo(2560, 0);
  expect(video.width).toBeGreaterThanOrEqual(2559);
});
