const { test, expect } = require("@playwright/test");

test.describe("Rental design test page", () => {
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

    await page.goto("http://localhost:3000/surfboard-rental-danang/design-test", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    expect(hydrationMessages).toEqual([]);
    await expect(page.getByRole("link", { name: /^whatsapp$/i })).toHaveAttribute("href", "https://wa.me/84383880164");
  });

  test("renders the reference-first rental design page with noindex metadata", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang/design-test", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    await expect(page).toHaveTitle("Rental Design Test | Epic Surf School");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/i);
    await expect(page.getByRole("heading", { name: /surfboard rental in da nang/i })).toBeVisible();

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
    await expect(showroom.locator('img[src*="/rentals/boards/processed/board-09/nose.webp"]')).toBeVisible();
    await expect(showroom.locator('img[src*="/rentals/boards/processed/board-09/tail.webp"]')).toBeVisible();
    await expect(showroom.locator('img[src*="/rentals/boards/processed/board-09/fins.webp"]')).toBeVisible();

    const faq = page.locator('[data-section="rental-faq"]');
    await faq.getByText("How much is surfboard rental in Da Nang?").click();
    await expect(faq.getByText(/250,000 VND for 2 hours/i)).toBeVisible();
  });

  test("does not create horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 1200 });
    await page.goto("http://localhost:3000/surfboard-rental-danang/design-test", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    await expect(page.locator('[data-section="rental-board-showroom"] img[src*="/rentals/boards/processed/board-01/main.webp"]')).toBeVisible();
  });
});
