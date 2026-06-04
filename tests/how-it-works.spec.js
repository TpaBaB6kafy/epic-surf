const { test, expect } = require("@playwright/test");

test.describe("How it works section", () => {
  test("uses localized copy and accessible expand buttons", async ({ page }) => {
    await page.goto("http://localhost:3000/");

    const how = page.locator("#how-it-works");
    await expect(how).not.toContainText("Тут будет какой-то текст");
    await expect(how).toContainText("Before entering the water");

    const firstButton = how.getByRole("button", { name: /show more about meet & gear up/i });
    await expect(firstButton).toHaveText("More");
    await expect(firstButton).toHaveAttribute("aria-expanded", "false");
    await firstButton.click();
    const expandedFirstButton = how.getByRole("button", { name: /show less about meet & gear up/i });
    await expect(expandedFirstButton).toHaveText("Less");
    await expect(expandedFirstButton).toHaveAttribute("aria-expanded", "true");

    await page.goto("http://localhost:3000/ru");
    const ruHow = page.locator("#how-it-works");
    await expect(ruHow).not.toContainText("Тут будет какой-то текст");
    await expect(ruHow).toContainText("Перед выходом в воду");
    await expect(ruHow).toContainText("Встреча и подбор доски");

    const ruButton = ruHow.getByRole("button", { name: /показать подробнее/i }).first();
    await expect(ruButton).toHaveText("Ещё");
    await expect(ruButton).toHaveAttribute("aria-expanded", "false");
    await ruButton.click();
    const expandedRuButton = ruHow.getByRole("button", { name: /скрыть подробности/i }).first();
    await expect(expandedRuButton).toHaveText("Скрыть");
    await expect(expandedRuButton).toHaveAttribute("aria-expanded", "true");
  });
});
