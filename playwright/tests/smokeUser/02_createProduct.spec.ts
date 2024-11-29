import { expect } from '@playwright/test';
import { test } from '../fixturesUser';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { globals } from '../../globals';
import { InventoryPage } from '../pages/user/productPages/inventoryPage';

test.describe('Create products', async () => {
  test.afterAll(async ({ page }) => {
    const productsPage = new InventoryPage(page);
    await page.reload();
    await productsPage.checkProductInventory(globals.PRODUCT_TEST.PRODUCT_NAME);
    await productsPage.clickActionButton();
    await productsPage.clickDescontinueOption();
    await productsPage.selectDiscontinuedFilterOption();
    await productsPage.checkProductInventory(globals.PRODUCT_TEST.PRODUCT_NAME);
    await productsPage.clickActionButton();
    await productsPage.clickDeleteOption();
    await expect(page.getByText('Remove succesfully')).toBeVisible();
    await closeBrowserIfNoTests();
  });

  test('smokeUser: Verify the correct creation of product in Omnio', async ({
    isLoggedIn,
    isProductCreated,
    page,
  }) => {
    await test.step('Preconditions', async () => {
      expect(isLoggedIn).toBe(true);
    });

    await test.step('Create product with local Iloc', async () => {
      const selector = `role=link[name="${globals.PRODUCT_TEST.PRODUCT_NAME}"]`;
      expect(isProductCreated).toBe(true);
      const productLink = page.locator(selector);
      await page.waitForSelector(selector);
      await expect(productLink).toBeVisible();
    });
  });
});
