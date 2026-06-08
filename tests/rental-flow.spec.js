const { test, expect } = require("@playwright/test");

test.describe("Rental board selection flow", () => {
  test("renders the Russian rental SEO page with localized metadata and language switch", async ({ page }) => {
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?partner=hotel_abc", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    await expect(page).toHaveTitle(/Аренда досок для серфинга в Дананге \| Epic Surf School/);
    await expect(page.getByRole("heading", { name: /аренда досок для серфинга в дананге/i })).toBeVisible();
    await expect(page.getByText("Доставим доску в удобную точку в пределах Дананга", { exact: false })).toBeVisible();

    const canonical = page.locator("link[rel='canonical']");
    await expect(canonical).toHaveAttribute("href", "https://www.surfdanang.com/ru/surfboard-rental-danang");
    await expect(page.locator("link[rel='alternate'][hreflang='en']")).toHaveAttribute("href", "https://www.surfdanang.com/surfboard-rental-danang");
    await expect(page.locator("link[rel='alternate'][hreflang='ru']")).toHaveAttribute("href", "https://www.surfdanang.com/ru/surfboard-rental-danang");
    await expect(page.locator("link[rel='alternate'][hreflang='x-default']")).toHaveAttribute("href", "https://www.surfdanang.com/surfboard-rental-danang");

    await expect(page.getByRole("link", { name: "EN" })).toHaveAttribute("href", "/surfboard-rental-danang");

    const showroom = page.locator("#rental-board-showroom");
    await expect(showroom.getByText("ВИТРИНА ДОСОК")).toBeVisible();
    await expect(showroom.getByRole("heading", { name: "ВЫБЕРИТЕ ДОСКУ" })).toBeVisible();
    await expect(showroom.getByText("Выберите подходящую доску и напишите Epic Surf School", { exact: false })).toBeVisible();
    await expect(showroom.getByText("СОФТБОРД")).toBeVisible();
    await expect(showroom.getByText("РЕКОМЕНДУЕМ")).toBeVisible();
    await expect(showroom.getByText("от 250,000 VND / 2 часа")).toBeVisible();
    await expect(showroom.getByRole("button", { name: /выбрать softboard 8'0/i })).toBeVisible();
    await expect(showroom.getByText("Stable soft-top board", { exact: false })).toHaveCount(0);
  });

  test("shows Russian delivery copy and lesson CTA on the rental page", async ({ page }) => {
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const rentalInfo = page.locator("[data-rental-info-sections]");
    await expect(rentalInfo.getByText("Согласуем доску, время и удобную точку доставки в пределах Дананга.")).toBeVisible();
    await expect(page.getByText("Мы можем привезти доску в удобную точку в пределах Дананга", { exact: false })).toBeVisible();
    await expect(rentalInfo.getByRole("link", { name: "Посмотреть уроки" })).toHaveAttribute("href", "/ru#lessons");
  });

  test("opens the Russian rental modal with a selected board and keeps partner code in messenger URLs", async ({ page }) => {
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang?partner=hotel_abc", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await showroom.getByRole("button", { name: /выбрать softboard 8'0/i }).click();

    await expect(page.getByText("Выбранная доска", { exact: true })).toBeVisible();
    await expect(page.getByText("Выбранная доска: Softboard 8'0")).toBeVisible();

    for (const messenger of [/whatsapp/i, /telegram/i, /zalo/i]) {
      const link = page.getByRole("link", { name: messenger }).last();
      await link.click();

      const href = await link.getAttribute("href");
      expect(decodeURIComponent(href)).toContain("Хочу арендовать: Softboard 8'0");
      expect(decodeURIComponent(href)).toContain("Код партнёра: hotel_abc");
    }
  });

  test("switches the English rental SEO page to the Russian rental SEO page", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang?partner=hotel_abc", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    await expect(page.locator("link[rel='alternate'][hreflang='ru']")).toHaveAttribute("href", "https://www.surfdanang.com/ru/surfboard-rental-danang");
    await expect(page.getByRole("link", { name: "RU" })).toHaveAttribute("href", "/ru/surfboard-rental-danang");
  });

  test("shows a compact homepage rental showcase with a clear catalog link", async ({ page }) => {
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const rentals = page.locator("#rentals");
    const miniShowroom = rentals.locator("#rental-mini-showroom");
    await expect(rentals.getByRole("link", { name: /view all boards/i })).toHaveAttribute("href", "/surfboard-rental-danang");
    await expect(rentals.getByText("Board rental in Da Nang with delivery or pickup in a convenient city spot.", { exact: false })).toBeVisible();
    await expect(rentals.getByText("Spot delivery", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("All sizes", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Rashguards & zinc", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Local advice", { exact: true })).toHaveCount(0);
    await expect(miniShowroom).toBeVisible();
    await expect(miniShowroom.locator("[data-mini-board]")).toHaveCount(1);
    await expect(miniShowroom.locator("[data-mini-board-back]")).toHaveCount(1);
    await expect(miniShowroom.locator("[data-mini-board-front]")).toHaveCount(1);
    await expect(miniShowroom).toHaveAttribute("data-mini-showroom-variant", "homepage-promo");
    await expect(miniShowroom.getByText("Rental quiver")).toHaveCount(0);
    await expect(miniShowroom.getByText("recommended boards", { exact: false })).toHaveCount(0);
    await expect(miniShowroom.getByRole("link")).toHaveCount(0);
    await expect(rentals.locator("[data-board-card]")).toHaveCount(0);
    await expect(rentals.getByText("Softboards", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Longboards", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Malibus", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Shortboards", { exact: true })).toHaveCount(0);
  });

  test("shows the Russian homepage rental promo with compact benefits and catalog link", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/ru", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const rentals = page.locator("#rentals");
    await expect(rentals.getByText("Аренда досок в Дананге", { exact: false })).toBeVisible();
    await expect(rentals.getByText("Привозим по Данангу", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Все размеры", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Лайкры и цинк", { exact: true })).toHaveCount(0);
    await expect(rentals.getByText("Поможем выбрать", { exact: true })).toHaveCount(0);
    await expect(rentals.getByRole("link", { name: /выбрать доску/i })).toHaveAttribute("href", "/ru/surfboard-rental-danang");
    await expect(rentals.locator("#rental-mini-showroom")).toHaveAttribute("data-mini-showroom-variant", "homepage-promo");
    await expect(rentals.locator("[data-mini-board-back]")).toBeHidden();
    await expect(rentals.locator("[data-mini-board-front]")).toBeVisible();

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
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

    for (const messenger of [/whatsapp/i, /telegram/i, /zalo/i]) {
      const link = page.getByRole("link", { name: messenger }).last();
      await link.click();

      const href = await link.getAttribute("href");
      expect(decodeURIComponent(href)).toContain("I want to rent: Softboard 8'0");
      expect(decodeURIComponent(href)).toContain("Partner code: hotel_abc");
    }
  });

  test("keeps the English rental showroom copy unchanged", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await expect(showroom.getByText("Board showroom")).toBeVisible();
    await expect(showroom.getByRole("heading", { name: "Choose your board" })).toBeVisible();
    await expect(showroom.getByText("Browse the available shapes", { exact: false })).toBeVisible();
    await expect(showroom.getByText("Softboard", { exact: true })).toBeVisible();
    await expect(showroom.getByText("Recommended", { exact: true })).toBeVisible();
    await expect(showroom.getByText("from 250,000 VND / 2 hours")).toBeVisible();
    await expect(showroom.getByRole("button", { name: /choose softboard 8'0/i })).toBeVisible();
    await expect(showroom.getByText("ВИТРИНА ДОСОК")).toHaveCount(0);
    await expect(page.getByText("Доставим доску в удобную точку в пределах Дананга", { exact: false })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Посмотреть уроки" })).toHaveCount(0);
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

  test("navigates the showroom with horizontal trackpad wheel", async ({ page }) => {
    await page.goto("http://localhost:3000/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const showroom = page.locator("#rental-board-showroom");
    await showroom.scrollIntoViewIfNeeded();
    await expect(showroom.getByText("Softboard 8'0")).toBeVisible();

    const stage = showroom.locator("[data-showroom-stage]");
    const box = await stage.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.move(box.x + box.width * 0.45, box.y + box.height * 0.45);
    await page.mouse.wheel(80, 0);

    await expect(showroom.getByText("Softboard 8'6")).toBeVisible();
  });

  test("navigates the homepage mini-showroom with a mobile swipe", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const miniShowroom = page.locator("#rental-mini-showroom");
    await miniShowroom.scrollIntoViewIfNeeded();
    await expect(miniShowroom.getByText("Softboard 8'0")).toBeVisible();

    const box = await miniShowroom.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.18, box.y + box.height * 0.5, { steps: 8 });
    await page.mouse.up();

    await expect(miniShowroom.getByText("Softboard 8'6")).toBeVisible();
  });

  test("navigates the desktop homepage mini-showroom with left and right clicks", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const miniShowroom = page.locator("#rental-mini-showroom");
    await miniShowroom.scrollIntoViewIfNeeded();
    await expect(miniShowroom.getByText("Softboard 8'0")).toBeVisible();

    const box = await miniShowroom.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.click(box.x + box.width * 0.78, box.y + box.height * 0.48);
    await expect(miniShowroom.getByText("Softboard 8'6")).toBeVisible();

    await page.mouse.click(box.x + box.width * 0.22, box.y + box.height * 0.48);
    await expect(miniShowroom.getByText("Softboard 8'0")).toBeVisible();

    await miniShowroom.getByRole("button", { name: /preview longboard 9'0/i }).click();
    await expect(miniShowroom.getByText("Longboard 9'0")).toBeVisible();
  });

  test("does not navigate from the homepage mini-showroom stage", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const miniShowroom = page.locator("#rental-mini-showroom");
    await miniShowroom.scrollIntoViewIfNeeded();

    const box = await miniShowroom.boundingBox();
    expect(box).not.toBeNull();

    await page.mouse.click(box.x + box.width * 0.5, box.y + box.height * 0.5);

    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.locator("#rental-mini-showroom")).toBeVisible();
    await expect(page.locator("#rentals").getByRole("link", { name: /view all boards/i })).toHaveAttribute("href", "/surfboard-rental-danang");
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

  test("keeps the Russian rental page within the mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:3000/ru/surfboard-rental-danang", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
