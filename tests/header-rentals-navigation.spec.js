const { test, expect } = require("@playwright/test");

const locales = [
  {
    path: "/",
    lessons: "Lessons",
    rentals: "Rentals",
    book: "Book Now",
    language: "RU",
    languagePath: "/ru",
    nav: ["Lessons", "Rentals", "Process", "Forecast", "Events", "Map", "Partners"],
  },
  {
    path: "/ru",
    lessons: "Уроки",
    rentals: "Аренда",
    book: "Записаться",
    language: "EN",
    languagePath: "/",
    nav: ["Уроки", "Аренда", "Процесс", "Прогноз", "Эвенты", "Карта", "Для партнеров"],
  },
];

for (const locale of locales) {
  test(`${locale.path} desktop header navigates to Rentals after Lessons`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(`http://localhost:3000${locale.path}`, { waitUntil: "domcontentloaded" });

    expect(response.status()).toBe(200);
    const desktopNav = page.locator("header nav");
    await expect(desktopNav.locator("a")).toHaveText(locale.nav);
    await expect(desktopNav.getByRole("link", { name: locale.rentals, exact: true })).toHaveAttribute("href", "#rentals");

    for (const width of [1440, 1024]) {
      await page.setViewportSize({ width, height: 1000 });
      const layout = await page.locator("header").evaluate((header) => {
        const row = header.firstElementChild.firstElementChild;
        const [logo, nav, actions] = row.children;
        const rect = (element) => {
          const { left, right, top, bottom } = element.getBoundingClientRect();
          return { left, right, top, bottom };
        };
        return {
          header: rect(header),
          logo: rect(logo),
          nav: rect(nav),
          actions: rect(actions),
          links: [...nav.children].map(rect),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });
      expect(layout.overflow).toBeLessThanOrEqual(1);
      expect(layout.nav.left).toBeGreaterThanOrEqual(layout.logo.right - 1);
      expect(layout.nav.right).toBeLessThanOrEqual(layout.actions.left + 1);
      for (const link of layout.links) {
        expect(link.top).toBeGreaterThanOrEqual(layout.header.top - 1);
        expect(link.bottom).toBeLessThanOrEqual(layout.header.bottom + 1);
      }
    }

    await desktopNav.getByRole("link", { name: locale.lessons, exact: true }).click();
    await expect(page.locator("#lessons")).toBeInViewport();
    await desktopNav.getByRole("link", { name: locale.rentals, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${locale.path === "/" ? "/" : "/ru"}#rentals$`));
    await expect(page.locator("#rentals")).toBeInViewport();

    await page.locator("header").getByRole("button", { name: locale.book, exact: true }).click();
    await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
    await page.getByRole("button", { name: "Close booking modal" }).click();
    await page.locator("header").getByRole("link", { name: locale.language, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${locale.languagePath}$`));
  });

  test(`${locale.path} mobile header navigates to Rentals and closes its menu`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`http://localhost:3000${locale.path}`, { waitUntil: "domcontentloaded" });

    expect(response.status()).toBe(200);
    await page.locator("header button.lg\\:hidden").click();
    const mobileMenu = page.locator("header div.absolute.top-full");
    await expect(mobileMenu.locator("a")).toHaveText(locale.nav);
    await mobileMenu.getByRole("link", { name: locale.lessons, exact: true }).click();
    await expect(page.locator("#lessons")).toBeInViewport();
    await expect(mobileMenu).toBeHidden();

    await page.locator("header button.lg\\:hidden").click();
    const mobileRentals = mobileMenu.getByRole("link", { name: locale.rentals, exact: true });
    await expect(mobileRentals).toHaveAttribute("href", "#rentals");
    await mobileRentals.click();

    await expect(page).toHaveURL(new RegExp(`${locale.path === "/" ? "/" : "/ru"}#rentals$`));
    await expect(page.locator("#rentals")).toBeInViewport();
    await expect(mobileMenu).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
  });
}
