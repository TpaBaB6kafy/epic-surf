const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

async function relativeBox(root, locator) {
  const [rootBox, box] = await Promise.all([root.boundingBox(), locator.boundingBox()]);
  return {
    left: Number((box.x - rootBox.x).toFixed(3)),
    top: Number((box.y - rootBox.y).toFixed(3)),
    width: Number(box.width.toFixed(3)),
    height: Number(box.height.toFixed(3)),
  };
}

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

test.describe("Home V2 Mobile EN Included", () => {
  test("matches the 390px handoff geometry", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-included]");
    const composition = section.locator("[data-home-v2-included-mobile-en]");
    await section.scrollIntoViewIfNeeded();
    await expect(composition).toBeVisible();
    await expect(section.locator("[data-home-v2-included-mobile-feature]")).toHaveCount(4);
    await expect(section.locator("[data-home-v2-included-marquee]")).toBeHidden();
    await expect(composition.getByRole("heading", { name: /everything included/i })).toHaveCount(0);
    await expect(composition.locator("[data-home-v2-included-collage]")).toHaveCount(0);

    const featureKeys = ["photos-videos", "zinc-spf", "board", "rashguard"];
    const geometry = {
      root: await relativeBox(section, composition),
      features: {},
      circles: {},
      artwork: {},
      callout: await relativeBox(composition, composition.locator("[data-home-v2-included-mobile-callout]")),
      description: await relativeBox(composition, composition.locator("[data-home-v2-included-mobile-description]")),
    };

    for (const key of featureKeys) {
      geometry.features[key] = await relativeBox(composition, composition.locator(`[data-home-v2-included-mobile-feature="${key}"]`));
      geometry.circles[key] = await relativeBox(composition, composition.locator(`[data-home-v2-included-mobile-icon-circle="${key}"]`));
      geometry.artwork[key] = await relativeBox(composition, composition.locator(`[data-home-v2-included-mobile-icon-artwork="${key}"]`));
    }

    expect(geometry.root).toEqual({ left: 0, top: 0, width: 390, height: 746 });
    expect(geometry.features).toEqual({
      "photos-videos": { left: 30, top: 26, width: 122.109, height: 183.5 },
      "zinc-spf": { left: 232, top: 26, width: 126.563, height: 184.438 },
      board: { left: -10, top: 212, width: 200.313, height: 222.516 },
      rashguard: { left: 238, top: 252, width: 120, height: 182.516 },
    });
    expect(geometry.callout).toEqual({ left: 113.609, top: 496, width: 163.047, height: 57 });
    expect(geometry.description).toEqual({ left: 57, top: 595, width: 276.234, height: 88 });

    const boardCircle = geometry.circles.board;
    const boardArtwork = geometry.artwork.board;
    const exportedBoardCircleCenter = boardArtwork.left + (90.1593 / 191) * boardArtwork.width;
    const handoffBoardCircleCenter = boardCircle.left + 100.159;
    expect(Math.abs(exportedBoardCircleCenter - handoffBoardCircleCenter)).toBeLessThanOrEqual(0.5);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);

    console.log(`INCLUDED_GEOMETRY ${JSON.stringify(geometry)}`);
    await composition.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-included-390.png"),
      animations: "disabled",
      style: "[data-home-v2-messenger-fab], nextjs-portal { display: none !important; }",
    });
  });

  test("keeps the grid and section joins safe at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const lessons = page.locator("[data-home-v2-lessons-block]");
    const included = page.locator("[data-home-v2-included]");
    const composition = included.locator("[data-home-v2-included-mobile-en]");
    const rentals = page.locator("[data-home-v2-rentals-block]");
    const [lessonsBox, includedBox, compositionBox, rentalsBox] = await Promise.all([
      lessons.boundingBox(),
      included.boundingBox(),
      composition.boundingBox(),
      rentals.boundingBox(),
    ]);

    const lessonsToIncluded = includedBox.y - (lessonsBox.y + lessonsBox.height);
    const includedToRentals = rentalsBox.y - (includedBox.y + includedBox.height);
    expect(lessonsToIncluded).toBeGreaterThanOrEqual(-0.5);
    expect(includedToRentals).toBeGreaterThanOrEqual(-0.5);
    expect(compositionBox.width).toBe(390);
    await expect(composition.locator("[data-home-v2-included-mobile-feature]")).toHaveCount(4);
    await expect(composition.locator("[data-home-v2-included-mobile-callout]")).toBeVisible();
    await expect(composition.locator("[data-home-v2-included-mobile-description]")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    console.log(`INCLUDED_375_INTEGRATION ${JSON.stringify({ lessonsToIncluded, includedToRentals, overflow })}`);
  });

  test("protects Desktop EN Included and RU rendering", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await expect(page.locator("[data-home-v2-included-desktop-en]")).toBeVisible();
    await expect(page.locator("[data-home-v2-included-feature]")).toHaveCount(4);
    await expect(page.locator("[data-home-v2-included-marquee-track]")).toBeVisible();
    await expect(page.locator("[data-home-v2-included-mobile-en]")).toBeHidden();

    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    await expect(page.locator("[data-home-v2-included]")).toBeVisible();
    await expect(page.locator("[data-home-v2-included-desktop-en]")).toBeVisible();
  });
});
