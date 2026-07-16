const { test, expect } = require("@playwright/test");

const homepages = [
  {
    path: "/",
    catalogHref: "/surfboard-rental-danang",
    catalogLabel: /view all boards/i,
    rentLabel: /rent now/i,
  },
  {
    path: "/ru",
    catalogHref: "/ru/surfboard-rental-danang",
  },
];

test.describe("Homepage rental mini showroom", () => {
  for (const locale of homepages) {
    test(`uses the three-angle board-02 editorial gallery on ${locale.path}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`http://localhost:3000${locale.path}`, { waitUntil: "domcontentloaded" });

      const rentals = page.locator("#rentals");
      const showroom = rentals.locator("#rental-mini-showroom");
      await expect(showroom).toHaveAttribute("data-mini-showroom-variant", "homepage-editorial-grid");
      await expect(showroom).toHaveAttribute("data-board-id", "board-02");
      for (const [slot, filename] of [
        ["front", "front.webp"],
        ["back", "back.webp"],
        ["fins", "fins.webp"],
      ]) {
        const src = await showroom.locator(`[data-mini-image-slot="${slot}"]`).getAttribute("src");
        expect(decodeURIComponent(src)).toContain(`/rentals/boards/processed/board-02/${filename}`);
      }
      await expect(showroom.locator("[data-mini-image-slot]")).toHaveCount(3);
      await expect(showroom.locator('[data-mini-image-slot="tail-fins"]')).toHaveCount(0);

      await expect(rentals.locator(`a[href="${locale.catalogHref}"]`)).toBeVisible();
      if (locale.catalogLabel) {
        await expect(rentals.getByRole("link", { name: locale.catalogLabel })).toHaveAttribute("href", locale.catalogHref);
      }
      if (locale.rentLabel) {
        await expect(rentals.getByRole("button", { name: locale.rentLabel })).toBeVisible();
      }
      await expect(showroom.getByText("Softboard Pink", { exact: true })).toBeVisible();
      await expect(showroom.getByText("7'0 / 8'0 / 8'5 / 8'6 / 9'0", { exact: true })).toBeVisible();
      await expect(rentals.locator("[data-rental-price]")).toContainText(/250(?:,|\u00a0)000 VND/);
      await expect(rentals.locator(":scope > div > div").nth(1).locator(".bg-epicMint")).toHaveCount(0);
      await expect(showroom.locator(".pointer-events-none.absolute.right-4.top-4.bg-epicRed")).toHaveCount(0);
      await expect(page.locator('[data-section="rental-image-tuner"]')).toHaveCount(0);
    });
  }

  test("stays compact without horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

    const showroom = page.locator("#rental-mini-showroom");
    const box = await showroom.boundingBox();
    expect(box.height).toBeLessThanOrEqual(360);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });

  test("uses strict gallery corners and a hard-offset frame", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });

    const radii = await page.locator("#rental-mini-showroom").evaluate((showroom) => {
      const read = (slot) => {
        const style = getComputedStyle(showroom.querySelector(`[data-mini-cell="${slot}"]`));
        return [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius];
      };
      const frame = getComputedStyle(showroom.children[0]);
      return { front: read("front"), back: read("back"), fins: read("fins"), frameRadius: frame.borderTopLeftRadius, shadow: frame.boxShadow };
    });

    expect(radii.frameRadius).not.toBe("0px");
    expect(radii.back[0]).toBe("0px");
    expect(radii.fins[2]).not.toBe("0px");
    expect(radii.shadow).not.toBe("none");
  });

  test("keeps the existing rental modal and partner-aware messenger flow", async ({ page }) => {
    await page.goto("http://localhost:3000/?partner=hotel_abc", { waitUntil: "domcontentloaded" });
    await page.locator("#rentals").getByRole("button", { name: /rent now/i }).click();

    await expect(page.getByRole("heading", { name: /book your rental/i })).toBeVisible();
    await expect(page.getByText(/choose your preferred messenger/i)).toBeVisible();

    const whatsapp = page.getByRole("link", { name: "WhatsApp", exact: true });
    await expect(whatsapp).toBeVisible();
    await whatsapp.evaluate((element) => element.click());
    await expect.poll(async () => decodeURIComponent(await whatsapp.getAttribute("href"))).toContain("hotel_abc");
  });
});
