const { test, expect } = require("@playwright/test");
const { readFileSync } = require("node:fs");
const path = require("node:path");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

const routes = [
  { path: "/home-v2", language: "en", switchLabel: "RU", switchedPath: "/ru/home-v2" },
  { path: "/ru/home-v2", language: "ru", switchLabel: "EN", switchedPath: "/home-v2" },
];

const viewports = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 820, height: 1000 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

async function rect(locator) {
  return locator.evaluate((element) => {
    const box = element.getBoundingClientRect();
    return {
      top: box.top + window.scrollY,
      bottom: box.bottom + window.scrollY,
      width: box.width,
      height: box.height,
      left: box.left,
      right: box.right,
    };
  });
}

async function waitForHomeV2ClientReady(page) {
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

test.describe("Home V2 hidden pages", () => {
  test("matches the desktop EN Live Cam and Forecast handoff", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    const artboard = section.locator("[data-live-cam-artboard][data-forecast-artboard]");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toHaveAttribute("data-live-cam-mounted", "true");
    await expect(section.locator('iframe[src*="danangsurfcam.com/embed/preview"]')).toHaveAttribute("loading", "lazy");
    await expect(section.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);
    await expect(section.locator("[data-wave-layer]")).toHaveCount(4);
    await expect(section.locator("[data-direction-indicator]")).toHaveCount(1);
    await expect(section.getByRole("link", { name: /Ask Epic about conditions/i })).toBeVisible();

    const geometry = await artboard.evaluate((node) => {
      const root = node.getBoundingClientRect();
      const box = (selector) => {
        const rect = node.querySelector(selector).getBoundingClientRect();
        return { left: rect.left - root.left, top: rect.top - root.top, width: rect.width, height: rect.height };
      };
      return {
        root: { width: root.width, height: root.height },
        forecastPanel: box("[data-forecast-panel]"),
        forecastPreview: box("[data-forecast-map]"),
        forecastHeading: box('[data-conditions-heading="forecast"]'),
        forecastUnderlay: box('[data-conditions-heading-underlay="forecast"]'),
        waveCallout: box("[data-wave-height-callout]"),
        waveValue: box("[data-wave-height-value]"),
        waveUnit: box("[data-wave-height-unit]"),
        wave04: box('[data-wave-layer="04"]'),
        wave03: box('[data-wave-layer="03"]'),
        wave02: box('[data-wave-layer="02"]'),
        wave01: box('[data-wave-layer="01"]'),
        cta: box("[data-conditions-cta]"),
        ctaSurface: box("[data-live-cam-chat-icon]"),
        period: box('[data-conditions-stat="period"]'),
        periodSurface: box('[data-stat-surface="period"]'),
        livePanel: box("[data-live-cam-panel-group]"),
        livePreview: box("[data-live-cam-panel]"),
        liveEmbed: box("[data-live-cam-preview]"),
        liveHeading: box('[data-conditions-heading="live-cam"]'),
        liveUnderlay: box('[data-conditions-heading-underlay="live-cam"]'),
        statsRow: box("[data-forecast-stats-panel]"),
        wind: box('[data-conditions-stat="wind"]'),
        windSurface: box('[data-stat-surface="wind"]'),
        direction: box('[data-conditions-stat="direction"]'),
        directionSurface: box('[data-stat-surface="direction"]'),
        directionArrow: box("[data-direction-indicator]"),
        water: box('[data-conditions-stat="water"]'),
        waterSurface: box('[data-stat-surface="water"]'),
      };
    });

    expect(geometry.root).toEqual({ width: 1440, height: 790 });
    const expectedBounds = {
      forecastPanel: [146, 100, 503, 587.2],
      forecastPreview: [146, 100, 503, 376],
      forecastHeading: [147, 138, 194.636, 25.11],
      forecastUnderlay: [147, 145, 194.636, 12.475],
      waveCallout: [146, 492, 337.687, 102.06],
      waveValue: [195.001, 492, 198.77, 102.06],
      waveUnit: [363, 536, 37.998, 42.525],
      wave04: [164.125, 515.419, 319.562, 61.189],
      wave03: [151, 520, 319.562, 61.189],
      wave02: [146, 526, 319.562, 61.189],
      wave01: [152, 548, 304.637, 38.957],
      cta: [146, 617, 175, 70],
      ctaSurface: [161.071, 632.229, 40.186, 40.186],
      period: [351, 617, 143.1, 70.2],
      periodSurface: [364.5, 632.3, 40.186, 40.186],
      livePanel: [789, 100, 504.2, 498.2],
      livePreview: [789, 100, 503.832, 376.42],
      liveEmbed: [789, 100, 503.277, 327.722],
      liveHeading: [789, 138, 194.636, 25.11],
      liveUnderlay: [789, 144.5, 194.636, 12.475],
      statsRow: [791, 528, 502.2, 70.2],
      wind: [791, 528, 142.2, 70.2],
      windSurface: [806.07, 543.229, 40.186, 40.186],
      direction: [973, 528, 143.1, 70.2],
      directionSurface: [988.071, 543.229, 40.186, 40.186],
      directionArrow: [1033.229, 555.147, 31.24, 31.052],
      water: [1151, 528, 142.2, 70.2],
      waterSurface: [1166.07, 543.229, 40.186, 40.186],
    };
    for (const [name, [left, top, width, height]] of Object.entries(expectedBounds)) {
      expect(Math.abs(geometry[name].left - left), `${name} left`).toBeLessThanOrEqual(0.75);
      expect(Math.abs(geometry[name].top - top), `${name} top`).toBeLessThanOrEqual(0.75);
      expect(Math.abs(geometry[name].width - width), `${name} width`).toBeLessThanOrEqual(0.75);
      expect(Math.abs(geometry[name].height - height), `${name} height`).toBeLessThanOrEqual(0.75);
    }

    await section.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-live-cam-forecast-v2-1-focused.png"),
      animations: "disabled",
      style: '[data-home-v2-messenger] { display: none !important; }',
    });
  });

  test("keeps the desktop Rentals to Conditions transition compact", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const rentals = page.locator('[data-home-v2-flow-stage="rental"]');
    const conditionsStage = page.locator('[data-home-v2-flow-stage="livecam-forecast"]');
    const conditions = conditionsStage.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    const artboard = conditions.locator("[data-live-cam-artboard][data-forecast-artboard]");
    const forecastPanel = conditions.locator("[data-forecast-panel]");

    const [rentalsBox, conditionsStageBox, conditionsBox, artboardBox, forecastBox] = await Promise.all([
      rentals.boundingBox(),
      conditionsStage.boundingBox(),
      conditions.boundingBox(),
      artboard.boundingBox(),
      forecastPanel.boundingBox(),
    ]);

    expect(rentalsBox).not.toBeNull();
    expect(conditionsStageBox).not.toBeNull();
    expect(conditionsBox).not.toBeNull();
    expect(artboardBox).not.toBeNull();
    expect(forecastBox).not.toBeNull();
    expect(Math.abs(conditionsStageBox.y - (rentalsBox.y + rentalsBox.height))).toBeLessThanOrEqual(0.5);
    expect(conditionsBox.y).toBeCloseTo(conditionsStageBox.y, 1);
    expect(artboardBox.height).toBe(790);
    expect(forecastBox.x - artboardBox.x).toBeCloseTo(146, 0);
    expect(forecastBox.y - artboardBox.y).toBeCloseTo(100, 0);
    expect(forecastBox.width).toBeCloseTo(503, 1);
    expect(forecastBox.height).toBeCloseTo(587.2, 1);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    await page.locator("[data-home-v2-surf-stack-content]").screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-rentals-conditions-integration.png"),
      animations: "disabled",
      style: '[data-home-v2-messenger] { display: none !important; }',
    });
  });

  test("matches the desktop EN Rentals handoff and keeps rental actions", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const rentals = page.locator("[data-home-v2-rentals-block]");
    const desktop = rentals.locator("[data-rentals-desktop-en]");
    const intro = desktop.locator("[data-rentals-intro]");
    const offer = desktop.locator("[data-rentals-content]");
    const catalog = desktop.locator("[data-home-v2-rental-catalog-cta]");
    const rentNow = desktop.locator("[data-home-v2-rental-cta]");

    await expect(desktop).toBeVisible();
    await expect(desktop.getByRole("heading", { name: "SURF BOARD RENTALS" })).toBeVisible();
    await expect(intro).toContainText("Board rental in Da Nang with delivery or pickup in a convenient city spot.");
    await expect(offer.getByText("250.000", { exact: true })).toBeVisible();
    await expect(catalog).toHaveAttribute("href", "/surfboard-rental-danang");
    await expect(rentNow).toBeVisible();

    const geometry = await desktop.evaluate((node) => {
      const box = (selector) => {
        const rect = node.querySelector(selector).getBoundingClientRect();
        const root = node.getBoundingClientRect();
        return { left: rect.left - root.left, top: rect.top - root.top, width: rect.width, height: rect.height };
      };
      return {
        root: { left: 0, top: 0, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height },
        photo: box('[data-rentals-layer="background-photo"]'),
        overlay: box('[data-rentals-layer="background-overlay"]'),
        heading: box("[data-rentals-heading]"),
        intro: box("[data-rentals-intro]"),
        offer: box("[data-rentals-content]"),
        catalog: box("[data-home-v2-rental-catalog-cta]"),
        rentNow: box("[data-home-v2-rental-cta]"),
      };
    });

    expect(geometry.root).toEqual({ left: 0, top: 0, width: 1440, height: 900 });
    expect(geometry.heading.left).toBeCloseTo(118.68, 1);
    expect(geometry.heading.top).toBeCloseTo(27.54, 1);
    expect(geometry.heading.width).toBeCloseTo(356.645, 1);
    expect(geometry.heading.height).toBeCloseTo(129.406, 1);
    expect(geometry.intro).toEqual({ left: 99.5, top: 405, width: 1241, height: 30 });
    expect(geometry.offer).toEqual({ left: 265, top: 493, width: 909, height: 223 });
    expect(geometry.catalog).toEqual({ left: 906, top: 534, width: 214, height: 56 });
    expect(geometry.rentNow).toEqual({ left: 906, top: 613, width: 214, height: 56 });
    expect(geometry.photo.width).toBe(1440);
    expect(geometry.overlay).toEqual({ left: 0, top: 0, width: 1440, height: 810 });

    await rentNow.click();
    await expect(page.locator("[data-home-v2-rental-modal]").getByRole("link", { name: "WhatsApp", exact: true })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("matches the desktop EN Included handoff", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-included]");
    const desktop = section.locator("[data-home-v2-included-desktop-en]");
    const features = desktop.locator("[data-home-v2-included-feature]");
    const marquee = desktop.locator("[data-home-v2-included-marquee]");

    await expect(desktop).toBeVisible();
    await expect(features).toHaveCount(4);
    expect(await features.evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-home-v2-included-feature")))).toEqual([
      "photos-videos",
      "zinc-spf",
      "board",
      "rashguard",
    ]);
    await expect(desktop.locator("[data-home-v2-included-callout]")).toContainText("No gear?No problem");
    await expect(desktop.locator("[data-home-v2-included-description]")).toContainText("We prepare the essentials for your lesson");
    await expect(marquee).toBeVisible();
    await expect(desktop.locator("[data-home-v2-included-marquee-track]")).toBeVisible();
    await expect(desktop.locator("[data-home-v2-included-marquee-repeat]")).toHaveCount(8);
    expect(await section.locator('img[src="/design/home-v2/included/included-surf-school-logo.svg"]').count()).toBe(8);
    await expect(desktop.locator("[data-home-v2-included-board-icon]")).toHaveAttribute("src", "/design/home-v2/included/included-icon-board.svg");
    expect(readFileSync(path.join(process.cwd(), "public/design/home-v2/included/included-icon-board.svg"), "utf8")).toContain('transform="translate(0 9)"');

    const sectionBox = await rect(desktop);
    expect({ width: sectionBox.width, height: sectionBox.height }).toEqual({ width: 1440, height: 639 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await desktop.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-included-focused.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });
  });

  test("matches the desktop EN How It Works handoff", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 940 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-how-it-works]");
    const desktop = section.locator("[data-home-v2-how-desktop-en]");
    const hero = page.locator("[data-home-v2-hero]");
    const cards = desktop.locator("[data-home-v2-how-process-card]");
    const titles = await cards.locator("h3").allTextContents();

    await expect(section).toBeVisible();
    await expect(desktop).toBeVisible();
    await expect(cards).toHaveCount(4);
    expect(titles).toEqual(["Meet & Gear Up", "Beach Theory", "Ocean Practice", "Review & Tips"]);
    await expect(desktop.locator("[data-home-v2-how-wave-contour]")).toHaveCount(1);

    const sectionBox = await rect(section);
    const desktopBox = await rect(desktop);
    const heroBox = await rect(hero);
    const cardBoxes = await Promise.all(Array.from({ length: 4 }, (_, index) => rect(cards.nth(index))));
    expect({ width: sectionBox.width, height: sectionBox.height }).toEqual({ width: 1440, height: 720 });
    expect({ left: desktopBox.left, width: desktopBox.width, height: desktopBox.height }).toEqual({ left: 0, width: 1440, height: 720 });
    expect(cardBoxes.map(({ left, top, width, height }) => ({ left: left - desktopBox.left, top: top - desktopBox.top, width, height }))).toEqual([
      { left: 100, top: 226, width: 249, height: 394 },
      { left: 426, top: 226, width: 251, height: 394 },
      { left: 755, top: 226, width: 252, height: 394 },
      { left: 1089, top: 226, width: 254, height: 394 },
    ]);
    expect(await cards.locator("[data-home-v2-how-card-border]").evaluateAll((nodes) => nodes.map((node) => {
      const style = getComputedStyle(node);
      return { borderRadius: style.borderRadius, opacity: style.opacity };
    }))).toEqual(Array(4).fill({ borderRadius: "3px", opacity: "0.69" }));

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await section.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-how-it-works-focused.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });

    await page.evaluate((top) => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, top);
    }, Math.round(heroBox.bottom - 220));

    await page.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-hero-how-it-works-integration.png"),
      animations: "disabled",
      style: "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }",
    });
  });

  test("matches the desktop EN lesson frame geometry", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const lessons = page.locator("[data-home-v2-lessons-block]");
    const desktop = lessons.locator("[data-home-v2-lessons-desktop-en]");
    const selector = lessons.locator("[data-home-v2-lesson-selector]");
    const selectorButtons = selector.locator("button");
    const heading = lessons.locator("[data-home-v2-lessons-heading]");
    const card = lessons.locator("[data-home-v2-lesson-detail]");
    const photo = lessons.locator("[data-home-v2-lesson-photo-frame]");
    const panel = lessons.locator("[data-home-v2-lesson-info-panel]");
    const cta = lessons.locator("[data-home-v2-booking-cta]");
    const sectionBox = await rect(lessons);

    expect(sectionBox).toMatchObject({ left: 0, width: 1440, height: 843 });
    expect(await rect(desktop)).toMatchObject({ left: 0, width: 1440, height: 843 });
    expect(await rect(heading)).toMatchObject({ left: 126, top: sectionBox.top + 98 });
    expect(await rect(selector)).toMatchObject({ left: 100, top: sectionBox.top + 254, width: 405.890625, height: 460.890625 });
    expect(await rect(selectorButtons.first())).toMatchObject({ width: 405.890625, height: 108.890625 });
    expect(await rect(selectorButtons.nth(1))).toMatchObject({ width: 405.890625, height: 89.09375 });
    expect(await rect(card)).toMatchObject({ left: 659, top: sectionBox.top + 100, width: 682, height: 615 });
    expect(await rect(photo)).toMatchObject({ left: 659, top: sectionBox.top + 100, width: 360, height: 615 });
    expect(await rect(panel)).toMatchObject({ left: 1016, top: sectionBox.top + 100, width: 325, height: 615 });
    expect(await rect(cta)).toMatchObject({ width: 214, height: 58 });
    await expect(panel).toHaveCSS("border-width", "3px");
    await expect(panel).toContainText("Perfect for those who want to learn in a relaxed, lively atmosphere with like-minded people.");

    const activeRowSurface = await selectorButtons.first().evaluate((button) => {
      const row = button.getBoundingClientRect();
      const arrow = button.querySelector("[data-lesson-selector-arrow-area]").getBoundingClientRect();
      return {
        row: { left: row.left, top: row.top, right: row.right, bottom: row.bottom },
        arrow: { left: arrow.left, top: arrow.top, right: arrow.right, bottom: arrow.bottom },
      };
    });
    expect(activeRowSurface.arrow.top - activeRowSurface.row.top).toBeCloseTo(3, 1);
    expect(activeRowSurface.row.bottom - activeRowSurface.arrow.bottom).toBeCloseTo(3, 1);
    expect(activeRowSurface.row.right - activeRowSurface.arrow.right).toBeCloseTo(3, 1);
    await expect(lessons.locator("[data-home-v2-lesson-features] img").nth(1)).toHaveCSS("filter", "brightness(0) invert(1)");

    await expect(selectorButtons).toHaveCount(5);
    expect(await selectorButtons.locator("[data-lesson-selector-title]").allTextContents()).toEqual([
      "Group Lesson",
      "Split Lesson",
      "Private Lesson",
      "Surf-skate",
      "Line-up / Pro",
    ]);

    const bookingTargets = {
      group: "https://n1434193.alteg.io/company/1248257/activity/select?o=act2026-06-01",
      split: "https://n1434199.alteg.io/company/1248257/personal/select-master?o=m-1s12191194",
      private: "https://n1434197.alteg.io/company/1248257/personal/select-master?o=m-1s12191191",
    };
    for (const [lessonId, bookingUrl] of Object.entries(bookingTargets)) {
      const button = lessons.locator(`[data-lesson-selector-item="${lessonId}"]`);
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await cta.click();
      await expect(page.locator('iframe[title="Booking"]')).toHaveAttribute("src", bookingUrl);
      await page.getByLabel("Close booking modal").click();
    }

    for (const [lessonId, messageFragment] of [
      ["surf_skate", "surf-skate lesson"],
      ["lineup_pro", "Line-up / Pro lesson"],
    ]) {
      const button = lessons.locator(`[data-lesson-selector-item="${lessonId}"]`);
      await button.click();
      await expect(button).toHaveAttribute("aria-pressed", "true");
      await cta.evaluate((element) => {
        element.addEventListener("click", (event) => event.preventDefault(), { once: true });
        element.click();
      });
      await expect(cta).toHaveAttribute("target", "_blank");
      expect(decodeURIComponent(await cta.getAttribute("href"))).toContain(messageFragment);
    }

    await lessons.locator('[data-lesson-selector-item="group"]').click();
    await expect(lessons.locator('[data-lessons-photo][src*="lesson-group-desktop"]')).toBeVisible();

    const screenshotStyle = "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }";
    await lessons.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-choose-your-lesson-focused.png"),
      animations: "disabled",
      style: screenshotStyle,
    });
    await page.evaluate((top) => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, top);
    }, Math.max(0, Math.round(sectionBox.top - 300)));
    await page.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-how-it-works-lessons-integration.png"),
      animations: "disabled",
      style: screenshotStyle,
    });

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test("matches the desktop EN Reviews v2.1 handoff and Conditions bridge", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const section = page.locator("[data-home-v2-reviews]");
    const composition = section.locator("[data-home-v2-reviews-desktop-en]");
    const cardsGroup = composition.locator("[data-review-cards]");
    const cards = cardsGroup.locator("[data-home-v2-review-card]");
    const heading = composition.locator("[data-reviews-section-heading]");
    const rating = composition.locator("[data-google-rating-summary]");
    const mapsCta = composition.locator("[data-google-maps-cta]");
    const bridge = composition.locator("[data-surf-family-bridge-illustration]");

    await expect(section).toHaveCount(1);
    await expect(composition).toBeVisible();
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText("Great lessons!");
    await expect(cards.nth(1)).toContainText("Excellent team!");
    await expect(cards.nth(2)).toContainText("Despite of the bad weather");
    await expect(cards.nth(0)).toContainText("Evgenia");
    await expect(cards.nth(1)).toContainText("Dmitry Kharlamov");
    await expect(cards.nth(2)).toContainText("Peter Thanh");
    await expect(composition.locator("[data-review-quote]")).toHaveCount(3);
    await expect(composition.locator("[data-card-divider]")).toHaveCount(3);
    await expect(composition.locator('[data-review-card-layer="offset"]')).toHaveCount(0);
    await expect(composition.locator('[data-review-card-layer="outline"]')).toHaveCount(3);
    const cardBaseGeometry = await composition.locator('[data-review-card-layer="outline"]').evaluateAll((nodes) => nodes.map((node) => {
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      return {
        preTransform: [parseFloat(style.width), parseFloat(style.height)],
        transformed: [box.width, box.height],
      };
    }));
    const expectedCardBaseGeometry = [
      { preTransform: [317.579, 166.619], transformed: [319.158, 169.649] },
      { preTransform: [322.442, 166.663], transformed: [323.658, 169.028] },
      { preTransform: [324.629, 162.789], transformed: [326.669, 166.894] },
    ];
    cardBaseGeometry.forEach((actual, index) => {
      actual.preTransform.forEach((value, axis) => expect(value).toBeCloseTo(expectedCardBaseGeometry[index].preTransform[axis], 1));
      actual.transformed.forEach((value, axis) => expect(value).toBeCloseTo(expectedCardBaseGeometry[index].transformed[axis], 1));
    });
    await expect(composition.locator("[data-reviewer-name]")).toHaveCount(3);
    await expect(composition.locator("[data-review-date]")).toHaveCount(3);
    await expect(composition.locator("[data-rating-value]")).toHaveText("5.0");
    await expect(composition.locator("[data-rating-star]")).toHaveCount(5);
    await expect(mapsCta).toHaveAttribute("href", "https://www.google.com/maps/place/EPIC+Surf+School+Da+Nang/@16.0464674,108.2504812,1360m/data=!3m1!1e3!4m6!3m5!1s0x314217f20b1fa357:0xa323fdd182ae974!8m2!3d16.0464674!4d108.2504812!16s%2Fg%2F11vlwxw7nd?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D");
    await expect(page.locator("[data-home-v2-photo-break]")).toHaveCount(0);

    const relativeBox = async (locator) => {
      const [rootBox, box] = await Promise.all([composition.boundingBox(), locator.boundingBox()]);
      return {
        x: Number((box.x - rootBox.x).toFixed(3)),
        y: Number((box.y - rootBox.y).toFixed(3)),
        w: Number(box.width.toFixed(3)),
        h: Number(box.height.toFixed(3)),
      };
    };
    const expectBox = async (locator, handoff) => {
      const actual = await relativeBox(locator);
      for (const key of ["x", "y", "w", "h"]) {
        expect(actual[key]).toBeCloseTo(handoff[key], 1);
      }
    };

    await expectBox(composition, { x: 0, y: 0, w: 1440, h: 684 });
    await expectBox(heading, { x: 126, y: 102, w: 583.228, h: 38.592 });
    await expectBox(cardsGroup, { x: 173, y: 243, w: 1093.458, h: 196.003 });
    await expectBox(cards.nth(0), { x: 173.074, y: 258.66, w: 320.556, h: 172.313 });
    await expectBox(cards.nth(1), { x: 552.101, y: 257.129, w: 327.522, h: 176.503 });
    await expectBox(cards.nth(2), { x: 925.676, y: 248.788, w: 335.294, h: 184.092 });
    await expectBox(rating, { x: 432.324, y: 515.074, w: 211.249, h: 61.301 });
    await expectBox(mapsCta, { x: 795.905, y: 503.681, w: 237.276, h: 88.915 });
    await expectBox(bridge, { x: 870, y: -139, w: 364, h: 337.13 });

    expect(await section.evaluate((node) => node.previousElementSibling?.matches("[data-home-v2-surf-stack]"))).toBe(true);
    const overlap = await page.evaluate(() => {
      const reviews = document.querySelector("[data-home-v2-reviews]").getBoundingClientRect();
      const bridgeNode = document.querySelector("[data-surf-family-bridge-illustration]");
      const bridgeBox = bridgeNode.getBoundingClientRect();
      const artworkBox = bridgeNode.querySelector("img").getBoundingClientRect();
      return {
        bridgeIntoPrevious: reviews.top - bridgeBox.top,
        artworkIntoPrevious: reviews.top - artworkBox.top,
      };
    });
    expect(overlap.bridgeIntoPrevious).toBeCloseTo(139, 1);
    expect(overlap.artworkIntoPrevious).toBeGreaterThan(130);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

    const screenshotStyle = "nextjs-portal, [data-home-v2-header], [data-home-v2-messenger] { visibility: hidden !important; }";
    await section.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-reviews-focused.png"),
      animations: "disabled",
      style: screenshotStyle,
    });
    const [conditionsBox, reviewsBox] = await Promise.all([
      page.locator("[data-home-v2-live-cam]").boundingBox(),
      section.boundingBox(),
    ]);
    await page.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-conditions-reviews-bridge-focused.png"),
      animations: "disabled",
      clip: {
        x: 0,
        y: conditionsBox.y + conditionsBox.height - 260,
        width: 1440,
        height: Math.min(620, reviewsBox.y + 360 - (conditionsBox.y + conditionsBox.height - 260)),
      },
      style: screenshotStyle,
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(composition).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

    await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("[data-home-v2-reviews-desktop]")).toHaveCount(1);
    await expect(page.locator("[data-home-v2-reviews-desktop]")).toBeHidden();
    await expect(page.locator("[data-home-v2-reviews-mobile]")).toBeVisible();

    for (const productionPath of ["/", "/ru"]) {
      await page.goto(`${baseUrl}${productionPath}`, { waitUntil: "domcontentloaded" });
        await expect(page.locator("[data-home-v2-reviews-desktop]")).toHaveCount(0);
    }
  });

  test("matches the Figma Desktop EN Hero geometry", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
    await waitForHomeV2ClientReady(page);

    const hero = page.locator('[data-home-v2-hero][data-home-v2-hero-locale="en"]');
    const desktopHero = hero.locator("[data-home-v2-hero-desktop-en]");
    const videoStrip = desktopHero.locator("[data-home-v2-hero-video-strip]");
    const video = videoStrip.locator("video");
    const epic = desktopHero.locator("[data-home-v2-hero-logo-epic]");
    const accentDot = desktopHero.locator("[data-home-v2-hero-logo-accent-dot]");
    const surfSchool = desktopHero.locator("[data-home-v2-hero-logo-surf-school]");
    const benefits = desktopHero.locator("[data-home-v2-hero-benefits]");
    const benefitItems = benefits.locator("[data-home-v2-benefit-card]");
    const waveStack = desktopHero.locator("[data-home-v2-hero-wave-stack]");

    await expect(hero).toBeVisible();
    await expect(video).toHaveAttribute("autoplay", "");
    await expect(video).toHaveAttribute("loop", "");
    await expect(video).toHaveAttribute("playsinline", "");
    await expect(video.locator("source")).toHaveAttribute("src", "/hero-surf.mp4");
    expect(await video.evaluate((node) => ({ muted: node.muted, controls: node.controls }))).toEqual({ muted: true, controls: false });

    expect(await rect(hero)).toMatchObject({ width: 1440, height: 726, left: 0 });
    expect(await rect(videoStrip)).toMatchObject({ width: 1440, height: 176, left: 0, top: 0 });
    expect(await rect(epic)).toMatchObject({ width: 198, left: 99, top: 270 });
    expect(await rect(accentDot)).toMatchObject({ width: 26, height: 26, left: 214, top: 236 });
    expect(await rect(surfSchool)).toMatchObject({ width: 304, left: 99, top: 377 });
    expect(await rect(benefits)).toMatchObject({ width: 464, height: 220, left: 875, top: 246 });
    expect(await benefitItems.evaluateAll((nodes) => nodes.map((node) => Math.round(node.getBoundingClientRect().top)))).toEqual([246, 330, 412]);
    await expect(benefitItems).toHaveCount(3);
    await expect(benefits.getByText("Personal Focus", { exact: true })).toBeVisible();
    await expect(benefits.getByText("Perfect Conditions", { exact: true })).toBeVisible();
    await expect(benefits.getByText("Confident Start", { exact: true })).toBeVisible();

    await expect(surfSchool.locator("[data-home-v2-surf-school-letter]")).toHaveCount(10);
    expect(await rect(waveStack)).toMatchObject({ width: 1440, height: 191, left: 0, top: 535 });
    await expect(waveStack.locator("[data-home-v2-hero-wave-layer]")).toHaveCount(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);

    await desktopHero.screenshot({
      path: path.join(process.cwd(), "test-results", "home-v2-hero-desktop-en.png"),
      animations: "disabled",
      style: '[data-home-v2-header="true"], [data-home-v2-main-flow] > :not([data-home-v2-hero]) { visibility: hidden !important; }',
    });
  });

  for (const route of routes) {
    for (const viewport of viewports) {
      test(`renders ${route.path} at ${viewport.width}px`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

        await expect(page.locator("[data-home-v2-root]")).toBeVisible();
        await expect(page.locator("[data-home-v2-hero]")).toBeVisible();
        await expect(page.locator("[data-home-v2-how-it-works]")).toBeVisible();
        await expect(page.locator("#lessons")).toBeVisible();
        await expect(page.locator("[data-home-v2-included]")).toBeVisible();
        await expect(page.locator("#rentals")).toBeVisible();
        await expect(page.locator("[data-home-v2-live-cam]")).toBeVisible();
        await expect(page.locator("[data-home-v2-forecast]")).toBeVisible();
        const liveCamIframe = page.locator('[data-home-v2-live-cam] iframe[src*="danangsurfcam.com/embed/preview"]');
        await expect(liveCamIframe).toHaveCount(0);
        await expect(page.locator("[data-live-cam-placeholder]")).toHaveCount(1);
        await expect(page.locator('[data-home-v2-live-cam] [data-live-cam-provider-action]')).toHaveCount(2);
        await expect(page.locator('[data-home-v2-live-cam] [data-live-cam-primary-actions] a')).toHaveCount(1);
        await expect(page.locator("[data-home-v2-booking-cta]").first()).toBeVisible();
        await expect(page.locator("[data-home-v2-rental-cta]:visible")).toHaveCount(1);

        const decorativeBackgrounds = await page.locator("[data-home-v2-root] [class*='[background-image']").count();
        expect(decorativeBackgrounds).toBe(0);

        if (viewport.width <= 390) {
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow).toBeLessThanOrEqual(1);

          await expect(page.locator("[data-home-v2-lesson-selector] button")).toHaveCount(5);
          const lessonDetailWidth = await page.locator("[data-home-v2-lesson-detail]").evaluate((node) => node.getBoundingClientRect().width);
          expect(lessonDetailWidth).toBeLessThanOrEqual(viewport.width - 32);

          const liveCamRatio = await page.locator("[data-live-cam-preview]").evaluate((preview) => {
            const box = preview.getBoundingClientRect();
            return box.width / box.height;
          });
          expect(liveCamRatio).toBeCloseTo(16 / 9, 1);
        }
      });
    }

    test(`uses the normalized desktop grid and rhythm on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const gridSelectors = [
        "[data-home-v2-hero-grid]",
        "[data-home-v2-how-grid]",
        "[data-home-v2-lessons-grid]",
        "[data-home-v2-included-grid]",
        "[data-home-v2-reviews-grid]",
        "#events > div",
        "#gallery > div",
      ];
      for (const selector of gridSelectors) {
        const box = await rect(page.locator(selector));
        expect(box.width).toBeGreaterThanOrEqual(1279);
        expect(box.width).toBeLessThanOrEqual(1281);
      }

      const lessonLayout = await page.locator("[data-home-v2-lessons-grid]").evaluate((node) => {
        const selector = node.querySelector("[data-home-v2-lesson-selector]").getBoundingClientRect();
        const detail = node.querySelector("[data-home-v2-lesson-detail]").getBoundingClientRect();
        return {
          selector: { top: selector.top, bottom: selector.bottom, width: selector.width, height: selector.height },
          detail: { top: detail.top, bottom: detail.bottom, width: detail.width, height: detail.height },
        };
      });
      expect(Math.abs(lessonLayout.selector.width - lessonLayout.detail.width)).toBeLessThanOrEqual(8);
      expect(Math.abs(lessonLayout.selector.height - lessonLayout.detail.height)).toBeLessThanOrEqual(8);
      expect(Math.abs(lessonLayout.selector.top - lessonLayout.detail.top)).toBeLessThanOrEqual(4);
      expect(Math.abs(lessonLayout.selector.bottom - lessonLayout.detail.bottom)).toBeLessThanOrEqual(8);

      for (const selector of ["[data-rentals-artboard]"]) {
        const box = await rect(page.locator(selector));
        expect(box.width).toBeGreaterThanOrEqual(900);
        expect(box.width).toBeLessThanOrEqual(1280);
      }
      expect((await rect(page.locator("[data-live-cam-artboard][data-forecast-artboard]"))).width).toBeCloseTo(1440, 0);

      const included = await rect(page.locator("[data-home-v2-included-grid]"));
      const heroBenefits = await rect(page.locator("[data-home-v2-hero-benefits]"));
      const how = await rect(page.locator("[data-home-v2-how-grid]"));
      const lessons = await rect(page.locator("[data-home-v2-lessons-grid]"));
      const surfContent = await rect(page.locator("[data-home-v2-surf-stack-content]"));
      const reviews = await rect(page.locator("[data-home-v2-reviews-grid]"));

      expect(how.top).toBeGreaterThan(heroBenefits.top);
      expect(lessons.top).toBeGreaterThan(how.top);
      expect(included.top).toBeGreaterThan(lessons.top);

      expect(how.height).toBeGreaterThan(0);
      expect(lessons.height).toBeGreaterThan(0);
      expect(included.height).toBeGreaterThan(0);

      expect(surfContent.top - included.bottom).toBeGreaterThanOrEqual(48);
      expect(reviews.top - surfContent.bottom).toBeGreaterThanOrEqual(96);

      const rentalArtboard = await rect(page.locator("[data-rentals-artboard]"));
      const liveCamArtboard = await rect(page.locator("[data-live-cam-artboard]"));
      const forecastArtboard = await rect(page.locator("[data-forecast-artboard]"));
      expect(liveCamArtboard.top - rentalArtboard.bottom).toBeGreaterThanOrEqual(0);
      expect(forecastArtboard).toEqual(liveCamArtboard);
    });

    test(`keeps the upper-flow desktop cards within the approved poster proportions on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const posterGeometry = await page.evaluate(() => ({
        benefits: [...document.querySelectorAll("[data-home-v2-benefit-card]")].map((node) => node.getBoundingClientRect().width),
        howCards: [...document.querySelectorAll("[data-how-card]")].map((node) => {
          const box = node.getBoundingClientRect();
          return { width: box.width, height: box.height };
        }),
      }));

      expect(posterGeometry.benefits).toHaveLength(4);
      expect(posterGeometry.howCards).toHaveLength(4);
      expect(posterGeometry.howCards.every((card) => card.width <= 230 && card.height >= 350 && card.height <= 430)).toBeTruthy();
      const howCardBoxes = await page.locator("[data-how-card]").evaluateAll((cards) => cards.map((card) => {
        const box = card.getBoundingClientRect();
        return { top: box.top, bottom: box.bottom };
      }));
      expect(Math.max(...howCardBoxes.map((box) => box.top)) - Math.min(...howCardBoxes.map((box) => box.top))).toBeLessThanOrEqual(1);
      expect(Math.max(...howCardBoxes.map((box) => box.bottom)) - Math.min(...howCardBoxes.map((box) => box.bottom))).toBeLessThanOrEqual(1);
    });

    test(`uses tight surf-stack visual composition wrappers on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const included = await rect(page.locator("[data-home-v2-included-grid]"));
      const rental = await rect(page.locator("[data-rental-visual-composition]"));
      const conditions = await rect(page.locator("[data-livecam-visual-composition][data-forecast-visual-composition]"));
      const reviews = await rect(page.locator("[data-home-v2-reviews-grid]"));

      expect(rental.width).toBeGreaterThanOrEqual(1279);
      expect(rental.width).toBeLessThanOrEqual(1281);
      expect(conditions.width).toBeCloseTo(1440, 0);

      const rentalToConditions = conditions.top - rental.bottom;
      expect(rentalToConditions).toBeGreaterThanOrEqual(78);

      const includedToRental = rental.top - included.bottom;
      const conditionsToReviews = reviews.top - conditions.bottom;
      expect(includedToRental).toBeGreaterThanOrEqual(48);
      expect(conditionsToReviews).toBeGreaterThanOrEqual(96);

      expect(rental.height).toBeGreaterThan(0);
      expect(conditions.height).toBe(790);
      const forecastArtboard = await rect(page.locator("[data-forecast-artboard]"));
      expect(forecastArtboard.width).toBeCloseTo(1440, 0);

      const forecastPanel = await rect(page.locator("[data-forecast-stats-panel]"));
      const forecastMap = await rect(page.locator("[data-forecast-map]"));
      const mapFilter = await page.locator('[data-forecast-map] iframe[title="Windy Forecast"]').evaluate((node) => getComputedStyle(node).filter);

      expect(forecastPanel.height).toBeCloseTo(70, 0);
      expect(forecastMap.width).toBeCloseTo(503, 0);
      expect(forecastMap.height).toBeCloseTo(376, 0);
      expect(mapFilter).toBe("none");
    });

    test(`merges the Why Epic benefits into the Hero on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const hero = page.locator("[data-home-v2-hero]");
      const benefits = hero.locator("[data-home-v2-hero-benefits]");

      await expect(hero).toBeVisible();
      await expect(hero.locator("[data-home-v2-hero-ocean-base]")).toHaveAttribute("src", /why-epic-bg-ocean\.webp/);
      await expect(hero.locator("[data-home-v2-hero-ocean-base-pan]")).toBeVisible();
      await expect(hero.locator("[data-home-v2-hero-logo-mask]")).toHaveAttribute("data-epic-mask-src", "/brand/epic-logo.svg");
      await expect(hero.locator("[data-home-v2-hero-logo-mask]")).toHaveAttribute("data-surf-school-mask-src", "/brand/surf-school-hero-logo.svg");
      await expect(hero.locator("[data-home-v2-hero-logo-epic-mask]")).toBeVisible();
      await expect(hero.locator("[data-home-v2-hero-logo-surf-school-mask]")).toBeVisible();
      await expect(benefits).toBeVisible();
      await expect(benefits.locator("[data-home-v2-benefit-card]")).toHaveCount(4);
      await expect(benefits.locator('[data-benefit-presentation="panel"]')).toHaveCount(2);
      await expect(benefits.locator('[data-benefit-presentation="plain"]')).toHaveCount(2);
      await expect(hero.locator("[data-home-v2-booking-cta]")).toHaveCount(0);
      await expect(hero.getByRole("link", { name: /board rental/i })).toHaveCount(0);
      await expect(page.locator("[data-home-v2-why]")).toHaveCount(0);

      const approvedPanelColor = await benefits.locator('[data-benefit-presentation="panel"]').first().evaluate((element) => getComputedStyle(element).backgroundColor);
      expect(approvedPanelColor).toBe("rgb(57, 89, 98)");

      await page.evaluate(() => {
        window.scrollTo(0, 0);
        window.dispatchEvent(new Event("scroll"));
      });
      await page.waitForTimeout(100);

      const beforePan = await hero.locator("[data-home-v2-hero-ocean-base-pan]").evaluate((element) => ({
        animationName: getComputedStyle(element).animationName,
        transform: getComputedStyle(element).transform,
      }));
      await page.waitForTimeout(700);
      const afterIdle = await hero.locator("[data-home-v2-hero-ocean-base-pan]").evaluate((element) => getComputedStyle(element).transform);
      expect(beforePan.animationName).toBe("none");
      expect(afterIdle).toBe(beforePan.transform);

      await page.evaluate(() => window.scrollBy(0, Math.round(window.innerHeight * 0.45)));
      await page.waitForTimeout(100);
      const afterScroll = await hero.locator("[data-home-v2-hero-ocean-base-pan]").evaluate((element) => getComputedStyle(element).transform);
      expect(afterScroll).not.toBe(beforePan.transform);

      const howFollowsHero = await page.evaluate(() => {
        const heroNode = document.querySelector("[data-home-v2-hero]");
        const howNode = document.querySelector("[data-home-v2-how-it-works]");
        return Boolean(heroNode && howNode && (heroNode.compareDocumentPosition(howNode) & Node.DOCUMENT_POSITION_FOLLOWING));
      });
      expect(howFollowsHero).toBeTruthy();

      if (route.language === "en") {
        await expect(benefits.getByText("Certified Instructors", { exact: true })).toBeVisible();
        await expect(benefits.getByText("Personal Focus", { exact: true })).toBeVisible();
        await expect(benefits.getByText("Perfect Conditions", { exact: true })).toBeVisible();
        await expect(benefits.getByText("Confident Start", { exact: true })).toBeVisible();
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`marks ${route.path} as noindex nofollow`, async ({ page }) => {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const robots = await page.locator("meta[name='robots']").getAttribute("content");
      expect(robots).toContain("noindex");
      expect(robots).toContain("nofollow");
    });

    test(`keeps header section links inside ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      await expect(page.locator(`nav a[href="${route.path}#lessons"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="${route.path}#how-it-works"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="${route.path}#forecast"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="${route.path}#events"]`)).toBeVisible();
      await expect(page.locator(`nav a[href="${route.path}#location"]`)).toBeVisible();
    });

    if (route.language === "en") {
      test("matches the Figma desktop EN Header geometry", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
        await waitForHomeV2ClientReady(page);

        const header = page.locator('[data-home-v2-header="true"]');
        const logo = header.locator('[data-home-v2-brand-logo="true"]');
        const navigation = header.locator('[data-home-v2-primary-navigation="true"]');
        const language = header.locator('[data-home-v2-language-switcher="true"]');
        const bookNow = header.locator('[data-home-v2-book-now="true"]');

        await expect(header).toHaveCSS("height", "86px");
        await expect(header).toHaveCSS("background-color", "rgb(119, 119, 119)");
        await expect(logo.locator("img")).toHaveAttribute("src", "/design/home-v2/header/epic-logo-dark.svg");
        await expect(language).toHaveCSS("font-family", "Arial, sans-serif");
        await expect(language).toHaveCSS("font-weight", "700");
        await expect(bookNow).toHaveCSS("font-family", "Arial, sans-serif");
        await expect(bookNow).toHaveCSS("font-weight", "700");

        const geometry = await page.evaluate(() => {
          const box = (selector) => {
            const rect = document.querySelector(selector).getBoundingClientRect();
            return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
          };
          return {
            logo: box('[data-home-v2-brand-logo="true"]'),
            navigation: box('[data-home-v2-primary-navigation="true"]'),
            language: box('[data-home-v2-language-switcher="true"]'),
            bookNow: box('[data-home-v2-book-now="true"]'),
          };
        });

        expect(geometry.logo.left).toBeCloseTo(99, 1);
        expect(geometry.logo.top).toBeCloseTo(25.3036, 1);
        expect(geometry.logo.width).toBeCloseTo(79.1973, 1);
        expect(geometry.logo.height).toBeCloseTo(35.3928, 1);
        expect(geometry.navigation.left).toBeCloseTo(451, 1);
        expect(geometry.navigation.top).toBeCloseTo(35, 1);
        expect(geometry.language).toEqual({ left: 1176, top: 22, width: 41, height: 41 });
        expect(geometry.bookNow).toEqual({ left: 1228, top: 22, width: 112, height: 41 });

        await header.screenshot({
          path: path.join(process.cwd(), "test-results", "home-v2-header-polish-focused.png"),
          animations: "disabled",
          style: "nextjs-portal, [data-home-v2-messenger] { visibility: hidden !important; }",
        });
        await page.screenshot({
          path: path.join(process.cwd(), "test-results", "home-v2-polish-full-page.png"),
          fullPage: true,
          animations: "disabled",
          style: "nextjs-portal, [data-home-v2-messenger] { visibility: hidden !important; }",
        });

        await bookNow.click();
        await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
        await expect(navigation.getByRole("link", { name: "Lessons", exact: true })).toHaveAttribute("href", "/home-v2#lessons");
        await expect(language).toHaveAttribute("href", "/ru/home-v2");
      });
    }

    test(`keeps the Home V2 mobile menu above the Hero clipping layers on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const header = page.locator("[data-home-v2-header]");
      await expect(header).toHaveCSS("position", "absolute");
      await page.getByRole("button", { name: "Open navigation" }).click();

      const menu = page.locator("#home-v2-mobile-navigation");
      await expect(menu).toBeVisible();
      const menuLayer = await menu.evaluate((node) => ({
        zIndex: Number(getComputedStyle(node).zIndex),
        clippedByHero: node.closest("[data-home-v2-hero]") !== null,
        firstLinkVisible: node.querySelector("a").getBoundingClientRect().height > 0,
      }));
      expect(menuLayer.zIndex).toBeGreaterThan(100);
      expect(menuLayer.clippedByHero).toBeFalsy();
      expect(menuLayer.firstLinkVisible).toBeTruthy();
    });

    test(`renders the keyed lesson selector on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const lessons = page.locator("[data-home-v2-lessons-block]");
      await expect(lessons).toBeVisible();
      const selectorButtons = lessons.locator("[data-home-v2-lesson-selector] button");
      await expect(selectorButtons).toHaveCount(5);
      expect(await selectorButtons.evaluateAll((buttons) => buttons.map((button) => button.getAttribute("data-lesson-selector-item")))).toEqual([
        "group",
        "split",
        "private",
        "surf_skate",
        "lineup_pro",
      ]);
      await expect(selectorButtons.first()).toHaveAttribute("aria-pressed", "true");
      await expect(selectorButtons.first()).toHaveAttribute("aria-controls", "home-v2-lesson-detail");
      await expect(lessons.locator("[aria-live]")).toHaveCount(0);

      const detail = lessons.locator("[data-home-v2-lesson-detail]");
      await expect(detail.locator("[data-lessons-photo]")).toHaveAttribute("src", /lesson-group-desktop\.webp/);
      await expect(detail.locator("[data-home-v2-booking-cta]")).toHaveCount(1);

      await selectorButtons.nth(3).click();
      await expect(selectorButtons.nth(3)).toHaveAttribute("aria-pressed", "true");
      await expect(detail.locator('[data-lessons-photo][src*="lesson-surf-skate-desktop"]')).toBeVisible();
      await expect(detail.locator("a[data-home-v2-booking-cta]")).toHaveCount(1);

      await selectorButtons.nth(2).click();
      await expect(detail.locator('[data-lessons-photo][src*="lesson-private-desktop"]')).toBeVisible();
      await expect(detail.locator("button[data-home-v2-booking-cta]")).toHaveCount(1);

      await selectorButtons.nth(1).press("Enter");
      await expect(selectorButtons.nth(1)).toHaveAttribute("aria-pressed", "true");
      await selectorButtons.nth(4).press("Space");
      await expect(selectorButtons.nth(4)).toHaveAttribute("aria-pressed", "true");

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`renders the Figma-based How It Works block on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const how = page.locator("[data-home-v2-how-it-works]");
      await expect(how).toBeVisible();
      await expect(how.locator("[data-how-card]")).toHaveCount(4);
      await expect(how.locator("[data-how-paper-asset]")).toHaveCount(0);
      await expect(how.locator("[data-how-number-bg-asset]")).toHaveCount(0);
      await expect(how.locator('[data-home-v2-section-heading="strip"]')).toHaveCount(1);
      await expect(how.locator("[data-how-background-crop]")).toHaveAttribute("src", /why-epic-bg-ocean/);
      await expect(how.locator('[data-how-card-tone="teal"]')).toHaveCount(2);
      await expect(how.locator('[data-how-card-tone="coral"]')).toHaveCount(2);

      const howColors = await how.locator("[data-how-card]").evaluateAll((cards) => cards.map((card) => getComputedStyle(card).backgroundColor));
      expect(howColors).toEqual([
        "rgb(57, 89, 98)",
        "rgb(254, 116, 106)",
        "rgb(57, 89, 98)",
        "rgb(254, 116, 106)",
      ]);

      await expect(how.locator('[data-how-step-photo="0"]')).toHaveAttribute("src", /process-1/);
      await expect(how.locator('[data-how-step-photo="1"]')).toHaveAttribute("src", /process-2/);
      await expect(how.locator('[data-how-step-photo="2"]')).toHaveAttribute("src", /process-3/);
      await expect(how.locator('[data-how-step-photo="3"]')).toHaveAttribute("src", /process-4/);

      if (route.language === "en") {
        await expect(how.getByRole("heading", { name: /How it works/i })).toBeVisible();
        await expect(how.getByText("We teach surf lessons in Vietnam", { exact: false })).toBeVisible();
        await expect(how.getByText("Meet & Gear Up", { exact: true })).toBeVisible();
      }

      for (let index = 0; index < 4; index += 1) {
        await expect(how.locator("[data-how-card]").nth(index).getByText(String(index + 1).padStart(2, "0"), { exact: true })).toBeVisible();
      }
      await expect(how.locator("button")).toHaveCount(0);
      await expect(how.getByText("More", { exact: true })).toHaveCount(0);
      await expect(how.getByText("Ещё", { exact: true })).toHaveCount(0);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`keeps Included block on its own Home V2 layout on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const included = page.locator("[data-home-v2-included]");
      const mobileIncluded = included.locator("[data-home-v2-included-grid]");
      await expect(included).toBeVisible();
      await expect(included.locator('img[src*="/design/home-v2/why-epic/"]')).toHaveCount(0);

      if (route.language === "en") {
        await expect(included.locator("[data-home-v2-included-mobile-en]")).toBeVisible();
        await expect(included.locator("[data-home-v2-included-mobile-feature]")).toHaveCount(4);
        await expect(included.locator("[data-home-v2-included-marquee]")).toBeHidden();
        await expect(mobileIncluded.getByText("BOARD", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("RASHGUARD", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("ZINC/SPF", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("PHOTOS/VIDEOS", { exact: true })).toBeVisible();
      } else {
        await expect(included.locator('img[src*="/design/home-v2/included/"]')).toHaveCount(12);
        await expect(mobileIncluded.getByText("Доска", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("Лайкра", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("Zinc SPF", { exact: true })).toBeVisible();
        await expect(mobileIncluded.getByText("Фото / видео", { exact: true })).toBeVisible();
      }
    });

    test(`renders the Figma-based rental block on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const rentals = page.locator('[data-home-v2-rentals-block]');
      const desktopRental = rentals.locator('[data-rentals-desktop] [data-rentals-content]');
      const rentalCopy = route.language === "ru"
        ? {
            from: "ОТ",
            description: "Шортборды, фанборды, софтборды и другие",
            term: "На день или долгий срок.",
            rentNow: "АРЕНДОВАТЬ",
            chooseBoard: "ВЫБРАТЬ ДОСКУ",
          }
        : {
            from: "FROM",
            description: "Shortboards, funboards, softboards and more",
            term: "Daily or long term.",
            rentNow: "RENT NOW",
            chooseBoard: "CHOOSE A BOARD",
          };
      await expect(rentals).toBeVisible();
      await expect(rentals.getByText("Rentals", { exact: true })).toHaveCount(0);
      await expect(rentals.getByRole("heading", { name: "SURF BOARD RENTALS" })).toBeVisible();
      await expect(desktopRental.getByText(rentalCopy.from, { exact: true })).toBeVisible();
      await expect(desktopRental.getByText("250.000", { exact: true })).toBeVisible();
      await expect(desktopRental.getByText("VND", { exact: true })).toBeVisible();
      await expect(desktopRental.getByText(rentalCopy.description, { exact: true })).toBeVisible();
      await expect(desktopRental.getByText(rentalCopy.term, { exact: true })).toBeVisible();
      await expect(rentals.getByRole("button", { name: rentalCopy.rentNow })).toBeVisible();
      await expect(rentals.getByRole("link", { name: rentalCopy.chooseBoard })).toBeVisible();

      const boardsPhoto = rentals.locator('[data-rentals-layer="boards-photo"]');
      await expect(boardsPhoto).toHaveAttribute("src", /rental-hero-boards-bw\.jpg/);
      await expect(rentals.locator('[data-rentals-layer="scene-mint"]')).toHaveCount(0);
      await expect(rentals.locator('[data-rentals-layer="scene-bg"]')).toHaveCount(0);
      const boardsPhotoStyle = await boardsPhoto.evaluate((node) => ({
        objectFit: getComputedStyle(node).objectFit,
        position: getComputedStyle(node).position,
      }));
      expect(boardsPhotoStyle.objectFit).toBe("cover");
      expect(boardsPhotoStyle.position).toBe("absolute");
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(rentals.locator('[data-rentals-mobile-content]')).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`keeps V2 live cam and forecast functional on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const liveCam = page.locator("[data-home-v2-live-cam]");
      await expect(liveCam).toBeVisible();
      if (route.language === "ru") {
        await expect(liveCam.getByText("Трансляция от Da Nang Surf Cam", { exact: true })).toBeVisible();
        await expect(liveCam.getByText("Открыть камеру", { exact: true })).toBeVisible();
        const liveCamText = await liveCam.innerText();
        expect(liveCamText).not.toMatch(/Р[›°ёџњљµ]|С[ѓ‚Њ]/);
      }
      await expect(liveCam.locator('iframe[src*="danangsurfcam.com/embed/preview"]')).toHaveCount(0);
      await expect(liveCam.locator("[data-live-cam-placeholder]")).toHaveCount(1);
      await expect(liveCam).toHaveAttribute("data-live-cam-mounted", "false");
      await expect(liveCam.locator('[data-live-cam-provider-action="primary"]')).toHaveAttribute("href", /danangsurfcam\.com/);
      await expect(liveCam.locator('[data-live-cam-provider-action="secondary"]')).toHaveAttribute("href", /danangsurfcam\.com\/donate/);
      await expect(liveCam.locator('[data-live-cam-primary-actions] a')).toHaveCount(1);

      await liveCam.scrollIntoViewIfNeeded();
      await expect(liveCam.locator('iframe[src*="danangsurfcam.com/embed/preview"]')).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
      await expect(liveCam.locator('iframe[src*="danangsurfcam.com/embed/preview"]')).toHaveAttribute("loading", "lazy");
      await expect(liveCam).toHaveAttribute("data-live-cam-mounted", "true");
      await expect(liveCam.locator("[data-live-cam-placeholder]")).toHaveCount(0);

      const forecast = page.locator("[data-home-v2-forecast]");
      await expect(forecast).toBeVisible();
      const mobileForecast = forecast.locator('[data-forecast-mobile-layout]');
      await expect(mobileForecast).toBeVisible();
      await expect(mobileForecast.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);

      const activateMap = mobileForecast.getByText(route.language === "ru" ? "Активировать карту" : "Activate map");
      if (route.language === "ru") {
        await expect(activateMap).toBeVisible();
        await activateMap.click();
        await expect(mobileForecast.getByRole("button", { name: "Close forecast map" })).toBeVisible();
      } else {
        await expect(activateMap).toHaveCount(0);
        await expect(mobileForecast.locator('iframe[title="Windy Forecast"]')).toBeVisible();
      }

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`keeps two lesson heading lines and a stable detail stage on ${route.path}`, async ({ page }) => {
      for (const viewport of [{ width: 375, height: 812 }, { width: 390, height: 844 }]) {
        await page.setViewportSize(viewport);
        await page.goto(`${baseUrl}${route.path}?lesson_geometry=1`, { waitUntil: "domcontentloaded" });

        const lessons = page.locator("[data-home-v2-lessons-block]");
        const headingLines = lessons.locator('[data-home-v2-section-heading="label"] [data-home-v2-heading-line]');
        const selectorButtons = lessons.locator("[data-home-v2-lesson-selector] button");
        const detail = lessons.locator("[data-home-v2-lesson-detail]");
        await expect(headingLines).toHaveCount(2);
        await expect(headingLines.nth(0)).toHaveText(route.language === "ru" ? "Выбери" : "Choose");
        await expect(headingLines.nth(1)).toHaveText(route.language === "ru" ? "свой урок" : "Your Lesson");
        await expect(selectorButtons).toHaveCount(5);

        const heights = [];
        for (let index = 0; index < 5; index += 1) {
          await selectorButtons.nth(index).click();
          await expect(selectorButtons.nth(index)).toHaveAttribute("aria-pressed", "true");
          await page.waitForTimeout(280);
          await expect(detail).toBeVisible();
          heights.push(await detail.evaluate((node) => node.getBoundingClientRect().height));
        }
        expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(8);

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
      }
    });

    test(`keeps lesson content visible with reduced motion on ${route.path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}?lesson_reduced_motion=1`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const lessons = page.locator("[data-home-v2-lessons-block]");
      await lessons.scrollIntoViewIfNeeded();
      await expect(lessons.locator("[data-home-v2-lesson-selector]")).toBeVisible();
      await expect(lessons.locator("[data-home-v2-lesson-detail]")).toBeVisible();

      const motionState = await lessons.evaluate((node) => {
        const selector = node.querySelector("[data-home-v2-lesson-selector]");
        const detailStage = node.querySelector("[data-home-v2-lesson-detail]").parentElement;
        return [selector, detailStage].map((element) => ({
          opacity: getComputedStyle(element).opacity,
          transform: getComputedStyle(element).transform,
        }));
      });
      expect(motionState.every(({ opacity }) => opacity === "1")).toBeTruthy();
      expect(motionState.every(({ transform }) => transform === "none")).toBeTruthy();

      const surfSkate = lessons.locator('[data-lesson-selector-item="surf_skate"]');
      await surfSkate.click();
      await expect(surfSkate).toHaveAttribute("aria-pressed", "true");
      await expect(lessons.locator('[data-lessons-photo][src*="lesson-surf-skate-desktop"]')).toBeVisible();
    });

    test(`mounts the Home V2 live cam once near the viewport on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      const previewRequests = [];
      await page.route("**/embed/preview**", async (requestRoute) => {
        previewRequests.push(requestRoute.request().url());
        await requestRoute.abort();
      });

      await page.goto(`${baseUrl}${route.path}?lazy_cam_test=1`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const liveCam = page.locator("[data-home-v2-live-cam]");
      const preview = liveCam.locator("[data-live-cam-preview]");
      const iframe = liveCam.locator("iframe[data-live-cam-iframe]");
      const placeholder = liveCam.locator("[data-live-cam-placeholder]");
      const frameBefore = await preview.boundingBox();
      const forecastTopBefore = await page.locator("[data-home-v2-forecast]").evaluate((node) => node.getBoundingClientRect().top + window.scrollY);

      expect(frameBefore).not.toBeNull();
      await expect(iframe).toHaveCount(0);
      await expect(placeholder).toHaveCount(1);
      await expect(liveCam).toHaveAttribute("data-live-cam-mounted", "false");
      await expect(liveCam.locator("[data-live-cam-attribution-footer]")).toHaveCount(1);
      await expect(liveCam.locator("[data-live-cam-provider-action]")).toHaveCount(2);
      await expect(liveCam.locator("[data-live-cam-primary-actions] a")).toHaveCount(1);
      expect(previewRequests).toHaveLength(0);

      await liveCam.scrollIntoViewIfNeeded();
      await expect(iframe).toHaveCount(1);
      await expect(iframe).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
      await expect(liveCam).toHaveAttribute("data-live-cam-mounted", "true");
      await expect(placeholder).toHaveCount(0);
      await expect.poll(() => previewRequests.length).toBe(1);

      const frameAfter = await preview.boundingBox();
      const forecastTopAfter = await page.locator("[data-home-v2-forecast]").evaluate((node) => node.getBoundingClientRect().top + window.scrollY);
      expect(frameAfter).not.toBeNull();
      expect(Math.abs(frameAfter.width - frameBefore.width)).toBeLessThanOrEqual(1);
      expect(Math.abs(frameAfter.height - frameBefore.height)).toBeLessThanOrEqual(1);
      expect(Math.abs(forecastTopAfter - forecastTopBefore)).toBeLessThanOrEqual(1);

      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
      await liveCam.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      await expect(iframe).toHaveCount(1);
      expect(previewRequests).toHaveLength(1);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`keeps the lower Home V2 editorial flow functional on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const photoBreak = page.locator("[data-home-v2-photo-break]");
      await expect(photoBreak.locator("img")).toHaveAttribute("src", /rental-hero-desktop\.webp/);

      const reviews = page.locator("[data-home-v2-reviews]");
      await expect(reviews.locator("article")).toHaveCount(3);
      await expect(reviews).toHaveCSS("background-color", "rgb(46, 46, 46)");

      const faq = page.locator("[data-home-v2-faq]");
      const faqButtons = faq.locator("button");
      await expect(faqButtons).toHaveCount(4);
      await expect(faqButtons.first()).toHaveAttribute("aria-expanded", "false");
      await expect(faqButtons.first()).toHaveAttribute("aria-controls", "home-v2-faq-answer-0");
      await faqButtons.first().press("Enter");
      await expect(faqButtons.first()).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#home-v2-faq-answer-0")).toBeVisible();
      await faqButtons.first().press("Space");
      await expect(faqButtons.first()).toHaveAttribute("aria-expanded", "false");

      const events = page.locator("[data-home-v2-events]");
      await expect(events.locator("article")).toHaveCount(4);
      await expect(events.locator("button")).toHaveCount(4);

      const gallery = page.locator("[data-home-v2-gallery]");
      const galleryFilters = gallery.locator("button[aria-pressed]");
      expect(await galleryFilters.count()).toBeGreaterThanOrEqual(4);
      await expect(galleryFilters.first()).toHaveAttribute("aria-pressed", "true");

      const footer = page.locator('[data-home-v2-footer="true"]');
      await expect(footer).toBeVisible();
      await expect(footer.locator('[data-home-v2-footer-socials="true"] a')).toHaveCount(4);
      const footerGeometry = await footer.evaluate((node) => ({
        height: node.getBoundingClientRect().height,
        mapRadius: getComputedStyle(node.querySelector('[data-home-v2-footer-map="true"]')).borderRadius,
        socialRadii: [...node.querySelectorAll('[data-home-v2-footer-socials="true"] a')].map((link) => getComputedStyle(link).borderRadius),
      }));
      expect(footerGeometry.height).toBeLessThanOrEqual(route.language === "ru" ? 840 : 980);
      expect(footerGeometry.mapRadius).toBe("0px");
      expect(footerGeometry.socialRadii.every((radius) => radius === "0px")).toBeTruthy();
    });

    test(`pauses the masked EPIC ocean motion outside the Hero on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const hero = page.locator("[data-home-v2-hero]");
      const oceanLayer = hero.locator("[data-home-v2-logo-ocean-layer]");
      await expect(hero).toHaveAttribute("data-home-v2-logo-motion", "running");
      await expect(oceanLayer).toHaveCSS("animation-play-state", "running");

      await page.evaluate(() => {
        Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await expect(hero).toHaveAttribute("data-home-v2-logo-motion", "paused");
      await expect(oceanLayer).toHaveCSS("animation-play-state", "paused");

      await page.evaluate(() => {
        Object.defineProperty(document, "hidden", { configurable: true, get: () => false });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await expect(hero).toHaveAttribute("data-home-v2-logo-motion", "running");

      await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
      await expect(hero).toHaveAttribute("data-home-v2-logo-motion", "paused");
      await expect(oceanLayer).toHaveCSS("animation-play-state", "paused");

      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.reload({ waitUntil: "domcontentloaded" });
      await expect(page.locator("[data-home-v2-logo-ocean-layer]")).toHaveCSS("animation-name", "none");
    });

    test(`uses one wave layer and a square LiveCam chat icon on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const wave = page.locator('[data-home-v2-wave-layer]');
      await expect(wave).toHaveCount(1);
      await expect(wave).toHaveAttribute("src", /surf-stack-wave-contour\.svg/);

      const iconBox = await page.locator('[data-live-cam-chat-icon]').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
      });
      expect(Math.abs(iconBox.width - iconBox.height)).toBeLessThanOrEqual(1);
    });

    test(`keeps the desktop surf-stack in a rental scene and one conditions scene on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const rentalScene = page.locator('[data-surf-stack-scene="rental"]');
      const conditionsScene = page.locator('[data-surf-stack-scene="livecam-forecast"]');
      await expect(rentalScene).toBeVisible();
      await expect(conditionsScene).toBeVisible();

      const geometry = await page.evaluate(() => {
        const rect = (selector) => {
          const box = document.querySelector(selector).getBoundingClientRect();
          return { top: box.top, bottom: box.bottom, width: box.width, height: box.height };
        };
        return {
          rentalScene: rect('[data-surf-stack-scene="rental"]'),
          rentalVisual: rect('[data-rental-visual-composition]'),
          rentalArtboard: rect('[data-rentals-artboard]'),
          liveCamArtboard: rect('[data-live-cam-artboard]'),
          forecastArtboard: rect('[data-forecast-artboard]'),
        };
      });

      expect(geometry.rentalArtboard.width).toBeLessThanOrEqual(1280);
      expect(geometry.liveCamArtboard.width).toBeCloseTo(1440, 0);
      expect(geometry.forecastArtboard).toEqual(geometry.liveCamArtboard);
      expect(geometry.liveCamArtboard.top - geometry.rentalArtboard.bottom).toBeGreaterThanOrEqual(0);
      expect(geometry.rentalScene.height).toBeCloseTo(geometry.rentalVisual.height, 0);
      expect(geometry.rentalScene.height).toBeLessThan(1000);
    });

    test(`opens booking, rental, and messenger actions on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}?partner=hotel_abc`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      await page.locator("header button").first().click();
      await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
      await page.getByLabel("Close booking modal").click();

      await page.locator("[data-home-v2-rental-cta]:visible").click();
      const rentalModal = page.locator("[data-home-v2-rental-modal]");
      await expect(rentalModal.getByRole("link", { name: "WhatsApp", exact: true })).toBeVisible();
      await expect(rentalModal.getByRole("link", { name: "Telegram", exact: true })).toBeVisible();
      await expect(rentalModal.getByRole("link", { name: /Zalo/i })).toBeVisible();

      const rentalWhatsapp = rentalModal.getByRole("link", { name: "WhatsApp", exact: true });
      await rentalWhatsapp.evaluate((element) => {
        element.addEventListener("click", (event) => event.preventDefault(), { once: true });
        element.click();
      });
      expect(decodeURIComponent(await rentalWhatsapp.getAttribute("href"))).toContain("hotel_abc");

      await rentalModal.locator("button").first().click();
      await page.locator("[data-home-v2-messenger]").locator("button").first().click();
      await expect(page.locator("[data-home-v2-messenger]").getByRole("link", { name: /WhatsApp chat/i })).toBeVisible();
      await expect(page.locator("[data-home-v2-messenger]").getByRole("link", { name: /Telegram chat/i })).toBeVisible();
      await expect(page.locator("[data-home-v2-messenger]").getByRole("link", { name: /Zalo chat/i })).toBeVisible();
    });

    test(`keeps language switch inside V2 and preserves partner query on ${route.path}`, async ({ page }) => {
      await page.goto(`${baseUrl}${route.path}?partner=hotel_abc&utm_source=test`, { waitUntil: "domcontentloaded" });
      await waitForHomeV2ClientReady(page);

      const languageSwitch = page.getByRole("link", { name: route.switchLabel, exact: true });
      await expect(languageSwitch).toHaveAttribute("href", route.switchedPath);
      await languageSwitch.click();
      await expect(page).toHaveURL(new RegExp(`${route.switchedPath.replace(/\//g, "\\/")}\\?partner=hotel_abc&utm_source=test$`));
    });
  }

  test("keeps home-v2 routes out of the sitemap", async ({ page }) => {
    const response = await page.goto(`${baseUrl}/sitemap.xml`, { waitUntil: "domcontentloaded" });
    expect(response?.ok()).toBeTruthy();

    const sitemap = await response.text();
    expect(sitemap).not.toContain("/home-v2");
    expect(sitemap).not.toContain("/ru/home-v2");
  });

  for (const productionPath of ["/", "/ru"]) {
    test(`keeps the shared production presentation isolated on ${productionPath}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${productionPath}`, { waitUntil: "domcontentloaded" });

      await expect(page.locator("[data-home-v2-root]")).toHaveCount(0);
      await expect(page.locator("[data-home-v2-header]")).toHaveCount(0);
      await expect(page.locator('[data-home-v2-footer="true"]')).toHaveCount(0);
      await expect(page.locator('[data-home-v2-messenger-fab="true"]')).toHaveCount(0);
    });
  }
});

test("keeps the Home V2 LiveCam observer and mount analytics one-shot", () => {
  const source = readFileSync(path.join(process.cwd(), "app/components/home-v2/sections/HomeV2UtilitySections.jsx"), "utf8");
  expect(source).toContain('rootMargin: "400px 0px"');
  expect(source).toContain("threshold: 0.01");
  expect(source).toContain("setHasEnteredViewport(true)");
  expect(source).toContain("observer.disconnect()");
  expect(source.match(/trackEvent\("live_cam_preview_load"/g)).toHaveLength(1);
  expect(source).not.toContain("camera unavailable");
  expect(source).not.toContain("stream unavailable");
  expect(source).not.toContain("stream offline");
  expect(source).not.toContain("provider error");
  expect(source).not.toContain("live now");
});
