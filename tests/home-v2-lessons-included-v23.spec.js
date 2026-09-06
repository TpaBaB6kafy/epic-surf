const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { test, expect } = require("@playwright/test");
const { isolateProviders, ready, expectNoOverflow } = require("./home-v2-helpers");

const outputDir = path.join(__dirname, "..", "tmp", "lessons-included-v2.3-validation");
const screenshotStyle = "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }";

const lessons = [
  ["group", "group-lesson-photo@2x.png", "BUTTON"],
  ["split", "lesson-split-desktop.webp", "BUTTON"],
  ["private", "lesson-private-desktop.webp", "BUTTON"],
  ["surf_skate", "lesson-surf-skate-desktop.webp", "A"],
  ["lineup_pro", "lesson-line-up-pro-desktop.webp", "A"],
];

function closeTo(actual, expected, tolerance = 0.7) {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
}

async function relativeBox(locator, root) {
  const [box, rootBox] = await Promise.all([locator.boundingBox(), root.boundingBox()]);
  return {
    x: box.x - rootBox.x,
    y: box.y - rootBox.y,
    width: box.width,
    height: box.height,
  };
}

async function openMobile(page, route) {
  await page.setViewportSize({ width: 390, height: 900 });
  await isolateProviders(page);
  await ready(page, route);
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: screenshotStyle });
  const lessonsSection = page.locator("[data-home-v2-lessons-block]");
  await lessonsSection.scrollIntoViewIfNeeded();
  await expect(lessonsSection).toHaveAttribute("data-home-v2-lessons-entered", "true");
  await expect(lessonsSection.locator("[data-home-v2-lessons-mobile]")).toBeVisible();
  await expect(page.locator("[data-home-v2-included-mobile]")).toBeVisible();
  await lessonsSection.locator("img").evaluateAll((images) => Promise.all(images.map((image) => image.decode().catch(() => undefined))));
  await page.locator("[data-home-v2-included] img").evaluateAll((images) => Promise.all(images.map((image) => image.decode().catch(() => undefined))));
  await expectNoOverflow(page);
  return lessonsSection;
}

async function captureMobileEvidence(page, route, prefix) {
  const lessonsSection = await openMobile(page, route);
  const includedSection = page.locator("[data-home-v2-included]");
  const lessonPath = path.join(outputDir, `${prefix}-lessons-390.png`);
  const includedPath = path.join(outputDir, `${prefix}-included-390.png`);
  const combinedPath = path.join(outputDir, `${prefix}-lessons-included-390.png`);

  await page.screenshot({ path: path.join(outputDir, `${prefix}-home-v2-full-390.png`), fullPage: true });
  await lessonsSection.screenshot({ path: lessonPath });
  await includedSection.screenshot({ path: includedPath });
  await sharp({
    create: { width: 390, height: 1488, channels: 4, background: "#2e2e2e" },
  })
    .composite([
      { input: lessonPath, top: 0, left: 0 },
      { input: includedPath, top: 742, left: 0 },
    ])
    .png()
    .toFile(combinedPath);
}

test.beforeAll(async () => {
  await fs.mkdir(outputDir, { recursive: true });
});

