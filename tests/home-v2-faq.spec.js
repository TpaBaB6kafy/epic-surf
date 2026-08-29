const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

test.beforeEach(async ({ page }) => isolateProviders(page));

for (const route of ["/home-v2", "/ru/home-v2"]) {
  test(`${route} FAQ exposes four valid accordion controls`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, route);
    const controls = page.locator("[data-home-v2-faq] [data-faq-control]:visible");
    await expect(controls).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const control = controls.nth(index);
      const answerId = await control.getAttribute("aria-controls");
      expect(answerId).toBeTruthy();
      await expect(control).toHaveAttribute("aria-expanded", "false");
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(`#${answerId}`)).toBeVisible();
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "false");
    }
    await expectNoOverflow(page);
  });
}
