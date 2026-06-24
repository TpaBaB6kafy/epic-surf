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
        await expect(page.locator("[data-home-v2-booking-cta]").first()).toBeVisible();
        await expect(page.locator("[data-home-v2-rental-cta]").first()).toBeVisible();

        const decorativeBackgrounds = await page.locator("[data-home-v2-root] [class*='[background-image']").count();
        expect(decorativeBackgrounds).toBe(0);

        if (viewport.width === 390) {
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          expect(overflow).toBeLessThanOrEqual(1);
        }
      });
    }

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

      const beforePan = await hero.evaluate((node) => ({
        base: getComputedStyle(node.querySelector("[data-home-v2-hero-ocean-base-pan]")).transform,
        color: [...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]")].map((element) => getComputedStyle(element).transform),
        keyframes: [...document.styleSheets]
          .flatMap((sheet) => {
            try {
              return [...sheet.cssRules];
            } catch {
              return [];
            }
          })
          .find((rule) => rule.name === "homeV2HeroOceanPan")?.cssText || "",
      }));
      await page.waitForTimeout(700);
      const afterPan = await hero.evaluate((node) => ({
        base: getComputedStyle(node.querySelector("[data-home-v2-hero-ocean-base-pan]")).transform,
        color: [...node.querySelectorAll("[data-home-v2-hero-logo-color-pan]")].map((element) => getComputedStyle(element).transform),
      }));
      expect(afterPan.base).not.toBe(beforePan.base);
      expect(afterPan.color[0]).not.toBe(beforePan.color[0]);
      expect(afterPan.color[1]).not.toBe(beforePan.color[1]);
      expect(beforePan.keyframes).toContain("-26.5%");

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
      await expect(lessons.locator('[data-lesson-paper-asset="group"]')).toHaveAttribute("src", /ASSET__lesson-card-paper-group/);
      await expect(lessons.locator('[data-lesson-paper-asset="split"]')).toHaveAttribute("src", /ASSET__lesson-card-paper-split/);
      await expect(lessons.locator('[data-lesson-paper-asset="private"]')).toHaveAttribute("src", /ASSET__lesson-card-paper-private/);
      await expect(lessons.locator('[data-lesson-paper-asset="surf_skate"]')).toHaveAttribute("src", /ASSET__lesson-card-paper-surf-skate/);
      await expect(lessons.locator('[data-lesson-paper-asset="lineup_pro"]')).toHaveAttribute("src", /ASSET__lesson-card-paper-lineup-pro/);
      await expect(lessons.locator('[data-lesson-icon-asset="group"]')).toHaveAttribute("src", /SVG__lesson-icon-group/);
      await expect(lessons.locator('[data-lesson-icon-asset="split"]')).toHaveAttribute("src", /SVG__lesson-icon-split/);
      await expect(lessons.locator('[data-lesson-icon-asset="private"]')).toHaveAttribute("src", /SVG__lesson-icon-private/);
      await expect(lessons.locator('[data-lesson-icon-asset="surf_skate"]')).toHaveAttribute("src", /SVG__lesson-icon-surf-skate/);
      await expect(lessons.locator('[data-lesson-icon-asset="lineup_pro"]')).toHaveAttribute("src", /SVG__lesson-icon-lineup-pro/);
      await expect(lessons.locator("[data-lesson-divider-asset]")).toHaveCount(5);
      await expect(lessons.locator("[data-lesson-divider-asset]").first()).toHaveAttribute("src", /SVG__lesson-card-divider/);
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

      await expect(how.locator('[data-how-paper-asset="0"]')).toHaveAttribute("src", /ASSET__how-card-paper-meet/);
      await expect(how.locator('[data-how-paper-asset="1"]')).toHaveAttribute("src", /ASSET__how-card-paper-theory/);
      await expect(how.locator('[data-how-paper-asset="2"]')).toHaveAttribute("src", /ASSET__how-card-paper-practice/);
      await expect(how.locator('[data-how-paper-asset="3"]')).toHaveAttribute("src", /ASSET__how-card-paper-review/);

      await expect(how.locator('[data-how-number-bg-asset="0"]')).toHaveAttribute("src", /ASSET__how-step-number-bg-meet/);
      await expect(how.locator('[data-how-number-bg-asset="1"]')).toHaveAttribute("src", /ASSET__how-step-number-bg-theory/);
      await expect(how.locator('[data-how-number-bg-asset="2"]')).toHaveAttribute("src", /ASSET__how-step-number-bg-practice/);
      await expect(how.locator('[data-how-number-bg-asset="3"]')).toHaveAttribute("src", /ASSET__how-step-number-bg-review/);

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
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const rentals = page.locator('[data-home-v2-rentals-block]');
      await expect(rentals).toBeVisible();
      await expect(rentals.getByText("Rentals", { exact: true })).toHaveCount(0);
      await expect(rentals.getByRole("heading", { name: "SURF BOARD RENTALS" })).toBeVisible();
      await expect(rentals.getByText("FROM", { exact: true })).toBeVisible();
      await expect(rentals.getByText("250.000", { exact: true })).toBeVisible();
      await expect(rentals.getByText("VND", { exact: true })).toBeVisible();
      await expect(rentals.getByText("Shortboards, funboards, softboards and more", { exact: true })).toBeVisible();
      await expect(rentals.getByText("Daily or long term.", { exact: true })).toBeVisible();
      await expect(rentals.getByRole("button", { name: "RENT NOW" })).toBeVisible();
      await expect(rentals.getByRole("link", { name: "CHOOSE A BOARD" })).toBeVisible();

      await expect(rentals.locator('[data-rentals-heading-asset]')).toHaveAttribute("src", /torn-paper-heading-wide\.svg/);
      await expect(rentals.locator('[data-rentals-layer="scene-bg"]')).toHaveAttribute("src", /rental-scene-bg/);
      await expect(rentals.locator('[data-rentals-layer="scene-mint"]')).toHaveAttribute("src", /rental-scene-mint/);
      await expect(rentals.locator('[data-rentals-layer="scene-board-top"]')).toHaveAttribute("src", /rental-scene-board-top/);
      await expect(rentals.locator('[data-rentals-layer="scene-mint"]')).toHaveClass(/rental-mint-wave-animated/);

      const layerOrder = await rentals.evaluate((node) => ({
        bg: getComputedStyle(node.querySelector('[data-rentals-layer="scene-bg"]')).zIndex,
        mint: getComputedStyle(node.querySelector('[data-rentals-layer="scene-mint"]')).zIndex,
        board: getComputedStyle(node.querySelector('[data-rentals-layer="scene-board-top"]')).zIndex,
      }));
      expect(layerOrder).toEqual({ bg: "1", mint: "2", board: "3" });

      const layerGeometry = await rentals.evaluate((node) => {
        const selectors = [
          '[data-rentals-layer="scene-bg"]',
          '[data-rentals-layer="scene-mint"]',
          '[data-rentals-layer="scene-board-top"]',
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

      const mintAnimationStyles = await rentals.locator('[data-rentals-layer="scene-mint"]').evaluate((element) => {
        const style = getComputedStyle(element);
        const keyframes = [...document.styleSheets]
          .flatMap((sheet) => {
            try {
              return [...sheet.cssRules];
            } catch {
              return [];
            }
          })
          .find((rule) => rule.name === "rentalMintWaveBreath");

        return {
          animationName: style.animationName,
          willChange: style.willChange,
          keyframes: keyframes?.cssText || "",
        };
      });
      expect(mintAnimationStyles.animationName).toBe("rentalMintWaveBreath");
      expect(mintAnimationStyles.willChange).toBe("transform");
      expect(mintAnimationStyles.keyframes).not.toContain("opacity");

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`keeps V2 live cam and forecast functional on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const liveCam = page.locator("[data-home-v2-live-cam]");
      await expect(liveCam).toBeVisible();
      await expect(liveCam.locator("[data-live-cam-preview] iframe")).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
      await expect(liveCam.locator('[data-live-cam-provider-action="primary"]')).toHaveAttribute("href", /danangsurfcam\.com/);
      await expect(liveCam.locator('[data-live-cam-provider-action="secondary"]')).toHaveAttribute("href", /danangsurfcam\.com\/donate/);

      const forecast = page.locator("[data-home-v2-forecast]");
      await expect(forecast).toBeVisible();
      await expect(forecast.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);

      const activateMap = forecast.getByText(route.language === "ru" ? "РђРєС‚РёРІРёСЂРѕРІР°С‚СЊ РєР°СЂС‚Сѓ" : "Activate map");
      await expect(activateMap).toBeVisible();
      await activateMap.click();
      await expect(forecast.locator("button").last()).toBeVisible();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });

    test(`disables rental mint wave animation with reduced motion on ${route.path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "domcontentloaded" });

      const animationName = await page.locator('[data-rentals-layer="scene-mint"]').evaluate((element) => (
        getComputedStyle(element).animationName
      ));
      expect(animationName).toBe("none");
    });

    test(`opens booking, rental, and messenger actions on ${route.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`${baseUrl}${route.path}?partner=hotel_abc`, { waitUntil: "domcontentloaded" });

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
