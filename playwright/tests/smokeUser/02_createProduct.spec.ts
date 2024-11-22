import { expect } from '@playwright/test';
import { test } from '../fixturesUser';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { globals } from '../../globals';
import { DashUserPage } from '../pages/user/dashUserPage';
import { NewILocPage } from '../pages/user/newILocPage';
import { ConfigUserPage } from '../pages/user/configUserPage';
import { AutomatePage } from '../pages/user/automatePage';
import { loginShipedgeIloc } from '../helpers/authUserHelper';
import { ILocShipedgePopUpPage } from '../pages/user/iLocShipedgePopUpPage';
import { InventoryPage } from '../pages/user/inventoryPage';

test.describe('Create products', () => {
  test.afterAll(async () => {
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
      expect(isProductCreated).toBe(true);
      const productLink = page.getByRole('link', {
        name: globals.PRODUCT_TEST.PRODUCT_NAME,
      });
      await productLink.waitFor({ state: 'visible' });
      await expect(productLink).toBeVisible();
    });
  });
});
