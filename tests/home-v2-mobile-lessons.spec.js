const { test, expect } = require("@playwright/test");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

async function relativeBox(root, locator) {
  return Promise.all([root.boundingBox(), locator.boundingBox()]).then(([rootBox, box]) => ({
    left: box.x - rootBox.x,
    top: box.y - rootBox.y,
    width: box.width,
    height: box.height,
  }));
}

test.describe("Home V2 Mobile EN Choose Your Lesson", () => {
  test("matches the 390px handoff and keeps all five states functional", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-lessons-block]");
    const composition = section.locator("[data-home-v2-lessons-mobile-en]");
    const heading = section.locator("[data-home-v2-lessons-heading]");
    const selector = section.locator("[data-home-v2-lesson-selector]");
    const rows = selector.locator("button");
    const detail = section.locator("[data-home-v2-lesson-detail]");
    const photo = section.locator("[data-home-v2-lesson-photo-frame]");
    const panel = section.locator("[data-home-v2-lesson-info-panel]");
    const title = section.locator("[data-home-v2-lesson-title]");
    const price = section.locator("[data-home-v2-lesson-price]");
    const features = section.locator("[data-home-v2-lesson-features]");
    const cta = section.locator("[data-home-v2-booking-cta]");

    await section.scrollIntoViewIfNeeded();
    await expect(composition).toBeVisible();
    await expect(rows).toHaveCount(5);
    await expect(heading).toContainText("Choose");
    await expect(heading).toContainText("Your Lesson");

    const geometry = {
      root: await relativeBox(section, composition),
      heading: await relativeBox(composition, heading),
      selector: await relativeBox(composition, selector),
      rows: await Promise.all(Array.from({ length: 5 }, (_, index) => relativeBox(composition, rows.nth(index)))),
      photo: await relativeBox(composition, photo),
      panel: await relativeBox(composition, panel),
      title: await relativeBox(composition, title),
      price: await relativeBox(composition, price),
      features: await relativeBox(composition, features),
      cta: await relativeBox(composition, cta),
    };

    expect(geometry.root).toMatchObject({ left: 0, top: 0, width: 390, height: 1103 });
    expect(geometry.heading).toMatchObject({ left: 57.5, top: 0, width: 275, height: 80 });
    expect(geometry.selector).toMatchObject({ left: 20, top: 142, width: 350 });
    expect(geometry.rows[0]).toMatchObject({ left: 20, top: 142, width: 350, height: 87.109375 });
    expect(geometry.photo).toMatchObject({ left: 20, top: 550, width: 350, height: 280 });
    expect(geometry.panel).toMatchObject({ left: 20, top: 830, width: 350, height: 270 });
    expect(geometry.title).toMatchObject({ left: 48, top: 857, width: 139, height: 49 });
    expect(geometry.price).toMatchObject({ left: 218, top: 863, width: 126, height: 34 });
    expect(geometry.features).toMatchObject({ left: 218, top: 928, width: 126, height: 34 });
    expect(geometry.cta).toMatchObject({ left: 218, top: 992, width: 126, height: 34 });

    const activeSurface = await rows.first().evaluate((button) => {
      const row = button.getBoundingClientRect();
      const arrow = button.querySelector("[data-lesson-selector-arrow-area]").getBoundingClientRect();
      return {
        topInset: arrow.top - row.top,
        rightInset: row.right - arrow.right,
        bottomInset: row.bottom - arrow.bottom,
      };
    });
    expect(activeSurface.topInset).toBeGreaterThan(1);
    expect(activeSurface.rightInset).toBeGreaterThan(1);
    expect(activeSurface.bottomInset).toBeGreaterThan(1);

    const expected = {
      group: { image: "lesson-group-desktop.webp", title: "Group Lesson", price: "900.000", kind: "booking" },
      split: { image: "lesson-split-desktop.webp", title: "Split Lesson", price: "2.500.000", kind: "booking" },
      private: { image: "lesson-private-desktop.webp", title: "Private Lesson", price: "1.800.000", kind: "booking" },
      surf_skate: { image: "lesson-surf-skate-desktop.webp", title: "Surf-skate", price: "600.000", kind: "messenger" },
      lineup_pro: { image: "lesson-line-up-pro-desktop.webp", title: "Line-up / Pro", price: "2.400.000", kind: "messenger" },
    };

    for (const [lessonId, state] of Object.entries(expected)) {
      const row = selector.locator(`[data-lesson-selector-item="${lessonId}"]`);
      await row.click();
      await expect(row).toHaveAttribute("aria-pressed", "true");
      await expect(detail.locator("[data-lessons-photo]")).toHaveAttribute("src", new RegExp(state.image.replace(".", "\\.")));
      await expect(title).toContainText(state.title);
      await expect(price).toContainText(state.price);
      await expect(section.locator("[data-home-v2-lesson-description]")).not.toBeEmpty();
      await expect(features.locator("img")).toHaveCount(6);
      if (state.kind === "booking") {
        await expect(cta).toHaveJSProperty("tagName", "BUTTON");
      } else {
        await expect(cta).toHaveJSProperty("tagName", "A");
        await cta.evaluate((element) => {
          element.addEventListener("click", (event) => event.preventDefault(), { once: true });
          element.click();
        });
        await expect(cta).toHaveAttribute("href", /wa\.me/);
        expect(decodeURIComponent(await cta.getAttribute("href"))).toContain(lessonId === "surf_skate" ? "surf-skate lesson" : "Line-up / Pro lesson");
      }
    }

    const bookingTargets = {
      group: "https://n1434193.alteg.io/company/1248257/activity/select?o=act2026-06-01",
      split: "https://n1434199.alteg.io/company/1248257/personal/select-master?o=m-1s12191194",
      private: "https://n1434197.alteg.io/company/1248257/personal/select-master?o=m-1s12191191",
    };
    for (const [lessonId, bookingUrl] of Object.entries(bookingTargets)) {
      await selector.locator(`[data-lesson-selector-item="${lessonId}"]`).click();
      await cta.click();
      await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", bookingUrl);
      await page.getByLabel("Close booking modal").click();
    }

    await selector.locator('[data-lesson-selector-item="group"]').click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const how = page.locator("[data-home-v2-how-it-works]");
    const included = page.locator("[data-home-v2-included]");
    const joins = await Promise.all([how.boundingBox(), section.boundingBox(), included.boundingBox()]);
    expect(Math.abs(joins[1].y - (joins[0].y + joins[0].height))).toBeLessThanOrEqual(1);
    expect(Math.abs(joins[2].y - (joins[1].y + joins[1].height))).toBeLessThanOrEqual(1);

    await section.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-mobile-en-choose-your-lesson-focused.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });

    console.log("MOBILE_LESSONS_GEOMETRY", JSON.stringify(geometry));
  });

  test("fits 375px without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    const section = page.locator("[data-home-v2-lessons-block]");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator("[data-home-v2-lesson-selector] button")).toHaveCount(5);
    for (const lessonId of ["group", "split", "private", "surf_skate", "lineup_pro"]) {
      await section.locator(`[data-lesson-selector-item="${lessonId}"]`).click();
      await expect(section.locator(`[data-lesson-selector-item="${lessonId}"]`)).toHaveAttribute("aria-pressed", "true");
      await expect(section.locator("[data-home-v2-booking-cta]")).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  });

  test("keeps RU renderable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);
    const section = page.locator("[data-home-v2-lessons-block]");
    await expect(section.locator("[data-home-v2-lessons-mobile-en]")).toHaveCount(0);
    await expect(section.locator("[data-home-v2-lesson-selector] button")).toHaveCount(5);
  });
});
