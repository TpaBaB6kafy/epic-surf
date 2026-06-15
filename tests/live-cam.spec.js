const { test, expect } = require("@playwright/test");
const { readFileSync } = require("node:fs");
const path = require("node:path");

const baseUrl = process.env.LIVE_CAM_BASE_URL || "http://localhost:3000";

const copy = {
  en: {
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    titleLines: ["My Khe Beach", "Live Cam"],
    primary: "Check My Khe before you book a lesson or rent a board.",
    explanation: "The full stream is operated by Da Nang Surf Cam. Open it for the full beach view, or message Epic if you’re not sure today fits your level.",
    fullStream: "Open full cam",
    support: "Support the cam",
    obsoletePrimary: "Watch Full Stream",
    askEpic: "Ask Epic about today’s conditions",
    mobileAskEpic: "Ask Epic about conditions",
    message: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    title: "Лайв-камера Ми Кхе",
    mobileTitle: "Лайв-камера Ми Кхе",
    titleLines: ["Лайв-камера", "Ми Кхе"],
    primary: "Проверьте Ми Кхе перед уроком или арендой доски.",
    explanation: "Полный стрим ведёт Da Nang Surf Cam. Откройте камеру для обзора пляжа или напишите Epic, если не уверены, подходят ли условия вашему уровню.",
    fullStream: "Открыть камеру",
    support: "Поддержать камеру",
    obsoletePrimary: "Открыть полный стрим",
    askEpic: "Спросить Epic про условия",
    mobileAskEpic: "Спросить про условия",
    message: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
};

const cases = [
  { path: "/", language: "en", viewport: { width: 1440, height: 1000 }, previewWidth: [599, 601] },
  { path: "/ru", language: "ru", viewport: { width: 1440, height: 1000 }, previewWidth: [599, 601] },
  { path: "/", language: "en", viewport: { width: 820, height: 1000 }, previewWidth: [459, 461] },
  { path: "/ru", language: "ru", viewport: { width: 820, height: 1000 }, previewWidth: [459, 461] },
  { path: "/", language: "en", viewport: { width: 390, height: 844 }, previewWidth: [290, 321] },
  { path: "/ru", language: "ru", viewport: { width: 390, height: 844 }, previewWidth: [290, 321] },
];

for (const scenario of cases) {
  test(`renders the polished live cam on ${scenario.path} at ${scenario.viewport.width}px`, async ({ page }) => {
    const text = copy[scenario.language];
    await page.setViewportSize(scenario.viewport);
    await page.goto(`${baseUrl}${scenario.path}?partner=hotel_abc`, {
      waitUntil: "domcontentloaded",
    });

    const rentals = page.locator("#rentals");
    const liveCam = page.locator("#live-cam");
    const forecast = page.locator("#forecast");
    const expectedTitle = scenario.viewport.width < 640 ? text.mobileTitle : text.title;
    await expect(liveCam.getByRole("heading", { name: expectedTitle, exact: true })).toBeVisible();
    const visibleHeading = liveCam.getByRole("heading", { name: expectedTitle, exact: true });
    if (scenario.viewport.width >= 640 || scenario.language === "ru") {
      const headingLines = visibleHeading.locator("[data-live-cam-title-line]");
      await expect(headingLines).toHaveCount(2);
      await expect(headingLines.nth(0)).toHaveText(text.titleLines[0]);
      await expect(headingLines.nth(1)).toHaveText(text.titleLines[1]);
    }
    await expect(liveCam.getByText(text.primary, { exact: true })).toBeVisible();
    await expect(liveCam.getByText(text.explanation, { exact: true })).toBeVisible();

    const primaryActions = liveCam.locator("[data-live-cam-primary-actions]");
    const expectedCta = scenario.viewport.width < 640 ? text.mobileAskEpic : text.askEpic;
    const primaryCta = primaryActions.getByRole("link", { name: new RegExp(expectedCta, "i") });
    await expect(primaryActions.getByRole("link")).toHaveCount(1);
    await expect(primaryCta).toBeVisible();
    await expect(primaryCta).toHaveClass(/bg-epicRed/);
    await expect(primaryCta).toHaveClass(/text-white/);
    await expect(liveCam.getByRole("link", { name: new RegExp(text.obsoletePrimary, "i") })).toHaveCount(0);

    const positions = await Promise.all([
      rentals.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
      liveCam.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
      forecast.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
    ]);
    expect(positions[0]).toBeLessThan(positions[1]);
    expect(positions[1]).toBeLessThan(positions[2]);

    const iframe = liveCam.locator("iframe");
    await expect(iframe).toHaveAttribute("src", /embed\/preview\?partner=epicsurf&duration=10&theme=dark&cta=Open%20Cam/);
    await expect(iframe).toHaveAttribute("loading", "lazy");
    await expect(iframe).toHaveAttribute("width", "100%");
    await expect(iframe).toHaveAttribute("height", "100%");
    const preview = liveCam.locator("[data-live-cam-preview]");
    await expect(preview).not.toHaveClass(/aspect-\[4\/3\]/);
    const previewBox = await preview.boundingBox();
    const iframeBox = await iframe.boundingBox();
    expect(previewBox).not.toBeNull();
    expect(iframeBox).not.toBeNull();
    expect(iframeBox.width).toBeGreaterThanOrEqual(scenario.previewWidth[0]);
    expect(iframeBox.width).toBeLessThanOrEqual(scenario.previewWidth[1]);
    expect(Math.abs((iframeBox.width / iframeBox.height) - (16 / 9))).toBeLessThan(0.03);
    expect(Math.abs(previewBox.width - iframeBox.width)).toBeLessThanOrEqual(2);
    expect(Math.abs(previewBox.height - iframeBox.height)).toBeLessThanOrEqual(2);
    const iframeStyle = await iframe.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        borderRadius: style.borderRadius,
        transform: style.transform,
        width: Number.parseFloat(style.width),
        height: Number.parseFloat(style.height),
      };
    });
    const previewStyle = await preview.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        borderRadius: style.borderRadius,
        overflow: style.overflow,
      };
    });
    expect(previewStyle.overflow).toBe("hidden");
    expect(previewStyle.borderRadius).toBe(scenario.viewport.width < 768 ? "18px" : "20px");
    expect(iframeStyle.borderRadius).toBe("0px");
    expect(iframeStyle.transform).toBe("none");
    expect(iframeStyle.width).toBeCloseTo(iframeBox.width, 0);
    expect(iframeStyle.height).toBeCloseTo(iframeBox.height, 0);

    const providerLinks = liveCam.locator("[data-live-cam-provider-links]");
    await expect(providerLinks).toBeVisible();
    await expect(providerLinks.getByRole("link")).toHaveCount(2);
    for (const name of [text.fullStream, text.support]) {
      const link = providerLinks.getByRole("link", { name: new RegExp(name, "i") });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /utm_source=surfdanang&utm_medium=referral&utm_campaign=live_cam_block/);
    }

    const askEpic = primaryCta;
    await askEpic.evaluate((node) => {
      node.addEventListener("click", (event) => event.preventDefault(), { once: true });
      node.click();
    });
    const whatsappHref = decodeURIComponent(await askEpic.getAttribute("href"));
    expect(whatsappHref).toContain(text.message);
    expect(whatsappHref).toContain("hotel_abc");

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test("keeps LiveCam analytics handlers", () => {
  const source = readFileSync(path.join(process.cwd(), "app/components/LiveCam.jsx"), "utf8");
  expect(source).toContain('trackEvent("live_cam_cta_click"');
  expect(source).toContain('trackEvent("whatsapp_click"');
  expect(source).toContain('trackEvent("live_cam_outbound_click"');
  expect(source).toContain('trackOutbound("full_stream")');
  expect(source).toContain('trackOutbound("donate")');
});
