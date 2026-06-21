import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Formulaire de réservation
 */
test.describe("Formulaire de réservation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#booking");
  });

  test("affiche le formulaire de réservation", async ({ page }) => {
    await expect(page.locator("#booking")).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="phone"]')).toBeVisible();
  });

  test("affiche une erreur si soumis vide", async ({ page }) => {
    // Essayer de soumettre sans remplir
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();
    // Le navigateur doit bloquer via HTML5 required
    const nameInput = page.locator('input[name="name"]');
    const validationMessage = await nameInput.evaluate(
      (el: HTMLInputElement) => el.validationMessage
    );
    expect(validationMessage).not.toBe("");
  });

  test("soumet le formulaire avec données valides", async ({ page }) => {
    await page.fill('input[name="name"]', "Test Playwright");
    await page.fill('input[name="email"]', "test@playwright.com");
    await page.fill('input[name="phone"]', "0600000000");
    await page.fill('input[name="date"]', "2026-08-01");

    // Sélectionner le type de travaux (select ou input)
    const workTypeField = page.locator('select[name="workType"], input[name="workType"]');
    if (await workTypeField.count() > 0) {
      const tag = await workTypeField.evaluate((el) => el.tagName.toLowerCase());
      if (tag === "select") {
        await workTypeField.selectOption({ index: 1 });
      } else {
        await workTypeField.fill("Peinture intérieure");
      }
    }

    await page.click('button[type="submit"]');

    // Attendre un message de succès ou confirmation
    await expect(
      page.locator("text=/succès|confirmé|envoyé|merci/i")
    ).toBeVisible({ timeout: 10000 });
  });
});
