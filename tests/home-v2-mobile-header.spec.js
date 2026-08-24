const { test, expect } = require("@playwright/test");
const path = require("node:path");
const sharp = require("sharp");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const screenshotPath = path.join(process.cwd(), "test-results", "home-v2-mobile-en-header-390@2x.png");
const referencePath = path.join(process.cwd(), "tmp", "figma-handoff", "mobile-header", "reference@2x.png");

async function bounds(locator) {
  return locator.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      right: rect.right,
      bottom: rect.bottom,
    };
  });
}

function expectBox(actual, expected) {
  for (const [key, value] of Object.entries(expected)) {
    expect(Math.abs(actual[key] - value), key).toBeLessThanOrEqual(0.05);
  }
}

test.describe("Home V2 Mobile EN Header handoff", () => {
  test.use({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });

  test("matches 390px geometry, visuals, and core interactions", async ({ page }) => {
    await page.goto(`${baseUrl}/home-v2?partner=header-qa`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true");

    const header = page.locator('[data-home-v2-header="true"]');
    const logo = header.locator('[data-home-v2-brand-logo="true"]');
    const language = header.locator('[data-home-v2-language-switcher="true"]');
    const bookNow = header.locator('[data-home-v2-book-now="true"]');
    const menuControl = header.locator('[data-home-v2-menu-control="true"]');

    const geometry = {
      root: await bounds(header),
      logo: await bounds(logo),
      language: await bounds(language),
      bookNow: await bounds(bookNow),
      menu: await bounds(menuControl),
    };
    console.log(`Mobile Header 390px bounds: ${JSON.stringify(geometry)}`);
    expectBox(geometry.root, { left: 0, top: 0, width: 390, height: 86, right: 390, bottom: 86 });
    expectBox(geometry.logo, { left: 20, top: 29, width: 63.358, height: 28.314 });
    expectBox(geometry.language, { left: 174, top: 25, width: 36, height: 36 });
    expectBox(geometry.bookNow, { left: 224, top: 25, width: 96, height: 36 });
    expectBox(geometry.menu, { left: 334, top: 25, width: 36, height: 36 });

    await expect(header).toHaveCSS("background-color", "rgb(119, 119, 119)");
    await expect(language).toHaveCSS("border-radius", "3px");
    await expect(bookNow).toHaveCSS("background-color", "rgb(254, 116, 106)");
    await expect(menuControl).toHaveCSS("background-color", "rgb(46, 46, 46)");
    await expect(logo).toHaveAttribute("href", "/home-v2");
    expect(await logo.locator("img").evaluate((img) => new URL(img.currentSrc).pathname)).toBe("/design/home-v2/header/epic-logo-mobile-en.svg");

    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    const overlaps = await page.evaluate(() => {
      const selectors = [
        '[data-home-v2-brand-logo="true"]',
        '[data-home-v2-language-switcher="true"]',
        '[data-home-v2-book-now="true"]',
        '[data-home-v2-menu-control="true"]',
      ];
      const boxes = selectors.map((selector) => document.querySelector(selector).getBoundingClientRect());
      return boxes.some((a, index) => boxes.slice(index + 1).some((b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top));
    });
    expect(overlaps).toBeFalsy();

    await header.screenshot({ path: screenshotPath, animations: "disabled" });
    const [actual, reference] = await Promise.all([
      sharp(screenshotPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
      sharp(referencePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }),
    ]);
    expect(actual.info.width).toBe(reference.info.width);
    expect(actual.info.height).toBe(reference.info.height);
    let absoluteError = 0;
    for (let index = 0; index < actual.data.length; index += 4) {
      absoluteError += Math.abs(actual.data[index] - reference.data[index]);
      absoluteError += Math.abs(actual.data[index + 1] - reference.data[index + 1]);
      absoluteError += Math.abs(actual.data[index + 2] - reference.data[index + 2]);
    }
    const meanAbsoluteError = absoluteError / (actual.info.width * actual.info.height * 3);
    console.log(`Mobile Header reference@2x RGB MAE: ${meanAbsoluteError.toFixed(3)}`);

    await menuControl.focus();
    await expect(menuControl).toHaveCSS("outline-style", "solid");
    await menuControl.click();
    const menu = page.locator("#home-v2-mobile-navigation");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Lessons", exact: true })).toHaveAttribute("href", "/home-v2#lessons");
    await page.getByRole("button", { name: "Close navigation" }).click();
    await expect(menu).toBeHidden();

    await bookNow.click();
    await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
    await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", "https://n1435324.alteg.io/company/1248257/record-type?o=m-1");
  });

  test("keeps responsive geometry at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const header = page.locator('[data-home-v2-header="true"]');
    expectBox(await bounds(header), { left: 0, top: 0, width: 375, height: 86 });
    expectBox(await bounds(header.locator('[data-home-v2-brand-logo="true"]')), { left: 20, top: 29, width: 63.358, height: 28.314 });
    expectBox(await bounds(header.locator('[data-home-v2-language-switcher="true"]')), { left: 159, top: 25, width: 36, height: 36 });
    expectBox(await bounds(header.locator('[data-home-v2-book-now="true"]')), { left: 209, top: 25, width: 96, height: 36 });
    expectBox(await bounds(header.locator('[data-home-v2-menu-control="true"]')), { left: 319, top: 25, width: 36, height: 36 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });

  test("preserves partner query context on the RU switch", async ({ page }) => {
    await page.goto(`${baseUrl}/home-v2?partner=header-qa&utm_source=focused-test`, { waitUntil: "domcontentloaded" });
    await page.locator('[data-home-v2-language-switcher="true"]').click();
    await expect(page).toHaveURL(/\/ru\/home-v2\?/, { timeout: 15000 });
    expect(new URL(page.url()).searchParams.get("partner")).toBe("header-qa");
    expect(new URL(page.url()).searchParams.get("utm_source")).toBe("focused-test");
  });

  test("does not change the approved 1440px desktop EN Header", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const header = page.locator('[data-home-v2-header="true"]');
    expectBox(await bounds(header), { left: 0, top: 0, width: 1440, height: 86 });
    expectBox(await bounds(header.locator('[data-home-v2-brand-logo="true"]')), { left: 99, top: 25.3036, width: 79.1973, height: 35.3928 });
    expectBox(await bounds(header.locator('[data-home-v2-language-switcher="true"]')), { left: 1176, top: 22, width: 41, height: 41 });
    expectBox(await bounds(header.locator('[data-home-v2-book-now="true"]')), { left: 1228, top: 22, width: 112, height: 41 });
    expect(await header.locator("img").evaluate((img) => new URL(img.currentSrc).pathname)).toBe("/design/home-v2/header/epic-logo-dark.svg");
  });

  for (const expectation of [
    { width: 904, navigation: false, menu: true },
    { width: 1200, navigation: true, menu: false },
  ]) {
    test(`uses unified adaptive Header ownership at ${expectation.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: expectation.width, height: 900 });
      await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
      const header = page.locator('[data-home-v2-header="true"]');
      const navigation = header.locator('[data-home-v2-primary-navigation="true"]');
      const menu = header.locator('[data-home-v2-menu-control="true"]');
      expectBox(await bounds(header), { left: 0, top: 0, width: expectation.width, height: 86 });
      if (expectation.navigation) await expect(navigation).toBeVisible();
      else await expect(navigation).toBeHidden();
      if (expectation.menu) await expect(menu).toBeVisible();
      else await expect(menu).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    });
  }
});
