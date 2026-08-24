const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const qaDir = path.join(process.cwd(), "tmp", "home-v2-responsive-pass3");

async function ready(page, route = "/home-v2") {
  await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function box(locator) {
  const value = await locator.boundingBox();
  return Object.fromEntries(Object.entries(value).map(([key, number]) => [key, Number(number.toFixed(2))]));
}

async function expectContained(page, rootSelector) {
  const result = await page.locator(rootSelector).evaluate((root) => {
    const rootBox = root.getBoundingClientRect();
    const visible = [...root.querySelectorAll("h1, h2, h3, p, a, button")]
      .filter((node) => {
        const style = getComputedStyle(node);
        return style.display !== "none" && style.visibility !== "hidden" && node.getClientRects().length;
      });
    return {
      horizontal: visible.every((node) => {
        const rect = node.getBoundingClientRect();
        return rect.left >= rootBox.left - 2 && rect.right <= rootBox.right + 2;
      }),
      clippedText: visible.filter((node) => /^(H1|H2|H3|P|A|BUTTON)$/.test(node.tagName))
        .some((node) => {
          const style = getComputedStyle(node);
          return node.scrollWidth > node.clientWidth + 2 && style.textOverflow !== "ellipsis" && ["hidden", "clip"].includes(style.overflowX);
        }),
    };
  });
  expect(result.horizontal).toBeTruthy();
  expect(result.clippedText).toBeFalsy();
}

test.describe("Home V2 PASS 3 responsive ownership", () => {
  const representativeWidths = [656, 804, 904, 1200, 1440];
  const boundaryWidths = [390, 639, 640, 656, 767, 768, 804, 899, 900, 904, 1024, 1108, 1199, 1200, 1366, 1439, 1440];

  for (const width of boundaryWidths) {
    test(`owns Lessons, Included, and Rentals at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);

      const lessonsMobile = page.locator("[data-home-v2-lessons-mobile-en]");
      const lessonsAdaptive = page.locator("[data-home-v2-lessons-adaptive]");
      const lessonsDesktop = page.locator("[data-home-v2-lessons-desktop-en]");
      const includedMobile = page.locator("[data-home-v2-included-mobile-en]");
      const includedAdaptive = page.locator("[data-home-v2-included-adaptive]");
      const includedDesktop = page.locator("[data-home-v2-included-desktop-en]");
      const rentalsMobile = page.locator("[data-rentals-mobile-en]");
      const rentalsAdaptive = page.locator("[data-rentals-adaptive]");
      const rentalsDesktop = page.locator("[data-rentals-desktop-en]");
      const howMobile = page.locator("[data-home-v2-how-mobile-en]");
      const howAdaptive = page.locator("[data-home-v2-how-adaptive]");
      const howDesktop = page.locator("[data-home-v2-how-desktop-en]");

      if (width < 640) {
        await expect(howMobile).toBeVisible();
        await expect(lessonsMobile).toBeVisible();
        await expect(includedMobile).toBeVisible();
        await expect(rentalsMobile).toBeVisible();
      } else if (width < 1440) {
        await expect(howAdaptive).toBeVisible();
        await expect(lessonsAdaptive).toBeVisible();
        await expect(includedAdaptive).toBeVisible();
        await expect(rentalsAdaptive).toBeVisible();
      } else {
        await expect(howDesktop).toBeVisible();
        await expect(lessonsDesktop).toBeVisible();
        await expect(includedDesktop).toBeVisible();
        await expect(rentalsDesktop).toBeVisible();
      }

      if ([656, 804, 904].includes(width)) {
        await expect(page.locator("[data-home-v2-lessons-adaptive]")).toHaveCount(1);
        await expect(page.locator("[data-home-v2-lessons-adaptive]")).toBeVisible();
        await expect(page.locator("[data-home-v2-lessons-mobile-en], [data-home-v2-lessons-desktop-en]")).toHaveCount(0);
        await expect(page.locator("[data-home-v2-lessons-legacy], [data-home-v2-lessons-tablet], [data-home-v2-lessons-old]")).toHaveCount(0);
        await expect(page.locator("[data-home-v2-how-adaptive-grid], [data-how-card-tone]")).toHaveCount(0);
        const oldCoralHeadingVisible = await page.locator("[data-home-v2-lessons-adaptive-heading] [data-home-v2-heading-line]").evaluateAll((nodes) =>
          nodes.some((node) => {
            const style = getComputedStyle(node);
            return style.display !== "none" && ["rgb(254, 116, 106)", "rgb(57, 89, 98)"].includes(style.backgroundColor);
          }),
        );
        expect(oldCoralHeadingVisible).toBeFalsy();
        await expect(page.locator("[data-home-v2-lesson-selector] [data-lesson-selector-item] [data-lesson-selector-title] + span")).toHaveCount(0);
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    });
  }

  for (const width of [656, 768, 804, 1024, 1280, 1366]) {
    test(`keeps intermediate geometry contained at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);
      await expectContained(page, "[data-home-v2-lessons-block]");
      await expectContained(page, "[data-home-v2-included]");
      await expectContained(page, "[data-home-v2-rentals-block]");

      const selector = await box(page.locator("[data-home-v2-lesson-selector]"));
      const detail = await box(page.locator("[data-home-v2-lesson-detail]"));
      if (width < 900) {
        expect(detail.x).toBeCloseTo(selector.x, 0);
        expect(new Set(await page.locator("[data-home-v2-included-adaptive-feature]").evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().top)))).size).toBe(2);
      } else {
        expect(detail.x).toBeGreaterThan(selector.x + selector.width);
        expect(new Set(await page.locator("[data-home-v2-included-adaptive-feature]").evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().top)))).size).toBe(1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    });
  }

  for (const width of representativeWidths) {
    test(`measures and captures the PASS 3 sequence at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page);

      const lessons = page.locator("[data-home-v2-lessons-block]");
      const included = page.locator("[data-home-v2-included]");
      const rentals = page.locator("[data-home-v2-rentals-block]");
      const how = page.locator("[data-home-v2-how-it-works]");
      const conditions = page.locator('[data-home-v2-flow-stage="livecam-forecast"]');
      const [howBox, lessonsBox, includedBox, rentalsBox, conditionsBox] = await Promise.all([box(how), box(lessons), box(included), box(rentals), box(conditions)]);

      const metrics = {
        how: howBox,
        lessons: lessonsBox,
        included: includedBox,
        rentals: rentalsBox,
        lessonsToIncluded: Number((includedBox.y - lessonsBox.y - lessonsBox.height).toFixed(2)),
        includedToRentals: Number((rentalsBox.y - includedBox.y - includedBox.height).toFixed(2)),
        rentalsToConditions: Number((conditionsBox.y - rentalsBox.y - rentalsBox.height).toFixed(2)),
        overflow: await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth),
      };
      console.log(`PASS3_METRICS_${width}=${JSON.stringify(metrics)}`);

      expect(metrics.overflow).toBeLessThanOrEqual(1);
      if (width >= 640 && width < 1440) {
        await expectContained(page, "[data-home-v2-lessons-block]");
        await expectContained(page, "[data-home-v2-included]");
        await expectContained(page, "[data-home-v2-rentals-block]");
      }

      if (width === 1440) {
        expect(lessonsBox.height).toBe(843);
        expect(includedBox.height).toBe(639);
        expect(rentalsBox.height).toBe(900);
      }
      if (width < 1440) {
        const selectorBox = await box(lessons.locator("[data-home-v2-lesson-selector]"));
        const detailBox = await box(lessons.locator("[data-home-v2-lesson-detail]"));
        const lessonCtaBox = await box(lessons.locator("[data-home-v2-lesson-detail] [data-home-v2-booking-cta]").last());
        const headingLineBoxes = await lessons.locator("[data-home-v2-heading-line]").evaluateAll((nodes) =>
          nodes.map((node) => {
            const rect = node.getBoundingClientRect();
            return { x: rect.x, width: rect.width };
          }),
        );
        if (width < 900) {
          expect(Math.abs(detailBox.x - selectorBox.x)).toBeLessThanOrEqual(1);
          expect(detailBox.y).toBeGreaterThanOrEqual(selectorBox.y + selectorBox.height);
        } else {
          expect(detailBox.x).toBeGreaterThanOrEqual(selectorBox.x + selectorBox.width);
          expect(Math.max(...headingLineBoxes.map((line) => line.x + line.width))).toBeLessThanOrEqual(detailBox.x + 1);
        }
        expect(lessonCtaBox.y + lessonCtaBox.height).toBeLessThanOrEqual(detailBox.y + detailBox.height + 1);
        const includedFeatures = await included.locator("[data-home-v2-included-adaptive-feature]").evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().top)));
        expect(new Set(includedFeatures).size).toBe(width < 900 ? 2 : 1);
        console.log(`PASS3_LAYOUT_${width}=${JSON.stringify({ selector: selectorBox, detail: detailBox, cta: lessonCtaBox, headingLines: headingLineBoxes })}`);
      }

      await lessons.scrollIntoViewIfNeeded();
      await expect(lessons).toHaveAttribute("data-home-v2-lessons-entered", "true");
      const screenshotStyle = "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }";
      await page.locator("[data-home-v2-main-flow]").screenshot({
        path: path.join(qaDir, `home-v2-pass3-${width}-how-lessons-boundary.png`),
        animations: "disabled",
        style: `${screenshotStyle} [data-home-v2-hero], [data-home-v2-included], [data-home-v2-rentals-block], [data-home-v2-flow-stage], [data-home-v2-reviews], [data-home-v2-faq], [data-home-v2-events], [data-home-v2-gallery] { display: none !important; }`,
      });
      await page.locator("[data-home-v2-main-flow]").screenshot({
        path: path.join(qaDir, `home-v2-pass3-${width}-lessons-included.png`),
        animations: "disabled",
        style: `${screenshotStyle} [data-home-v2-hero], [data-home-v2-how-it-works], [data-home-v2-rentals-block], [data-home-v2-flow-stage], [data-home-v2-reviews], [data-home-v2-faq], [data-home-v2-events], [data-home-v2-gallery] { display: none !important; }`,
      });
      await rentals.screenshot({
        path: path.join(qaDir, `home-v2-pass3-${width}-rentals.png`),
        animations: "disabled",
        style: screenshotStyle,
      });
    });
  }

  test("protects the exact 390px anchors", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1000 });
    await ready(page);
    await expect(page.locator("[data-home-v2-lessons-block]")).toHaveCSS("height", "1103px");
    await expect(page.locator("[data-home-v2-included]")).toHaveCSS("height", "746px");
    await expect(page.locator("[data-home-v2-rentals-block]")).toHaveCSS("height", "790px");
  });

  test("keeps adaptive lesson and rental behavior shared", async ({ page }) => {
    await page.setViewportSize({ width: 904, height: 1000 });
    await ready(page, "/home-v2?partner=hotel_abc");
    const lessons = page.locator("[data-home-v2-lessons-block]");
    const selector = lessons.locator("[data-home-v2-lesson-selector]");

    for (const lessonId of ["group", "split", "private"]) {
      await selector.locator(`[data-lesson-selector-item="${lessonId}"]`).click();
      await lessons.locator("[data-home-v2-lesson-detail] [data-home-v2-booking-cta]").last().click();
      await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
      await page.getByLabel("Close booking modal").click();
    }
    for (const lessonId of ["surf_skate", "lineup_pro"]) {
      await selector.locator(`[data-lesson-selector-item="${lessonId}"]`).click();
      const cta = lessons.locator("[data-home-v2-lesson-detail] [data-home-v2-booking-cta]").last();
      await expect(cta).toHaveJSProperty("tagName", "A");
      await cta.evaluate((element) => {
        element.addEventListener("click", (event) => event.preventDefault(), { once: true });
        element.click();
      });
      await expect(cta).toHaveAttribute("href", /wa\.me/);
    }

    const rentals = page.locator("[data-rentals-adaptive]");
    await expect(rentals.locator("[data-home-v2-rental-catalog-cta]")).toHaveAttribute("href", "/surfboard-rental-danang");
    await rentals.locator("[data-home-v2-rental-cta]").click();
    const rentalModal = page.locator("[data-home-v2-rental-modal]");
    await expect(
      rentalModal.getByRole("link", { name: "WhatsApp", exact: true }),
    ).toBeVisible();
    await expect(
      rentalModal.getByRole("link", { name: "Telegram", exact: true }),
    ).toBeVisible();
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem("epic_surf_attribution") || "{}").partner)).toBe("hotel_abc");
  });

  for (const width of [390, 904, 1200]) {
    test(`keeps RU contained at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await ready(page, "/ru/home-v2");
      await expect(page.locator("[data-home-v2-lesson-selector] button")).toHaveCount(5);
      await expect(page.locator("[data-home-v2-included-adaptive-feature]")).toHaveCount(4);
      await expect(page.locator("[data-rentals-adaptive] [data-home-v2-rental-cta]")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    });
  }
});
