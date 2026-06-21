import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Formulaire de contact
 */
test.describe("Formulaire de contact", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#contact");
  });

  test("affiche le formulaire de contact", async ({ page }) => {
    await expect(page.locator("#contact")).toBeVisible();
    await expect(page.locator('input[name="name"]').last()).toBeVisible();
    await expect(page.locator('input[name="email"]').last()).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
  });

  test("soumet le formulaire de contact avec données valides", async ({ page }) => {
    // On cible les champs dans la section contact (les derniers si deux formulaires)
    const section = page.locator("#contact");
    await section.locator('input[name="name"]').fill("Test Contact");
    await section.locator('input[name="email"]').fill("contact@test.com");
    await section.locator("textarea").fill("Ceci est un message de test Playwright.");

    await section.locator('button[type="submit"]').click();

    await expect(
      page.locator("text=/envoyé|merci|message reçu/i")
    ).toBeVisible({ timeout: 10000 });
  });
});
