import { test, expect } from "@playwright/test";

/**
 * Tests E2E — Page d'accueil
 */
test.describe("Page d'accueil", () => {
  test("charge correctement et affiche le nom de l'artisan", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Bandar Hamoud/i);
    await expect(page.locator("text=Bandar Hamoud")).toBeVisible();
  });

  test("le menu de navigation est visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
  });

  test("la section Services est accessible depuis le menu", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Services");
    await expect(page.locator("#services")).toBeVisible();
  });

  test("la section Contact est accessible depuis le menu", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Contact");
    await expect(page.locator("#contact")).toBeVisible();
  });
});
