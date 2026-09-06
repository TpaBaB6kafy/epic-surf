const { expect } = require("@playwright/test");

const baseUrl = process.env.HOME_V2_BASE_URL || "http://127.0.0.1:3300";

async function isolateProviders(page) {
  await page.route(/^https:\/\//, (route) => route.abort());
}

async function ready(page, route = "/") {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("[data-home-v2-root]")).toHaveAttribute("data-home-v2-client-ready", "true", { timeout: 30000 });
}

async function expectNoOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
}

module.exports = { baseUrl, isolateProviders, ready, expectNoOverflow };
