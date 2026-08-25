const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const path = require("node:path");

const baseUrl = "http://localhost:3000";
const lessonIds = ["group", "split", "private", "surf_skate", "lineup_pro"];
const expectedEn = {
  group: { title: "Group Lesson", price: "900.000 VND", image: "lesson-1.webp", kind: "booking" },
  split: { title: "Split Lesson", price: "2.500.000 VND", image: "lesson-2.webp", kind: "booking" },
  private: { title: "Private Lesson", price: "1.800.000 VND", image: "lesson-3.webp", kind: "booking" },
  surf_skate: { title: "Surf-skate", price: "600.000 VND", image: "lesson-4.webp", kind: "messenger" },
  lineup_pro: { title: "Line-up / Pro", price: "2.400.000 VND", image: "lesson-5.webp", kind: "messenger" },
};

async function expectNoHorizontalOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}

test.describe("Main Lessons selector conversion experiment", () => {
  test("shows five discoverable options and one data-driven active detail on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });

    const section = page.locator("#lessons");
    const selector = section.locator("[data-lesson-selector]");
    const options = selector.locator("[data-lesson-selector-item]");
    const detail = section.locator("[data-lesson-detail]");
    await expect(options).toHaveCount(5);
    await expect(detail).toHaveCount(1);
    await expect(section.locator("[data-lessons-carousel]")).toHaveCount(0);
    for (let index = 0; index < 5; index += 1) {
      await expect(options.nth(index)).toBeVisible();
    }
    await expect(selector.locator('[data-lesson-selector-item][aria-pressed="true"]')).toHaveCount(1);

    const selectorBox = await selector.boundingBox();
    const optionBoxes = await options.evaluateAll((elements) => elements.map((element) => {
      const box = element.getBoundingClientRect();
      return { left: box.left, right: box.right };
    }));
    expect(optionBoxes.every((box) => box.left >= selectorBox.x - 1 && box.right <= selectorBox.x + selectorBox.width + 1)).toBe(true);

    const sectionHeights = [];
    for (const lessonId of lessonIds) {
      const option = selector.locator(`[data-lesson-selector-item="${lessonId}"]`);
      const expected = expectedEn[lessonId];
      await option.click();
      await expect(option).toHaveAttribute("aria-pressed", "true");
      await expect(selector.locator('[data-lesson-selector-item][aria-pressed="true"]')).toHaveCount(1);
      await expect(detail).toHaveAttribute("data-active-lesson-id", lessonId);
      await expect(detail.locator("[data-lesson-active-title]")).toHaveText(expected.title);
      await expect(detail.locator("[data-lesson-price]")).toHaveText(expected.price);
      await expect(detail.locator("[data-lesson-description]")).not.toBeEmpty();
      await expect(detail.locator("[data-lesson-photo]")).toHaveAttribute("src", new RegExp(expected.image.replace(".", "\\.")));
      const cta = detail.locator("[data-lesson-cta]");
      if (expected.kind === "booking") {
        await expect(cta).toHaveJSProperty("tagName", "BUTTON");
        await expect(cta).toHaveAttribute("data-booking-url", /n1434\d+\.alteg\.io/);
      } else {
        await expect(cta).toHaveJSProperty("tagName", "A");
        await cta.evaluate((element) => {
          element.addEventListener("click", (event) => event.preventDefault(), { once: true });
          element.click();
        });
        await expect(cta).toHaveAttribute("href", /wa\.me\/84383880164\?text=/);
      }
      sectionHeights.push(await section.evaluate((element) => element.getBoundingClientRect().height));
    }

    expect(Math.max(...sectionHeights) - Math.min(...sectionHeights)).toBeLessThanOrEqual(8);
    await expectNoHorizontalOverflow(page);
  });

  test("preserves booking modal targets, owner tracking path, and keyboard activation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const section = page.locator("#lessons");
    const split = section.locator('[data-lesson-selector-item="split"]');
    await split.focus();
    await page.keyboard.press("Enter");
    await expect(split).toHaveAttribute("aria-pressed", "true");

    const privateOption = section.locator('[data-lesson-selector-item="private"]');
    await privateOption.focus();
    await page.keyboard.press("Space");
    await expect(privateOption).toHaveAttribute("aria-pressed", "true");

    const cta = section.locator("[data-lesson-cta]");
    const target = await cta.getAttribute("data-booking-url");
    await cta.click();
    await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", target);
    await expect(page.getByLabel("Close booking modal")).toBeVisible();

    const landingSource = fs.readFileSync(path.join(process.cwd(), "app", "components", "LandingPage.jsx"), "utf8");
    const lessonsSource = fs.readFileSync(path.join(process.cwd(), "app", "components", "Lessons.jsx"), "utf8");
    expect(landingSource).toContain('options.event || "booking_cta_click"');
    expect(lessonsSource).toContain("openBookingModal(bookingUrl");
    expect(lessonsSource).toContain('ctaLocation: "lessons"');
    expect(lessonsSource).toContain("lessonId: item.id");
  });

  test("has no horizontal overflow across target widths", async ({ page }) => {
    for (const width of [360, 390, 430, 640, 768, 900, 1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      await expect(page.locator("#lessons [data-lesson-selector-item]")).toHaveCount(5);
      await expectNoHorizontalOverflow(page);
    }
  });

  test("keeps tablet and desktop geometry balanced", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const section = page.locator("#lessons");
    const selector = section.locator("[data-lesson-selector]");
    const detail = section.locator("[data-lesson-detail]");
    const [selectorBox, detailBox] = await Promise.all([selector.boundingBox(), detail.boundingBox()]);
    expect(selectorBox.x + selectorBox.width).toBeLessThanOrEqual(detailBox.x + 1);
    const wrappedTitles = await selector.locator("[data-lesson-selector-title]").evaluateAll((titles) =>
      titles.filter((title) => {
        const lineHeight = Number.parseFloat(getComputedStyle(title).lineHeight);
        return Number.isFinite(lineHeight) && title.getBoundingClientRect().height > lineHeight * 1.45;
      }).length
    );
    expect(wrappedTitles).toBeLessThanOrEqual(1);
    await expectNoHorizontalOverflow(page);

    for (const width of [1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
      const desktopSelector = page.locator("#lessons [data-lesson-selector]");
      const desktopDetail = page.locator("#lessons [data-lesson-detail]");
      const lastRow = desktopSelector.locator("[data-lesson-selector-item]").last();
      const [desktopSelectorBox, desktopDetailBox, lastRowBox] = await Promise.all([
        desktopSelector.boundingBox(),
        desktopDetail.boundingBox(),
        lastRow.boundingBox(),
      ]);
      expect(Math.abs(desktopSelectorBox.height - desktopDetailBox.height)).toBeLessThanOrEqual(4);
      expect(Math.abs(desktopSelectorBox.y + desktopSelectorBox.height - (desktopDetailBox.y + desktopDetailBox.height))).toBeLessThanOrEqual(4);
      expect(Math.abs(lastRowBox.y + lastRowBox.height - (desktopSelectorBox.y + desktopSelectorBox.height))).toBeLessThanOrEqual(2);
      await expectNoHorizontalOverflow(page);
    }
  });

  test("keeps the mobile action zone inside the detail and clear of severe FAB overlap", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`, { waitUntil: "domcontentloaded" });
    const detail = page.locator("#lessons [data-lesson-detail]");
    const actionZone = detail.locator("[data-lesson-action-zone]");
    const cta = detail.locator("[data-lesson-cta]");
    await detail.scrollIntoViewIfNeeded();
    const fab = page.locator("div.fixed.bottom-6.right-6 > button");
    const [detailBox, actionBox, ctaBox, fabBox] = await Promise.all([
      detail.boundingBox(),
      actionZone.boundingBox(),
      cta.boundingBox(),
      fab.boundingBox(),
    ]);
    expect(actionBox.x).toBeGreaterThanOrEqual(detailBox.x);
    expect(actionBox.y).toBeGreaterThanOrEqual(detailBox.y);
    expect(actionBox.x + actionBox.width).toBeLessThanOrEqual(detailBox.x + detailBox.width + 1);
    expect(actionBox.y + actionBox.height).toBeLessThanOrEqual(detailBox.y + detailBox.height + 1);
    const overlapWidth = Math.max(0, Math.min(ctaBox.x + ctaBox.width, fabBox.x + fabBox.width) - Math.max(ctaBox.x, fabBox.x));
    const overlapHeight = Math.max(0, Math.min(ctaBox.y + ctaBox.height, fabBox.y + fabBox.height) - Math.max(ctaBox.y, fabBox.y));
    expect((overlapWidth * overlapHeight) / (ctaBox.width * ctaBox.height)).toBeLessThanOrEqual(0.15);
  });

  test("keeps all five RU options, switching, and booking functional", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/ru`, { waitUntil: "domcontentloaded" });
    const section = page.locator("#lessons");
    const options = section.locator("[data-lesson-selector-item]");
    await expect(options).toHaveCount(5);
    await expect(options.locator("[data-lesson-selector-title]")).toHaveText([
      "Групповой урок",
      "Сплит урок",
      "Приватный урок",
      "Серф-скейт",
      "Line-up / Pro",
    ]);

    const split = section.locator('[data-lesson-selector-item="split"]');
    await split.click();
    await expect(split).toHaveAttribute("aria-pressed", "true");
    await expect(section.locator("[data-lesson-active-title]")).toHaveText("Сплит урок");
    await expect(section.locator("[data-lesson-price]")).toHaveText("2.500.000 VND");
    const target = await section.locator("[data-lesson-cta]").getAttribute("data-booking-url");
    await section.locator("[data-lesson-cta]").click();
    await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", target);
    await expectNoHorizontalOverflow(page);
  });
});
