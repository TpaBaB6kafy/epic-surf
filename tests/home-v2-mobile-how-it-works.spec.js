const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

test.use({ deviceScaleFactor: 2 });

async function relativeRect(root, locator) {
  return locator.evaluate((element, rootSelector) => {
    const rootBox = document.querySelector(rootSelector).getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return {
      left: box.left - rootBox.left,
      top: box.top - rootBox.top,
      width: box.width,
      height: box.height,
      right: box.right - rootBox.left,
      bottom: box.bottom - rootBox.top,
    };
  }, root);
}

function expectRectClose(actual, expected, precision = 1) {
  for (const [key, value] of Object.entries(expected)) {
    expect(actual[key], key).toBeCloseTo(value, precision);
  }
}

test.describe("Home V2 Mobile EN How It Works handoff", () => {
  test("matches the 390px section and card geometry", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true");

    const sectionSelector = "[data-home-v2-how-it-works]";
    const section = page.locator(sectionSelector);
    const mobile = section.locator("[data-home-v2-how-mobile-en]");
    const heading = mobile.locator("[data-home-v2-how-mobile-heading]");
    const cards = mobile.locator("[data-home-v2-how-mobile-card]");

    await expect(mobile).toBeVisible();
    await expect(cards).toHaveCount(4);
    expectRectClose(await relativeRect(sectionSelector, section), { left: 0, top: 0, width: 390, height: 933 });
    expectRectClose(await relativeRect(sectionSelector, heading), { left: 0, top: 30, width: 390, height: 66 });

    const expectedCards = [
      { left: 20, top: 118, width: 350, height: 172 },
      { left: 20, top: 312, width: 350, height: 172 },
      { left: 20, top: 507, width: 350, height: 172 },
      { left: 20, top: 701, width: 350, height: 172 },
    ];
    for (let index = 0; index < 4; index += 1) {
      expectRectClose(await relativeRect(sectionSelector, cards.nth(index)), expectedCards[index]);
      const photo = cards.nth(index).locator("[data-home-v2-how-mobile-photo]");
      const text = cards.nth(index).locator("[data-home-v2-how-mobile-text]");
      expectRectClose(await relativeRect(sectionSelector, photo), {
        left: index % 2 === 0 ? 20 : 204,
        top: expectedCards[index].top,
        width: 166,
        height: 172,
      });
      expectRectClose(await relativeRect(sectionSelector, text), {
        left: index % 2 === 0 ? 186 : 20,
        top: expectedCards[index].top,
        width: 184,
        height: 172,
      });
    }

    expect(await cards.locator("h3").allTextContents()).toEqual(["Meet & Gear Up", "Beach Theory", "Ocean Practice", "Review & Tips"]);
    await expect(cards.locator("[data-home-v2-how-mobile-card-border]")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);

    await section.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-en-how-it-works-390.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });
  });

  test("preserves alternating cards at 375px without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const cards = page.locator("[data-home-v2-how-mobile-card]");
    await expect(cards).toHaveCount(4);
    expect(await cards.locator("[data-home-v2-how-mobile-photo]").evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).left === "0px" ? "left" : "right"))).toEqual([
      "left", "right", "left", "right",
    ]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
    expect(await cards.evaluateAll((nodes) => nodes.every((node) => node.scrollWidth <= node.clientWidth))).toBeTruthy();
  });

  test("keeps Hero seam, desktop EN How It Works, and RU route protected", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const seams = await page.evaluate(() => {
      const hero = document.querySelector("[data-home-v2-hero]").getBoundingClientRect();
      const how = document.querySelector("[data-home-v2-how-it-works]").getBoundingClientRect();
      const lessons = document.querySelector("[data-home-v2-lessons-block]").getBoundingClientRect();
      return {
        heroToHow: how.top - hero.bottom,
        howToLessons: lessons.top - how.bottom,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
      };
    });
    expect(seams).toEqual({ heroToHow: 0, howToLessons: 0, overflow: 0 });
    await page.evaluate(() => {
      const hero = document.querySelector("[data-home-v2-hero]").getBoundingClientRect();
      window.scrollTo(0, Math.round(hero.bottom - 180));
    });
    await page.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-en-hero-how-integration-390.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });

    await page.setViewportSize({ width: 1440, height: 940 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    const desktop = page.locator("[data-home-v2-how-desktop-en]");
    await expect(desktop).toBeVisible();
    await expect(page.locator("[data-home-v2-how-mobile-en]")).toBeHidden();
    expect(await desktop.evaluate((node) => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }))).toEqual({ width: 1440, height: 720 });
    await page.locator("[data-home-v2-how-it-works]").screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-how-it-works-desktop-protection.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });

    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true");
    await expect(page.locator("[data-home-v2-how-it-works]")).toBeVisible();
    await expect(page.locator("[data-home-v2-how-mobile-en]")).toHaveCount(0);
  });
});