test.describe("HOME V2 lessons + included mobile handoff v2.3", () => {
  test("matches the 390px source geometry and exact exported assets", async ({ page }) => {
    const section = await openMobile(page, "/home-v2");
    const stage = section.locator("[data-home-v2-lessons-mobile]");
    const included = page.locator("[data-home-v2-included-mobile]");

    const stageBox = await stage.boundingBox();
    const includedBox = await included.boundingBox();
    closeTo(stageBox.width, 390);
    closeTo(stageBox.height, 742);
    closeTo(includedBox.width, 390);
    closeTo(includedBox.height, 746);

    for (const [locator, expected] of [
      [stage.locator("[data-home-v2-lesson-selector]"), { x: 0, y: 131, width: 390, height: 61 }],
      [stage.locator("[data-home-v2-lesson-photo-frame]"), { x: 0, y: 192, width: 390, height: 464 }],
      [stage.locator("[data-home-v2-lesson-description]"), { x: 12, y: 607, width: 185, height: 88 }],
      [stage.locator("[data-home-v2-lesson-price]"), { x: 239, y: 601, width: 128.669, height: 52.501 }],
      [stage.locator("[data-home-v2-booking-cta]"), { x: 239, y: 657, width: 125.038, height: 38.399 }],
    ]) {
      const actual = await relativeBox(locator, stage);
      for (const key of Object.keys(expected)) closeTo(actual[key], expected[key]);
    }

    await expect(stage.locator('[src*="heading-stripe-upper.svg"]')).toHaveCount(1);
    await expect(stage.locator('[src*="heading-stripe-lower.svg"]')).toHaveCount(1);
    await expect(stage.locator('[src*="selector-active-backplate.svg"]')).toHaveCount(1);
    await expect(stage.locator('[src*="group-lesson-photo%402x.png"]')).toHaveCount(1);
    await expect(stage.locator('[src*="lesson-photo-shadow.svg"]')).toHaveCount(1);
    await expect(stage.locator('[src*="price-box%402x.png"]')).toHaveCount(1);
    await expect(stage.locator('[src*="book-now-cta.svg"]')).toHaveCount(1);

    await expect(included.locator('[src*="feature-row-pattern-band-upper%402x.png"]')).toHaveCount(1);
    await expect(included.locator('[src*="feature-row-pattern-band-lower%402x.png"]')).toHaveCount(1);
    for (const icon of ["camera", "zinc", "board", "rashguard"]) {
      await expect(included.locator(`[data-home-v2-included-mobile-icon="${icon}"]`)).toHaveCount(1);
    }
  });

  for (const locale of [
    { label: "EN", route: "/home-v2", prefix: "en" },
    { label: "RU", route: "/ru/home-v2", prefix: "ru" },
  ]) {
    test(`${locale.label} keeps every lesson state and conversion path functional`, async ({ page }) => {
      const section = await openMobile(page, locale.route);
      const selector = section.locator("[data-home-v2-lesson-selector]");

      for (const [id, imageName, tagName] of lessons) {
        const tab = selector.locator(`[data-lesson-selector-item="${id}"]`);
        await tab.click();
        await expect(tab).toHaveAttribute("aria-pressed", "true");
        await expect(tab.locator("[data-lesson-selector-title]")).toHaveCount(1);
        await expect(section.locator("[data-lessons-photo]")).toHaveAttribute("src", new RegExp(imageName.replace("@", "%40")));
        await expect(section.locator("[data-home-v2-lesson-title]")).not.toBeEmpty();
        await expect(section.locator("[data-home-v2-lesson-description]")).not.toBeEmpty();
        await expect(section.locator("[data-home-v2-lesson-price]")).toContainText("VND");
        await expect(section.locator("[data-home-v2-booking-cta]")).toHaveJSProperty("tagName", tagName);
      }

      await selector.locator('[data-lesson-selector-item="group"]').click();
      await section.locator("[data-home-v2-booking-cta]").click();
      await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", /activity\/select/);
      await page.getByLabel(locale.label === "RU" ? "Close booking modal" : "Close booking modal").click();
      await expect(page.locator('iframe[title="Booking"]')).toHaveCount(0);
      await expectNoOverflow(page);
    });

    test(`${locale.label} captures full-page and focused 390px evidence`, async ({ page }) => {
      await captureMobileEvidence(page, locale.route, locale.prefix);
    });
  }

  test("captures the EN handoff at device scale 2 for reference@2x", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
    const page = await context.newPage();
    try {
      const lessonsSection = await openMobile(page, "/home-v2");
      const includedSection = page.locator("[data-home-v2-included]");
      const lessonsPath = path.join(outputDir, "en-lessons-780.png");
      const includedPath = path.join(outputDir, "en-included-780.png");
      await lessonsSection.screenshot({ path: lessonsPath });
      await includedSection.screenshot({ path: includedPath });
      await sharp({ create: { width: 780, height: 2976, channels: 4, background: "#2e2e2e" } })
        .composite([
          { input: lessonsPath, top: 0, left: 0 },
          { input: includedPath, top: 1484, left: 0 },
        ])
        .png()
        .toFile(path.join(outputDir, "en-lessons-included-780.png"));
    } finally {
      await context.close();
    }
  });

  test("preserves adaptive and desktop branches", async ({ page }) => {
    for (const width of [481, 900, 1200, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await isolateProviders(page);
      await ready(page, "/home-v2");
      const section = page.locator("[data-home-v2-lessons-block]");
      await section.scrollIntoViewIfNeeded();
      await expect(section.locator("[data-home-v2-lessons-mobile]")).toHaveCount(0);
      if (width >= 1200) await expect(section.locator("[data-home-v2-lessons-poster]")).toBeVisible();
      else await expect(section.locator("[data-home-v2-lessons-desktop], [data-home-v2-lessons-adaptive]").first()).toBeVisible();
      await expectNoOverflow(page);
      if (width === 1440) {
        await page.addStyleTag({ content: screenshotStyle });
        await section.screenshot({ path: path.join(outputDir, "en-lessons-1440-control.png") });
        await page.locator("[data-home-v2-included]").screenshot({ path: path.join(outputDir, "en-included-1440-control.png") });
      }
    }
  });
});
