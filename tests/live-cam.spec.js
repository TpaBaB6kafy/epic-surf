const { test, expect } = require("@playwright/test");

const baseUrl = process.env.LIVE_CAM_BASE_URL || "http://localhost:3000";

const copy = {
  en: {
    title: "My Khe Beach Live Cam",
    mobileTitle: "My Khe Live Cam",
    primary: "Check a short live preview from My Khe Beach before you book a lesson or rent a board.",
    explanation: "The full stream is operated by Da Nang Surf Cam. Open it to see current conditions, then message Epic if you are not sure whether today is good for your level.",
    fullStream: "Watch Full Stream",
    support: "Support the Project",
    askEpic: "Ask Epic about today’s conditions",
    message: "Hi! I checked the My Khe live cam. Are the conditions good for my level today?",
  },
  ru: {
    title: "Лайв-камера пляжа Ми Кхе",
    mobileTitle: "Лайв-камера пляжа Ми Кхе",
    primary: "Посмотрите короткое превью с пляжа Ми Кхе перед уроком или арендой доски.",
    explanation: "Полный стрим ведёт Da Nang Surf Cam. Откройте его, чтобы посмотреть текущие условия, а если не уверены, подходит ли день для вашего уровня, напишите Epic.",
    fullStream: "Открыть полный стрим",
    support: "Поддержать проект",
    askEpic: "Спросить Epic про условия сегодня",
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
    await expect(liveCam.getByText(text.primary, { exact: true })).toBeVisible();
    await expect(liveCam.getByText(text.explanation, { exact: true })).toBeVisible();

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
