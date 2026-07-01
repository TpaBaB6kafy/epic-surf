const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

const routes = [
  { path: "/home-v2", language: "en", switchLabel: "RU", switchedPath: "/ru/home-v2" },
  { path: "/ru/home-v2", language: "ru", switchLabel: "EN", switchedPath: "/home-v2" },
];

const viewports = [
  { width: 390, height: 844 },
  { width: 820, height: 1000 },
  { width: 1440, height: 1000 },
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

test.describe("Home V2 hidden preview pages", () => {
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
        const windyIframe = page.locator('[data-home-v2-forecast] iframe[title="Windy Forecast"]');
        await expect(liveCamIframe).toHaveCount(1);
        await expect(liveCamIframe).toHaveAttribute("loading", "lazy");
        await expect(windyIframe).toHaveCount(1);
        await expect(windyIframe).toHaveAttribute("loading", "lazy");
        await expect(page.locator("[data-home-v2-booking-cta]").first()).toBeVisible();
        await expect(page.locator("[data-home-v2-rental-cta]:visible")).toHaveCount(1);

        const decorativeBackgrounds = await page.locator("[data-home-v2-root] [class*='[background-image']").count();
        expect(decorativeBackgrounds).toBe(0);

        if (viewport.width === 390) {
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow).toBeLessThanOrEqual(1);

          const lessonsScroller = page.locator("[data-home-v2-lessons-scroller]");
          const mobileGeometry = await lessonsScroller.evaluate((node) => ({
            clientWidth: node.clientWidth,
            scrollWidth: node.scrollWidth,
            cardsInsidePage: [...node.querySelectorAll("[data-home-v2-lesson-card]")].every((card) => {
              const box = card.getBoundingClientRect();
              return box.width <= window.innerWidth - 32;
            }),
          }));
          expect(mobileGeometry.scrollWidth).toBeGreaterThan(mobileGeometry.clientWidth);
          expect(mobileGeometry.cardsInsidePage).toBeTruthy();

          const liveCamRatio = await page.locator("[data-live-cam-mobile-preview] iframe").evaluate((iframe) => {
            const box = iframe.getBoundingClientRect();
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

      const lessonsScroller = page.locator("[data-home-v2-lessons-scroller]");
      const lessonGeometry = await lessonsScroller.evaluate((node) => ({
        clientWidth: node.clientWidth,
        scrollWidth: node.scrollWidth,
        cardWidths: [...node.querySelectorAll("[data-home-v2-lesson-card]")].map((card) => card.getBoundingClientRect().width),
      }));
      expect(lessonGeometry.scrollWidth).toBeGreaterThan(lessonGeometry.clientWidth);
      expect(lessonGeometry.cardWidths.every((width) => width >= 330 && width <= 390)).toBeTruthy();

      for (const selector of ["[data-rentals-artboard]", "[data-live-cam-artboard]", "[data-forecast-artboard]"]) {
        const box = await rect(page.locator(selector));
        expect(box.width).toBeGreaterThanOrEqual(900);
        expect(box.width).toBeLessThanOrEqual(1280);
      }

      const included = await rect(page.locator("[data-home-v2-included-grid]"));
      const heroBenefits = await rect(page.locator("[data-home-v2-hero-benefits]"));
      const how = await rect(page.locator("[data-home-v2-how-grid]"));
      const lessons = await rect(page.locator("[data-home-v2-lessons-grid]"));
      const surfContent = await rect(page.locator("[data-home-v2-surf-stack-content]"));
      const reviews = await rect(page.locator("[data-home-v2-reviews-grid]"));

      expect(how.top - heroBenefits.bottom).toBeGreaterThanOrEqual(96);
      expect(lessons.top - how.bottom).toBeGreaterThanOrEqual(96);
      expect(included.top - lessons.bottom).toBeGreaterThanOrEqual(96);

      expect(how.height).toBeGreaterThan(0);
      expect(lessons.height).toBeGreaterThan(0);
      expect(included.height).toBeGreaterThan(0);

      expect(surfContent.top - included.bottom).toBeGreaterThanOrEqual(96);
      expect(reviews.top - surfContent.bottom).toBeGreaterThanOrEqual(96);

      const rentalArtboard = await rect(page.locator("[data-rentals-artboard]"));
      const liveCamArtboard = await rect(page.locator("[data-live-cam-artboard]"));
      const forecastArtboard = await rect(page.locator("[data-forecast-artboard]"));
      expect(liveCamArtboard.top - rentalArtboard.bottom).toBeGreaterThanOrEqual(0);
      expect(forecastArtboard.top - liveCamArtboard.bottom).toBeGreaterThanOrEqual(0);
    });

    test(`keeps the upper-flow desktop cards content-driven on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const desktopClasses = await page.evaluate(() => (
        [...document.querySelectorAll([
          "[data-home-v2-benefit-card]",
          "[data-how-card]",
          "[data-home-v2-lesson-card]",
        ].join(","))].map((node) => node.getAttribute("class") || "")
      ));

      expect(desktopClasses.every((className) => !/(?:lg|xl):(?:h|min-h)-\[[^\]]+\]/.test(className))).toBeTruthy();
    });

    test(`uses tight surf-stack visual composition wrappers on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const included = await rect(page.locator("[data-home-v2-included-grid]"));
      const rental = await rect(page.locator("[data-rental-visual-composition]"));
      const liveCam = await rect(page.locator("[data-livecam-visual-composition]"));
      const forecast = await rect(page.locator("[data-forecast-visual-composition]"));
      const reviews = await rect(page.locator("[data-home-v2-reviews-grid]"));

      for (const composition of [rental, liveCam, forecast]) {
        expect(composition.width).toBeGreaterThanOrEqual(1279);
        expect(composition.width).toBeLessThanOrEqual(1281);
      }

      const rentalToLiveCam = liveCam.top - rental.bottom;
      const liveCamToForecast = forecast.top - liveCam.bottom;
      expect(rentalToLiveCam).toBeGreaterThanOrEqual(96);
      expect(liveCamToForecast).toBeGreaterThanOrEqual(96);
      expect(rentalToLiveCam).toBeGreaterThanOrEqual(0);
      expect(liveCamToForecast).toBeGreaterThanOrEqual(0);

      const includedToRental = rental.top - included.bottom;
      const forecastToReviews = reviews.top - forecast.bottom;
      expect(includedToRental).toBeGreaterThanOrEqual(96);
      expect(forecastToReviews).toBeGreaterThanOrEqual(96);

      expect(rental.height).toBeGreaterThan(0);
      expect(liveCam.height).toBeGreaterThan(0);
      expect(forecast.height).toBeGreaterThan(0);
      const forecastArtboard = await rect(page.locator("[data-forecast-artboard]"));
      expect(forecastArtboard.width).toBeGreaterThanOrEqual(1279);

      const forecastHeading = page.locator("[data-forecast-heading]");
      const forecastPanel = await rect(page.locator("[data-forecast-stats-panel]"));
      const forecastMap = await rect(page.locator("[data-forecast-map]"));
      const forecastFrameCount = await page.locator("[data-forecast-outer-frame]").count();
      const mapFilter = await page.locator('[data-forecast-map] iframe[title="Windy Forecast"]').evaluate((node) => getComputedStyle(node).filter);

      await expect(forecastHeading).toHaveCSS("background-color", "rgb(246, 246, 246)");
      expect(forecastPanel.width / (forecastPanel.width + forecastMap.width)).toBeGreaterThanOrEqual(0.35);
      expect(forecastPanel.width / (forecastPanel.width + forecastMap.width)).toBeLessThanOrEqual(0.39);
      expect(Math.abs(forecastPanel.height - forecastMap.height)).toBeLessThanOrEqual(1);
      expect(forecastMap.width).toBeGreaterThan(forecastPanel.width);
      expect(mapFilter).toBe("none");
      expect(forecastFrameCount).toBe(0);
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
      await expect(hero.locator("[data-home-v2-hero-logo-color-pan]")).toHaveCount(2);
      const heroLayerGeometry = await hero.evaluate((node) => {
        const heroRect = node.getBoundingClientRect();
        return [...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]")].map((element) => {
          const rect = element.getBoundingClientRect();
          return {
            widthDelta: Math.abs(rect.width - heroRect.width),
            coversHeroHeight: rect.height >= heroRect.height,
          };
        });
      });
      expect(heroLayerGeometry.every((layer) => layer.widthDelta <= 1)).toBeTruthy();
      expect(heroLayerGeometry.every((layer) => layer.coversHeroHeight)).toBeTruthy();
      await expect(benefits).toBeVisible();
      await expect(benefits.locator("[data-home-v2-benefit-card]")).toHaveCount(4);
      await expect(hero.locator("[data-home-v2-booking-cta]")).toHaveCount(0);
      await expect(hero.getByRole("link", { name: /board rental/i })).toHaveCount(0);
      await expect(page.locator("[data-home-v2-why]")).toHaveCount(0);

      await expect(benefits.locator('[data-why-epic-paper-asset="0"]')).toHaveAttribute("src", /why-epic-card-paper-certified/);
      await expect(benefits.locator('[data-why-epic-paper-asset="1"]')).toHaveAttribute("src", /why-epic-card-paper-personal/);
      await expect(benefits.locator('[data-why-epic-paper-asset="2"]')).toHaveAttribute("src", /why-epic-card-paper-conditions/);
      await expect(benefits.locator('[data-why-epic-paper-asset="3"]')).toHaveAttribute("src", /why-epic-card-paper-start/);

      await expect(benefits.locator('[data-why-epic-icon-asset="0"]')).toHaveAttribute("src", /why-epic-icon-certified/);
      await expect(benefits.locator('[data-why-epic-icon-asset="1"]')).toHaveAttribute("src", /why-epic-icon-personal/);
      await expect(benefits.locator('[data-why-epic-icon-asset="2"]')).toHaveAttribute("src", /why-epic-icon-conditions/);
      await expect(benefits.locator('[data-why-epic-icon-asset="3"]')).toHaveAttribute("src", /why-epic-icon-start/);

      const beforePan = await hero.evaluate((node) => {
        const layers = [
          node.querySelector("[data-home-v2-hero-ocean-base-pan]"),
          ...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]"),
        ];
        return layers.map((element) => ({
          animationName: getComputedStyle(element).animationName,
          transform: getComputedStyle(element).transform,
          willChange: getComputedStyle(element).willChange,
        }));
      });
      await page.waitForTimeout(700);
      const afterIdle = await hero.evaluate((node) => [
        node.querySelector("[data-home-v2-hero-ocean-base-pan]"),
        ...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]"),
      ].map((element) => getComputedStyle(element).transform));
      expect(beforePan.every((layer) => layer.animationName === "none")).toBeTruthy();
      expect(beforePan.every((layer) => layer.willChange === "auto")).toBeTruthy();
      expect(afterIdle).toEqual(beforePan.map((layer) => layer.transform));

      await page.evaluate(() => window.scrollBy(0, Math.round(window.innerHeight * 0.45)));
      await page.waitForTimeout(100);
      const afterScroll = await hero.evaluate((node) => [
        node.querySelector("[data-home-v2-hero-ocean-base-pan]"),
        ...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]"),
      ].map((element) => getComputedStyle(element).transform));
      expect(afterScroll[0]).not.toBe(beforePan[0].transform);
      expect(new Set(afterScroll).size).toBe(1);

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

    test(`renders the poster lesson cards on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const lessons = page.locator("[data-home-v2-lessons-block]");
      await expect(lessons).toBeVisible();
      await expect(lessons.locator("[data-home-v2-lesson-card]")).toHaveCount(5);
      await expect(lessons.locator("[data-lessons-photo]")).toHaveCount(5);
      await expect(lessons.locator("[data-lessons-heading-asset]")).toHaveAttribute("src", /ASSET__lessons-heading-mint-paper/);
      await expect(lessons.locator("[data-lessons-corner-brush]")).toHaveAttribute("src", /SVG__lessons-corner-mint-brush/);
      await expect(lessons.locator("[data-lesson-paper-asset]")).toHaveCount(0);
      await expect(lessons.locator("[data-lesson-icon-asset]")).toHaveCount(5);
      await expect(lessons.locator('[data-lesson-icon-asset="group"]')).toHaveCount(1);
      await expect(lessons.locator('[data-lesson-icon-asset="split"]')).toHaveCount(1);
      await expect(lessons.locator('[data-lesson-icon-asset="private"]')).toHaveCount(1);
      await expect(lessons.locator('[data-lesson-icon-asset="surf_skate"]')).toHaveCount(1);
      await expect(lessons.locator('[data-lesson-icon-asset="lineup_pro"]')).toHaveCount(1);
      await expect(lessons.locator("[data-lesson-icon-asset] circle")).toHaveCount(0);
      await expect(lessons.locator("[data-lesson-divider-asset]")).toHaveCount(5);
      await expect(lessons.locator('img[src*="SVG__lesson-card-divider"]')).toHaveCount(0);
      await expect(lessons.locator("[data-lessons-photo]").first()).toHaveClass(/grayscale/);
      await expect(lessons.locator("[data-lessons-photo]").first()).toHaveClass(/group-hover:grayscale-0/);
      await expect(lessons.locator("[data-lessons-photo]").first()).toHaveClass(/group-active:grayscale-0/);
      await expect(lessons.locator("[data-lessons-photo]").first()).toHaveClass(/group-focus-within:grayscale-0/);
      await expect(lessons.getByText("Most Popular", { exact: true })).toHaveCount(0);
      await expect(lessons.locator("[data-home-v2-booking-cta]").first()).toBeVisible();
      await expect(lessons.getByRole("button", { name: "Book Now" })).toHaveCount(route.language === "en" ? 3 : 0);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`renders the Figma-based How It Works block on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const how = page.locator("[data-home-v2-how-it-works]");
      await expect(how).toBeVisible();
      await expect(how.locator("[data-how-card]")).toHaveCount(4);

      await expect(how.locator('[data-how-paper-asset="0"]')).toHaveAttribute("src", /how-card-frame-01/);
      await expect(how.locator('[data-how-paper-asset="1"]')).toHaveAttribute("src", /how-card-frame-02/);
      await expect(how.locator('[data-how-paper-asset="2"]')).toHaveAttribute("src", /how-card-frame-03/);
      await expect(how.locator('[data-how-paper-asset="3"]')).toHaveAttribute("src", /how-card-frame-04/);

      await expect(how.locator('[data-how-number-bg-asset="0"]')).toHaveAttribute("src", /how-step-number-badge/);
      await expect(how.locator('[data-how-number-bg-asset="1"]')).toHaveAttribute("src", /how-step-number-badge/);
      await expect(how.locator('[data-how-number-bg-asset="2"]')).toHaveAttribute("src", /how-step-number-badge/);
      await expect(how.locator('[data-how-number-bg-asset="3"]')).toHaveAttribute("src", /how-step-number-badge/);

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
        await expect(how.locator("[data-how-card]").nth(index).getByText(String(index + 1), { exact: true })).toBeVisible();
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
      await expect(included).toBeVisible();
      await expect(included.locator('img[src*="/design/home-v2/why-epic/"]')).toHaveCount(0);
      await expect(included.locator('img[src*="/design/home-v2/included/"]')).toHaveCount(0);

      if (route.language === "en") {
        await expect(included.getByRole("heading", { name: "Everything included" })).toBeVisible();
        await expect(included.getByText("Board", { exact: true })).toBeVisible();
        await expect(included.getByText("Rashguard", { exact: true })).toBeVisible();
        await expect(included.getByText("Zinc SPF", { exact: true })).toBeVisible();
        await expect(included.getByText("Photos / videos", { exact: true })).toBeVisible();
      }
    });

    test(`renders the Figma-based rental block on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const rentals = page.locator('[data-home-v2-rentals-block]');
      const desktopRental = rentals.locator('[data-rentals-content]');
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

      await expect(rentals.locator('[data-rentals-heading-asset]')).toHaveAttribute("src", /rental-heading-paper\.svg/);
      await expect(rentals.locator('[data-rentals-layer="scene-bg"]')).toHaveAttribute("src", /rental-photo-frame\.svg/);
      await expect(rentals.locator('[data-rentals-layer="scene-mint"]')).toHaveAttribute("src", /rental-mint-brush\.svg/);
      await expect(rentals.locator('[data-rentals-layer="beach-photo"]')).toHaveAttribute("src", /rental-beach-photo\.webp/);
      await expect(rentals.locator('[data-rentals-layer="scene-board-top"]')).toHaveCount(0);
      await expect(rentals.locator('[data-rentals-html-divider]')).toHaveCount(0);

      const layerOrder = await rentals.evaluate((node) => ({
        bg: getComputedStyle(node.querySelector('[data-rentals-layer="scene-bg"]')).zIndex,
        mint: getComputedStyle(node.querySelector('[data-rentals-layer="scene-mint"]')).zIndex,
        photo: getComputedStyle(node.querySelector('[data-rentals-layer="beach-photo"]')).zIndex,
      }));
      expect(Number(layerOrder.bg)).toBeLessThan(Number(layerOrder.photo));
      expect(Number(layerOrder.bg)).toBeLessThan(Number(layerOrder.mint));

      const layerGeometry = await rentals.evaluate((node) => {
        const selectors = [
          '[data-rentals-layer="scene-bg"]',
          '[data-rentals-layer="scene-mint"]',
          '[data-rentals-layer="beach-photo"]',
        ];
        return selectors.map((selector) => {
          const element = node.querySelector(selector);
          const style = getComputedStyle(element);
          return {
            offsetLeft: element.offsetLeft,
            offsetTop: element.offsetTop,
            offsetWidth: element.offsetWidth,
            offsetHeight: element.offsetHeight,
            position: style.position,
            objectFit: style.objectFit,
          };
        });
      });
      expect(layerGeometry.every((layer) => layer.position === "absolute")).toBeTruthy();
      expect(layerGeometry.every((layer) => layer.objectFit === "contain")).toBeTruthy();
      expect(layerGeometry[1]).toEqual(layerGeometry[0]);
      expect(layerGeometry[2]).toEqual(layerGeometry[0]);
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
        const mobileLiveCam = liveCam.locator("[data-live-cam-mobile-layout]");
        await expect(mobileLiveCam.getByText("Трансляция от Da Nang Surf Cam", { exact: true })).toBeVisible();
        await expect(mobileLiveCam.getByText("Открыть камеру", { exact: true })).toBeVisible();
        const liveCamText = await liveCam.innerText();
        expect(liveCamText).not.toMatch(/Р[›°ёџњљµ]|С[ѓ‚Њ]/);
      }
      await expect(liveCam.locator('iframe[src*="danangsurfcam.com/embed/preview"]')).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
      await expect(liveCam.locator('[data-live-cam-provider-action="primary"]')).toHaveAttribute("href", /danangsurfcam\.com/);
      await expect(liveCam.locator('[data-live-cam-provider-action="secondary"]')).toHaveAttribute("href", /danangsurfcam\.com\/donate/);
      await expect(liveCam.locator('[data-live-cam-mobile-layout]')).toBeVisible();
      await expect(liveCam.locator('[data-live-cam-mobile-note]')).toBeVisible();

      const forecast = page.locator("[data-home-v2-forecast]");
      await expect(forecast).toBeVisible();
      const mobileForecast = forecast.locator('[data-forecast-mobile-layout]');
      await expect(mobileForecast).toBeVisible();
      await expect(mobileForecast.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);

      const activateMap = mobileForecast.getByText(route.language === "ru" ? "Активировать карту" : "Activate map");
      await expect(activateMap).toBeVisible();
      await activateMap.click();
      await expect(mobileForecast.getByRole("button", { name: "Close forecast map" })).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
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

    test(`separates the desktop surf-stack into three poster scenes on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const rentalScene = page.locator('[data-surf-stack-scene="rental"]');
      const liveCamScene = page.locator('[data-surf-stack-scene="livecam"]');
      const forecastScene = page.locator('[data-surf-stack-scene="forecast"]');
      await expect(rentalScene).toBeVisible();
      await expect(liveCamScene).toBeVisible();
      await expect(forecastScene).toBeVisible();

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
      expect(geometry.liveCamArtboard.width).toBeLessThanOrEqual(1280);
      expect(geometry.forecastArtboard.width).toBeLessThanOrEqual(1280);
      expect(geometry.liveCamArtboard.top - geometry.rentalArtboard.bottom).toBeGreaterThanOrEqual(0);
      expect(geometry.forecastArtboard.top - geometry.liveCamArtboard.bottom).toBeGreaterThanOrEqual(0);
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

      await page.locator("[data-home-v2-rental-cta]").first().click();
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
});
