const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://127.0.0.1:3300";
const outputDir = path.join(process.cwd(), "tmp", "home-v2-mobile-lessons-shadow-pass");
const screenshotStyle = "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }";

const expectedLessons = {
  group: { image: "group-lesson-photo%402x.png", title: /Group Lesson|Групповой урок/i, price: "900.000", kind: "booking" },
  split: { image: "lesson-split-desktop.webp", title: /Split Lesson|Сплит урок/i, price: "2.500.000", kind: "booking" },
  private: { image: "lesson-private-desktop.webp", title: /Private Lesson|Приватный урок/i, price: "1.800.000", kind: "booking" },
  surf_skate: { image: "lesson-surf-skate-desktop.webp", title: /Surf-skate|Серф-скейт/i, price: "600.000", kind: "messenger" },
  lineup_pro: { image: "lesson-line-up-pro-desktop.webp", title: /Line-up \/ Pro/i, price: "1.200.000", kind: "messenger" },
};

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function openLessons(page, route, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await waitForHomeV2ClientReady(page);
  await page.evaluate(() => document.fonts.ready);
  const section = page.locator("[data-home-v2-lessons-block]");
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveAttribute("data-home-v2-lessons-entered", "true");
  return section;
}

async function relativeBox(root, locator) {
  const [rootBox, box] = await Promise.all([root.boundingBox(), locator.boundingBox()]);
  return { left: box.x - rootBox.x, top: box.y - rootBox.y, width: box.width, height: box.height };
}

async function assertNoIntersection(first, second) {
  const [a, b] = await Promise.all([first.boundingBox(), second.boundingBox()]);
  const overlapX = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  const overlapY = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  expect(overlapX * overlapY, JSON.stringify({ a, b, overlapX, overlapY })).toBe(0);
}

async function captureSection(section, filename, style = screenshotStyle) {
  await section.screenshot({ path: path.join(outputDir, filename), animations: "disabled", style });
}

