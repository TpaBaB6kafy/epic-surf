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
  { path: "/", language: "en", viewport: { width: 1440, height: 1000 } },
  { path: "/ru", language: "ru", viewport: { width: 1440, height: 1000 } },
  { path: "/", language: "en", viewport: { width: 820, height: 1000 } },
  { path: "/ru", language: "ru", viewport: { width: 820, height: 1000 } },
  { path: "/", language: "en", viewport: { width: 390, height: 844 } },
  { path: "/ru", language: "ru", viewport: { width: 390, height: 844 } },
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
    await expect(liveCam.locator("[data-live-cam-wave-decoration]")).toHaveCount(2);
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

    const copyColumn = liveCam.locator("[data-live-cam-copy]");
    const sourceBadge = liveCam.locator("[data-live-cam-source-badge]");
    await expect(copyColumn).toBeVisible();
    await expect(sourceBadge).toBeVisible();
    const copyColumnStyle = await copyColumn.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        alignItems: style.alignItems,
        textAlign: style.textAlign,
      };
    });
    const sourceBadgeStyle = await sourceBadge.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        alignSelf: style.alignSelf,
        fontSize: style.fontSize,
      };
    });
    if (scenario.viewport.width < 640) {
      expect(copyColumnStyle.alignItems).toBe("center");
      expect(copyColumnStyle.textAlign).toBe("center");
      expect(sourceBadgeStyle.alignSelf).toBe("center");
      expect(sourceBadgeStyle.fontSize).toBe("11px");
    }

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
    const previewCard = preview.locator("..");
    await expect(preview).not.toHaveClass(/aspect-\[4\/3\]/);
    const previewBox = await preview.boundingBox();
    const previewCardBox = await previewCard.boundingBox();
    const iframeBox = await iframe.boundingBox();
    expect(previewBox).not.toBeNull();
    expect(previewCardBox).not.toBeNull();
    expect(iframeBox).not.toBeNull();
    expect(iframeBox.width).toBeGreaterThanOrEqual(scenario.viewport.width < 640 ? 260 : 300);
    expect(previewBox.x).toBeGreaterThanOrEqual(previewCardBox.x);
    expect(previewBox.y).toBeGreaterThanOrEqual(previewCardBox.y);
    expect(previewBox.x + previewBox.width).toBeLessThanOrEqual(previewCardBox.x + previewCardBox.width + 1);
    expect(previewBox.y + previewBox.height).toBeLessThanOrEqual(previewCardBox.y + previewCardBox.height + 1);
    expect(Math.abs((iframeBox.width / iframeBox.height) - (16 / 9))).toBeLessThan(0.03);
    expect(Math.abs(previewBox.width - iframeBox.width)).toBeLessThanOrEqual(2);
    expect(Math.abs(previewBox.height - iframeBox.height)).toBeLessThanOrEqual(2);
    if (scenario.viewport.width >= 768) {
      const copyBox = await copyColumn.boundingBox();
      expect(copyBox).not.toBeNull();
      expect(copyBox.x + copyBox.width).toBeLessThanOrEqual(previewCardBox.x + 1);
    }
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
    const providerFooter = liveCam.locator("[data-live-cam-attribution-footer]");
    const providerIdentity = liveCam.locator("[data-live-cam-provider-identity]");
    await expect(providerFooter).toBeVisible();
    await expect(providerIdentity).toBeVisible();
    await expect(providerLinks).toBeVisible();
    await expect(providerLinks.getByRole("link")).toHaveCount(2);
    await expect(providerLinks.locator('[data-live-cam-provider-action="primary"]')).toHaveCount(1);
    await expect(providerLinks.locator('[data-live-cam-provider-action="secondary"]')).toHaveCount(1);
    const footerStyle = await providerFooter.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        alignItems: style.alignItems,
        display: style.display,
        flexDirection: style.flexDirection,
        justifyContent: style.justifyContent,
        textAlign: style.textAlign,
      };
    });
    const linkStyle = await providerLinks.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        flexDirection: style.flexDirection,
        justifyContent: style.justifyContent,
      };
    });
    if (scenario.viewport.width >= 1024) {
      const identityBox = await providerIdentity.boundingBox();
      const linksBox = await providerLinks.boundingBox();
      const attributionBox = await providerIdentity.locator("p").last().boundingBox();
      const actionBoxes = await providerLinks.locator("a").evaluateAll((links) => links.map((link) => {
        const rect = link.getBoundingClientRect();
        const style = getComputedStyle(link);
        return {
          borderRadius: Number.parseFloat(style.borderRadius),
          height: rect.height,
          width: rect.width,
        };
      }));
      expect(footerStyle.display).toBe("flex");
      expect(footerStyle.flexDirection).toBe("row");
      expect(footerStyle.alignItems).toBe("center");
      expect(footerStyle.justifyContent).toBe("space-between");
      expect(linkStyle.flexDirection).toBe("column");
      expect(identityBox).not.toBeNull();
      expect(linksBox).not.toBeNull();
      expect(attributionBox).not.toBeNull();
      expect(identityBox.width).toBeGreaterThanOrEqual(350);
      expect(attributionBox.width).toBeGreaterThanOrEqual(285);
      expect(linksBox.x).toBeGreaterThan(identityBox.x + identityBox.width);
      expect(Math.abs((identityBox.y + identityBox.height / 2) - (linksBox.y + linksBox.height / 2))).toBeLessThan(36);
      for (const box of actionBoxes) {
        expect(box.height).toBeGreaterThanOrEqual(40);
        expect(box.height).toBeLessThanOrEqual(46);
        expect(box.width).toBeGreaterThanOrEqual(170);
        expect(box.width).toBeLessThanOrEqual(190);
        expect(box.borderRadius).toBeGreaterThanOrEqual(12);
        expect(box.borderRadius).toBeLessThanOrEqual(14);
      }
      expect(Math.abs(actionBoxes[0].width - actionBoxes[1].width)).toBeLessThanOrEqual(2);
      expect(actionBoxes[1].height + actionBoxes[1].width).toBeGreaterThan(actionBoxes[0].height + actionBoxes[0].width - 2);
    } else if (scenario.viewport.width < 640) {
      const mobileActionBoxes = await providerLinks.locator("a").evaluateAll((links) => links.map((link) => {
        const rect = link.getBoundingClientRect();
        return {
          height: rect.height,
          width: rect.width,
        };
      }));
      expect(footerStyle.display).toBe("flex");
      expect(footerStyle.flexDirection).toBe("column");
      expect(footerStyle.alignItems).toBe("center");
      expect(footerStyle.textAlign).toBe("center");
      expect(linkStyle.flexDirection).toBe("column");
      expect(linkStyle.justifyContent).toBe("center");
      for (const box of mobileActionBoxes) {
        expect(box.height).toBeGreaterThanOrEqual(40);
        expect(box.width).toBeGreaterThanOrEqual(260);
      }
      expect(Math.abs(mobileActionBoxes[0].width - mobileActionBoxes[1].width)).toBeLessThanOrEqual(2);
    }
    for (const name of [text.fullStream, text.support]) {
      const link = providerLinks.getByRole("link", { name: new RegExp(name, "i") });
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toHaveAttribute("href", /utm_source=surfdanang&utm_medium=referral&utm_campaign=live_cam_block/);
    }

    const askEpic = primaryCta;
    await expect.poll(async () => {
      await askEpic.evaluate((node) => {
        node.addEventListener("click", (event) => event.preventDefault(), { once: true });
        node.click();
      });
      return decodeURIComponent(await askEpic.getAttribute("href"));
    }).toContain(text.message);
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
  expect(source).not.toContain("-right-12 -top-12 h-40 w-40 rounded-full");
  expect(source).not.toContain("-bottom-28 left-1/3 h-52 w-52 rounded-full");
});
