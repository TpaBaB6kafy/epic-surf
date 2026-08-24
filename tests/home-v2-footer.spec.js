const { test, expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://localhost:3000";
const closeTo = (actual, expected, tolerance = 2) => expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);

test("matches the desktop EN Footer handoff and preserves Gallery integration", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(`${baseUrl}/home-v2`, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: "html { scroll-behavior: auto !important; } nextjs-portal, [data-home-v2-messenger] { display: none !important; }" });

  const footer = page.locator("[data-home-v2-footer]");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();

  const geometry = await footer.evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const relativeBox = (node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height };
    };

    return {
      root: { width: rootRect.width, height: rootRect.height },
      map: relativeBox(root.querySelector("[data-home-v2-footer-map]")),
      main: relativeBox(root.querySelector("[data-home-v2-footer-main]")),
      brand: relativeBox(root.querySelector("[data-home-v2-footer-brand]")),
      quickLinks: relativeBox(root.querySelector("[data-home-v2-footer-quick-links]")),
      contacts: relativeBox(root.querySelector("[data-home-v2-footer-contacts]")),
      surfboard: relativeBox(root.querySelector("[data-home-v2-footer-surfboard]")),
      wave: relativeBox(root.querySelector("[data-home-v2-footer-wave]")),
      copyright: relativeBox(root.querySelector("[data-home-v2-footer-copyright]")),
      mapInteraction: (() => {
        const iframe = root.querySelector("[data-home-v2-footer-map-iframe]");
        const rect = iframe.getBoundingClientRect();
        const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        const style = getComputedStyle(iframe);
        return {
          tag: iframe.tagName.toLowerCase(),
          src: iframe.src,
          pointerEvents: style.pointerEvents,
          position: style.position,
          zIndex: style.zIndex,
          hitTag: hit?.tagName.toLowerCase(),
          hitIsIframe: hit === iframe,
        };
      })(),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  });

  closeTo(geometry.root.width, 1440, 1);
  closeTo(geometry.root.height, 562, 1);
  expect(geometry.map).toEqual({ left: 0, top: 0, width: 1440, height: 189 });
  closeTo(geometry.main.left, 233, 1);
  closeTo(geometry.main.top, 247, 1);
  closeTo(geometry.main.width, 975, 1);
  closeTo(geometry.brand.width, 306, 1);
  closeTo(geometry.quickLinks.left, 664, 1);
  closeTo(geometry.quickLinks.width, 191, 1);
  closeTo(geometry.contacts.left, 980, 1);
  closeTo(geometry.contacts.width, 228, 1);
  closeTo(geometry.surfboard.left, 1252, 1);
  closeTo(geometry.surfboard.top, 411, 1);
  closeTo(geometry.surfboard.width, 163, 1);
  closeTo(geometry.surfboard.height, 163, 1);
  closeTo(geometry.wave.left, -70, 1);
  closeTo(geometry.wave.top, 479, 1);
  closeTo(geometry.wave.height, 83, 1);
  closeTo(geometry.copyright.top, 521, 1);
  expect(geometry.overflow).toBeLessThanOrEqual(1);
  expect(geometry.mapInteraction).toMatchObject({
    tag: "iframe",
    pointerEvents: "auto",
    position: "absolute",
    zIndex: "0",
    hitTag: "iframe",
    hitIsIframe: true,
  });
  expect(geometry.mapInteraction.src).toContain("https://www.google.com/maps/embed?pb=");

  const mapIframe = footer.locator("[data-home-v2-footer-map-iframe]");
  await expect(mapIframe).toHaveAttribute("src", /google\.com\/maps\/embed/);
  const mapBox = await mapIframe.boundingBox();
  expect(mapBox).not.toBeNull();
  await mapIframe.click({ position: { x: mapBox.width / 2, y: mapBox.height / 2 } });
  expect(await page.evaluate(() => document.activeElement === document.querySelector("[data-home-v2-footer-map-iframe]"))).toBe(true);
  await page.mouse.move(mapBox.x + mapBox.width / 2, mapBox.y + mapBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(mapBox.x + mapBox.width / 2 + 140, mapBox.y + mapBox.height / 2 + 8, { steps: 8 });
  await page.mouse.up();
  await expect(footer.locator("[data-footer-social]")).toHaveCount(4);
  await expect(footer.locator('[data-footer-social="facebook"]')).toHaveAttribute("href", "https://www.facebook.com/epicsurfdanang/");
  await expect(footer.locator('[data-footer-social="telegram_channel"]')).toHaveAttribute("href", "https://t.me/surfdanang");
  await expect(footer.locator("[data-footer-quick-link]")).toHaveCount(5);
  await expect(footer.locator("[data-footer-quick-link]").first()).toHaveAttribute("href", "/surf-lessons-danang");
  await expect(footer.locator('[data-footer-contact="email"]')).toHaveAttribute("href", "mailto:epicsurf@gmail.com");
  await expect(footer.locator('[data-footer-contact="phone"]')).toHaveAttribute("href", "tel:+84383880164");
  await expect(footer.locator('[data-footer-contact="partners"]')).toHaveAttribute("href", "/partners");

  await footer.screenshot({ path: "test-results/home-v2-footer-focused.png" });

  const gallery = page.locator("[data-home-v2-gallery]");
  const galleryBefore = await gallery.evaluate((node) => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }));
  closeTo(galleryBefore.width, 1440, 1);
  closeTo(galleryBefore.height, 1062, 1);
  await page.evaluate(() => window.scrollTo(0, document.querySelector("[data-home-v2-gallery]").offsetTop + 930));
  await page.screenshot({ path: "test-results/home-v2-gallery-footer-integration.png" });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseUrl}/ru/home-v2`, { waitUntil: "domcontentloaded" });
  const mobileFooter = page.locator("[data-home-v2-footer]");
  await mobileFooter.scrollIntoViewIfNeeded();
  await expect(mobileFooter).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  await expect(mobileFooter.locator('[data-footer-contact="partners"]')).toHaveAttribute("href", "/ru/partners");
  await expect(mobileFooter.locator('[data-footer-social="telegram_channel"]')).toHaveAttribute("href", "https://t.me/surfdanang");
});
