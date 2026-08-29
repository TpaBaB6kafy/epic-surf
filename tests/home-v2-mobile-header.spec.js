const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

test("mobile Header keeps logo, language, Book Now, menu, and Rentals navigation reachable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  const header = page.locator('[data-home-v2-header="true"]');
  await expect(header.locator('[data-home-v2-brand-logo="true"]')).toBeVisible();
  await expect(header.locator('[data-home-v2-language-switcher="true"]')).toBeVisible();
  await expect(header.locator('[data-home-v2-book-now="true"]')).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  const menu = page.locator("#home-v2-mobile-navigation");
  await expect(menu).toBeVisible();
  await menu.getByRole("link", { name: "Rentals", exact: true }).click();
  await expect(menu).toBeHidden();
  await expect(page).toHaveURL(/#rentals$/);
  await expectNoOverflow(page);
});

test("desktop Header uses a centered fluid frame", async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1000 });
  await ready(page);
  const frame = await page.locator('[data-home-v2-header-frame="true"]').boundingBox();
  expect(frame.width).toBeGreaterThan(1440);
  expect(Math.abs((frame.x + frame.width / 2) - 1280)).toBeLessThanOrEqual(2);
});
