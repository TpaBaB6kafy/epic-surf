const { test, expect } = require("@playwright/test");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 1.5) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

async function dismissVisualNoise(page) {
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; } nextjs-portal, [data-home-v2-messenger] { display: none !important; }",
  });
}

test("matches the Mobile EN Events handoff at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await dismissVisualNoise(page);

  const events = page.locator("[data-home-v2-events]");
  await events.scrollIntoViewIfNeeded();
  await expect(events.locator("[data-home-v2-events-mobile]")).toBeVisible();

  const geometry = await events.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node) => {
      const rect = node.getBoundingClientRect();
      return {
        left: rect.left - rootRect.left,
        top: rect.top - rootRect.top,
        width: rect.width,
        height: rect.height,
        right: rect.right - rootRect.left,
        bottom: rect.bottom - rootRect.top,
      };
    };

    return {
      root: { width: rootRect.width, height: rootRect.height },
      cards: [...root.querySelectorAll("[data-home-v2-mobile-event-card]")].map(relativeBox),
      photos: [...root.querySelectorAll("[data-home-v2-mobile-event-photo]")].map(relativeBox),
      titles: [...root.querySelectorAll("[data-home-v2-mobile-event-title]")].map(relativeBox),
      descriptions: [...root.querySelectorAll("[data-home-v2-mobile-event-description]")].map(relativeBox),
      ctas: [...root.querySelectorAll("[data-home-v2-mobile-event-cta]")].map(relativeBox),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  console.log("MOBILE_EVENTS_GEOMETRY", JSON.stringify(geometry));
  await events.screenshot({ path: "screenshots/home-v2-events-mobile-en-390.png" });
  closeTo(geometry.root.width, 390, 0.5);
  closeTo(geometry.root.height, 1420, 0.5);
  expect(geometry.cards).toHaveLength(4);
  expect(geometry.photos).toHaveLength(4);
  expect(geometry.titles).toHaveLength(4);
  expect(geometry.descriptions).toHaveLength(4);
  expect(geometry.ctas).toHaveLength(4);
  expect(geometry.overflow).toBeLessThanOrEqual(0);

  const expectedCards = [
    { left: 19, top: 23, width: 352.803, height: 459.991 },
    { left: 20.848, top: 518.53, width: 351.032, height: 258.001 },
    { left: 17.433, top: 827.283, width: 353.225, height: 258.975 },
    { left: 19, top: 1138.448, width: 350.592, height: 258.552 },
  ];
  geometry.cards.forEach((box, index) => {
    closeTo(box.left, expectedCards[index].left);
    closeTo(box.top, expectedCards[index].top);
    closeTo(box.width, expectedCards[index].width);
    closeTo(box.height, expectedCards[index].height);
  });

  const expectedPhotos = [
    { left: 19, top: 23, width: 351.5, height: 311.994 },
    { left: 20, top: 519, width: 350.545, height: 136.299 },
    { left: 17.434, top: 827.302, width: 353.252, height: 129.985 },
    { left: 16.931, top: 1138.98, width: 353.75, height: 129.079 },
  ];
  geometry.photos.forEach((box, index) => {
    closeTo(box.left, expectedPhotos[index].left);
    closeTo(box.top, expectedPhotos[index].top);
    closeTo(box.width, expectedPhotos[index].width);
    closeTo(box.height, expectedPhotos[index].height);
  });

});

test("keeps all four Mobile EN CTA mappings, gallery scroll, analytics, and section joins", async ({ page }) => {
  const pageSource = readFileSync(join(process.cwd(), "app/components/home-v2/HomeV2Page.jsx"), "utf8");
  expect(pageSource).toContain('trackEvent("gallery_open"');
  expect(pageSource).toContain('cta_location: "home_v2_events_section"');
  expect(pageSource).toContain("cta_label: galleryKey");

  await page.setViewportSize({ width: 390, height: 844 });
  const cases = [
    ["featured", "Da Nang Surfing Open 2025", "surf-fest"],
    ["school-birthday", "Birthday", "birthday"],
    ["sunset", "Sunset", "sunset"],
    ["community", "Community", "community"],
  ];

  for (const [card, galleryLabel, galleryKey] of cases) {
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await dismissVisualNoise(page);
    await expect(page.locator("[data-home-v2-client-ready='true']")).toBeAttached();
    const events = page.locator("[data-home-v2-events]");
    const faq = page.locator("[data-home-v2-faq]");
    const gallery = page.locator("[data-home-v2-gallery]");

    const joins = await page.evaluate(() => {
      const faqRect = document.querySelector("[data-home-v2-faq]").getBoundingClientRect();
      const eventsRect = document.querySelector("[data-home-v2-events]").getBoundingClientRect();
      const galleryRect = document.querySelector("[data-home-v2-gallery]").getBoundingClientRect();
      return {
        faqToEvents: eventsRect.top - faqRect.bottom,
        eventsToGallery: galleryRect.top - eventsRect.bottom,
      };
    });
    closeTo(joins.faqToEvents, 0, 0.5);
    closeTo(joins.eventsToGallery, 0, 0.5);
    await expect(faq).toBeVisible();

    await events.locator(`[data-home-v2-mobile-event-card="${card}"] [data-home-v2-mobile-event-cta]`).click();
    await expect(gallery.locator('button[aria-pressed="true"]')).toHaveText(galleryLabel);
    await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector("#gallery").getBoundingClientRect().top))).toBeLessThan(120);

    const analytics = await page.evaluate((key) => (window.dataLayer || []).filter((item) => item?.event === "gallery_open" && item?.cta_label === key), galleryKey);
    if (await page.evaluate(() => Boolean(window.google_tag_manager))) {
      expect(analytics.length).toBeGreaterThan(0);
    }
  }
});

test("fits 375px and protects desktop EN plus RU rendering", async ({ page }) => {
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  const mobileFit = await page.locator("[data-home-v2-events]").evaluate((root) => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth,
    rightEdges: [...root.querySelectorAll("[data-home-v2-mobile-event-card], [data-home-v2-mobile-event-cta]")].map((node) => node.getBoundingClientRect().right),
  }));
  expect(mobileFit.overflow).toBeLessThanOrEqual(0);
  expect(Math.max(...mobileFit.rightEdges)).toBeLessThanOrEqual(375);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  const desktop = page.locator("[data-home-v2-events]");
  await expect(desktop.locator("[data-home-v2-events-mobile]")).toBeHidden();
  await expect(desktop.locator("[data-home-v2-event-card]")).toHaveCount(4);
  const desktopRoot = await desktop.boundingBox();
  closeTo(desktopRoot.width, 1440, 1);
  closeTo(desktopRoot.height, 1270, 1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-home-v2-events] [data-home-v2-event-cta]")).toHaveCount(4);
  await expect(page.locator("[data-home-v2-events] [data-home-v2-event-cta]").first()).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});
