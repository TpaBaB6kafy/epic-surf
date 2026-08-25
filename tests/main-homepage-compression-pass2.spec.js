const { test, expect } = require("@playwright/test");

const url = "http://localhost:3000/";

async function expectNoHorizontalOverflow(page) {
  expect(
    await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
  ).toBeLessThanOrEqual(1);
}

test.describe("Main homepage controlled compression pass 2", () => {
  test("keeps Forecast readable as a mobile 2x2 dashboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const metrics = page.locator("#forecast [data-forecast-metric]");
    await expect(metrics).toHaveCount(4);

    const boxes = await metrics.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          overflowX: element.scrollWidth - element.clientWidth,
          overflowY: element.scrollHeight - element.clientHeight,
        };
      })
    );

    expect(Math.abs(boxes[0].top - boxes[1].top)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxes[2].top - boxes[3].top)).toBeLessThanOrEqual(1);
    expect(boxes[2].top).toBeGreaterThan(boxes[0].bottom);
    expect(boxes[0].right).toBeLessThanOrEqual(boxes[1].left + 1);
    expect(boxes.every((box) => box.overflowX <= 1 && box.overflowY <= 1)).toBe(true);

    await expect(page.locator("#forecast [data-forecast-windy] iframe")).toBeVisible();
    const forecastHeight = await page.locator("#forecast").evaluate(
      (element) => element.getBoundingClientRect().height
    );
    expect(forecastHeight).toBeLessThan(1150);
    await expectNoHorizontalOverflow(page);
  });

  test("keeps Live Cam actions and preview usable while removing tablet stacking", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await expect(page.locator("#live-cam [data-live-cam-preview] iframe")).toBeVisible();
    await expect(page.locator("#live-cam [data-live-cam-primary-actions] a")).toHaveCount(1);
    await expect(page.locator("#live-cam [data-live-cam-provider-action]")).toHaveCount(2);

    const liveHeight = await page.locator("#live-cam").evaluate(
      (element) => element.getBoundingClientRect().height
    );
    expect(liveHeight).toBeLessThan(1000);
    await expectNoHorizontalOverflow(page);
  });

  test("preserves event hierarchy, gallery controls, and the full footer utility layer", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(url, { waitUntil: "domcontentloaded" });

    const featured = page.locator('#events [data-event-card="featured"]');
    const secondary = page.locator('#events [data-event-card="secondary"]');
    await expect(featured).toHaveCount(1);
    await expect(secondary).toHaveCount(3);
    await expect(page.locator("#events [data-event-card] button")).toHaveCount(4);
    await expect(page.locator("#events [data-event-media] img")).toHaveCount(4);

    const eventCardsContainButtons = await page.locator("#events [data-event-card]").evaluateAll(
      (cards) => cards.every((card) => {
        const button = card.querySelector("button");
        const cardRect = card.getBoundingClientRect();
        const buttonRect = button?.getBoundingClientRect();
        return buttonRect && buttonRect.top >= cardRect.top && buttonRect.bottom <= cardRect.bottom + 1;
      })
    );
    expect(eventCardsContainButtons).toBe(true);

    await expect(page.locator("footer#location [data-footer-map] iframe")).toBeVisible();
    await expect(page.locator('footer#location a[aria-label*="Instagram"]')).toHaveCount(1);
    await expect(page.locator('footer#location a[aria-label*="Google Maps"]')).toHaveCount(1);
    await expect(page.locator("footer#location [data-footer-surf-info] a").first()).toBeVisible();

    const ordered = await page.locator("body section, body footer").evaluateAll((elements) =>
      elements
        .map((element) => element.id)
        .filter((id) => ["live-cam", "forecast", "events", "location"].includes(id))
    );
    expect(ordered).toEqual(["live-cam", "forecast", "events", "location"]);
    await expectNoHorizontalOverflow(page);
  });
});
