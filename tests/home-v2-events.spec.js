const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 4) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

test("matches the desktop EN Events handoff and keeps gallery behavior", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });

  const faq = page.locator("[data-home-v2-faq]");
  const events = page.locator("[data-home-v2-events]");
  await events.scrollIntoViewIfNeeded();
  await expect(events).toBeVisible();

  const geometry = await events.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };
    const layoutBox = (node) => ({
      left: node.offsetLeft,
      top: node.offsetTop,
      width: node.offsetWidth,
      height: node.offsetHeight,
    });

    return {
      root: { width: rootRect.width, height: rootRect.height },
      heading: relativeBox(root.querySelector("[data-home-v2-events-heading]")),
      cards: [...root.querySelectorAll("[data-home-v2-event-card]")].map(layoutBox),
      photos: [...root.querySelectorAll("[data-home-v2-event-photo]")].map(relativeBox),
      ctas: [...root.querySelectorAll("[data-home-v2-event-cta]")].map(relativeBox),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  closeTo(geometry.root.width, 1440, 1);
  closeTo(geometry.root.height, 1270, 1);
  closeTo(geometry.heading.left, 185.105, 1);
  closeTo(geometry.heading.top, 130, 1);
  closeTo(geometry.heading.height, 35.412, 2);
  expect(geometry.cards).toHaveLength(4);
  expect(geometry.photos).toHaveLength(4);
  expect(geometry.ctas).toHaveLength(4);
  expect(geometry.overflow).toBeLessThanOrEqual(1);

  const expectedCards = [
    { left: 102, top: 256.543, width: 668.206, height: 859.584 },
    { left: 929.412, top: 121, width: 398.231, height: 292.371 },
    { left: 924, top: 465, width: 403.673, height: 297.233 },
    { left: 931, top: 817, width: 395.066, height: 289.549 },
  ];
  geometry.cards.forEach((card, index) => {
    Object.keys(expectedCards[index]).forEach((key) => closeTo(card[key], expectedCards[index][key], 1));
  });

  const expectedCtas = [
    { left: 673, top: 1091 },
    { left: 1228.89, top: 393.517 },
    { left: 1232, top: 743 },
    { left: 1231.773, top: 1097.422 },
  ];
  geometry.ctas.forEach((cta, index) => {
    closeTo(cta.left, expectedCtas[index].left, 4);
    closeTo(cta.top, expectedCtas[index].top, 4);
  });

  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; } nextjs-portal, [data-home-v2-messenger] { display: none !important; }" });

  await events.screenshot({ path: "test-results/home-v2-events-focused.png" });

  await page.setViewportSize({ width: 1440, height: 660 });
  await faq.evaluate((node) => {
    const top = node.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + node.offsetHeight - 220);
  });
  await page.waitForTimeout(100);
  await page.screenshot({ path: "test-results/home-v2-faq-events-integration.png" });

  await events.locator('[data-home-v2-event-card="featured"] [data-home-v2-event-cta]').click();
  const gallery = page.locator("[data-home-v2-gallery]");
  await expect(gallery.locator('button[aria-pressed="true"]')).toHaveText("Da Nang Surfing Open 2025");
});
