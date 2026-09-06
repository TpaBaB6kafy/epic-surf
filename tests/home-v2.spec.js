const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://127.0.0.1:3300";
const routes = [
  { path: "/", language: "en", switchLabel: "RU", switchedPath: "/ru" },
  { path: "/ru", language: "ru", switchLabel: "EN", switchedPath: "/" },
];
const widths = [390, 1440];

async function ready(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 15000 });
}

test.beforeEach(async ({ page }) => {
  // Third-party providers may reject localhost or be unavailable. The regression
  // contract owns iframe/link attributes and fallbacks, not remote page content.
  await page.route(/^https:\/\//, (route) => route.abort());
});

test.describe("Home V2 approved fluid regression", () => {
  for (const route of routes) {
    for (const width of widths) {
      test(`${route.path} renders the approved flow without overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 1000 });
        await ready(page, route.path);

        for (const selector of [
          "[data-home-v2-header]",
          "[data-home-v2-hero]",
          "[data-home-v2-how-it-works]",
          "[data-home-v2-lessons-block]",
          "[data-home-v2-included]",
          "[data-home-v2-rentals-block]",
          "[data-home-v2-live-cam][data-home-v2-forecast]",
          "[data-home-v2-reviews]",
          "[data-home-v2-faq]",
          "[data-home-v2-events]",
          "[data-home-v2-gallery]",
          "[data-home-v2-footer]",
          "[data-home-v2-messenger]",
        ]) {
          await expect(page.locator(selector)).toBeAttached();
        }

        await expect(page.locator("[data-home-v2-photo-break]")).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
      });
    }

    test(`${route.path} keeps production indexability and locale-safe Header navigation`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      await ready(page, route.path);

      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).not.toContain("noindex");
      expect(robots).not.toContain("nofollow");

      const header = page.locator('[data-home-v2-header="true"]');
      const rentals = header.locator(`a[href="${route.path}#rentals"]`);
      await expect(rentals).toHaveText(route.language === "ru" ? "Аренда" : "Rentals");
      for (const anchor of ["lessons", "how-it-works", "forecast", "events", "location"]) {
        await expect(header.locator(`a[href="${route.path}#${anchor}"]`)).toBeVisible();
      }
      await rentals.click();
      await expect(page).toHaveURL(`${baseUrl}${route.path}#rentals`);
      await expect(page.locator("#rentals")).toBeInViewport();
    });

    test(`${route.path} mobile menu exposes Rentals and closes after navigation`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await ready(page, route.path);
      await page.getByRole("button", { name: "Open navigation" }).click();

      const menu = page.locator("#home-v2-mobile-navigation");
      await expect(menu).toBeVisible();
      const link = menu.getByRole("link", { name: route.language === "ru" ? "Аренда" : "Rentals", exact: true });
      await expect(link).toHaveAttribute("href", `${route.path}#rentals`);
      await link.click();
      await expect(menu).toBeHidden();
      await expect(page).toHaveURL(`${baseUrl}${route.path}#rentals`);
    });

    test(`${route.path} language switch stays inside V2 and preserves attribution`, async ({ page }) => {
      await ready(page, `${route.path}?partner=hotel_abc&utm_source=qa`);
      const language = page.getByRole("link", { name: route.switchLabel, exact: true });
      await expect(language).toHaveAttribute("href", route.switchedPath);
      await language.click();
      await expect(page).toHaveURL(new RegExp(`${route.switchedPath.replace(/\//g, "\\/")}\\?partner=hotel_abc&utm_source=qa$`));
    });
  }

  test("Header Book Now opens and closes the booking modal", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/");
    await page.locator('[data-home-v2-book-now="true"]').click();
    await expect(page.locator('iframe[title="Booking"]')).toBeVisible();
    await page.getByLabel("Close booking modal").click();
    await expect(page.locator('iframe[title="Booking"]')).toHaveCount(0);
  });

  test("all five lesson states retain booking or WhatsApp destinations", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, "/?partner=hotel_abc");

    const lessons = page.locator("[data-home-v2-lessons-block]");
    const buttons = lessons.locator("[data-home-v2-lesson-selector] button:visible");
    await expect(buttons).toHaveCount(5);
    expect(await buttons.evaluateAll((nodes) => nodes.map((node) => node.dataset.lessonSelectorItem))).toEqual([
      "group", "split", "private", "surf_skate", "lineup_pro",
    ]);

    const bookingSources = [];
    for (let index = 0; index < 5; index += 1) {
      await buttons.nth(index).click();
      await expect(buttons.nth(index)).toHaveAttribute("aria-pressed", "true");
      const cta = lessons.locator("[data-home-v2-booking-cta]:visible");
      await expect(cta).toHaveCount(1);
      if (index < 3) {
        await cta.click();
        const frame = page.locator('iframe[title="Booking"]');
        await expect(frame).toBeVisible();
        bookingSources.push(await frame.getAttribute("src"));
        await page.getByLabel("Close booking modal").click();
      } else {
        await expect(cta).toHaveAttribute("href", /wa\.me|api\.whatsapp\.com/);
      }
    }
    expect(new Set(bookingSources).size).toBe(3);
  });

  test("Rentals catalog and rental modal preserve their destinations and close behavior", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, "/?partner=hotel_abc");
    const rentals = page.locator("[data-home-v2-rentals-block]");
    await expect(rentals.locator("[data-home-v2-rental-catalog-cta]:visible")).toHaveAttribute("href", "/surfboard-rental-danang");
    await rentals.locator("[data-home-v2-rental-cta]:visible").click();

    const modal = page.locator("[data-home-v2-rental-modal]");
    for (const name of ["WhatsApp", "Telegram"]) await expect(modal.getByRole("link", { name, exact: true })).toBeVisible();
    await expect(modal.getByRole("link", { name: /Zalo/i })).toBeVisible();
    const whatsapp = modal.getByRole("link", { name: "WhatsApp", exact: true });
    await whatsapp.evaluate((element) => {
      element.addEventListener("click", (event) => event.preventDefault(), { once: true });
      element.click();
    });
    expect(decodeURIComponent(await whatsapp.getAttribute("href"))).toContain("hotel_abc");
    await modal.locator("button").first().click();
    await expect(modal).toBeHidden();
  });

  test("LiveCam, provider attribution, Conditions CTA, and Forecast expose owned integration surfaces", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/");
    const conditions = page.locator("[data-home-v2-live-cam][data-home-v2-forecast]");
    await conditions.scrollIntoViewIfNeeded();
    await expect(conditions).toHaveAttribute("data-live-cam-mounted", "true");
    await expect(conditions.locator('iframe[data-live-cam-iframe]')).toHaveAttribute("src", /danangsurfcam\.com\/embed\/preview/);
    await expect(conditions.locator("[data-live-cam-provider-action]")).toHaveCount(2);
    await expect(conditions.locator('[data-live-cam-provider-action="primary"]')).toHaveAttribute("href", /danangsurfcam\.com/);
    await expect(conditions.locator('[data-live-cam-provider-action="secondary"]')).toHaveAttribute("href", /danangsurfcam\.com\/donate/);
    await expect(conditions.locator("[data-conditions-cta][data-live-cam-primary-actions]")).toHaveAttribute("href", /wa\.me/);
    await expect(conditions.locator('iframe[title="Windy Forecast"]')).toHaveAttribute("src", /embed\.windy\.com\/embed2\.html/);
  });

  test("Reviews CTA, FAQ ARIA, Events mapping, and all five Gallery filters remain functional", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await ready(page, "/");

    await expect(page.locator("[data-google-maps-cta]:visible")).toHaveAttribute("href", /google\.com\/maps/);

    const faqControls = page.locator("[data-home-v2-faq] [data-faq-control]:visible");
    await expect(faqControls).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const control = faqControls.nth(index);
      await expect(control).toHaveAttribute("aria-expanded", "false");
      const answerId = await control.getAttribute("aria-controls");
      expect(answerId).toBeTruthy();
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(`#${answerId}`)).toBeVisible();
      await control.click();
      await expect(control).toHaveAttribute("aria-expanded", "false");
    }

    const gallery = page.locator("[data-home-v2-gallery]");
    const filters = gallery.locator("[data-home-v2-gallery-filter]");
    await expect(filters).toHaveCount(5);
    expect(await filters.evaluateAll((nodes) => nodes.map((node) => node.dataset.homeV2GalleryFilter))).toEqual([
      "all", "surf-fest", "birthday", "sunset", "community",
    ]);
    for (let index = 0; index < 5; index += 1) {
      await filters.nth(index).click();
      await expect(filters.nth(index)).toHaveAttribute("aria-pressed", "true");
      await expect(gallery.locator("[data-home-v2-gallery-item]")).toHaveCount(5);
    }

    await page.locator('[data-home-v2-event-card="featured"] [data-home-v2-event-cta]').click();
    await expect(gallery.locator('[data-home-v2-gallery-filter="surf-fest"]')).toHaveAttribute("aria-pressed", "true");
  });

  test("Footer links/contact/social and Messenger FAB remain reachable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, "/");
    const footer = page.locator("[data-home-v2-footer]");
    await expect(footer.locator("[data-footer-quick-link]")).toHaveCount(5);
    await expect(footer.locator('[data-footer-contact="email"]')).toHaveAttribute("href", "mailto:epicsurf@gmail.com");
    await expect(footer.locator('[data-footer-contact="phone"]')).toHaveAttribute("href", "tel:+84383880164");
    await expect(footer.locator('[data-footer-contact="partners"]')).toHaveAttribute("href", "/partners");
    await expect(footer.locator("[data-footer-social]")).toHaveCount(4);
    await expect(footer.locator('[data-footer-social="facebook"]')).toHaveAttribute("href", /facebook\.com\/epicsurfdanang/);
    await expect(footer.locator("[data-home-v2-footer-map-iframe]")).toHaveAttribute("src", /google\.com\/maps\/embed/);

    const messenger = page.locator("[data-home-v2-messenger]");
    await messenger.locator("button").first().click();
    for (const name of [/WhatsApp chat/i, /Telegram chat/i, /Zalo chat/i]) {
      await expect(messenger.getByRole("link", { name })).toBeVisible();
    }
  });

});
