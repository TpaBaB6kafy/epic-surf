const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function relativeBox(root, locator) {
  const [rootBox, box] = await Promise.all([root.boundingBox(), locator.boundingBox()]);
  return {
    left: Number((box.x - rootBox.x).toFixed(3)),
    top: Number((box.y - rootBox.y).toFixed(3)),
    width: Number(box.width.toFixed(3)),
    height: Number(box.height.toFixed(3)),
  };
}

test.describe("Home V2 Mobile EN Rentals", () => {
  test("matches the 390px handoff geometry and captures the focused section", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const root = page.locator("[data-rentals-mobile-en]");
    await root.scrollIntoViewIfNeeded();
    await expect(root).toBeVisible();
    await expect(page.locator("[data-rentals-mobile-and-ru]")).toHaveCount(0);

    const geometry = {
      root: await relativeBox(root, root),
      photo: await relativeBox(root, root.locator('[data-rentals-layer="background-photo"]')),
      heading: await relativeBox(root, root.locator("[data-rentals-heading]")),
      offer: await relativeBox(root, root.locator("[data-rentals-offer-surface]")),
      price: await relativeBox(root, root.locator("[data-rentals-price-block]")),
      chooseBoard: await relativeBox(root, root.locator("[data-home-v2-rental-catalog-cta]")),
      rentNow: await relativeBox(root, root.locator("[data-home-v2-rental-cta]")),
      intro: await relativeBox(root, root.locator("[data-rentals-intro-surface]")),
      introDescription: await relativeBox(root, root.locator("[data-rentals-intro-description]")),
    };

    expect(geometry.root).toEqual({ left: 0, top: 0, width: 390, height: 790 });
    expect(geometry.photo).toEqual({ left: -55.5, top: 0, width: 501, height: 283 });
    expect(geometry.heading.left).toBeCloseTo(31.195, 1);
    expect(geometry.heading.top).toBe(-5);
    expect(geometry.heading.width).toBeCloseTo(351.842, 1);
    expect(geometry.heading.height).toBeCloseTo(63.124, 1);
    expect(geometry.offer).toEqual({ left: 17, top: 304, width: 350, height: 310 });
    expect(geometry.price).toEqual({ left: 55, top: 334, width: 280, height: 36.641 });
    expect(geometry.chooseBoard).toEqual({ left: 90, top: 471, width: 210, height: 48 });
    expect(geometry.rentNow).toEqual({ left: 90, top: 536, width: 210, height: 48 });
    expect(geometry.intro).toEqual({ left: 17, top: 635, width: 350, height: 155 });
    expect(geometry.introDescription).toEqual({ left: 52, top: 645, width: 280, height: 128 });

    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
    console.log(`RENTALS_390_GEOMETRY ${JSON.stringify(geometry)}`);
    await root.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-rentals-390.png"),
      animations: "disabled",
      style: "[data-home-v2-messenger-fab], nextjs-portal { display: none !important; }",
    });
  });

  test("keeps 375px joins, content, and horizontal bounds safe", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const included = page.locator("[data-home-v2-included]");
    const rentalsSection = page.locator("[data-home-v2-rentals-block]");
    const rentals = page.locator("[data-rentals-mobile-en]");
    const conditions = page.locator('[data-home-v2-flow-stage="livecam-forecast"]');
    const [includedBox, rentalsSectionBox, rentalsBox, conditionsBox] = await Promise.all([
      included.boundingBox(), rentalsSection.boundingBox(), rentals.boundingBox(), conditions.boundingBox(),
    ]);

    expect(rentalsBox.width).toBe(375);
    expect(rentalsBox.height).toBe(790);
    expect(rentalsSectionBox.y - (includedBox.y + includedBox.height)).toBeCloseTo(24, 0);
    expect(conditionsBox.y - (rentalsSectionBox.y + rentalsSectionBox.height)).toBeCloseTo(32, 0);
    await expect(rentals.getByText("250.000", { exact: true })).toBeVisible();
    await expect(rentals.getByText("VND", { exact: true })).toBeVisible();
    await expect(rentals.getByText("/ 2 HOURS", { exact: true })).toBeVisible();
    await expect(rentals.locator("[data-rentals-intro-description]")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
  });

  test("keeps catalog, modal, analytics, and partner-aware rental contracts", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2?partner=hotel_abc`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const rentals = page.locator("[data-rentals-mobile-en]");
    await expect(rentals.locator("[data-home-v2-rental-catalog-cta]")).toHaveAttribute("href", "/surfboard-rental-danang");
    await rentals.locator("[data-home-v2-rental-cta]").click();

    const modal = page.locator("[data-home-v2-rental-modal]");
    const whatsapp = modal.getByRole("link", { name: "WhatsApp", exact: true });
    await expect(whatsapp).toBeVisible();
    await expect(modal.getByRole("link", { name: "Telegram", exact: true })).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("epic_surf_attribution") || "{}").partner)).toBe("hotel_abc");
  });

  test("protects approved Desktop EN and keeps RU controls rendering", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const desktop = page.locator("[data-rentals-desktop]");
    await expect(desktop).toBeVisible();
    await expect(page.locator("[data-rentals-mobile-en]")).toBeHidden();
    expect(await relativeBox(desktop, desktop)).toEqual({ left: 0, top: 0, width: 1440, height: 900 });
    const desktopHeading = await relativeBox(desktop, desktop.locator("[data-rentals-heading]"));
    expect(desktopHeading.left).toBeCloseTo(118.68, 1);
    expect(desktopHeading.top).toBeCloseTo(27.54, 1);
    expect(desktopHeading.width).toBeCloseTo(356.645, 1);
    expect(desktopHeading.height).toBeCloseTo(129.406, 1);
    expect(await relativeBox(desktop, desktop.locator("[data-rentals-content]"))).toEqual({ left: 265, top: 493, width: 909, height: 223 });

    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await expect(page.locator("[data-rentals-mobile-and-ru]")).toBeHidden();
    await expect(page.locator("[data-home-v2-rental-catalog-cta]:visible")).toHaveAttribute("href", "/ru/surfboard-rental-danang");
    await expect(page.locator("[data-home-v2-rental-cta]:visible")).toBeVisible();
  });
});
