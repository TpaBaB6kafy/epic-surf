const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";

test.beforeEach(async ({ page }) => {
  await page.route(/^https:\/\//, (route) => route.abort());
});

async function footerGeometry(page, width) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  const footer = page.locator("[data-home-v2-footer]");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  return footer.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const box = (selector) => {
      const rect = root.querySelector(selector).getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };
    return {
      root: { width: rootRect.width, height: rootRect.height },
      map: box("[data-home-v2-footer-map]"),
      frame: box("[data-home-v2-footer-frame]"),
      main: box("[data-home-v2-footer-main]"),
      brand: box("[data-home-v2-footer-brand]"),
      quickLinks: box("[data-home-v2-footer-quick-links]"),
      contacts: box("[data-home-v2-footer-contacts]"),
      surfboard: box("[data-home-v2-footer-surfboard]"),
      wave: box("[data-home-v2-footer-wave]"),
      copyright: box("[data-home-v2-footer-copyright]"),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });
}

test("Footer uses the approved fluid contract at desktop and ultrawide widths", async ({ page }) => {
  const desktop = await footerGeometry(page, 1440);
  const ultrawide = await footerGeometry(page, 2560);

  for (const geometry of [desktop, ultrawide]) {
    expect(geometry.map.left).toBeCloseTo(0, 0);
    expect(geometry.map.width).toBeCloseTo(geometry.root.width, 0);
    expect(geometry.map.height).toBeCloseTo(189, 0);
    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(Math.abs((geometry.main.left + geometry.main.width / 2) - geometry.root.width / 2)).toBeLessThanOrEqual(2);
    expect(geometry.brand.width).toBeCloseTo(306, 0);
    expect(geometry.quickLinks.left).toBeGreaterThan(geometry.brand.left + geometry.brand.width);
    expect(geometry.contacts.left).toBeGreaterThan(geometry.quickLinks.left + geometry.quickLinks.width);
    expect(geometry.wave.left).toBeCloseTo(0, 0);
    expect(geometry.wave.width).toBeCloseTo(geometry.root.width, 0);
    expect(geometry.wave.height).toBeCloseTo(83, 0);
    expect(geometry.surfboard.left + geometry.surfboard.width).toBeLessThan(geometry.root.width);
    expect(Math.abs((geometry.copyright.left + geometry.copyright.width / 2) - geometry.root.width / 2)).toBeLessThanOrEqual(2);
  }

  expect(ultrawide.frame.width).toBeGreaterThan(desktop.frame.width);
  expect(ultrawide.main.width).toBeGreaterThan(desktop.main.width);
  expect(ultrawide.quickLinks.width).toBeGreaterThan(desktop.quickLinks.width);
  expect(ultrawide.contacts.width).toBeGreaterThan(desktop.contacts.width);
});

test("Footer preserves map, links, contacts, socials, and RU partner routing", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  const footer = page.locator("[data-home-v2-footer]");
  await expect(footer.locator("[data-home-v2-footer-map-iframe]")).toHaveAttribute("src", /google\.com\/maps\/embed/);
  await expect(footer.locator("[data-footer-social]")).toHaveCount(4);
  await expect(footer.locator('[data-footer-social="facebook"]')).toHaveAttribute("href", "https://www.facebook.com/epicsurfdanang/");
  await expect(footer.locator('[data-footer-social="telegram_channel"]')).toHaveAttribute("href", "https://t.me/surfdanang");
  await expect(footer.locator("[data-footer-quick-link]")).toHaveCount(5);
  await expect(footer.locator("[data-footer-quick-link]").first()).toHaveAttribute("href", "/surf-lessons-danang");
  await expect(footer.locator('[data-footer-contact="email"]')).toHaveAttribute("href", "mailto:epicsurf@gmail.com");
  await expect(footer.locator('[data-footer-contact="phone"]')).toHaveAttribute("href", "tel:+84383880164");
  await expect(footer.locator('[data-footer-contact="partners"]')).toHaveAttribute("href", "/partners");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
  const ruFooter = page.locator("[data-home-v2-footer]");
  await expect(ruFooter).toBeVisible();
  await expect(ruFooter.locator('[data-footer-contact="partners"]')).toHaveAttribute("href", "/ru/partners");
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
});
