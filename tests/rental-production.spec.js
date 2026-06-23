const { test, expect } = require("@playwright/test");

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
    await expect(hero.locator('[data-role="rental-hero-image"][src*="/rentals/page/rental-hero-boards-bw.jpg"]')).toBeVisible();
    await expect(hero.locator('[data-role="rental-hero-image"]')).toHaveClass(/grayscale/);
    await expect(hero.locator("h1")).toHaveClass(/sr-only/);
    await expect(hero.locator('[data-hero-title-primary]')).toHaveCount(0);
    await expect(hero.locator('[data-hero-title-secondary]')).toHaveCount(0);
    await expect(hero.getByRole("button")).toHaveCount(0);
    await expect(hero.getByRole("link")).toHaveCount(0);
    await expect(hero.getByText(/Rent a surfboard/i)).toHaveCount(0);

    for (const section of [
      "rental-design-hero",
      "rental-board-showroom",
      "rental-info-cards",
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
    await expect(showroom.getByText(/Built for speed, sharp turns/i)).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard front view/i }).locator('[data-image-slot="front"][src*="/rentals/boards/processed/board-09/front.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard back view/i }).locator('[data-image-slot="back"][src*="/rentals/boards/processed/board-09/back.webp"]')).toBeVisible();
    await expect(showroom.getByRole("button", { name: /open luke studer shortboard fins view/i }).locator('[data-image-slot="fins"][src*="/rentals/boards/processed/board-09/fins.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-main.svg"]')).toBeVisible();
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-detail-top.svg"]')).toBeVisible();
    await expect(showroom.locator('[data-gallery-frame="/rentals/page/rental-gallery-frame-detail-bottom.svg"]')).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await faq.getByText("How much is surfboard rental in Da Nang?").click();
    await expect(faq.getByText(/250,000 VND for 2 hours/i)).toBeVisible();

    const decorativeFrames = [
      "/rentals/page/rental-gallery-frame-main.svg",
      "/rentals/page/rental-carousel-thumb-frame-01.svg",
      "/rentals/page/rental-info-frame-price.svg",
      "/rentals/page/rental-surf-info-frame-lessons.svg",
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

    const hero = page.locator('[data-section="rental-design-hero"]');
    const heroImage = hero.locator('[data-role="rental-hero-image"]');
    await expect(heroImage).toBeVisible();
    await expect(heroImage).toHaveClass(/grayscale/);
    expect((await hero.boundingBox()).height).toBeGreaterThanOrEqual(650);
    await expect(hero.locator("h1")).toHaveClass(/sr-only/);
    await expect(hero.getByText(/surf rental/i)).toHaveCount(0);

    const cards = page.locator('[data-section="rental-info-cards"] article');
    const first = await cards.nth(0).boundingBox();
    const fourth = await cards.nth(3).boundingBox();
    expect(Math.abs(first.x - fourth.x)).toBeLessThanOrEqual(2);
    expect(fourth.y).toBeGreaterThan(first.y);
    expect(first.height).toBeLessThanOrEqual(210);

    const iconBadge = cards.nth(0).locator('[data-role="info-icon-badge"]');
    const iconBox = await iconBadge.boundingBox();
    expect(Math.abs((iconBox.y + iconBox.height / 2) - first.y)).toBeLessThanOrEqual(14);

    const rentButton = page.getByRole("button", { name: /rent this board/i });
    const whatsappButton = page.locator('[data-section="rental-board-showroom"]').getByRole("link", { name: /^whatsapp$/i });
    expect(Math.abs((await rentButton.boundingBox()).height - (await whatsappButton.boundingBox()).height)).toBeLessThanOrEqual(1);

    await page.setViewportSize({ width: 390, height: 1200 });
    await expect(heroImage).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await showroom.getByRole("button", { name: /open softboard orange front view/i }).click();
    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox.getByRole("img", { name: /softboard orange front enlarged view/i })).toBeVisible();
    await expect(lightbox.getByRole("button", { name: /close image gallery/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("keeps the showroom cleanup functional and restrained", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.getByRole("button", { name: /open softboard orange front view/i }).locator('[data-image-slot="front"][src*="/front.webp"]')).toBeVisible();
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

    await expect(page.locator('[data-section="rental-info-cards"] [data-role="info-icon-badge"]').first()).toBeVisible();
  });

  test("uses stable responsive hero crops without duplicate benefit items", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const hero = page.locator('[data-section="rental-design-hero"]');
    await expect(hero.locator('img[src*="/rentals/page/rental-hero-boards-bw.jpg"]')).toBeVisible();
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-desktop.webp"]')).toHaveCount(0);
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-mobile.webp"]')).toHaveCount(0);
    await expect(hero.getByText("Quality boards", { exact: true })).toHaveCount(0);
    await expect(hero.getByText("Local knowledge", { exact: true })).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(hero.locator('img[src*="/rentals/page/rental-hero-boards-bw.jpg"]')).toBeVisible();
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
    expect(visibleThumbnailCount).toBe(6);

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
    await expect(hero.locator('[data-role="rental-hero-image"][src*="/rentals/page/rental-hero-boards-bw.jpg"]')).toBeVisible();
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
