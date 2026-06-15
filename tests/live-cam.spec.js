const { test, expect } = require("@playwright/test");

const copy = {
  en: {
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    primary: "Check the beach before you go.",
    explanation: "Watch a short preview from My Khe Beach, then open the full cam or message Epic to ask if today fits your level.",
    fullStream: "Open Full Cam",
    support: "Support Cam",
    askEpic: "Ask Epic about conditions",
    attribution: "Community-supported My Khe Beach cam by Da Nang Surf Cam. Live/replay daily from 4AM to 4PM ICT.",
    message: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    title: "Лайв-камера Ми Кхе",
    mobileTitle: "Лайв-камера Ми Кхе",
    primary: "Проверьте пляж перед сессией.",
    explanation: "Посмотрите короткое превью с Ми Кхе, откройте камеру или напишите Epic, чтобы понять, подходят ли условия для вашего уровня.",
    fullStream: "Открыть камеру",
    support: "Поддержать камеру",
    askEpic: "Спросить Epic про условия",
    attribution: "Community-камера Ми Кхе от Da Nang Surf Cam. Live/replay ежедневно с 4:00 до 16:00 ICT.",
    message: "Привет! Я посмотрел лайв-камеру Ми Кхе. Подходят ли сегодня условия для моего уровня?",
  },
};

const cases = [
<<<<<<< Updated upstream
  { path: "/", language: "en", viewport: { width: 1440, height: 1000 }, previewWidth: [460, 500] },
  { path: "/ru", language: "ru", viewport: { width: 1440, height: 1000 }, previewWidth: [460, 500] },
  { path: "/", language: "en", viewport: { width: 820, height: 1000 }, previewWidth: [380, 420] },
=======
  { path: "/", language: "en", viewport: { width: 1440, height: 1000 }, previewWidth: [559, 561] },
  { path: "/ru", language: "ru", viewport: { width: 1440, height: 1000 }, previewWidth: [559, 561] },
  { path: "/", language: "en", viewport: { width: 820, height: 1000 }, previewWidth: [419, 421] },
  { path: "/ru", language: "ru", viewport: { width: 820, height: 1000 }, previewWidth: [419, 421] },
>>>>>>> Stashed changes
  { path: "/", language: "en", viewport: { width: 390, height: 844 }, previewWidth: [290, 330] },
  { path: "/ru", language: "ru", viewport: { width: 390, height: 844 }, previewWidth: [290, 330] },
];

for (const scenario of cases) {
  test(`renders the polished live cam on ${scenario.path} at ${scenario.viewport.width}px`, async ({ page }) => {
    const text = copy[scenario.language];
    await page.setViewportSize(scenario.viewport);
    await page.goto(`http://localhost:3000${scenario.path}?partner=hotel_abc`, {
      waitUntil: "domcontentloaded",
    });

    const rentals = page.locator("#rentals");
    const liveCam = page.locator("#live-cam");
    const forecast = page.locator("#forecast");
    const expectedTitle = scenario.viewport.width < 640 ? text.mobileTitle : text.title;
    await expect(liveCam.getByRole("heading", { name: expectedTitle, exact: true })).toBeVisible();
    await expect(liveCam.getByText(text.primary, { exact: true })).toBeVisible();
    await expect(liveCam.getByText(text.explanation, { exact: true })).toBeVisible();
    await expect(liveCam.getByText(text.attribution, { exact: true })).toBeVisible();

    const positions = await Promise.all([
      rentals.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
      liveCam.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
      forecast.evaluate((node) => node.getBoundingClientRect().top + window.scrollY),
    ]);
    expect(positions[0]).toBeLessThan(positions[1]);
    expect(positions[1]).toBeLessThan(positions[2]);

    const iframe = liveCam.locator("iframe");
    await expect(iframe).toHaveAttribute("src", /embed\/preview\?partner=epicsurf&duration=10&theme=dark/);
    await expect(iframe).toHaveAttribute("loading", "lazy");
<<<<<<< Updated upstream
    await expect(iframe).toHaveAttribute("width", "320");
    await expect(iframe).toHaveAttribute("height", "240");
=======
    await expect(iframe).toHaveAttribute("width", "100%");
    await expect(iframe).toHaveAttribute("height", "100%");
>>>>>>> Stashed changes
    const preview = liveCam.locator("[data-live-cam-preview]");
    const previewBox = await preview.boundingBox();
    const iframeBox = await iframe.boundingBox();
    expect(previewBox).not.toBeNull();
    expect(iframeBox).not.toBeNull();
    expect(iframeBox.width).toBeGreaterThanOrEqual(scenario.previewWidth[0]);
    expect(iframeBox.width).toBeLessThanOrEqual(scenario.previewWidth[1]);
<<<<<<< Updated upstream
    expect(Math.abs((iframeBox.width / iframeBox.height) - (4 / 3))).toBeLessThan(0.03);
    expect(Math.abs(previewBox.width - iframeBox.width)).toBeLessThanOrEqual(1);
    expect(Math.abs(previewBox.height - iframeBox.height)).toBeLessThanOrEqual(1);
=======
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
    expect(iframeStyle.borderRadius).toBe(previewStyle.borderRadius);
    expect(iframeStyle.transform).toBe("none");
    expect(iframeStyle.width).toBeCloseTo(iframeBox.width, 0);
    expect(iframeStyle.height).toBeCloseTo(iframeBox.height, 0);
>>>>>>> Stashed changes

    for (const name of [text.fullStream, text.support]) {
      const link = liveCam.getByRole("link", { name: new RegExp(name, "i") });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /utm_source=surfdanang&utm_medium=referral&utm_campaign=live_cam_block/);
    }

    const askEpic = liveCam.getByRole("link", { name: new RegExp(text.askEpic, "i") });
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
