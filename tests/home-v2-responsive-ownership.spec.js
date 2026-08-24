const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const qaDir = path.join(process.cwd(), "tmp", "home-v2-responsive-ownership");
const widths = [375, 390, 480, 538, 639, 640, 656, 728, 767, 768, 804, 899, 900, 904, 1024, 1108, 1199, 1200, 1280, 1366, 1439, 1440];

async function ready(page, route = "/home-v2") {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function visibleCount(page, selector) {
  return page.locator(selector).evaluateAll((nodes) => nodes.filter((node) => {
    const style = getComputedStyle(node);
    return style.display !== "none" && style.visibility !== "hidden" && node.getClientRects().length > 0;
  }).length);
}

async function expectOnlyVisible(page, selectors, active) {
  for (const [name, selector] of Object.entries(selectors)) {
    expect(await visibleCount(page, selector), `${name} visibility`).toBe(name === active ? 1 : 0);
  }
}

async function expectInsideViewport(locator, width) {
  const result = await locator.evaluate((node, viewportWidth) => {
    const rect = node.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      width: rect.width,
      viewportWidth,
    };
  }, width);
  expect(result.width).toBeGreaterThan(0);
  expect(result.left).toBeGreaterThanOrEqual(-2);
  expect(result.right).toBeLessThanOrEqual(width + 2);
}

