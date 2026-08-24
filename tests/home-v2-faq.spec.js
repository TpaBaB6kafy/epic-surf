const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 1) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

const mobileExpected = {
  root: { width: 390, height: 617 },
  heading: { left: 154, top: 19, width: 82.289, height: 42.999 },
  items: [
    { left: 23, top: 110, width: 330, height: 71 },
    { left: 23, top: 228, width: 330, height: 76 },
    { left: 23, top: 354, width: 330, height: 67 },
    { left: 23, top: 470, width: 330, height: 71 },
  ],
  controls: [
    { left: 319, top: 122, width: 33.759, height: 28.614 },
    { left: 320, top: 244, width: 32.858, height: 27.531 },
    { left: 319, top: 365, width: 33.759, height: 28.614 },
    { left: 320, top: 483, width: 32.858, height: 27.531 },
  ],
  dividers: [181, 304, 421, 541].map((top) => ({ left: 23, top, width: 330, height: 1 })),
};

test("matches the 390px Mobile EN FAQ handoff and preserves all accordion interactions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });

  const faq = page.locator("[data-home-v2-faq]");
  const mobile = faq.locator("[data-home-v2-faq-mobile-en]");
  await mobile.scrollIntoViewIfNeeded();
  await expect(mobile).toBeVisible();
  await expect(mobile.locator("[data-faq-illustration]")).toHaveCount(0);

  const geometry = await mobile.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };
    return {
      root: { width: rootRect.width, height: rootRect.height },
      heading: relativeBox(root.querySelector("[data-faq-heading]")),
      items: [...root.querySelectorAll("[data-faq-item]")].map(relativeBox),
      controls: [...root.querySelectorAll("[data-faq-expand-control]")].map(relativeBox),
      dividers: [...root.querySelectorAll("[data-faq-divider]")].map(relativeBox),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  Object.keys(mobileExpected.root).forEach((key) => closeTo(geometry.root[key], mobileExpected.root[key]));
  Object.keys(mobileExpected.heading).forEach((key) => closeTo(geometry.heading[key], mobileExpected.heading[key]));
  ["items", "controls", "dividers"].forEach((collection) => {
    expect(geometry[collection]).toHaveLength(4);
    geometry[collection].forEach((box, index) => {
      Object.keys(mobileExpected[collection][index]).forEach((key) => closeTo(box[key], mobileExpected[collection][index][key]));
    });
  });
  expect(geometry.overflow).toBeLessThanOrEqual(0);

  const controls = mobile.locator("[data-faq-control]");
  const items = mobile.locator("[data-faq-item]");
  for (let index = 0; index < 4; index += 1) {
    const control = controls.nth(index);
    await expect(control).toHaveAttribute("aria-expanded", "false");
    await expect(control).toHaveAttribute("aria-controls", `home-v2-faq-answer-mobile-en-${index}`);
    await control.focus();
    await page.keyboard.press("Enter");
    await expect(control).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator(`#home-v2-faq-answer-mobile-en-${index}`)).toBeVisible();
    if (index < 3) {
      const currentBottom = (await items.nth(index).boundingBox()).y + (await items.nth(index).boundingBox()).height;
      const nextTop = (await items.nth(index + 1).boundingBox()).y;
      expect(nextTop).toBeGreaterThan(currentBottom);
    }
    await page.keyboard.press("Space");
    await expect(control).toHaveAttribute("aria-expanded", "false");
  }

  const integration = await page.evaluate(() => {
    const reviews = document.querySelector("[data-home-v2-reviews]").getBoundingClientRect();
    const faqRect = document.querySelector("[data-home-v2-faq]").getBoundingClientRect();
    const events = document.querySelector("[data-home-v2-events]").getBoundingClientRect();
    return {
      reviewsToFaq: faqRect.top - reviews.bottom,
      faqToEvents: events.top - faqRect.bottom,
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
  closeTo(integration.reviewsToFaq, 0);
  closeTo(integration.faqToEvents, 0);
  expect(integration.overflow).toBeLessThanOrEqual(0);

  await page.evaluate(() => document.activeElement?.blur());
  await mobile.evaluate((root) => window.scrollTo(0, root.getBoundingClientRect().top + window.scrollY - 120));
  await mobile.screenshot({ path: "screenshots/home-v2-faq-mobile-en-390.png" });
});

test("keeps the Mobile EN FAQ inside 375px without text/control collisions", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  const mobile = page.locator("[data-home-v2-faq-mobile-en]");
  await mobile.scrollIntoViewIfNeeded();

  const fourthQuestion = mobile.locator("[data-faq-question]").nth(3);
  const fourthControl = mobile.locator("[data-faq-expand-control]").nth(3);
  const bounds = await Promise.all([fourthQuestion.boundingBox(), fourthControl.boundingBox()]);
  expect(bounds[0].x + bounds[0].width).toBeLessThan(bounds[1].x);
  expect(bounds[1].x + bounds[1].width).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);

  await mobile.locator("[data-faq-control]").nth(3).click();
  await expect(page.locator("#home-v2-faq-answer-mobile-en-3")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(0);
});

