import { test, expect } from "@playwright/test";

test("root redirects to the main landing route", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/de\/endreinigung-oberwallis$/);
  await expect(
    page.getByRole("heading", { name: "Endreinigung im Oberwallis" })
  ).toBeVisible();
});