test.describe("Home V2 mobile Choose Your Lesson", () => {
  test("matches the 390px geometry, layering, gradient, and interaction contract", async ({ page }) => {
    const section = await openLessons(page, "/", 390);
    const stage = section.locator("[data-home-v2-lessons-mobile]");
    const heading = section.locator("[data-home-v2-lessons-heading]");
    const selector = section.locator("[data-home-v2-lesson-selector]");
    const photo = section.locator("[data-home-v2-lesson-photo-frame]");
    const shadow = section.locator("[data-home-v2-lesson-mobile-shadow]");
    const copy = section.locator("[data-home-v2-lesson-copy]");
    const title = section.locator("[data-home-v2-lesson-title]");
    const description = section.locator("[data-home-v2-lesson-description]");
    const price = section.locator("[data-home-v2-lesson-price]");
    const cta = section.locator("[data-home-v2-booking-cta]");

    await expect(stage).toBeVisible();
    await expect(selector.locator("button")).toHaveCount(5);
    await expect(heading).toContainText("Choose");
    await expect(heading).toContainText("Your Ride");

    const geometry = {
      stage: await relativeBox(section, stage),
      heading: await relativeBox(stage, heading),
      selector: await relativeBox(stage, selector),
      photo: await relativeBox(stage, photo),
      shadow: await relativeBox(stage, shadow),
      price: await relativeBox(stage, price),
      cta: await relativeBox(stage, cta),
    };

    expect(geometry.stage).toMatchObject({ left: 0, top: 0, width: 390, height: 742 });
    expect(geometry.heading).toMatchObject({ left: 0, top: 0, width: 390, height: 742 });
    expect(geometry.selector).toMatchObject({ left: 0, top: 131, width: 390, height: 61 });
    expect(geometry.photo).toMatchObject({ left: 0, top: 192, width: 390, height: 464 });
    expect(geometry.shadow).toEqual(geometry.photo);
    expect(Math.abs(geometry.price.left - 239)).toBeLessThan(1.2);
    expect(Math.abs(geometry.price.top - 601)).toBeLessThan(1.2);
    expect(Math.abs(geometry.cta.left - 239)).toBeLessThan(1.2);
    expect(Math.abs(geometry.cta.top - 657)).toBeLessThan(1.2);

    const layers = await page.evaluate(() => {
      const read = (selector) => {
        const style = getComputedStyle(document.querySelector(selector));
        return { zIndex: Number(style.zIndex), pointerEvents: style.pointerEvents, backgroundImage: style.backgroundImage, mixBlendMode: style.mixBlendMode };
      };
      return {
        shadow: read("[data-home-v2-lesson-mobile-shadow]"),
        copy: read("[data-home-v2-lesson-copy]"),
        selector: read("[data-home-v2-lesson-selector]"),
        price: read("[data-home-v2-lesson-price]"),
        cta: read("[data-home-v2-booking-cta]"),
      };
    });
    expect(layers.shadow.pointerEvents).toBe("none");
    expect(layers.shadow.mixBlendMode).toBe("normal");
    expect(layers.shadow.backgroundImage).toBe("none");
    await expect(shadow).toHaveAttribute("src", /lesson-photo-shadow\.svg/);
    expect(layers.copy.zIndex).toBeGreaterThan(layers.shadow.zIndex);
    expect(layers.selector.zIndex).toBeGreaterThan(layers.copy.zIndex);
    expect(layers.price.zIndex).toBeGreaterThan(layers.shadow.zIndex);
    expect(layers.cta.zIndex).toBeGreaterThan(layers.shadow.zIndex);
    await assertNoIntersection(description, price);
    await expect(title).toBeVisible();

    await captureSection(section, "en-group-390.png");
    await captureSection(section, "en-group-gradient-only-390.png", `${screenshotStyle} [data-home-v2-lesson-copy] { visibility: hidden !important; }`);

    await cta.click();
    await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", /activity\/select/);
    await page.getByLabel("Close booking modal").click();
  });

  for (const locale of [
    { label: "EN", route: "/", prefix: "en" },
    { label: "RU", route: "/ru", prefix: "ru" },
  ]) {
    test(`${locale.label} keeps all five dynamic states readable and functional`, async ({ page }) => {
      const section = await openLessons(page, locale.route, 390);
      const selector = section.locator("[data-home-v2-lesson-selector]");
      const title = section.locator("[data-home-v2-lesson-title]");
      const description = section.locator("[data-home-v2-lesson-description]");
      const price = section.locator("[data-home-v2-lesson-price]");
      const cta = section.locator("[data-home-v2-booking-cta]");

      for (const [lessonId, expected] of Object.entries(expectedLessons)) {
        const item = selector.locator(`[data-lesson-selector-item="${lessonId}"]`);
        await item.click();
        await expect(item).toHaveAttribute("aria-pressed", "true");
        await expect(item.locator("[data-lesson-selector-title]")).toHaveCount(1);
        await expect(section.locator("[data-lessons-photo]")).toHaveAttribute("src", new RegExp(expected.image.replace(".", "\\.")));
        expect((await title.innerText()).replace(/\s+/g, " ").trim()).toMatch(expected.title);
        await expect(description).not.toBeEmpty();
        await expect(price).toContainText(expected.price);
        await assertNoIntersection(description, price);

        const copyBounds = await page.evaluate(() => {
          const frame = document.querySelector("[data-home-v2-lesson-photo-frame]").getBoundingClientRect();
          return ["[data-home-v2-lesson-title]", "[data-home-v2-lesson-audience]"].map((selector) => {
            const box = document.querySelector(selector).getBoundingClientRect();
            return { top: box.top - frame.top, bottom: box.bottom - frame.top, left: box.left - frame.left, right: box.right - frame.left };
          });
        });
        for (const box of copyBounds) {
          expect(box.top).toBeGreaterThanOrEqual(0);
          expect(box.bottom).toBeLessThanOrEqual(464.5);
          expect(box.left).toBeGreaterThanOrEqual(0);
          expect(box.right).toBeLessThanOrEqual(390.5);
        }

        if (expected.kind === "booking") {
          await expect(cta).toHaveJSProperty("tagName", "BUTTON");
        } else {
          await expect(cta).toHaveJSProperty("tagName", "A");
          await cta.evaluate((element) => {
            element.addEventListener("click", (event) => event.preventDefault(), { once: true });
            element.click();
          });
          await expect(cta).toHaveAttribute("href", /wa\.me/);
          expect(decodeURIComponent(await cta.getAttribute("href"))).toContain(lessonId === "surf_skate" ? "surf-skate" : "Line-up / Pro");
        }

        if (["group", "surf_skate", "lineup_pro"].includes(lessonId)) {
          await captureSection(section, `${locale.prefix}-${lessonId.replace("_", "-")}-390.png`);
        }
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    });
  }

  test("scales through the mobile range without overflow and switches at 481px", async ({ page }) => {
    test.setTimeout(90000);
    for (const width of [320, 360, 375, 390, 412, 430, 480]) {
      const section = await openLessons(page, "/", width);
      const stage = section.locator("[data-home-v2-lessons-mobile]");
      await expect(stage).toBeVisible();
      const box = await stage.boundingBox();
      const stageWidth = Math.min(width, 390);
      expect(box.width).toBeCloseTo(stageWidth, 0);
      expect(box.height).toBeCloseTo(stageWidth * 742 / 390, 0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
      expect((await section.locator("[data-home-v2-lesson-selector]").boundingBox()).width).toBeCloseTo(stageWidth, 0);
    }

    let section = await openLessons(page, "/", 480);
    await captureSection(section, "boundary-mobile-480.png");

    for (const width of [481, 482, 639]) {
      section = await openLessons(page, "/", width);
      await expect(section.locator("[data-home-v2-lessons-mobile]")).toHaveCount(0);
      await expect(section.locator("[data-home-v2-lessons-desktop], [data-home-v2-lessons-adaptive]").first()).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    }
    section = await openLessons(page, "/", 481);
    await captureSection(section, "boundary-adaptive-481.png");
  });

  test("preserves adaptive and desktop presentations", async ({ page }) => {
    test.setTimeout(90000);
    for (const width of [640, 899, 900, 1199]) {
      const section = await openLessons(page, "/", width);
      await expect(section.locator("[data-home-v2-lessons-mobile]")).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
    }

    for (const width of [1200, 1440, 1920]) {
      const section = await openLessons(page, "/", width);
      await expect(section.locator("[data-home-v2-lessons-poster]")).toBeVisible();
      await expect(section.locator("[data-home-v2-lessons-mobile]")).toHaveCount(0);
      if (width === 1440) await captureSection(section, "desktop-control-1440.png");
    }
  });
});
