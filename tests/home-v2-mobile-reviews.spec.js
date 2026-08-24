const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const focusedScreenshot = path.join(process.cwd(), "test-results", "home-v2-mobile-reviews-focused.png");

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function relativeBox(root, locator) {
  const [rootBox, box] = await Promise.all([root.boundingBox(), locator.boundingBox()]);
  return {
    x: Number((box.x - rootBox.x).toFixed(3)),
    y: Number((box.y - rootBox.y).toFixed(3)),
    w: Number(box.width.toFixed(3)),
    h: Number(box.height.toFixed(3)),
  };
}

async function expectBox(root, locator, handoff, tolerance = 0.8) {
  const actual = await relativeBox(root, locator);
  for (const key of ["x", "y", "w", "h"]) {
    expect(Math.abs(actual[key] - handoff[key]), `${key}: ${actual[key]} vs ${handoff[key]}`).toBeLessThanOrEqual(tolerance);
  }
}

test.describe("Home V2 Mobile EN Reviews handoff", () => {
  test("matches the 390px handoff and preserves both section joins", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2?mobile_reviews_qa=390`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-reviews]");
    const artboard = section.locator("[data-home-v2-reviews-mobile-en]");
    const cards = artboard.locator("[data-mobile-review-card]");
    const outlines = artboard.locator('[data-review-card-layer="outline"]');
    const dividers = artboard.locator("[data-card-divider]");
    const rating = artboard.locator("[data-google-rating-summary-mobile]");
    const cta = artboard.locator("[data-google-maps-cta-mobile]");

    await artboard.scrollIntoViewIfNeeded();
    await expect(artboard).toBeVisible();
    await expect(cards).toHaveCount(3);
    await expect(outlines).toHaveCount(3);
    await expect(dividers).toHaveCount(3);
    await expect(artboard.locator('[data-review-card-layer="offset"]')).toHaveCount(0);
    await expect(artboard.locator("[data-surf-family-bridge-illustration]")).toHaveCount(0);
    await expect(cards.nth(0).locator("[data-review-quote]")).toContainText("Great lessons! The team made us");
    await expect(cards.nth(0).locator("[data-review-quote]")).toContainText("fall in love with surfing! 🔥.");
    await expect(cards.nth(1).locator("[data-review-quote]")).toContainText("Excellent team!");
    await expect(cards.nth(1).locator("[data-review-quote]")).toContainText("Pasha is a very cool instructor! 👍");
    await expect(cards.nth(2).locator("[data-review-quote]")).toContainText("Despite of the bad weather the");
    await expect(cards.nth(2).locator("[data-review-quote]")).toContainText("instructor was friendly. 👌");
    await expect(artboard.locator("[data-rating-label]")).toHaveText("Google reviews");
    await expect(artboard.locator("[data-rating-value]")).toHaveText("5.0");
    await expect(artboard.locator("[data-rating-star]")).toHaveCount(5);
    await expect(cta).toHaveAttribute("href", /google\.com\/maps\/place\/EPIC\+Surf\+School/);
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", "noopener noreferrer");

    await expectBox(artboard, artboard, { x: 0, y: 0, w: 390, h: 853 });
    await expectBox(artboard, cards.nth(0), { x: 28.987, y: 42, w: 333.218, h: 179.12 });
    await expectBox(artboard, cards.nth(1), { x: 24.722, y: 235.001, w: 340.459, h: 183.475 });
    await expectBox(artboard, cards.nth(2), { x: 21, y: 432, w: 348.538, h: 191.364 });
    await expectBox(artboard, dividers.nth(0), { x: 53.891, y: 161.933, w: 267.105, h: 3.354 });
    await expectBox(artboard, dividers.nth(1), { x: 50.138, y: 356.222, w: 267.662, h: 2.794 });
    await expectBox(artboard, dividers.nth(2), { x: 50.44, y: 558, w: 268.305, h: 4.145 });
    await expectBox(artboard, rating, { x: 111.396, y: 637.517, w: 168.876, h: 49.524 });
    await expectBox(artboard, cta, { x: 106, y: 725, w: 189.821, h: 71.132 });

    const outlineStyles = await outlines.evaluateAll((nodes) => nodes.map((node) => {
      const style = getComputedStyle(node);
      return { borderColor: style.borderColor, borderStyle: style.borderStyle, borderWidth: style.borderWidth };
    }));
    outlineStyles.forEach((style) => {
      expect(style.borderColor).toBe("rgb(246, 246, 246)");
      expect(style.borderStyle).toBe("solid");
      expect(parseFloat(style.borderWidth)).toBeGreaterThanOrEqual(3);
      expect(parseFloat(style.borderWidth)).toBeLessThanOrEqual(3.2);
    });

    const conditions = page.locator('[data-home-v2-flow-stage="livecam-forecast"]');
    const faq = page.locator("[data-home-v2-faq]");
    const [conditionsBox, reviewsBox, faqBox] = await Promise.all([conditions.boundingBox(), section.boundingBox(), faq.boundingBox()]);
    expect(Math.abs(reviewsBox.y - (conditionsBox.y + conditionsBox.height))).toBeLessThanOrEqual(1);
    expect(Math.abs(faqBox.y - (reviewsBox.y + reviewsBox.height))).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

    await artboard.screenshot({
      path: focusedScreenshot,
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });
  });

  test("keeps the 375px composition inside the viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2?mobile_reviews_qa=375`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const artboard = page.locator("[data-home-v2-reviews-mobile-en]");
    const targets = artboard.locator("[data-mobile-review-card], [data-google-rating-summary-mobile], [data-google-maps-cta-mobile]");
    const bounds = await targets.evaluateAll((nodes) => nodes.map((node) => {
      const box = node.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    }));
    bounds.forEach((box) => {
      expect(box.left).toBeGreaterThanOrEqual(-0.5);
      expect(box.right).toBeLessThanOrEqual(375.5);
      expect(box.width).toBeGreaterThan(0);
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });

  test("protects Desktop EN Reviews and keeps RU renderable", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2?mobile_reviews_qa=desktop`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await expect(page.locator("[data-home-v2-reviews-desktop-en]")).toBeVisible();
    await expect(page.locator("[data-home-v2-reviews-mobile-en]")).toBeHidden();
    await expect(page.locator("[data-surf-family-bridge-illustration]")).toBeVisible();
    await expect(page.locator("[data-home-v2-reviews-desktop-en] [data-home-v2-review-card]")).toHaveCount(3);

    await page.goto(`${baseUrl}/ru/home-v2?mobile_reviews_qa=ru`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await expect(page.locator("[data-home-v2-root]")).toBeVisible();
    await expect(page.locator("[data-home-v2-reviews]")).toBeVisible();
    await expect(page.locator("[data-home-v2-reviews-mobile-en]")).toHaveCount(0);
  });
});
