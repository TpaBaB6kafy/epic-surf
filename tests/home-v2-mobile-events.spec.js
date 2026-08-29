const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} mobile Events stay contained and actionable`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, route);
    const events = page.locator("[data-home-v2-events]");
    const cards = events.locator("[data-home-v2-event-card]:visible, [data-home-v2-mobile-event-card]:visible");
    await expect(cards).toHaveCount(4);
    await expect(events.locator("[data-home-v2-event-cta]:visible, [data-home-v2-mobile-event-cta]:visible")).toHaveCount(4);
    expect(await cards.evaluateAll((nodes) => nodes.every((node) => {
      const rect = node.getBoundingClientRect();
      return rect.left >= -1 && rect.right <= innerWidth + 1;
    }))).toBeTruthy();
    await expectNoOverflow(page);
  });
}
