const { test, expect } = require("@playwright/test");

const fs = require("node:fs");
const path = require("node:path");

async function expectContained(parent, selector, tolerance = 2) {
  const result = await parent.evaluate((element, options) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    const left = rect.left + parseFloat(style.paddingLeft);
    const right = rect.right - parseFloat(style.paddingRight);
    return [...element.querySelectorAll(options.selector)].every((child) => {
      const childRect = child.getBoundingClientRect();
      return childRect.left >= left - options.tolerance && childRect.right <= right + options.tolerance;
    });
  }, { selector, tolerance });
  expect(result).toBe(true);
}

test.describe("Rental production page", () => {
  test("does not emit hydration warnings when partner attribution exists", async ({ page }) => {
    const hydrationMessages = [];
    page.on("console", (message) => {
      const text = message.text();
      if (/hydration|did not match|server rendered HTML/i.test(text)) {
        hydrationMessages.push(text);
      }
    });
    page.on("pageerror", (error) => {
      const text = error.message;
      if (/hydration|did not match|server rendered HTML/i.test(text)) {
        hydrationMessages.push(text);
      }
    });

    await page.goto("http://localhost:3000/");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "epic_surf_attribution",
        JSON.stringify({ partner: "hotel_abc", landing_page: "/", stored_at: new Date().toISOString() }),
      );
    });

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    expect(hydrationMessages).toEqual([]);
    const finalCta = page.locator('[data-section="rental-final-cta"]');
    await expect(finalCta.getByRole("link", { name: /^whatsapp$/i })).toHaveAttribute("href", "https://wa.me/84383880164");
    await expect(page.getByRole("link", { name: /^telegram$/i })).toHaveAttribute("href", "https://t.me/danangsurf");
    await expect(page.getByRole("link", { name: /^zalo$/i })).toHaveAttribute("href", "https://zalo.me/84383880164");

    await page.getByRole("button", { name: /rent this board/i }).evaluate((button) => button.click());
    await expect(page.getByText("Selected board: Softboard Orange", { exact: true })).toBeVisible();
    const modalWhatsApp = page.getByText("Selected board: Softboard Orange", { exact: true })
      .locator("xpath=ancestor::div[contains(@class, 'max-w-sm')]")
      .getByRole("link", { name: /whatsapp/i });
    await modalWhatsApp.evaluate((link) => link.click());
    await expect.poll(async () => decodeURIComponent(await modalWhatsApp.getAttribute("href"))).toContain("hotel_abc");
  });

  test("renders the reference-first rental design page with production metadata", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    await expect(page).toHaveTitle("Surfboard Rental in Da Nang | Epic Surf School");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.surfdanang.com/surfboard-rental-danang");
    await expect(page.locator('link[rel="alternate"][hreflang="ru"]')).toHaveAttribute("href", "https://www.surfdanang.com/ru/surfboard-rental-danang");
    const hero = page.locator('[data-section="rental-design-hero"]');
    await expect(hero.locator('[data-role="rental-hero-base"][src*="/rentals/hero/rental-hero-color.jpg"]')).toBeVisible();
    await expect(hero.locator('[data-role="rental-hero-base"]')).toHaveClass(/grayscale/);
    await expect(hero.locator('[data-role="rental-hero-color-overlay"]')).toHaveCount(7);
    await expect(hero.locator("h1")).toHaveClass(/sr-only/);
    await expect(hero.locator('[data-hero-title-primary]')).toHaveCount(0);
    await expect(hero.locator('[data-hero-title-secondary]')).toHaveCount(0);
    await expect(hero.getByRole("button")).toHaveCount(0);
    await expect(hero.getByRole("link", { name: /back to epic surf/i })).toHaveAttribute("href", "/");
    await expect(hero.getByText(/Rent a surfboard/i)).toHaveCount(0);

    for (const section of [
      "rental-design-hero",
      "rental-board-showroom",
      "rental-process",
      "rental-comparison",
      "rental-pickup",
      "rental-faq",
      "rental-related",
      "rental-final-cta",
    ]) {
      await expect(page.locator(`[data-section="${section}"]`)).toBeVisible();
    }

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.getByRole("heading", { name: /softboard orange/i })).toBeVisible();
    await expect(showroom.locator("article > span.bg-epicMint")).toHaveCount(0);
    await expect(showroom.locator("article > div.h-1.w-20.bg-epicRed")).toHaveCount(0);
    await expect(showroom.getByText(/Soft and stable beginner-friendly board/i)).toBeVisible();
    await showroom.getByRole("button", { name: /show luke studer shortboard/i }).click();
    await expect(showroom.getByRole("heading", { name: /luke studer shortboard/i })).toBeVisible();
    await expect(showroom.getByText(/350\.000\s*VND/i)).toBeVisible();
    await expect(showroom.getByText(/Built for speed, sharp turns/i)).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard front view/i }).locator('[data-image-slot="front"][src*="/rentals/boards/processed/board-09/front.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard back view/i }).locator('[data-image-slot="back"][src*="/rentals/boards/processed/board-09/back.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard fins view/i }).locator('[data-image-slot="fins"][src*="/rentals/boards/processed/board-09/fins.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard fins view/i }).locator('[data-image-slot="fins"]')).toHaveClass(/object-bottom/);
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-main.svg"]')).toBeVisible();
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-detail-top.svg"]')).toBeVisible();
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-detail-bottom.svg"]')).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await faq.getByText("How much is surfboard rental in Da Nang?").click();
    await expect(faq.getByText(/250,000 VND for 2 hours/i)).toBeVisible();

    const decorativeFrames = [
      "/rentals/page/rental-gallery-frame-main.svg",
      "/rentals/page/rental-carousel-thumb-frame-01.svg",
      "/rentals/page/rental-cta-mint-brush.svg",
    ];
    for (const frame of decorativeFrames) {
      const image = page.locator(`img[src*="${frame}"]`).first();
      await expect(image).toHaveAttribute("alt", "");
      await expect(image).toHaveAttribute("aria-hidden", "true");
      await expect(image).toHaveClass(/pointer-events-none/);
    }

    await expect(page.locator('[data-section="rental-related"]').getByRole("link").first()).toBeVisible();
    await expect(page.locator('[data-section="rental-final-cta"]').getByRole("link", { name: /^whatsapp$/i })).toBeVisible();
  });

  test("does not create horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1200 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('[data-section="rental-board-showroom"] [data-image-slot="front"][src*="/rentals/boards/processed/board-01/front.webp"]').first()).toBeVisible();
  });

  test("uses the approved redesign assets, canvases, map layers, and responsive ordering", async ({ page, request }) => {
    const sourceMap = fs.readFileSync(path.join(process.cwd(), "public/design/rental-redesign/map/rental-map-static.svg"), "utf8");
    const mapBackground = fs.readFileSync(path.join(process.cwd(), "public/design/rental-redesign/map/rental-map-background.svg"), "utf8");
    const mapMarker = fs.readFileSync(path.join(process.cwd(), "public/design/rental-redesign/map/rental-map-epic-marker.svg"), "utf8");
    const sourcePaths = sourceMap.match(/<path\b[\s\S]*?\/>/g).map((entry) => entry.match(/d="([^"]+)"/)[1]);
    expect(mapBackground.match(/d="([^"]+)"/)[1]).toBe(sourcePaths[0]);
    expect(mapMarker.match(/d="([^"]+)"/)[1]).toBe(sourcePaths[1]);

    const assetUrls = [
      ...[1, 2, 3, 4].flatMap((number) => [
        `/design/rental-redesign/process/process-card-mask-${String(number).padStart(2, "0")}.svg`,
        `/design/rental-redesign/process/process-card-mask-mobile-${String(number).padStart(2, "0")}.svg`,
      ]),
      ...["main", "accent"].flatMap((name) => [
        `/design/rental-redesign/process/process-heading-${name}-plate-desktop.svg`,
        `/design/rental-redesign/process/process-heading-${name}-plate-mobile.svg`,
      ]),
      "/design/rental-redesign/process/process-intro-note-plate-desktop.svg",
      "/design/rental-redesign/process/process-intro-note-plate-mobile.svg",
      ...["heading", "rent-card", "lesson-card"].flatMap((name) => [
        `/design/rental-redesign/comparison/comparison-${name}-plate-desktop.svg`,
        `/design/rental-redesign/comparison/comparison-${name}-plate-mobile.svg`,
      ]),
      "/design/rental-redesign/comparison/rental-comparison-vs.svg",
      "/design/rental-redesign/map/rental-map-background.svg",
      "/design/rental-redesign/map/rental-map-epic-marker.svg",
      "/design/rental-redesign/pickup/rental-pickup-my-khe-source.jpg",
    ];
    for (const url of assetUrls) {
      expect((await request.get(`http://localhost:3000${url}`)).ok(), url).toBe(true);
    }

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    const processDesktop = page.locator('[data-role="rental-process-artboard"][data-breakpoint="desktop"]');
    const comparisonDesktop = page.locator('[data-role="rental-comparison-artboard"][data-breakpoint="desktop"]');
    await expect(processDesktop).toBeVisible();
    await expect(comparisonDesktop).toBeVisible();
    await expect(processDesktop).toHaveAttribute("data-canvas", "1235x391");
    await expect(comparisonDesktop).toHaveAttribute("data-canvas", "1235x461");
    await expect(processDesktop.locator('[data-role="process-card-mask"]')).toHaveCount(4);
    await expect(comparisonDesktop.locator('[data-role="rental-comparison-vs"]')).toBeVisible();
    expect(parseFloat(await page.locator('[data-role="rental-map-background"]').evaluate((element) => getComputedStyle(element).opacity))).toBeCloseTo(0.29, 2);
    expect(parseFloat(await page.locator('[data-role="rental-map-epic-marker"]').evaluate((element) => getComputedStyle(element).opacity))).toBe(1);
    const desktopMap = page.locator('[data-role="rental-map-background"]');
    const desktopMarker = page.locator('[data-role="rental-map-epic-marker"]');
    await expect(desktopMap).toHaveAttribute("src", /rental-map-background\.svg/);
    await expect(desktopMarker).toHaveAttribute("src", /rental-map-epic-marker\.svg/);
    const markerGap = await page.evaluate(() => {
      const process = document.querySelector('[data-role="rental-process-artboard"][data-breakpoint="desktop"]').getBoundingClientRect();
      const heading = document.querySelector('[data-role="rental-comparison-artboard"][data-breakpoint="desktop"] [data-role="comparison-heading"]').getBoundingClientRect();
      const marker = document.querySelector('[data-role="rental-map-epic-marker"]').getBoundingClientRect();
      return { processBottom: process.bottom, headingTop: heading.top, markerTop: marker.top, markerBottom: marker.bottom };
    });
    expect(markerGap.markerTop).toBeGreaterThanOrEqual(markerGap.processBottom);
    expect(markerGap.markerBottom).toBeLessThan(markerGap.headingTop);
    await expect(page.locator('[data-section="rental-comparison"] [data-role="rental-live-cam"]')).toHaveCount(0);
    await expect(page.locator('[data-section="rental-pickup"] [data-role="rental-live-cam"]')).toHaveCount(1);

    await page.setViewportSize({ width: 390, height: 932 });
    const processMobile = page.locator('[data-role="rental-process-artboard"][data-breakpoint="mobile"]');
    const comparisonMobile = page.locator('[data-role="rental-comparison-artboard"][data-breakpoint="mobile"]');
    await expect(processMobile).toBeVisible();
    await expect(comparisonMobile).toBeVisible();
    await expect(processDesktop).toBeHidden();
    await expect(comparisonDesktop).toBeHidden();
    await expect(processMobile).toHaveAttribute("data-canvas", "390x685");
    await expect(comparisonMobile).toHaveAttribute("data-canvas", "390x828");
    const mobileMapBox = await page.locator('[data-role="rental-map-background-mobile"]').boundingBox();
    expect(mobileMapBox.width).toBeGreaterThanOrEqual(2400);
    expect(mobileMapBox.width).toBeLessThanOrEqual(2600);
    const upperLeftCard = await processMobile.locator('[data-role="process-card"]').nth(0).boundingBox();
    const upperRightCard = await processMobile.locator('[data-role="process-card"]').nth(1).boundingBox();
    const mobileMarkerBox = await desktopMarker.boundingBox();
    expect(mobileMarkerBox.x).toBeGreaterThan(upperLeftCard.x + upperLeftCard.width);
    expect(mobileMarkerBox.x + mobileMarkerBox.width).toBeLessThan(upperRightCard.x);
    expect(mobileMarkerBox.y + mobileMarkerBox.height).toBeGreaterThan(Math.min(upperLeftCard.y, upperRightCard.y));
    expect(mobileMarkerBox.y).toBeLessThan(Math.max(upperLeftCard.y + upperLeftCard.height, upperRightCard.y + upperRightCard.height));
    const rent = await comparisonMobile.locator('[data-role="rental-decision-zone"]').boundingBox();
    const versus = await comparisonMobile.locator('[data-role="rental-comparison-vs"]').boundingBox();
    const lesson = await comparisonMobile.locator('[data-role="lesson-note"]').boundingBox();
    expect(versus.y).toBeGreaterThan(rent.y + rent.height);
    expect(lesson.y).toBeGreaterThan(versus.y);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  test("restores the production hero color hover and mobile tap states", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-role="rental-hero-hotspot-layer"]')).toHaveAttribute("data-hero-masks-ready", "true");
    const hero = page.locator('[data-section="rental-design-hero"]');
    const overlay = hero.locator('[data-role="rental-hero-color-overlay"][data-hero-board-id="1"]');
    await expect(overlay).toHaveClass(/opacity-0/);
    const desktopHeroBox = await hero.locator('[data-role="rental-hero-media"]').boundingBox();
    await page.locator('[data-role="rental-hero-hotspot-layer"]').dispatchEvent("pointermove", { pointerType: "mouse", clientX: desktopHeroBox.x + desktopHeroBox.width * 0.11, clientY: desktopHeroBox.y + desktopHeroBox.height * 0.45 });
    await expect(overlay).toHaveClass(/opacity-100/);
    const heroBox = await hero.locator('[data-role="rental-hero-media"]').boundingBox();
    await page.locator('[data-role="rental-hero-hotspot-layer"]').dispatchEvent("pointermove", { pointerType: "mouse", clientX: heroBox.x + heroBox.width - 2, clientY: heroBox.y + heroBox.height - 2 });
    await expect(overlay).toHaveClass(/opacity-0/);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await expect(page.locator('[data-role="rental-hero-hotspot-layer"]')).toHaveAttribute("data-hero-masks-ready", "true");
    await page.evaluate(() => window.scrollTo(0, 0));
    const mobileOverlay = page.locator('[data-section="rental-design-hero"] [data-role="rental-hero-color-overlay"][data-hero-board-id="2"]');
    const mobileHeroBox = await page.locator('[data-role="rental-hero-media"]').boundingBox();
    await page.locator('[data-role="rental-hero-hotspot-layer"]').dispatchEvent("pointerdown", { pointerType: "touch", clientX: mobileHeroBox.x + mobileHeroBox.width * 0.145, clientY: mobileHeroBox.y + mobileHeroBox.height * 0.5 });
    await expect(mobileOverlay).toHaveClass(/opacity-(0|100)/);
    await page.locator('[data-role="rental-hero-hotspot-layer"]').dispatchEvent("pointerup", { pointerType: "touch" });
    await expect(mobileOverlay).toHaveClass(/opacity-0/);
  });

  test("provides localized history-independent links back to Epic Surf", async ({ page }) => {
    for (const { path, href, desktopLabel } of [
      { path: "/surfboard-rental-danang", href: "/", desktopLabel: "Back to Epic Surf" },
      { path: "/ru/surfboard-rental-danang", href: "/ru", desktopLabel: "Назад в Epic Surf" },
    ]) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`http://localhost:3000${path}`, { waitUntil: "domcontentloaded" });
      const backLink = page.locator('[data-role="rental-back-link"]');
      await expect(backLink).toHaveAttribute("href", href);
      await expect(backLink.getByText(desktopLabel, { exact: true })).toBeVisible();

      await page.setViewportSize({ width: 390, height: 844 });
      await expect(backLink.getByText("Epic Surf", { exact: true })).toBeVisible();
    }
  });

  test("keeps FAQ keyboard-accessible and preserves the Surf Info index", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(600);

    const faq = page.locator('[data-section="rental-faq"]');
    const question = faq.getByRole("button", { name: /how much is surfboard rental in da nang/i });
    await expect(question).toHaveAttribute("aria-expanded", "false");
    await question.focus();
    await question.press("Enter");
    await expect(question).toHaveAttribute("aria-expanded", "true");
    await expect(faq.getByText(/250,000 VND for 2 hours/i)).toBeVisible();
    await question.press("Space");
    await expect(question).toHaveAttribute("aria-expanded", "false");

    const related = page.locator('[data-section="rental-related"]');
    for (const href of [
      "/surf-lessons-danang",
      "/surfing-danang",
      "/my-khe-beach-surfing",
      "/surf-guide",
    ]) {
      await expect(related.locator(`a[href="${href}"]`)).toBeVisible();
    }

    const finalCta = page.locator('[data-section="rental-final-cta"]');
    await expect(finalCta.getByRole("link", { name: /^whatsapp$/i })).toBeVisible();
    await expect(finalCta.getByRole("link", { name: /^telegram$/i })).toBeVisible();
    await expect(finalCta.getByRole("link", { name: /^zalo$/i })).toBeVisible();
    await expect(finalCta.getByRole("link", { name: /^call$/i })).toHaveAttribute("href", "tel:+84905012198");
  });

  test("opens and navigates the board image lightbox", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await showroom.getByRole("button", { name: /open softboard orange front view/i }).click();

    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByRole("img", { name: /softboard orange front enlarged view/i })).toBeVisible();

    await lightbox.getByRole("button", { name: /show back/i }).click();
    const backImage = lightbox.getByRole("img", { name: /softboard orange back enlarged view/i });
    await expect(backImage).toBeVisible();
    await expect(backImage).toHaveAttribute("src", /\/rentals\/boards\/processed\/board-01\/back-full\.webp$/);

    await lightbox.getByRole("button", { name: /next image/i }).click();
    const finsImage = lightbox.getByRole("img", { name: /softboard orange fins enlarged view/i });
    await expect(finsImage).toBeVisible();
    await expect(finsImage).toHaveAttribute("src", /\/rentals\/boards\/processed\/board-01\/fins-full\.webp$/);

    await lightbox.click({ position: { x: 2, y: 2 } });
    await expect(lightbox).toBeHidden();

    await showroom.getByRole("button", { name: /show luke studer shortboard/i }).click();
    await showroom.getByRole("button", { name: /open luke studer shortboard fins/i }).click();
    await expect(lightbox.getByRole("img", { name: /luke studer shortboard fins enlarged view/i })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("applies the polish layout at desktop and mobile widths", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1200 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(600);
    await page.waitForTimeout(250);

    const hero = page.locator('[data-section="rental-design-hero"]');
    const heroImage = hero.locator('[data-role="rental-hero-base"]');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveClass(/grayscale/);
    expect((await hero.boundingBox()).height).toBeGreaterThanOrEqual(650);
    await expect(hero.locator("h1")).toHaveClass(/sr-only/);
    await expect(hero.getByText(/surf rental/i)).toHaveCount(0);

    const processDesktop = page.locator('[data-role="rental-process-artboard"][data-breakpoint="desktop"]');
    await expect(processDesktop).toBeVisible();
    await expect(processDesktop).toHaveAttribute("data-canvas", "1235x391");
    const processSteps = processDesktop.locator('[data-role="process-card"]');
    await expect(processSteps).toHaveCount(4);
    const first = await processSteps.nth(0).boundingBox();
    const fourth = await processSteps.nth(3).boundingBox();
    expect(Math.abs(first.y - fourth.y)).toBeLessThanOrEqual(14);
    for (let index = 0; index < await processSteps.count(); index += 1) {
      await expectContained(processSteps.nth(index), '[data-role="process-card-number"], [data-role="process-card-label"], [data-role="process-card-description"]');
    }

    const comparisonDesktop = page.locator('[data-role="rental-comparison-artboard"][data-breakpoint="desktop"]');
    await expect(comparisonDesktop).toBeVisible();
    await expect(comparisonDesktop).toHaveAttribute("data-canvas", "1235x461");
    const comparisonCards = comparisonDesktop.locator("article");
    await expect(comparisonCards).toHaveCount(2);
    const rentCardDesktop = await comparisonCards.nth(0).boundingBox();
    const lessonCardDesktop = await comparisonCards.nth(1).boundingBox();
    expect(Math.abs(rentCardDesktop.y - lessonCardDesktop.y)).toBeLessThanOrEqual(8);
    expect(rentCardDesktop.width).toBeGreaterThan(lessonCardDesktop.width);
    expect((await comparisonDesktop.boundingBox()).height).toBeGreaterThan(450);
    for (let index = 0; index < await comparisonCards.count(); index += 1) {
      await expectContained(comparisonCards.nth(index), "h3, p, li, a");
    }
    const galleryBox = await page.locator('[data-role="rental-gallery"]').boundingBox();
    const productBox = await page.locator('[data-section="rental-board-showroom"] article').boundingBox();
    expect(Math.abs(galleryBox.height - productBox.height)).toBeLessThanOrEqual(2);
    await expect(page.locator('[data-role="board-options-intro"]')).toHaveCount(0);
    await expect(page.locator('[data-section="rental-faq"] button span.font-heading')).toHaveCount(0);

    const rentButton = page.getByRole("button", { name: /rent this board/i });
    const whatsappButton = page.locator('[data-section="rental-board-showroom"]').getByRole("link", { name: /^whatsapp$/i });
    expect(Math.abs((await rentButton.boundingBox()).height - (await whatsappButton.boundingBox()).height)).toBeLessThanOrEqual(1);
    const productCard = page.locator('[data-role="rental-product-card"]');
    await expectContained(productCard, "h2, p, dt, dd, button, a");
    expect(await productCard.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    const actionGeometry = await page.locator('[data-role="rental-product-actions"] > *').evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { width: rect.width, height: rect.height, border: style.borderWidth, radius: style.borderRadius, shadow: style.boxShadow };
    }));
    expect(Math.abs(actionGeometry[0].width - actionGeometry[1].width)).toBeLessThanOrEqual(1);
    expect(Math.abs(actionGeometry[0].height - actionGeometry[1].height)).toBeLessThanOrEqual(1);
    expect(actionGeometry[0].border).toBe(actionGeometry[1].border);
    expect(actionGeometry[0].radius).toBe(actionGeometry[1].radius);
    expect(actionGeometry[0].shadow).toBe(actionGeometry[1].shadow);
    const decision = await comparisonDesktop.locator('[data-role="rental-decision-zone"]').boundingBox();
    const lesson = await comparisonDesktop.locator('[data-role="lesson-note"]').boundingBox();
    expect(Math.abs(decision.y - lesson.y)).toBeLessThanOrEqual(8);
    expect(Math.abs(decision.height - lesson.height)).toBeGreaterThan(2);
    await expect(page.locator('[data-section="rental-comparison"] [data-role="rental-live-cam"]')).toHaveCount(0);
    const lessonDescription = comparisonDesktop.locator('[data-role="lesson-note"] p');
    const lessonCta = comparisonDesktop.locator('[data-role="lesson-note"] a');
    const descriptionBox = await lessonDescription.boundingBox();
    const lessonCtaBox = await lessonCta.boundingBox();
    expect(lessonCtaBox.y - (descriptionBox.y + descriptionBox.height)).toBeGreaterThanOrEqual(35);
    expect(lessonCtaBox.y - (descriptionBox.y + descriptionBox.height)).toBeLessThanOrEqual(50);
    const pickup = page.locator('[data-section="rental-pickup"]');
    await pickup.scrollIntoViewIfNeeded();
    const liveCam = pickup.locator('[data-role="rental-live-cam"]');
    await liveCam.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(liveCam.locator("iframe")).toHaveCount(1, { timeout: 15_000 });
    await expect(liveCam.locator("iframe")).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview\?partner=epicsurf/);
    await expect.poll(() => liveCam.getAttribute("data-live-cam-state")).toBe("loaded");
    await expect(page.locator('[data-role="rental-pickup-live-cam"] [data-role="rental-live-cam"]')).toHaveCount(1);
    await expect(page.locator('[data-role="rental-live-cam"] iframe')).toHaveCount(1);
    const pickupBox = await pickup.boundingBox();
    expect(Math.abs(pickupBox.height - 461)).toBeLessThanOrEqual(1);
    const pickupPhoto = pickup.locator('[data-role="rental-pickup-photo"]');
    const pickupGradient = pickup.locator('[data-role="rental-pickup-gradient"]');
    await expect(pickupPhoto).toHaveCSS("object-position", "50% 24%");
    expect(await pickupGradient.evaluate((element) => getComputedStyle(element).backgroundImage)).toContain("linear-gradient(90deg");
    expect(await pickup.evaluate((element) => {
      const photo = element.querySelector('[data-role="rental-pickup-photo"]');
      const gradient = element.querySelector('[data-role="rental-pickup-gradient"]');
      const content = gradient.nextElementSibling;
      return photo.compareDocumentPosition(gradient) & Node.DOCUMENT_POSITION_FOLLOWING
        && gradient.compareDocumentPosition(content) & Node.DOCUMENT_POSITION_FOLLOWING
        && Number(getComputedStyle(gradient).zIndex) < Number(getComputedStyle(content).zIndex);
    })).toBeTruthy();
    const liveCamBox = await liveCam.boundingBox();
    expect(liveCamBox.x).toBeGreaterThanOrEqual(pickupBox.x);
    expect(liveCamBox.x + liveCamBox.width).toBeLessThanOrEqual(pickupBox.x + pickupBox.width + 1);
    expect(liveCamBox.y).toBeGreaterThanOrEqual(pickupBox.y);
    expect(liveCamBox.y + liveCamBox.height).toBeLessThanOrEqual(pickupBox.y + pickupBox.height + 1);
    const preview = await liveCam.locator('[data-role="rental-live-cam-media"]').boundingBox();
    expect(preview.width).toBeGreaterThan(0);
    expect(preview.height).toBeGreaterThan(0);
    expect(Math.abs((preview.width / preview.height) - (16 / 9))).toBeLessThanOrEqual(0.02);
    await expectContained(pickup, "a");

    await page.setViewportSize({ width: 390, height: 1200 });
    await expect(heroImage).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    const processMobile = page.locator('[data-role="rental-process-artboard"][data-breakpoint="mobile"]');
    await expect(processMobile).toBeVisible();
    await expect(processMobile).toHaveAttribute("data-canvas", "390x685");
    const processMobileSteps = processMobile.locator('[data-role="process-card"]');
    const firstMobile = await processMobileSteps.nth(0).boundingBox();
    const fourthMobile = await processMobileSteps.nth(3).boundingBox();
    expect(fourthMobile.y).toBeGreaterThan(firstMobile.y);
    for (let index = 0; index < await processMobileSteps.count(); index += 1) {
      await expectContained(processMobileSteps.nth(index), '[data-role="process-card-number"], [data-role="process-card-label"], [data-role="process-card-description"]');
    }
    const comparisonMobile = page.locator('[data-role="rental-comparison-artboard"][data-breakpoint="mobile"]');
    await expect(comparisonMobile).toBeVisible();
    await expect(comparisonMobile).toHaveAttribute("data-canvas", "390x828");
    const rentCardMobile = await comparisonMobile.locator('[data-role="rental-decision-zone"]').boundingBox();
    const lessonCardMobile = await comparisonMobile.locator('[data-role="lesson-note"]').boundingBox();
    expect(lessonCardMobile.y).toBeGreaterThan(rentCardMobile.y);
    await expectContained(comparisonMobile.locator('[data-role="rental-decision-zone"]'), "h3, li");
    await expectContained(comparisonMobile.locator('[data-role="lesson-note"]'), "h3, p, a");
    await expect(liveCam.locator("iframe")).toHaveCount(1);
    const mobilePreview = await liveCam.locator('[data-role="rental-live-cam-media"]').boundingBox();
    expect(Math.abs((mobilePreview.width / mobilePreview.height) - (16 / 9))).toBeLessThanOrEqual(0.02);
    expect(await pickup.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    const mobilePickupBox = await pickup.boundingBox();
    expect(Math.abs(mobilePickupBox.height - 828)).toBeLessThanOrEqual(1);
    await expect(pickupPhoto).toHaveCSS("object-position", "19% 50%");
    expect(await pickupGradient.evaluate((element) => getComputedStyle(element).backgroundImage)).toContain("linear-gradient(rgba");
    const textContainersFit = await page.locator([
      '[data-role="process-intro-copy"]',
      '[data-role="process-card-description"]',
      '[data-role="comparison-heading"]',
      '[data-role="comparison-criteria"]',
      '[data-role="comparison-lesson-copy"]',
      '[data-role="rental-pickup-heading"]',
      '[data-role="rental-pickup-description"]',
    ].join(",")).evaluateAll((elements) => elements.filter((element) => element.getClientRects().length > 0).every((element) => element.scrollWidth <= element.clientWidth + 1));
    expect(textContainersFit).toBe(true);

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await showroom.getByRole("button", { name: /open softboard orange front view/i }).click();
    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox.getByRole("img", { name: /softboard orange front enlarged view/i })).toBeVisible();
    await expect(lightbox.getByRole("button", { name: /close image gallery/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("keeps the pickup camera localized, reduced-motion safe, and usable after provider failure", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 430, height: 932 });
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?liveCamFallback=1", { waitUntil: "domcontentloaded" });
    const comparison = page.locator('[data-section="rental-comparison"]');
    const pickup = page.locator('[data-section="rental-pickup"]');
    await pickup.scrollIntoViewIfNeeded();
    await expect(comparison.locator('[data-role="rental-live-cam"]')).toHaveCount(0);
    const liveCam = pickup.locator('[data-role="rental-live-cam"]');
    await expect(liveCam).toHaveAttribute("data-live-cam-state", "fallback");
    await expect(liveCam.locator("iframe")).toHaveCount(0);
    await expect(liveCam.getByText("My Khe Live Cam", { exact: true })).toBeVisible();
    await expect(liveCam.getByRole("link", { name: /открыть камеру/i })).toHaveAttribute("href", /utm_source=surfdanang&utm_medium=referral&utm_campaign=live_cam_block/);
    await expect(comparison.getByRole("link", { name: /смотреть уроки/i })).toHaveAttribute("href", "/ru#lessons");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await page.setViewportSize({ width: 390, height: 932 });
    const comparisonHeading = comparison.locator('[data-role="rental-comparison-artboard"][data-breakpoint="mobile"] [data-role="comparison-heading"]');
    expect(await comparisonHeading.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  });

  test("contains localized rental typography at RU mobile and desktop breakpoints", async ({ page }) => {
    for (const width of [390, 430, 1440]) {
      await page.setViewportSize({ width, height: width < 768 ? 932 : 1000 });
      await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
      const breakpoint = width < 768 ? "mobile" : "desktop";
      const process = page.locator(`[data-role="rental-process-artboard"][data-breakpoint="${breakpoint}"]`);
      const comparison = page.locator(`[data-role="rental-comparison-artboard"][data-breakpoint="${breakpoint}"]`);
      await expect(process).toBeVisible();
      await expect(comparison).toBeVisible();
      for (let index = 0; index < 4; index += 1) {
        await expectContained(process.locator('[data-role="process-card"]').nth(index), '[data-role="process-card-number"], [data-role="process-card-label"], [data-role="process-card-description"]');
      }
      await expectContained(comparison.locator('[data-role="rental-decision-zone"]'), "h3, li");
      await expectContained(comparison.locator('[data-role="lesson-note"]'), "h3, p, a");
      const textFits = await page.locator([
        `[data-role="rental-process-artboard"][data-breakpoint="${breakpoint}"] [data-role="process-intro-copy"]`,
        `[data-role="rental-comparison-artboard"][data-breakpoint="${breakpoint}"] [data-role="comparison-heading"]`,
        `[data-role="rental-comparison-artboard"][data-breakpoint="${breakpoint}"] [data-role="comparison-criteria"]`,
        `[data-role="rental-comparison-artboard"][data-breakpoint="${breakpoint}"] [data-role="comparison-lesson-copy"]`,
        '[data-role="rental-pickup-heading"]',
        '[data-role="rental-pickup-description"]',
        '[data-role="rental-live-cam-meta"] a',
      ].join(",")).evaluateAll((elements) => elements.every((element) => element.scrollWidth <= element.clientWidth + 1));
      expect(textFits).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    }
  });

  test("keeps the showroom cleanup functional and restrained", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.getByRole("button", { name: /open softboard orange front view/i }).locator('[data-image-slot="front"][src*="/front.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open softboard orange fins view/i }).locator('[data-image-slot="fins"]')).toHaveClass(/object-bottom/);
    await expect(showroom.getByRole("button", { name: /open softboard orange back/i })).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open softboard orange fins/i })).toBeVisible();
    await expect(showroom.getByText("Selected board", { exact: true })).toHaveCount(0);
    await expect(showroom.getByRole("link", { name: /view all boards/i })).toHaveCount(0);
    await expect(showroom.getByText("Other boards", { exact: true })).toHaveCount(0);
    await expect(showroom.getByRole("link", { name: /^whatsapp$/i })).toBeVisible();
    await expect(showroom.getByText(/250\.000\s*VND/i)).toBeVisible();
    await expect(showroom.getByText("FROM", { exact: true })).toHaveCount(0);

    const specs = showroom.locator('[data-section="rental-board-specs"]');
    await expect(specs.getByText("Length", { exact: true })).toBeVisible();
    await expect(specs.getByText("8'0 / 9'0", { exact: true })).toBeVisible();
    await expect(specs.getByText("Type", { exact: true })).toBeVisible();
    await expect(specs.getByText("Level", { exact: true })).toBeVisible();
    await expect(specs.getByText("Conditions", { exact: true })).toHaveCount(0);
    await expect(specs.getByText("Includes", { exact: true })).toHaveCount(0);
    await expect(specs.locator('[data-role="rental-spec-row"]')).toHaveCount(3);
    await expect.poll(() => specs.locator('[data-role="rental-spec-row"]').first().evaluate((element) => getComputedStyle(element).borderTopWidth)).toBe("2px");

    const strip = showroom.locator('[data-section="rental-board-strip"]');
    await expect(strip.getByText("Softboard Orange", { exact: true })).toHaveCount(0);
    await expect(strip.getByRole("button", { name: /show softboard orange/i })).toBeVisible();

    await expect(page.locator('[data-role="rental-process-artboard"]')).toHaveCount(2);
    await expect(page.locator('[data-role="rental-process-artboard"] [data-role="process-card"]')).toHaveCount(8);
    await expect(page.locator('[data-role="rental-comparison-artboard"]')).toHaveCount(2);
    await expect(page.locator('[data-role="rental-comparison-artboard"] article')).toHaveCount(4);
    await expect(page.locator('[data-section="rental-pickup"]')).toBeVisible();
  });

  test("uses stable responsive hero crops without duplicate benefit items", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const hero = page.locator('[data-section="rental-design-hero"]');
    await expect(hero.locator('[data-role="rental-hero-base"][src*="/rentals/hero/rental-hero-color.jpg"]')).toBeVisible();
    await expect(hero.locator('[data-role="rental-hero-color-overlay"][src*="/rentals/hero/rental-hero-board-color-01.webp"]')).toBeVisible();
    await expect(hero.locator('img[src*="/rentals/page/rental-hero-boards-bw.jpg"]')).toHaveCount(0);
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-desktop.webp"]')).toHaveCount(0);
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-mobile.webp"]')).toHaveCount(0);
    await expect(hero.getByText("Quality boards", { exact: true })).toHaveCount(0);
    await expect(hero.getByText("Local knowledge", { exact: true })).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(hero.locator('[data-role="rental-hero-base"][src*="/rentals/hero/rental-hero-color.jpg"]')).toBeVisible();
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-mobile.webp"]')).toHaveCount(0);
  });

  test("scrolls and recenters the other boards strip", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const strip = page.locator('[data-section="rental-board-strip"]');
    await expect(strip.locator('[data-carousel-frame="/rentals/page/rental-carousel-thumb-frame-01.svg"]').first()).toBeVisible();
    await expect(strip.locator('[data-carousel-frame="/rentals/page/rental-carousel-thumb-frame-06.svg"]').first()).toBeVisible();
    await expect(page.getByRole("button", { name: /scroll boards left/i }).locator('img[src*="/rentals/page/rental-carousel-arrow-left.svg"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /scroll boards right/i }).locator('img[src*="/rentals/page/rental-carousel-arrow-right.svg"]')).toBeVisible();
    const leftArrowBox = await page.getByRole("button", { name: /scroll boards left/i }).boundingBox();
    const rightArrowBox = await page.getByRole("button", { name: /scroll boards right/i }).boundingBox();
    const initialStripBox = await strip.boundingBox();
    expect(leftArrowBox.x + leftArrowBox.width).toBeLessThanOrEqual(initialStripBox.x);
    expect(rightArrowBox.x).toBeGreaterThanOrEqual(initialStripBox.x + initialStripBox.width);

    const visibleThumbnailCount = await strip.evaluate((element) => {
      const stripBox = element.getBoundingClientRect();
      return [...element.querySelectorAll('[data-carousel-window="thumbnail"]')].filter((item) => {
        const box = item.getBoundingClientRect();
        return box.left >= stripBox.left - 1 && box.right <= stripBox.right + 1;
      }).length;
    });
    expect(visibleThumbnailCount).toBeGreaterThanOrEqual(5);

    const startScroll = await strip.evaluate((element) => element.scrollLeft);
    await page.getByRole("button", { name: /scroll boards right/i }).click();
    await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).toBeGreaterThan(startScroll);

    await strip.getByRole("button", { name: /show resistance longboard leopard/i }).click();
    const stripBox = await strip.boundingBox();
    const activeBox = await strip.getByRole("button", { name: /show resistance longboard leopard/i }).boundingBox();
    expect(activeBox.x).toBeGreaterThanOrEqual(stripBox.x - 1);
    expect(activeBox.x + activeBox.width).toBeLessThanOrEqual(stripBox.x + stripBox.width + 1);

    await strip.scrollIntoViewIfNeeded();
    const visibleStripBox = await strip.boundingBox();
    const beforeDrag = await strip.evaluate((element) => element.scrollLeft);
    const maxScroll = await strip.evaluate((element) => element.scrollWidth - element.clientWidth);
    const [startRatio, endRatio] = beforeDrag >= maxScroll - 2 ? [0.3, 0.7] : [0.7, 0.3];
    await page.mouse.move(visibleStripBox.x + visibleStripBox.width * startRatio, visibleStripBox.y + 30);
    await page.mouse.down();
    await page.mouse.move(visibleStripBox.x + visibleStripBox.width * endRatio, visibleStripBox.y + 30, { steps: 5 });
    await page.mouse.up();
    await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).not.toBe(beforeDrag);
  });

  test("uses rental-scoped footer polish without duplicate guide links", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const footer = page.locator("footer");
    await expect(footer.locator('img[src*="/rentals/page/rental-footer-map-frame.svg"]')).toBeVisible();
    await expect(footer.locator('[data-role="footer-map-link"]')).toBeVisible();
    await expect(footer.locator('[data-role="footer-map-link"]')).toHaveAttribute("href", /google/i);
    await expect(footer.getByText("Surf Info", { exact: true })).toHaveCount(0);
    await expect(footer.locator('a[aria-label="Surf Info: Surf Lessons"]')).toHaveCount(0);
  });

  test("scrolls mobile thumbnail selection back to the main board image", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const strip = page.locator('[data-section="rental-board-strip"]');
    await strip.scrollIntoViewIfNeeded();
    const lukeThumbnail = strip.getByRole("button", { name: /show luke studer shortboard/i });
    await lukeThumbnail.scrollIntoViewIfNeeded();
    await lukeThumbnail.click();

    const mainImageButton = page.getByRole("button", { name: /open luke studer shortboard front view/i });
    await expect(mainImageButton).toBeVisible();
    await expect.poll(async () => (await mainImageButton.boundingBox()).y).toBeGreaterThanOrEqual(20);
    await expect.poll(async () => (await mainImageButton.boundingBox()).y).toBeLessThanOrEqual(96);

    const stripBox = await strip.boundingBox();
    const activeBox = await strip.getByRole("button", { name: /show luke studer shortboard/i }).boundingBox();
    expect(activeBox.x).toBeGreaterThanOrEqual(stripBox.x - 1);
    expect(activeBox.x + activeBox.width).toBeLessThanOrEqual(stripBox.x + stripBox.width + 1);
  });

  test("shares draft image adjustments across EN and RU production pages", async ({ page }) => {
    await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: "http://localhost:3000" });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => window.localStorage.removeItem("epic_rental_image_adjustments_draft"));
    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);

    await page.goto("http://localhost:3000/surfboard-rental-danang?edit=1", { waitUntil: "domcontentloaded" });
    const tuner = page.locator('[data-section="rental-image-tuner"]');
    await expect(tuner).toBeVisible();

    const scale = tuner.getByLabel("Scale");
    await expect(scale).toHaveAttribute("min", "0.5");
    await expect(scale).toHaveAttribute("max", "4");
    await expect(scale).toHaveAttribute("step", "0.05");
    await scale.fill("4");
    await tuner.getByRole("button", { name: "Rotate 90 degrees" }).click();
    await expect(tuner.getByRole("button", { name: "Rotate 90 degrees" })).toHaveAttribute("aria-pressed", "true");

    const frontImage = page.locator('[data-image-slot="front"]').first();
    await expect.poll(() => frontImage.getAttribute("style")).toContain("scale(4) rotate(90deg)");
    await expect.poll(() => page.evaluate(() => window.localStorage.getItem("epic_rental_image_adjustments_draft"))).toContain('"scale":4');

    await tuner.getByRole("button", { name: /copy config/i }).click();
    await expect(tuner.getByRole("button", { name: /copied/i })).toBeVisible();
    const copiedConfig = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
    expect(copiedConfig["board-01"].front).toEqual({ scale: 4, x: 0, y: 0, rotate: 90 });

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    await expect.poll(() => page.locator('[data-image-slot="front"]').first().getAttribute("style")).toContain("scale(4) rotate(90deg)");

    await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    await expect.poll(() => page.locator('[data-image-slot="front"]').first().getAttribute("style")).toContain("scale(4) rotate(90deg)");

    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?edit=1", { waitUntil: "domcontentloaded" });
    const ruTuner = page.locator('[data-section="rental-image-tuner"]');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(ruTuner).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await ruTuner.getByRole("button", { name: /^back$/i }).click();
    await ruTuner.getByLabel("Scale").fill("2");
    await ruTuner.getByRole("button", { name: "Rotate 270 degrees" }).click();
    await expect.poll(() => page.locator('[data-image-slot="back"]').first().getAttribute("style")).toContain("scale(2) rotate(270deg)");

    await ruTuner.getByRole("button", { name: /^front$/i }).click();
    await ruTuner.getByRole("button", { name: /reset current/i }).click();
    await expect.poll(() => page.locator('[data-image-slot="front"]').first().getAttribute("style")).toContain("scale(1) rotate(0deg)");
    await ruTuner.getByRole("button", { name: /^back$/i }).click();
    await expect.poll(() => page.locator('[data-image-slot="back"]').first().getAttribute("style")).toContain("scale(2) rotate(270deg)");

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect.poll(() => page.locator('[data-image-slot="front"]').first().getAttribute("style")).toContain("scale(1) rotate(0deg)");
    await expect.poll(() => page.locator('[data-image-slot="back"]').first().getAttribute("style")).toContain("scale(2) rotate(270deg)");
    await page.evaluate(() => window.localStorage.removeItem("epic_rental_image_adjustments_draft"));
  });

  test("renders the Russian production page from existing localized rental content", async ({ page }) => {
    const duplicateKeyWarnings = [];
    page.on("console", (message) => {
      if (/same key|unique keys/i.test(message.text())) duplicateKeyWarnings.push(message.text());
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle("Аренда досок для серфинга в Дананге | Epic Surf School");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.surfdanang.com/ru/surfboard-rental-danang");
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://www.surfdanang.com/surfboard-rental-danang");
    const hero = page.locator('[data-section="rental-design-hero"]');
    await expect(hero.locator('[data-role="rental-hero-base"][src*="/rentals/hero/rental-hero-color.jpg"]')).toBeVisible();
    await expect(hero.locator('[data-role="rental-hero-color-overlay"]')).toHaveCount(7);
    await expect(hero.locator("h1")).toHaveText("Аренда досок для серфинга в Дананге");
    await expect(hero.locator("h1")).toHaveClass(/sr-only/);
    await expect(hero.locator('[data-hero-title-primary]')).toHaveCount(0);
    await expect(hero.locator('[data-hero-title-secondary]')).toHaveCount(0);
    await expect(hero.getByText(/Возьмите доску для серфинга рядом с пляжем Май Кхе/i)).toHaveCount(0);

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.getByText("Другие доски", { exact: true })).toHaveCount(0);
    await expect(showroom.getByText("Мягкая и устойчивая доска для начинающих", { exact: false })).toBeVisible();
    await expect(showroom.getByText("СОФТБОРД", { exact: true })).toBeVisible();
    await expect(showroom.locator('[data-image-slot="front"][src*="/front.webp"]').first()).toBeVisible();
    await expect(showroom.getByRole("button", { name: /show softboard orange back image/i })).toBeVisible();
    await expect(showroom.getByRole("button", { name: /show softboard orange fins image/i })).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await expect(faq.getByRole("heading", { name: "Вопросы" })).toBeVisible();
    await faq.getByText("Сколько стоит аренда доски в Дананге?").click();
    await expect(faq.getByText(/250,000 VND за 2 часа/i)).toBeVisible();

    await showroom.getByRole("button", { name: /show softboard orange fins image/i }).click();
    await showroom.getByRole("button", { name: /open softboard orange fins view/i }).click();
    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox.getByRole("img", { name: /softboard orange fins enlarged view/i })).toHaveAttribute("src", /\/fins-full\.webp$/);
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();

    const finalCta = page.locator('[data-section="rental-final-cta"]');
    await expect(finalCta.getByRole("link", { name: /^whatsapp$/i })).toHaveAttribute("href", "https://wa.me/84383880164");

    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?edit=1", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-section="rental-image-tuner"]')).toBeVisible();
    expect(duplicateKeyWarnings).toEqual([]);
  });

  test("removes the former design-test routes", async ({ request }) => {
    for (const path of [
      "/surfboard-rental-danang/design-test",
      "/ru/surfboard-rental-danang/design-test",
    ]) {
      const response = await request.get(`http://localhost:3000${path}`);
      expect(response.status()).toBe(404);
    }
  });
});
