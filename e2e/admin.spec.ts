import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Admin : protection et login
 */
test.describe("Admin — protection des routes", () => {
  test("redirige vers /admin/login si non authentifié", async ({ page }) => {
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("la page login affiche le formulaire de connexion", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("affiche une erreur avec un mauvais mot de passe", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="password"]', "mauvais_mdp_12345");
    await page.click('button[type="submit"]');
    await expect(
      page.locator("text=/incorrect|invalide|erreur/i")
    ).toBeVisible({ timeout: 5000 });
  });
});
