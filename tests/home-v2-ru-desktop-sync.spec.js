const { test, expect } = require("@playwright/test");
const { mkdirSync } = require("node:fs");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function warmLazyAssets(page) {
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < pageHeight; top += 750) {
    await page.evaluate((scrollTop) => window.scrollTo(0, scrollTop), top);
    await page.waitForTimeout(140);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
}

test.describe("Home V2 Desktop RU approved presentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
  });

  test("uses every approved desktop section variant without legacy RU blocks", async ({ page }) => {
    const approvedDesktopSelectors = [
      "[data-home-v2-hero-desktop]",
      "[data-home-v2-how-desktop]",
      "[data-home-v2-lessons-desktop]",
      "[data-home-v2-included-desktop]",
      "[data-rentals-desktop]",
      "[data-live-cam-artboard][data-forecast-artboard]",
      "[data-home-v2-reviews-desktop]",
      "[data-home-v2-faq-desktop]",
      "[data-home-v2-events-canvas]",
      "[data-home-v2-gallery-canvas]",
      "[data-home-v2-footer]",
    ];

    for (const selector of approvedDesktopSelectors) {
      await expect(page.locator(selector)).toBeVisible();
    }

    await expect(page.locator("[data-home-v2-hero-legacy]")).toBeHidden();
    await expect(page.locator("[data-rentals-mobile-and-ru]")).toBeHidden();
    await expect(page.locator("[data-home-v2-reviews-mobile]")).toBeHidden();
    await expect(page.locator("[data-forecast-mobile-layout]")).toBeHidden();
    await expect(page.locator("[data-home-v2-language-switcher]")).toHaveAttribute("href", "/home-v2");
    await expect(page.locator("[data-home-v2-footer-map] iframe")).toHaveAttribute("src", /google\.com\/maps\/embed/);
    await expect(page.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);
    await page.locator("[data-home-v2-live-cam][data-home-v2-forecast]").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-home-v2-live-cam][data-home-v2-forecast]")).toHaveAttribute("data-live-cam-mounted", "true");
    await expect(page.locator("[data-live-cam-iframe]")).toHaveAttribute("loading", "lazy");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
  });

  test("keeps all lesson states and localized action contracts", async ({ page }) => {
    const lessonIds = ["group", "split", "private", "surf_skate", "lineup_pro"];

    for (const lessonId of lessonIds) {
      await page.locator(`[data-lesson-selector-item="${lessonId}"]`).click();
      await expect(page.locator(`[data-lesson-selector-item="${lessonId}"]`)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator("[data-home-v2-lesson-detail] [data-lessons-photo]")).toHaveAttribute("src", new RegExp(`lesson-${lessonId.replace("lineup_pro", "line-up-pro").replace("surf_skate", "surf-skate")}-desktop`));
    }

    await page.locator('[data-lesson-selector-item="group"]').click();
    await expect(page.locator("[data-home-v2-booking-cta]")).toHaveText("Записаться");
    await page.locator('[data-lesson-selector-item="surf_skate"]').click();
    await expect(page.locator("[data-home-v2-booking-cta]")).toHaveAttribute("href", /wa\.me|whatsapp/);
    await expect(page.locator("[data-home-v2-rental-catalog-cta]")).toHaveAttribute("href", "/ru/surfboard-rental-danang");
  });

  test("keeps FAQ, Events and Gallery interactions", async ({ page }) => {
    const faqControls = page.locator("[data-home-v2-faq-desktop] [data-faq-control]");
    await expect(faqControls).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const control = faqControls.nth(index);
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "true");
    }

    await page.locator('[data-home-v2-event-card="secondary-2"] [data-home-v2-event-cta]').click();
    await expect(page.locator('[data-home-v2-gallery-filter="sunset"]')).toHaveAttribute("aria-pressed", "true");

    const galleryFilters = page.locator("[data-home-v2-gallery-filter]");
    await expect(galleryFilters).toHaveCount(5);
    for (let index = 0; index < 5; index += 1) {
      const filter = galleryFilters.nth(index);
      await filter.click();
      await expect(filter).toHaveAttribute("aria-pressed", "true");
    }
  });

  test("keeps localized rentals, event CTAs and wind stats legible", async ({ page }) => {
    const rentalsIntro = page.locator("[data-rentals-desktop] [data-rentals-intro]");
    const introParagraph = rentalsIntro.locator("p");
    const eventCtas = page.locator("[data-home-v2-events-canvas] [data-home-v2-event-cta]");
    const windValue = page.locator('[data-conditions-stat="wind"] [data-conditions-stat-value]');
    const windUnit = page.locator('[data-conditions-stat="wind"] [data-conditions-stat-unit]');

    await expect(eventCtas).toHaveCount(4);
    await expect(eventCtas).toHaveText(["Фото", "Фото", "Фото", "Фото"]);

    const rentalAlignment = await rentalsIntro.evaluate((node) => {
      const container = node.getBoundingClientRect();
      const text = node.querySelector("p").getBoundingClientRect();
      return Math.abs((container.left + container.width / 2) - (text.left + text.width / 2));
    });
    expect(rentalAlignment).toBeLessThanOrEqual(1);
    await expect(introParagraph).toHaveCSS("text-align", "center");

    const [valueBox, unitBox] = await Promise.all([windValue.boundingBox(), windUnit.boundingBox()]);
    expect(valueBox).not.toBeNull();
    expect(unitBox).not.toBeNull();
    expect(valueBox.x + valueBox.width).toBeLessThanOrEqual(unitBox.x);
  });

  test("captures the approved EN and synchronized RU desktop pages", async ({ page }) => {
    const outputDir = path.join(process.cwd(), "test-results", "home-v2-ru-sync");
    const screenshotStyle = "nextjs-portal, [data-home-v2-messenger] { visibility: hidden !important; }";
    mkdirSync(outputDir, { recursive: true });

    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await warmLazyAssets(page);
    await page.screenshot({ path: path.join(outputDir, "desktop-en-full.png"), fullPage: true, animations: "disabled", style: screenshotStyle });

    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await warmLazyAssets(page);
    await page.screenshot({ path: path.join(outputDir, "desktop-ru-full.png"), fullPage: true, animations: "disabled", style: screenshotStyle });

    await page.locator("[data-home-v2-lessons-block]").screenshot({ path: path.join(outputDir, "desktop-ru-lessons.png"), animations: "disabled", style: screenshotStyle });
    await page.locator("[data-home-v2-included]").screenshot({ path: path.join(outputDir, "desktop-ru-included.png"), animations: "disabled", style: screenshotStyle });
    await page.locator("[data-home-v2-reviews]").screenshot({ path: path.join(outputDir, "desktop-ru-reviews.png"), animations: "disabled", style: screenshotStyle });
    await page.locator("[data-home-v2-faq]").screenshot({ path: path.join(outputDir, "desktop-ru-faq.png"), animations: "disabled", style: screenshotStyle });
  });
});
