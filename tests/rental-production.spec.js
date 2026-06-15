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
    await expect(page.getByRole("heading", { name: /surfboard rental in da nang/i })).toBeVisible();
    await expect(page.locator('[data-hero-title-primary]')).toHaveText("Surfboard rental");
    await expect(page.locator('[data-hero-title-secondary]')).toHaveText("in Da Nang");

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
    await expect(showroom.getByText(/Soft and stable beginner-friendly board/i)).toBeVisible();
    await showroom.getByRole("button", { name: /show luke studer shortboard/i }).click();
    await expect(showroom.getByRole("heading", { name: /luke studer shortboard/i })).toBeVisible();
    await expect(showroom.getByText(/Built for speed, sharp turns/i)).toBeVisible();
    await expect(showroom.locator('img[src*="/rentals/boards/processed/board-09/main.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="nose"][src*="/rentals/boards/processed/board-09/back-nose.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="tail"][src*="/rentals/boards/processed/board-09/back-middle.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="fins"][src*="/rentals/boards/processed/board-09/back-tail-fins.webp"]')).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await faq.getByText("How much is surfboard rental in Da Nang?").click();
    await expect(faq.getByText(/250,000 VND for 2 hours/i)).toBeVisible();
  });

  test("does not create horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1200 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('[data-section="rental-board-showroom"] img[src*="/rentals/boards/processed/board-01/main.webp"]')).toBeVisible();
  });

  test("opens and navigates the board image lightbox", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await showroom.getByRole("button", { name: /open softboard orange main view/i }).click();

    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox).toBeVisible();
    await expect(lightbox.getByRole("img", { name: /softboard orange main enlarged view/i })).toBeVisible();

    await lightbox.getByRole("button", { name: /show nose/i }).click();
    const noseImage = lightbox.getByRole("img", { name: /softboard orange nose enlarged view/i });
    await expect(noseImage).toBeVisible();
    await expect(noseImage).toHaveAttribute("src", /\/rentals\/boards\/processed\/board-01\/back-nose\.webp$/);

    await lightbox.getByRole("button", { name: /next image/i }).click();
    const tailImage = lightbox.getByRole("img", { name: /softboard orange tail enlarged view/i });
    await expect(tailImage).toBeVisible();
    await expect(tailImage).toHaveAttribute("src", /\/rentals\/boards\/processed\/board-01\/back-middle\.webp$/);

    await lightbox.getByRole("button", { name: /show fins/i }).click();
    const finsImage = lightbox.getByRole("img", { name: /softboard orange fins enlarged view/i });
    await expect(finsImage).toBeVisible();
    await expect(finsImage).toHaveAttribute("src", /\/rentals\/boards\/processed\/board-01\/back-tail-fins\.webp$/);

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

    const logo = page.locator('[data-section="rental-design-hero"] img[alt="EPIC Surf School"]');
    expect((await logo.boundingBox()).width).toBeGreaterThanOrEqual(92);
    expect((await logo.boundingBox()).width).toBeLessThanOrEqual(110);
    await expect(page.getByText(/surf rental/i)).toBeVisible();

    const cards = page.locator('[data-section="rental-info-cards"] article');
    const first = await cards.nth(0).boundingBox();
    const fourth = await cards.nth(3).boundingBox();
    expect(Math.abs(first.x - fourth.x)).toBeLessThanOrEqual(2);
    expect(fourth.y).toBeGreaterThan(first.y);

    const rentButton = page.getByRole("button", { name: /rent this board/i });
    const whatsappButton = page.locator('[data-section="rental-board-showroom"]').getByRole("link", { name: /^whatsapp$/i });
    expect(Math.abs((await rentButton.boundingBox()).height - (await whatsappButton.boundingBox()).height)).toBeLessThanOrEqual(1);

    await page.setViewportSize({ width: 390, height: 1200 });
    await expect.poll(async () => (await logo.boundingBox()).width).toBeLessThanOrEqual(88);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await showroom.getByRole("button", { name: /open softboard orange nose/i }).click();
    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox.getByRole("img", { name: /softboard orange nose enlarged view/i })).toBeVisible();
    await expect(lightbox.getByRole("button", { name: /close image gallery/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });

  test("keeps the showroom cleanup functional and restrained", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.locator('[data-image-slot="nose"][src*="/back-nose.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="tail"][src*="/back-middle.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="fins"][src*="/back-tail-fins.webp"]')).toBeVisible();
    await expect(showroom.getByText("Selected board", { exact: true })).toHaveCount(0);
    await expect(showroom.getByRole("link", { name: /view all boards/i })).toHaveCount(0);
    await expect(showroom.getByText("Other boards", { exact: true })).toBeVisible();
    await expect(showroom.getByRole("link", { name: /^whatsapp$/i })).toBeVisible();

    const specs = showroom.locator('[data-section="rental-board-specs"]');
    await expect(specs.getByText("Length", { exact: true })).toBeVisible();
    await expect(specs.getByText("8'0 / 9'0", { exact: true })).toBeVisible();
    await expect(specs.getByText("Conditions", { exact: true })).toBeVisible();
    await expect(specs.getByText("Small, Medium", { exact: true })).toBeVisible();

    const iconBadge = page.locator('[data-section="rental-info-cards"] [data-role="info-icon-badge"]').first();
    await expect(iconBadge).toBeVisible();
  });

  test("uses stable responsive hero crops without duplicate benefit items", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const hero = page.locator('[data-section="rental-design-hero"]');
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-desktop.webp"]')).toBeVisible();
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-mobile.webp"]')).toBeHidden();
    await expect(hero.getByText("Quality boards", { exact: true })).toHaveCount(0);
    await expect(hero.getByText("Local knowledge", { exact: true })).toHaveCount(0);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-mobile.webp"]')).toBeVisible();
    await expect(hero.locator('img[src*="/rentals/hero/rental-hero-desktop.webp"]')).toBeHidden();
  });

  test("scrolls and recenters the other boards strip", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const strip = page.locator('[data-section="rental-board-strip"]');
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
    await page.mouse.move(visibleStripBox.x + visibleStripBox.width * 0.3, visibleStripBox.y + 30);
    await page.mouse.down();
    await page.mouse.move(visibleStripBox.x + visibleStripBox.width * 0.7, visibleStripBox.y + 30, { steps: 5 });
    await page.mouse.up();
    await expect.poll(() => strip.evaluate((element) => element.scrollLeft)).not.toBe(beforeDrag);
  });

  test("scrolls mobile thumbnail selection back to the main board image", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });

    const strip = page.locator('[data-section="rental-board-strip"]');
    await strip.scrollIntoViewIfNeeded();
    await strip.getByRole("button", { name: /show luke studer shortboard/i }).click();

    const mainImageButton = page.getByRole("button", { name: /open luke studer shortboard main view/i });
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

    const mainImage = page.locator('[data-image-slot="main"]');
    await expect.poll(() => mainImage.getAttribute("style")).toContain("scale(4) rotate(90deg)");
    await expect.poll(() => page.evaluate(() => window.localStorage.getItem("epic_rental_image_adjustments_draft"))).toContain('"scale":4');

    await tuner.getByRole("button", { name: /copy config/i }).click();
    await expect(tuner.getByRole("button", { name: /copied/i })).toBeVisible();
    const copiedConfig = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
    expect(copiedConfig["board-01"].main).toEqual({ scale: 4, x: 0, y: 0, rotate: 90 });

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    await expect.poll(() => page.locator('[data-image-slot="main"]').getAttribute("style")).toContain("scale(4) rotate(90deg)");

    await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    await expect.poll(() => page.locator('[data-image-slot="main"]').getAttribute("style")).toContain("scale(4) rotate(90deg)");

    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?edit=1", { waitUntil: "domcontentloaded" });
    const ruTuner = page.locator('[data-section="rental-image-tuner"]');
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(ruTuner).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await ruTuner.getByRole("button", { name: /^nose$/i }).click();
    await ruTuner.getByLabel("Scale").fill("2");
    await ruTuner.getByRole("button", { name: "Rotate 270 degrees" }).click();
    await expect.poll(() => page.locator('[data-image-slot="nose"]').getAttribute("style")).toContain("scale(2) rotate(270deg)");

    await ruTuner.getByRole("button", { name: /^main$/i }).click();
    await ruTuner.getByRole("button", { name: /reset current/i }).click();
    await expect.poll(() => page.locator('[data-image-slot="main"]').getAttribute("style")).toContain("scale(1) rotate(0deg)");
    await ruTuner.getByRole("button", { name: /^nose$/i }).click();
    await expect.poll(() => page.locator('[data-image-slot="nose"]').getAttribute("style")).toContain("scale(2) rotate(270deg)");

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await expect.poll(() => page.locator('[data-image-slot="main"]').getAttribute("style")).toContain("scale(1) rotate(0deg)");
    await expect.poll(() => page.locator('[data-image-slot="nose"]').getAttribute("style")).toContain("scale(2) rotate(270deg)");
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
    await expect(page.getByRole("heading", { name: "Аренда досок для серфинга в Дананге" })).toBeVisible();
    await expect(page.locator('[data-hero-title-primary]')).toHaveText("Аренда досок");
    await expect(page.locator('[data-hero-title-secondary]')).toHaveText("для серфинга в Дананге");
    await expect(page.getByText(/Возьмите доску для серфинга рядом с пляжем Май Кхе/i)).toBeVisible();

    const showroom = page.locator('[data-section="rental-board-showroom"]');
    await expect(showroom.getByText("Другие доски", { exact: true })).toBeVisible();
    await expect(showroom.getByText("Мягкая и устойчивая доска для начинающих", { exact: false })).toBeVisible();
    await expect(showroom.getByText("СОФТБОРД", { exact: true })).toBeVisible();
    await expect(showroom.locator('[data-image-slot="nose"][src*="/back-nose.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="tail"][src*="/back-middle.webp"]')).toBeVisible();
    await expect(showroom.locator('[data-image-slot="fins"][src*="/back-tail-fins.webp"]')).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await expect(faq.getByRole("heading", { name: "Вопросы" })).toBeVisible();
    await faq.getByText("Сколько стоит аренда доски в Дананге?").click();
    await expect(faq.getByText(/250,000 VND за 2 часа/i)).toBeVisible();

    await showroom.getByRole("button", { name: /open softboard orange fins/i }).click();
    const lightbox = page.getByRole("dialog", { name: /board image gallery/i });
    await expect(lightbox.getByRole("img", { name: /softboard orange fins enlarged view/i })).toHaveAttribute("src", /\/back-tail-fins\.webp$/);
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
