const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

test("Events keeps four editorial stories and maps the featured CTA to Gallery", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await ready(page);
  const events = page.locator("[data-home-v2-events]");
  await expect(events.locator("[data-home-v2-event-card]")).toHaveCount(4);
  await expect(events.locator("[data-home-v2-event-cta]")).toHaveCount(4);
  await events.locator('[data-home-v2-event-card="featured"] [data-home-v2-event-cta]').click();
  await expect(page.locator('[data-home-v2-gallery-filter="surf-fest"]')).toHaveAttribute("aria-pressed", "true");
  await expectNoOverflow(page);
});
