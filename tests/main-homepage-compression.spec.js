const { test, expect } = require("@playwright/test");

const url = "http://localhost:3000/";

test.describe("Main homepage controlled compression", () => {
  test("keeps the mobile flow, carousel and accordion usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await expect(page.locator('[data-section="why-epic"] [data-why-card]')).toHaveCount(4);
    await expect(page.locator("#how-it-works [data-how-step]")).toHaveCount(4);
    await expect(page.locator("#lessons [data-lesson-card]")).toHaveCount(5);
    await expect(page.locator("#reviews [data-review-card]")).toHaveCount(3);

    const carousel = page.locator("#lessons [data-lessons-carousel]");
    await expect(carousel).toBeVisible();
    expect(await carousel.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);

    const firstCard = page.locator("#lessons [data-lesson-card]").first();
    const firstCta = firstCard.locator("[data-lesson-cta]");
    const [cardBox, ctaBox] = await Promise.all([firstCard.boundingBox(), firstCta.boundingBox()]);
    expect(ctaBox.y).toBeGreaterThanOrEqual(cardBox.y);
    expect(ctaBox.y + ctaBox.height).toBeLessThanOrEqual(cardBox.y + cardBox.height + 1);

    const faqQuestion = page.locator('[data-section="faq"] [data-faq-row]').first().getByRole("button");
    await faqQuestion.click();
    await expect(page.locator('[data-section="faq"] [data-faq-row]').first().locator("p")).toBeVisible();

    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  test("removes the pathological stacked tablet height without changing section order", async ({ page }) => {
    await page.setViewportSize({ width: 640, height: 900 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const how640 = await page.locator("#how-it-works").evaluate((element) => element.getBoundingClientRect().height);
    expect(how640).toBeLessThan(2600);

    await page.setViewportSize({ width: 768, height: 1024 });
    const how768 = await page.locator("#how-it-works").evaluate((element) => element.getBoundingClientRect().height);
    expect(how768).toBeLessThan(2600);
    expect(Math.abs(how640 - how768)).toBeLessThan(700);

    const orderedSections = await page.locator('body section, body footer').evaluateAll((elements) =>
      elements
        .map((element) => element.id || element.getAttribute("data-section"))
        .filter((value) => ["why-epic", "how-it-works", "lessons", "reviews", "faq"].includes(value))
    );
    expect(orderedSections).toEqual(["why-epic", "how-it-works", "lessons", "reviews", "faq"]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  test("preserves the existing desktop How It Works composition", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const steps = page.locator("#how-it-works [data-how-step]");
    await expect(steps).toHaveCount(4);
    const first = await steps.first().locator(":scope > div").evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect())
    );
    expect(first[0].right).toBeLessThanOrEqual(first[1].left + 1);
    expect(Math.min(first[0].bottom, first[1].bottom)).toBeGreaterThan(Math.max(first[0].top, first[1].top));
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
});
