import { test, expect } from '@playwright/test';

test('items list is visible', async ({ page }) => {
    await page.goto('/en/items');
  
    const items = page.locator('[data-testid="item-card"]');
    await expect(items.first()).toBeVisible({ timeout: 15_000 });
    await expect(items).toHaveCount(12);
  });

test('navigate to item details', async ({ page }) => {
    test.skip(!!process.env.CI, 'Detail page depends on Open Library API (server-side); run locally');
    await page.goto('/en/items');
  
    const firstItem = page.locator('[data-testid="item-card"]').first();
    await expect(firstItem).toBeVisible({ timeout: 15_000 });
  
    const title = await firstItem.locator('[data-testid="item-title"]').textContent();
  
    await firstItem.locator('a').click();
  
    await expect(page).toHaveURL(/\/en\/items\/.+/, { timeout: 10_000 });
  
    const main = page.locator('main');
    await expect(main).not.toContainText('Loading...', { timeout: 60_000 });
    await expect(main).toContainText(title?.trim() ?? '', { timeout: 10_000 });
  });

test('pagination works correctly', async ({ page }) => {
  await page.goto('/en/items');

  const firstItemTitle = await page
    .locator('[data-testid="item-title"]')
    .first()
    .textContent();

  await page.click('[data-testid="pagination-next"]');

  await expect(page).toHaveURL(/page=2/);

  const newFirstItemTitle = await page
    .locator('[data-testid="item-title"]')
    .first()
    .textContent();

  expect(newFirstItemTitle).not.toBe(firstItemTitle);
});