test("keeps RU FAQ runtime healthy", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
  const controls = page.locator("[data-home-v2-faq] [data-faq-control]:visible");
  await expect(controls).toHaveCount(4);
  await controls.first().click();
  await expect(controls.first()).toHaveAttribute("aria-expanded", "true");
});

test("matches the desktop EN FAQ handoff and preserves accordion behavior", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });

  const faq = page.locator("[data-home-v2-faq]");
  const desktop = faq.locator("[data-home-v2-faq-desktop-en]");
  await faq.scrollIntoViewIfNeeded();
  await expect(desktop).toBeVisible();

  const geometry = await desktop.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const box = (selector) => {
      const rect = root.querySelector(selector).getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };
    return {
      root: { width: rootRect.width, height: rootRect.height },
      heading: box("[data-faq-heading]"),
      illustration: box("[data-faq-illustration]"),
      logo: box("[data-faq-epic-logo]"),
      accordion: box("[data-faq-accordion]"),
      items: [...root.querySelectorAll("[data-faq-item]")].map((item) => {
        const rect = item.getBoundingClientRect();
        return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
      }),
      pluses: [...root.querySelectorAll("[data-faq-plus-icon]")].map((icon) => {
        const rect = icon.getBoundingClientRect();
        return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
      }),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  closeTo(geometry.root.width, 1440);
  closeTo(geometry.root.height, 619);
  [geometry.heading, geometry.illustration, geometry.logo, geometry.accordion].forEach((box, index) => {
    const expected = [
      { left: 204, top: 105, width: 111.386, height: 35.412 },
      { left: 126, top: 181, width: 268, height: 337.622 },
      { left: 277, top: 358, width: 39.6, height: 17.696 },
      { left: 591, top: 123, width: 691.2, height: 396 },
    ][index];
    Object.keys(expected).forEach((key) => closeTo(box[key], expected[key]));
  });

  expect(geometry.items).toHaveLength(4);
  expect(geometry.pluses).toHaveLength(4);
  geometry.items.forEach((item, index) => {
    closeTo(item.left, 591);
    closeTo(item.top, 123 + index * 102.6);
    closeTo(item.width, 691.2);
    closeTo(item.height, 88.2);
    closeTo(geometry.pluses[index].left, 1260.6);
    closeTo(geometry.pluses[index].top, 148.65 + index * 102.6);
  });
  expect(geometry.overflow).toBeLessThanOrEqual(1);

  const first = desktop.locator("[data-faq-control]").first();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(first).toHaveAttribute("aria-controls", "home-v2-faq-answer-desktop-0");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#home-v2-faq-answer-desktop-0")).toBeVisible();
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
});
