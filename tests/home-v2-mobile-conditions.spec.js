const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const focusedScreenshot = path.join(process.cwd(), "test-results", "home-v2-mobile-en-conditions-390.png");

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function stubConditions(page, { height = 0.26, period = 4.35, windSpeed = 7, windDir = 225 } = {}) {
  await page.route("https://marine-api.open-meteo.com/**", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ current: { wave_height: height, wave_period: period } }),
  }));
  await page.route("https://api.open-meteo.com/**", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ current: { wind_speed_10m: windSpeed, wind_direction_10m: windDir } }),
  }));
}

async function relativeBox(root, selector) {
  return root.evaluate((node, targetSelector) => {
    const rootRect = node.getBoundingClientRect();
    const rect = node.querySelector(targetSelector).getBoundingClientRect();
    return {
      left: rect.left - rootRect.left,
      top: rect.top - rootRect.top,
      width: rect.width,
      height: rect.height,
    };
  }, selector);
}

test.describe.serial("Home V2 Mobile EN Live Cam & Forecast handoff", () => {
  test("matches the 390px handoff geometry and keeps the runtime integrations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await stubConditions(page);

    const previewRequests = [];
    page.on("request", (request) => {
      if (request.url().includes("danangsurfcam.com/embed/preview")) previewRequests.push(request.url());
    });

    await page.goto(`${baseUrl}/home-v2?mobile_conditions_qa=390`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    const artboard = section.locator("[data-conditions-mobile-en]");
    await expect(artboard).toBeVisible();
    await expect(section).toHaveAttribute("data-live-cam-mounted", "false");
    await expect(section.locator("[data-live-cam-iframe]")).toHaveCount(0);
    await expect(section.locator("[data-live-cam-placeholder]")).toHaveCount(1);
    expect(previewRequests).toHaveLength(0);

    await expect(section.locator('[data-live-cam-provider-action="primary"]')).toHaveAttribute("href", /danangsurfcam\.com/);
    await expect(section.locator('[data-live-cam-provider-action="secondary"]')).toHaveAttribute("href", /danangsurfcam\.com\/donate/);
    await expect(section.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);
    await expect(section.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("loading", "lazy");

    await section.scrollIntoViewIfNeeded();
    await expect(section).toHaveAttribute("data-live-cam-mounted", "true");
    await expect(section.locator("[data-live-cam-iframe]")).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
    await expect(section.locator("[data-live-cam-iframe]")).toHaveAttribute("loading", "lazy");
    await expect.poll(() => previewRequests.length).toBe(1);

    const expected = {
      "[data-live-cam-panel-mobile]": [20, 60, 350, 264],
      "[data-live-cam-preview]": [20, 60, 350, 227.912],
      '[data-conditions-heading="live-cam"]': [20, 86.651, 135.209, 17.611],
      "[data-live-cam-attribution-footer]": [20, 290.364, 350, 33.636],
      "[data-wave-height-callout]": [94, 360, 202.612, 61.236],
      '[data-conditions-stat="period"]': [46, 456, 143.1, 70.2],
      '[data-conditions-stat="wind"]': [209, 456, 142.2, 70.2],
      '[data-conditions-stat="direction"]': [46, 543, 143.1, 70.2],
      '[data-conditions-stat="water"]': [209, 543, 142.2, 70.2],
      "[data-forecast-map]": [20, 669, 350, 264],
      '[data-conditions-heading="forecast"]': [20.696, 694, 135.433, 19],
      "[data-conditions-cta]": [107, 953, 175, 70],
    };

    const rootBox = await artboard.boundingBox();
    expect(rootBox.width).toBeCloseTo(390, 1);
    expect(rootBox.height).toBeCloseTo(1048, 1);
    for (const [selector, [left, top, width, height]] of Object.entries(expected)) {
      const box = await relativeBox(artboard, selector);
      expect(Math.abs(box.left - left), `${selector} left`).toBeLessThanOrEqual(0.8);
      expect(Math.abs(box.top - top), `${selector} top`).toBeLessThanOrEqual(0.8);
      expect(Math.abs(box.width - width), `${selector} width`).toBeLessThanOrEqual(0.8);
      expect(Math.abs(box.height - height), `${selector} height`).toBeLessThanOrEqual(0.8);
    }

    await expect(artboard.locator('[data-conditions-stat="period"] [data-conditions-stat-value]')).toHaveText("4.35s");
    await expect(artboard.locator('[data-conditions-stat="wind"] [data-conditions-stat-value]')).toHaveText("7");
    await expect(artboard.locator('[data-conditions-stat="direction"] [data-conditions-stat-value]')).toHaveText("SW");
    await expect(artboard.locator('[data-conditions-stat="water"] [data-conditions-stat-value]')).toHaveText("26°C");

    const cta = artboard.locator("[data-conditions-cta]");
    await cta.evaluate((element) => element.addEventListener("click", (event) => event.preventDefault(), { once: true }));
    await cta.click();
    expect(decodeURIComponent(await cta.getAttribute("href"))).toContain("I checked the My Khe live cam");

    const rentals = page.locator('[data-home-v2-flow-stage="rental"]');
    const conditionsStage = page.locator('[data-home-v2-flow-stage="livecam-forecast"]');
    const [rentalsBox, conditionsBox] = await Promise.all([rentals.boundingBox(), conditionsStage.boundingBox()]);
    expect(conditionsBox.y - (rentalsBox.y + rentalsBox.height)).toBeCloseTo(32, 0);

    const reviews = page.locator("[data-home-v2-reviews]");
    const reviewsBox = await reviews.boundingBox();
    const sectionBox = await section.boundingBox();
    expect(reviewsBox.y).toBeGreaterThanOrEqual(sectionBox.y + sectionBox.height - 1);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    await page.waitForTimeout(6000);
    await artboard.screenshot({
      path: focusedScreenshot,
      animations: "disabled",
      style: '[data-home-v2-messenger], nextjs-portal { display: none !important; }',
    });
  });

  test("keeps the 375px layout in bounds and renders live data", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await stubConditions(page, { height: 0.8, period: 5.1, windSpeed: 11.4, windDir: 270 });
    await page.goto(`${baseUrl}/home-v2?mobile_conditions_qa=375`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    await section.scrollIntoViewIfNeeded();
    const artboard = section.locator("[data-conditions-mobile-en]");
    await expect(artboard.locator('[data-conditions-stat="period"] [data-conditions-stat-value]')).toHaveText("5.1s");
    await expect(artboard.locator('[data-conditions-stat="wind"] [data-conditions-stat-value]')).toHaveText("11");
    await expect(artboard.locator('[data-conditions-stat="direction"] [data-conditions-stat-value]')).toHaveText("W");

    const frames = artboard.locator("[data-live-cam-panel-mobile], [data-forecast-stats-panel-mobile], [data-forecast-map], [data-conditions-cta]");
    for (const frame of await frames.all()) {
      const box = await frame.boundingBox();
      expect(box.x).toBeGreaterThanOrEqual(-0.5);
      expect(box.x + box.width).toBeLessThanOrEqual(375.5);
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("protects desktop EN and keeps RU rendering", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2?conditions_desktop_protection=1`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    const desktopArtboard = page.locator("[data-live-cam-artboard][data-forecast-artboard]");
    await expect(desktopArtboard).toBeVisible();
    const desktopBox = await desktopArtboard.boundingBox();
    expect(desktopBox.width).toBeCloseTo(1440, 0);
    expect(desktopBox.height).toBeCloseTo(790, 0);
    await expect(page.locator('[data-forecast-panel] iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com/);
    await page.locator("[data-home-v2-live-cam]").scrollIntoViewIfNeeded();
    await expect(page.locator('[data-live-cam-panel] [data-live-cam-iframe]')).toHaveAttribute("loading", "lazy");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/ru/home-v2?conditions_ru_smoke=1`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    const ruConditions = page.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    await expect(ruConditions).toBeVisible();
    await expect(ruConditions.locator("[data-live-cam-preview]")).toHaveCount(1);
    await expect(ruConditions.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com/);
  });
});