test.describe("Home V2 adaptive How It Works ownership", () => {
  const representativeWidths = [390, 899, 900, 904, 1024, 1108, 1199, 1200, 1280, 1366, 1439, 1440];
  const boundaryWidths = [639, 640, 899, 900, 1199, 1200, 1439, 1440];

  for (const width of boundaryWidths) {
    test(`owns the correct presentation at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 940 });
      await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });

      const mobile = page.locator("[data-home-v2-how-mobile-en]");
      const adaptive = page.locator("[data-home-v2-how-adaptive]");
      const fluidDesktop = page.locator("[data-home-v2-how-fluid-desktop]");
      const desktop = page.locator("[data-home-v2-how-desktop-en]");

      await (width < 640 ? expect(mobile).toBeVisible() : expect(mobile).toBeHidden());
      await (width >= 640 && width < 900 ? expect(adaptive).toBeVisible() : expect(adaptive).toBeHidden());
      await (width >= 900 && width < 1440 ? expect(fluidDesktop).toBeVisible() : expect(fluidDesktop).toBeHidden());
      await (width >= 1440 ? expect(desktop).toBeVisible() : expect(desktop).toBeHidden());
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);

      if (width >= 640 && width < 1440) {
        const cards = width < 900
          ? adaptive.locator("[data-home-v2-how-adaptive-card]")
          : fluidDesktop.locator("[data-home-v2-how-fluid-card]");
        await expect(cards).toHaveCount(4);
        const rects = await cards.evaluateAll((nodes) => nodes.map((node) => {
          const box = node.getBoundingClientRect();
          return { left: box.left, top: box.top, right: box.right, width: box.width, height: box.height };
        }));
        expect(rects.every((rect) => rect.left >= 0 && rect.right <= width)).toBeTruthy();

        if (width < 900) {
          expect(new Set(rects.map((rect) => Math.round(rect.top))).size).toBe(4);
          const sides = await cards.evaluateAll((nodes) => nodes.map((node) => {
            const card = node.getBoundingClientRect();
            const photo = node.querySelector("[data-home-v2-how-adaptive-photo]").getBoundingClientRect();
            return Math.abs(photo.left - card.left) < 4 ? "left" : "right";
          }));
          expect(sides).toEqual(["left", "right", "left", "right"]);
        } else {
          expect(new Set(rects.map((rect) => Math.round(rect.top))).size).toBe(1);
          expect(rects[0].width).toBeCloseTo(rects[3].width, 1);
          await expect(fluidDesktop.locator("[data-home-v2-how-fluid-wave]")).toBeVisible();
          expect(await fluidDesktop.locator("[data-home-v2-how-fluid-text]").evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).backgroundColor === "rgba(0, 0, 0, 0)"))).toBeTruthy();
          expect(await cards.evaluateAll((nodes) => nodes.every((node) => getComputedStyle(node).backgroundColor === "rgb(31, 31, 31)"))).toBeTruthy();
        }
      }
    });
  }

  for (const width of representativeWidths) {
    test(`captures representative geometry at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 940 });
      await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true");

      const metrics = await page.evaluate(() => {
        const rect = (selector) => {
          const box = document.querySelector(selector).getBoundingClientRect();
          return Object.fromEntries(["left", "top", "width", "height", "right", "bottom"].map((key) => [key, Math.round(box[key] * 100) / 100]));
        };
        const hero = document.querySelector("[data-home-v2-hero]").getBoundingClientRect();
        const how = document.querySelector("[data-home-v2-how-it-works]").getBoundingClientRect();
        const lessons = document.querySelector("[data-home-v2-lessons-block]").getBoundingClientRect();
        const adaptive = document.querySelector("[data-home-v2-how-adaptive]");
        const fluidDesktop = document.querySelector("[data-home-v2-how-fluid-desktop]");
        const activePresentation = adaptive && getComputedStyle(adaptive).display !== "none"
          ? adaptive
          : fluidDesktop && getComputedStyle(fluidDesktop).display !== "none"
            ? fluidDesktop
            : null;
        const cards = activePresentation
          ? [...activePresentation.querySelectorAll("[data-home-v2-how-adaptive-card], [data-home-v2-how-fluid-card]")].map((node) => {
              const box = node.getBoundingClientRect();
              return { left: box.left, top: box.top, width: box.width, height: box.height, right: box.right, bottom: box.bottom };
            })
          : [];
        return {
          how: rect("[data-home-v2-how-it-works]"),
          cards,
          heroToHow: how.top - hero.bottom,
          howToLessons: lessons.top - how.bottom,
          adaptiveBottomTransition: cards.length ? how.bottom - Math.max(...cards.map((card) => card.bottom)) : null,
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          clippedAdaptiveText: activePresentation
            ? [...activePresentation.querySelectorAll("h3, p")]
                .filter((node) => node.scrollWidth > node.clientWidth + 2 || node.scrollHeight > node.clientHeight + 2)
                .map((node) => ({
                  tag: node.tagName,
                  text: node.textContent.trim(),
                  clientWidth: node.clientWidth,
                  scrollWidth: node.scrollWidth,
                  clientHeight: node.clientHeight,
                  scrollHeight: node.scrollHeight,
                }))
            : [],
          adaptiveTextContained: activePresentation
            ? [...activePresentation.querySelectorAll("[data-home-v2-how-adaptive-text], [data-home-v2-how-fluid-text]")].every((node) => {
                const box = node.getBoundingClientRect();
                return [...node.children].every((child) => {
                  const childBox = child.getBoundingClientRect();
                  return childBox.top >= box.top - 1 && childBox.bottom <= box.bottom + 1;
                });
              })
            : null,
        };
      });

      console.log(`HOW_METRICS_${width}=${JSON.stringify(metrics)}`);
      expect(metrics.overflow).toBe(0);
      expect(metrics.heroToHow).toBeCloseTo(0, 1);
      expect(metrics.howToLessons).toBeCloseTo(0, 1);
      if (width >= 640 && width < 1440) {
        expect(metrics.clippedAdaptiveText).toEqual([]);
        expect(metrics.adaptiveTextContained).toBeTruthy();
        expect(metrics.adaptiveBottomTransition).toBeGreaterThanOrEqual(55);
      }

      await page.locator("[data-home-v2-how-it-works]").screenshot({
        path: path.join(process.cwd(), "tmp", "home-v2-responsive-pass2", `home-v2-pass2-${width}.png`),
        animations: "disabled",
        style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
      });
    });
  }

  test("keeps the RU adaptive branch contained", async ({ page }) => {
    await page.setViewportSize({ width: 904, height: 940 });
    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    const fluidDesktop = page.locator("[data-home-v2-how-fluid-desktop]");
    await expect(fluidDesktop).toBeVisible();
    await expect(fluidDesktop.locator("[data-home-v2-how-fluid-card]")).toHaveCount(4);
    await expect(fluidDesktop.locator("[data-home-v2-how-fluid-heading]")).toContainText("Как проходят");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBe(0);
    expect(await fluidDesktop.locator("[data-home-v2-how-fluid-card]").evaluateAll((nodes) => nodes.every((node) => {
      const box = node.getBoundingClientRect();
      return box.left >= 0 && box.right <= window.innerWidth;
    }))).toBeTruthy();
    expect(await fluidDesktop.locator("h3, p").evaluateAll((nodes) => nodes.every((node) => (
      node.scrollWidth <= node.clientWidth + 2 && node.scrollHeight <= node.clientHeight + 2
    )))).toBeTruthy();
  });
});
