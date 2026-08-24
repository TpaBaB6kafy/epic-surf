const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

test.use({ deviceScaleFactor: 2 });

async function relativeRect(root, locator) {
  return locator.evaluate((element, rootSelector) => {
    const rootNode = document.querySelector(rootSelector);
    const rootBox = rootNode.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return {
      left: box.left - rootBox.left,
      top: box.top - rootBox.top,
      width: box.width,
      height: box.height,
      right: box.right - rootBox.left,
      bottom: box.bottom - rootBox.top,
    };
  }, root);
}

function expectRectClose(actual, expected, precision = 1) {
  for (const [key, value] of Object.entries(expected)) {
    expect(actual[key], key).toBeCloseTo(value, precision);
  }
}

test.describe("Home V2 Mobile EN Hero handoff", () => {
  test("matches the 390px geometry and keeps the production video behavior", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true");

    const heroSelector = '[data-home-v2-hero][data-home-v2-hero-locale="en"]';
    const hero = page.locator(heroSelector);
    const mobile = hero.locator("[data-home-v2-hero-mobile-en]");
    const epic = mobile.locator("[data-home-v2-hero-mobile-logo-epic]");
    const accent = mobile.locator("[data-home-v2-hero-mobile-logo-accent-dot]");
    const surfSchool = mobile.locator("[data-home-v2-hero-mobile-logo-surf-school]");
    const benefits = mobile.locator("[data-home-v2-hero-mobile-benefits]");
    const benefitItems = benefits.locator("[data-home-v2-mobile-benefit]");
    const videoStrip = mobile.locator("[data-home-v2-hero-mobile-video-strip]");
    const video = videoStrip.locator("video");
    const header = page.locator('[data-home-v2-header="true"]');
    const howItWorks = page.locator("[data-home-v2-how-it-works]");

    await expect(mobile).toBeVisible();
    await expect(hero.locator("[data-home-v2-hero-adaptive]")).toBeHidden();
    await expect(hero.locator("[data-home-v2-hero-desktop-en]")).toBeHidden();
    await expect(benefitItems).toHaveCount(3);
    await expect(video).toHaveAttribute("autoplay", "");
    await expect(video).toHaveAttribute("loop", "");
    await expect(video).toHaveAttribute("playsinline", "");
    await expect(video.locator("source")).toHaveAttribute("src", "/hero-surf.mp4");
    expect(await video.evaluate((node) => ({ muted: node.muted, controls: node.controls, tagName: node.tagName }))).toEqual({
      muted: true,
      controls: false,
      tagName: "VIDEO",
    });

    expectRectClose(await relativeRect(heroSelector, hero), { left: 0, top: 0, width: 390, height: 549 }, 2);
    expectRectClose(await relativeRect(heroSelector, epic), { left: 20, top: 59.04, width: 110.859, height: 49.537 }, 1);
    expectRectClose(await relativeRect(heroSelector, accent), { left: 84.398, top: 40, width: 14.56, height: 14.56 }, 1);
    expectRectClose(await relativeRect(heroSelector, surfSchool), { left: 20, top: 123, width: 170.107, height: 23.594 }, 1);
    expectRectClose(await relativeRect(heroSelector, benefits), { left: 91, top: 190, width: 279.6, height: 130.4 }, 1);
    const benefitRects = await benefitItems.evaluateAll((nodes) => {
      const heroBox = document.querySelector('[data-home-v2-hero][data-home-v2-hero-locale="en"]').getBoundingClientRect();
      return nodes.map((node) => {
        const box = node.getBoundingClientRect();
        return { left: box.left - heroBox.left, top: box.top - heroBox.top, width: box.width, height: box.height };
      });
    });
    [
      { left: 91, top: 190, width: 279, height: 31.6 },
      { left: 112, top: 239, width: 258.6, height: 31 },
      { left: 162, top: 290, width: 208.2, height: 30.4 },
    ].forEach((expected, index) => expectRectClose(benefitRects[index], expected, 1));
    expectRectClose(await relativeRect(heroSelector, videoStrip), { left: -103, top: 349, width: 595, height: 170 }, 1);

    const seams = await page.evaluate(() => {
      const box = (selector) => document.querySelector(selector).getBoundingClientRect();
      const headerBox = box('[data-home-v2-header="true"]');
      const heroBox = box('[data-home-v2-hero][data-home-v2-hero-locale="en"]');
      const howBox = box("[data-home-v2-how-it-works]");
      return {
        headerToHero: heroBox.top - headerBox.bottom,
        heroToHow: howBox.top - heroBox.bottom,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    expect(seams).toEqual({ headerToHero: 0, heroToHow: 0, overflow: 0 });

    await video.evaluate(async (node) => {
      node.pause();
      if (node.readyState < 1) await new Promise((resolve) => node.addEventListener("loadedmetadata", resolve, { once: true }));
      node.currentTime = 6.75;
      await new Promise((resolve) => node.addEventListener("seeked", resolve, { once: true }));
    });
    await hero.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-en-hero-390.png"),
      animations: "disabled",
    });
    await page.screenshot({
      path: path.join(process.cwd(), "tmp", "home-v2-responsive-pass1", "home-v2-pass1-390.png"),
      animations: "disabled",
    });
  });

  test("preserves the composition at 375px without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const hero = page.locator('[data-home-v2-hero][data-home-v2-hero-locale="en"]');
    await expect(hero.locator("[data-home-v2-hero-mobile-en]")).toBeVisible();
    expect(await hero.evaluate((node) => node.getBoundingClientRect().height)).toBeCloseTo(527.885, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });

  test("leaves the approved desktop EN Hero geometry unchanged", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const hero = page.locator('[data-home-v2-hero][data-home-v2-hero-locale="en"]');
    const desktop = hero.locator("[data-home-v2-hero-desktop-en]");
    await expect(desktop).toBeVisible();
    await expect(hero.locator("[data-home-v2-hero-mobile-en]")).toBeHidden();
    await expect(hero.locator("[data-home-v2-hero-adaptive]")).toBeHidden();
    expect(await hero.evaluate((node) => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }))).toEqual({
      width: 1440,
      height: 726,
    });
    expect(await desktop.locator("[data-home-v2-hero-video-strip]").evaluate((node) => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }))).toEqual({
      width: 1440,
      height: 176,
    });
    await page.screenshot({
      path: path.join(process.cwd(), "tmp", "home-v2-responsive-pass1", "home-v2-pass1-1440.png"),
      animations: "disabled",
    });
  });

  for (const width of [904, 1200]) {
    test(`uses the fluid adaptive presentation at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
      const hero = page.locator('[data-home-v2-hero][data-home-v2-hero-locale="en"]');
      const adaptive = hero.locator("[data-home-v2-hero-adaptive]");
      await expect(adaptive).toBeVisible();
      await expect(hero.locator("[data-home-v2-hero-mobile-en]")).toBeHidden();
      await expect(hero.locator("[data-home-v2-hero-desktop-en]")).toBeHidden();
      expect((await hero.boundingBox()).width).toBeCloseTo(width, 0);
      const bounds = await adaptive.evaluate((node) => {
        const selectors = ["[data-home-v2-hero-lockup]", "[data-home-v2-hero-benefits]"];
        return selectors.map((selector) => {
          const box = node.querySelector(selector).getBoundingClientRect();
          return { left: box.left, right: box.right };
        });
      });
      expect(bounds.every((box) => box.left >= 0 && box.right <= width)).toBeTruthy();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
      await page.screenshot({
        path: path.join(process.cwd(), "tmp", "home-v2-responsive-pass1", `home-v2-pass1-${width}.png`),
        animations: "disabled",
      });
    });
  }

  test("keeps the RU route rendering through the adaptive presentation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    const hero = page.locator('[data-home-v2-hero][data-home-v2-hero-locale="ru"]');
    await expect(hero).toBeVisible();
    await expect(hero.locator("[data-home-v2-hero-mobile-en]")).toHaveCount(0);
    await expect(hero.locator("[data-home-v2-hero-adaptive]")).toBeVisible();
  });
});
