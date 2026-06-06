const { test, expect } = require("@playwright/test");

test.describe("Rental board selection flow", () => {
  test("shows a compact homepage rental showcase with a clear catalog link", async ({ page }) => {
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const rentals = page.locator("#rentals");
    const miniShowroom = rentals.locator("#rental-mini-showroom");
    await expect(rentals.getByRole("link", { name: /view all boards/i })).toHaveAttribute("href", "/surfboard-rental-danang");
    await expect(miniShowroom).toBeVisible();
    await expect(miniShowroom.locator("[data-mini-board]")).toHaveCount(1);
    await expect(miniShowroom.getByRole("link", { name: /open full rental board catalog/i })).toHaveAttribute("href", "/surfboard-rental-danang");
    await expect(rentals.locator("[data-board-card]")).toHaveCount(0);
    await expect(rentals.getByText("Softboards", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Longboards", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Malibus", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Shortboards", { exact: true })).toHaveCount(0);
  });

  test("opens the rental modal from the SEO showroom with a selected board and keeps partner code in messenger URLs", async ({ page }) => {
    await page.goto("http://localhost:3000/?partner=hotel_abc", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    const chooseSoftboard = showroom.getByRole("button", { name: /choose softboard 8'0/i });
    await chooseSoftboard.click();

    await expect(page.getByText("Selected board: Softboard 8'0")).toBeVisible();

    const whatsapp = page.getByRole("link", { name: /whatsapp/i }).last();
    await whatsapp.click();

    const href = await whatsapp.getAttribute("href");
    expect(decodeURIComponent(href)).toContain("I want to rent: Softboard 8'0");
    expect(decodeURIComponent(href)).toContain("Partner code: hotel_abc");
  });

  test("shows a showroom carousel instead of a card grid on the SEO rental page", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const rentalFlow = page.locator("[data-rental-hero-flow]");
    const showroom = page.locator("#rental-board-showroom");
    await expect(rentalFlow).toBeVisible();
    await expect(showroom).toHaveAttribute("data-showroom-theme", "dark-integrated");
    await expect(showroom).toBeVisible();
    await expect(showroom.locator("[data-showroom-board]")).toHaveCount(1);
    await expect(showroom.locator("[data-showroom-stage]")).toBeVisible();
    await expect(showroom.locator("[data-showroom-panel]")).toBeVisible();
    const stagePanelGap = await showroom.evaluate((node) => {
      const stage = node.querySelector("[data-showroom-stage]")?.getBoundingClientRect();
      const panel = node.querySelector("[data-showroom-panel]")?.getBoundingClientRect();
      return Math.round((panel?.left || 0) - (stage?.right || 0));
    });
    expect(stagePanelGap).toBeGreaterThanOrEqual(16);
    await expect(showroom.locator("[data-board-card]")).toHaveCount(0);
    await expect(showroom.getByRole("button", { name: /next board/i })).toBeVisible();
    await expect(showroom.getByRole("button", { name: /show board 12/i })).toBeVisible();
    await expect(showroom.locator("[data-board-nav-item]")).toHaveCount(12);
  });

  test("navigates the showroom with arrows and dots", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await expect(showroom.getByText("Softboard 8'0")).toBeVisible();

    await showroom.getByRole("button", { name: /next board/i }).click();
    await expect(showroom.getByText("Softboard 8'6")).toBeVisible();

    await showroom.getByRole("button", { name: /show board 6/i }).click();
    await expect(showroom.getByText("Fish 5'10")).toBeVisible();

    await showroom.getByRole("button", { name: /show board 12/i }).click();
    await expect(showroom.getByText("Step-up 6'6")).toBeVisible();
  });

  test("navigates the showroom with a mobile swipe", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await showroom.scrollIntoViewIfNeeded();
    await expect(showroom.getByText("Softboard 8'0")).toBeVisible();

    const board = showroom.locator("[data-showroom-board]");
    await board.scrollIntoViewIfNeeded();
    const box = await board.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, box.y + box.height * 0.5, { steps: 8 });
    await page.mouse.up();

    await expect(showroom.getByText("Softboard 8'6")).toBeVisible();
  });

  test("keeps the mobile rental page compact below the showroom", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await expect(showroom.locator("[data-showroom-panel] [data-board-best-for]")).toHaveCount(2);

    const rentalInfo = page.locator("[data-rental-info-sections]");
    await expect(rentalInfo).toHaveAttribute("data-mobile-compact", "true");
    await expect(rentalInfo.getByRole("heading", { name: /rental price/i })).toBeVisible();
    await expect(rentalInfo.getByRole("heading", { name: /when to take a lesson instead/i })).toBeVisible();
  });
});
