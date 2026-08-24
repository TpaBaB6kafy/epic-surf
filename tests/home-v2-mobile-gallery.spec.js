const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 1.5) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

async function dismissVisualNoise(page) {
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; } nextjs-portal, [data-home-v2-messenger] { display: none !important; }",
  });
}

test("matches the Mobile EN Gallery handoff at 390px", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await dismissVisualNoise(page);

  const gallery = page.locator("[data-home-v2-gallery]");
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery).toBeVisible();

  const geometry = await gallery.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node, parent = rootRect) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left - parent.left, top: rect.top - parent.top, width: rect.width, height: rect.height };
    };
    const items = [...root.querySelectorAll("[data-home-v2-gallery-item]")];
    return {
      root: { width: rootRect.width, height: rootRect.height },
      heading: relativeBox(root.querySelector("[data-home-v2-gallery-heading]")),
      filters: relativeBox(root.querySelector("[data-home-v2-gallery-filters]")),
      filterButtons: [...root.querySelectorAll("[data-home-v2-gallery-filter]")].map((node) => relativeBox(node)),
      items: items.map((node) => relativeBox(node)),
      photos: items.map((node) => relativeBox(node.querySelector("img"), node.getBoundingClientRect())),
      instagram: relativeBox(root.querySelector("[data-home-v2-gallery-instagram]")),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  console.log("MOBILE_GALLERY_GEOMETRY", JSON.stringify(geometry));
  closeTo(geometry.root.width, 390, 0.5);
  closeTo(geometry.root.height, 1058, 0.5);
  closeTo(geometry.heading.left, 37, 1);
  closeTo(geometry.heading.top, 68, 1);
  closeTo(geometry.heading.width, 316, 1);
  closeTo(geometry.filters.left, 20, 1);
  closeTo(geometry.filters.top, 120, 1);
  expect(geometry.filterButtons).toHaveLength(5);
  const expectedFilters = [
    { left: 20, top: 120, width: 33.257, height: 27.041 },
    { left: 61.824, top: 120.763, width: 184.066, height: 25.144 },
    { left: 21.001, top: 165.237, width: 79.835, height: 24.473 },
    { left: 119.01, top: 165.028, width: 79.922, height: 24.405 },
    { left: 216.871, top: 165, width: 92.296, height: 24.407 },
  ];
  geometry.filterButtons.forEach((box, index) => Object.entries(expectedFilters[index]).forEach(([key, value]) => closeTo(box[key], value, 1)));
  const expectedItems = [
    { left: 20, top: 207, width: 350, height: 310 },
    { left: 20, top: 527, width: 170.139, height: 175 },
    { left: 199.861, top: 527, width: 170.139, height: 175 },
    { left: 20, top: 712, width: 170.139, height: 175 },
    { left: 199.861, top: 712, width: 170.139, height: 175 },
  ];
  geometry.items.forEach((box, index) => Object.entries(expectedItems[index]).forEach(([key, value]) => closeTo(box[key], value, 1)));
  const expectedPhotos = [
    { left: -100, top: 0, width: 522, height: 345 },
    { left: -28, top: -9, width: 331.733, height: 186.6 },
    { left: -29, top: -32, width: 204.36, height: 272.481 },
    { left: -15.436, top: -45.236, width: 204.36, height: 272.481 },
    { left: -37, top: -13, width: 211.8, height: 319.8 },
  ];
  geometry.photos.forEach((box, index) => Object.entries(expectedPhotos[index]).forEach(([key, value]) => closeTo(box[key], value, 1.5)));
  Object.entries({ left: 55, top: 921, width: 280, height: 56 }).forEach(([key, value]) => closeTo(geometry.instagram[key], value, 1));
  expect(geometry.overflow).toBeLessThanOrEqual(0);
  await expect(gallery.locator('[data-home-v2-gallery-filter="all"]')).toHaveAttribute("aria-pressed", "true");
  await expect(gallery.locator("[data-home-v2-gallery-instagram]")).toHaveAttribute("href", "https://www.instagram.com/epicsurfvn?igsh=eHdzMTZhanY2M2Zx");
  await gallery.screenshot({ path: "screenshots/home-v2-gallery-mobile-en-390.png" });
});

test("keeps all five filters and all four Events mappings functional", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await dismissVisualNoise(page);
  const gallery = page.locator("[data-home-v2-gallery]");

  const filterCases = [
    ["all", /danang-open-2025-1/, /epic-birthday-4/],
    ["surf-fest", /danang-open-2025-1/, /danang-open-2025-2/],
    ["birthday", /epic-birthday-4/, /epic-birthday-6/],
    ["sunset", /13\.webp/, /14\.webp/],
    ["community", /3\.webp/, /4\.webp/],
  ];
  for (const [key, firstPhoto, secondPhoto] of filterCases) {
    await gallery.locator(`[data-home-v2-gallery-filter="${key}"]`).click();
    await expect(gallery.locator(`[data-home-v2-gallery-filter="${key}"]`)).toHaveAttribute("aria-pressed", "true");
    await expect(gallery.locator('[data-home-v2-gallery-item="1"] img')).toHaveAttribute("src", firstPhoto);
    await expect(gallery.locator('[data-home-v2-gallery-item="2"] img')).toHaveAttribute("src", secondPhoto);
  }

  const eventCases = [
    ["featured", "surf-fest"],
    ["school-birthday", "birthday"],
    ["sunset", "sunset"],
    ["community", "community"],
  ];
  for (const [card, key] of eventCases) {
    await page.locator(`[data-home-v2-mobile-event-card="${card}"] [data-home-v2-mobile-event-cta]`).click();
    await expect(gallery.locator(`[data-home-v2-gallery-filter="${key}"]`)).toHaveAttribute("aria-pressed", "true");
    await expect.poll(() => page.evaluate(() => Math.abs(document.querySelector("#gallery").getBoundingClientRect().top))).toBeLessThan(120);
  }
});

test("fits 375px and protects joins, Desktop EN, and RU rendering", async ({ page }) => {
  const runtimeErrors = [];
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await dismissVisualNoise(page);
  const mobile = await page.locator("[data-home-v2-gallery]").evaluate((root) => {
    const events = document.querySelector("[data-home-v2-events]").getBoundingClientRect();
    const gallery = root.getBoundingClientRect();
    const footer = document.querySelector("[data-home-v2-footer]").getBoundingClientRect();
    return { overflow: document.documentElement.scrollWidth - window.innerWidth, eventsToGallery: gallery.top - events.bottom, galleryToFooter: footer.top - gallery.bottom };
  });
  expect(mobile.overflow).toBeLessThanOrEqual(0);
  closeTo(mobile.eventsToGallery, 0, 0.5);
  closeTo(mobile.galleryToFooter, 0, 0.5);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await dismissVisualNoise(page);
  const desktop = await page.locator("[data-home-v2-gallery]").evaluate((root) => {
    const rect = root.getBoundingClientRect();
    const items = [...root.querySelectorAll("[data-home-v2-gallery-item]")].map((node) => node.getBoundingClientRect());
    return { width: rect.width, height: rect.height, items: items.map(({ width, height }) => ({ width, height })) };
  });
  closeTo(desktop.width, 1440, 1);
  closeTo(desktop.height, 1062, 1);
  closeTo(desktop.items[0].width, 600, 1);
  closeTo(desktop.items[0].height, 600, 1);
  desktop.items.slice(1).forEach((item) => { closeTo(item.width, 290, 1); closeTo(item.height, 290, 1); });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-home-v2-gallery-filter]")).toHaveCount(5);
  await expect(page.locator("[data-home-v2-gallery-filter]").first()).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});