test.describe("Home V2 final responsive ownership", () => {
  for (const width of widths) {
    test(`has one owner and no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);

      const family = width < 640 ? "mobile" : width < 1440 ? "adaptive" : "desktop";
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-hero-mobile-en]",
        adaptive: "[data-home-v2-hero-adaptive]",
        desktop: "[data-home-v2-hero-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-how-mobile-en]",
        adaptive: "[data-home-v2-how-adaptive]",
        desktop: "[data-home-v2-how-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-lessons-mobile-en]",
        adaptive: "[data-home-v2-lessons-adaptive]",
        desktop: "[data-home-v2-lessons-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-included-mobile-en]",
        adaptive: "[data-home-v2-included-adaptive]",
        desktop: "[data-home-v2-included-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-rentals-mobile-en]",
        adaptive: "[data-rentals-adaptive]",
        desktop: "[data-rentals-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-reviews-mobile-en]",
        adaptive: "[data-home-v2-reviews-adaptive]",
        desktop: "[data-home-v2-reviews-desktop-en]",
      }, family);
      await expectOnlyVisible(page, {
        mobile: "[data-home-v2-faq-mobile-en]",
        adaptive: "[data-home-v2-faq-adaptive]",
        desktop: "[data-home-v2-faq-desktop-en]",
      }, family);

      expect(await visibleCount(page, "[data-home-v2-header='true']")).toBe(1);
      expect(await visibleCount(page, "[data-home-v2-gallery]")).toBe(1);
      expect(await visibleCount(page, "[data-home-v2-footer='true']")).toBe(1);
      expect(await visibleCount(page, "[data-home-v2-conditions-mobile]"), "conditions mobile owner").toBe(family === "mobile" ? 1 : 0);
      expect(await visibleCount(page, "[data-home-v2-conditions-adaptive]"), "conditions adaptive/desktop owner").toBe(family === "mobile" ? 0 : 1);
      expect(await visibleCount(page, "[data-home-v2-events-mobile]"), "events mobile owner").toBe(family === "mobile" ? 1 : 0);
      expect(await visibleCount(page, "[data-home-v2-events-layout]"), "events adaptive/desktop owner").toBe(family === "mobile" ? 0 : 1);

      await expect(page.locator("[data-home-v2-lessons-legacy], [data-home-v2-lessons-tablet], [data-home-v2-lessons-old], [data-home-v2-how-adaptive-grid], [data-how-card-tone]")).toHaveCount(0);
      await expect(page.locator("[data-home-v2-events-adaptive] span").filter({ hasText: /^(FESTIVAL|COMMUNITY|REGULAR)$/i })).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

      if (family === "adaptive") {
        const reviewCard = page.locator("[data-home-v2-reviews-adaptive] [data-home-v2-review-card]").first();
        await expect(reviewCard).toHaveCSS("background-color", "rgb(46, 46, 46)");
        await expect(reviewCard).toHaveCSS("border-top-width", "3px");
        await expect(page.locator("[data-home-v2-reviews-adaptive] [data-card-divider]").first()).toHaveCSS("background-color", "rgb(57, 89, 98)");
        await expect(page.locator("[data-home-v2-events-adaptive] [data-home-v2-event-card]").first()).toHaveCSS("background-color", "rgb(46, 46, 46)");
        await expect(page.locator("[data-home-v2-faq-adaptive] [data-faq-heading]")).toHaveCSS("color", "rgb(88, 88, 88)");
        const filledGalleryMasks = await page.locator("[data-home-v2-gallery-filters] button > span[aria-hidden='true']").evaluateAll((nodes) => nodes.filter((node) => {
          const style = getComputedStyle(node);
          return style.display !== "none" && style.maskImage !== "none";
        }).length);
        expect(filledGalleryMasks).toBe(0);
      }

      const visibleConditions = page.locator(family === "mobile" ? "[data-home-v2-conditions-mobile]" : "[data-home-v2-conditions-adaptive]");
      const visibleEvents = page.locator(family === "mobile" ? "[data-home-v2-events-mobile]" : "[data-home-v2-events-layout]");
      await expectInsideViewport(visibleConditions, width);
      await expectInsideViewport(visibleEvents, width);
      await expectInsideViewport(page.locator("[data-home-v2-gallery-grid]"), width);
    });
  }

  test("preserves exact 390 and 1440 anchors", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1000 });
    await ready(page);
    await expect(page.locator("[data-home-v2-lessons-block]")).toHaveCSS("height", "1103px");
    await expect(page.locator("[data-home-v2-included]")).toHaveCSS("height", "746px");
    await expect(page.locator("[data-home-v2-rentals-block]")).toHaveCSS("height", "790px");
    await expect(page.locator("[data-home-v2-conditions-mobile]")).toHaveCSS("height", "1048px");
    await expect(page.locator("[data-home-v2-reviews-mobile-en]")).toHaveCSS("height", "853px");

    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page);
    await expect(page.locator("[data-home-v2-lessons-block]")).toHaveCSS("height", "843px");
    await expect(page.locator("[data-home-v2-included]")).toHaveCSS("height", "639px");
    await expect(page.locator("[data-home-v2-rentals-block]")).toHaveCSS("height", "900px");
    await expect(page.locator("[data-home-v2-reviews-grid]")).toHaveCSS("height", "684px");
    await expect(page.locator("[data-home-v2-events]")).toHaveCSS("height", "1270px");
    await expect(page.locator("[data-home-v2-gallery]")).toHaveCSS("height", "1062px");
  });

  test("keeps the shared RU ownership and functional surfaces", async ({ page }) => {
    for (const width of [390, 656, 904, 1200, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page, "/ru/home-v2");
      const family = width < 640 ? "mobile" : width < 1440 ? "adaptive" : "desktop";
      expect(await visibleCount(page, "[data-home-v2-conditions-mobile]")).toBe(family === "mobile" ? 1 : 0);
      expect(await visibleCount(page, "[data-home-v2-conditions-adaptive]")).toBe(family === "mobile" ? 0 : 1);
      expect(await visibleCount(page, "[data-home-v2-reviews-adaptive]")).toBe(family === "desktop" ? 0 : 1);
      expect(await visibleCount(page, "[data-home-v2-faq-adaptive]")).toBe(family === "desktop" ? 0 : 1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    }
  });

  const captures = [
    [538, "reviews-faq", "[data-home-v2-faq]", 360],
    [656, "faq-events", "[data-home-v2-events]", 360],
    [728, "faq-events", "[data-home-v2-events]", 360],
    [804, "events-gallery", "[data-home-v2-gallery]", 360],
    [904, "conditions-reviews", "[data-home-v2-reviews]", 360],
    [1200, "lower-page", "[data-home-v2-events]", 540],
    [1439, "lower-page", "[data-home-v2-events]", 540],
    [1440, "exact-lower-page", "[data-home-v2-events]", 540],
  ];

  for (const [width, label, target, lead] of captures) {
    test(`captures ${label} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);
      const top = await page.locator(target).evaluate((node) => node.getBoundingClientRect().top + window.scrollY);
      await page.evaluate((y) => {
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, Math.max(0, y));
      }, top - lead);
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(qaDir, `home-v2-${width}-${label}.png`),
        animations: "disabled",
        style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
      });
    });
  }
});
