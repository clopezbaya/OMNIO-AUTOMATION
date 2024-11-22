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

test.describe('Sync Skus OMS and OMNIO', () => {
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });

  test('smokeUser: Verify the correct Sync of SKUs from OMS Shipedge', async ({
    isLoggedIn,
    page,
  }) => {
    const dashboardUser = new DashUserPage(page);
    const dashboardNewInventoryLocation = new NewILocPage(page);
    const configUserPage = new ConfigUserPage(page);
    const automatePage = new AutomatePage(page);
    const iLocShipedgePopUp = new ILocShipedgePopUpPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Preconditions', async () => {
      expect(isLoggedIn).toBe(true);
      await page.waitForURL(globals.DASHBOARD_URL);
      expect(page.url()).toBe(globals.DASHBOARD_URL);
      await dashboardUser.clickSettings();
      await dashboardUser.closeBanner();
      await dashboardUser.clickNewInventoryLocation();
      await dashboardNewInventoryLocation.closePopUpIloc();

      await dashboardNewInventoryLocation.deleteILoc(
        globals.WAREHOUSE_TEST_USER.NAME
      );

      await dashboardNewInventoryLocation.clickCreateNewILoc();
      await dashboardNewInventoryLocation.clickILocSelected(
        globals.ILOC_SHIPEDGE.NAME
      );
      await iLocShipedgePopUp.clickDropDownWarehouse(
        globals.WAREHOUSE_TEST_USER.NAME
      );
      await loginShipedgeIloc(
        page,
        globals.WAREHOUSE_TEST_USER.USERNAME,
        globals.WAREHOUSE_TEST_USER.PASSWORD
      );
      await expect(page.getByText('Save succesfully')).toBeVisible();
    });

    await test.step('Enter to automate view', async () => {
      await dashboardNewInventoryLocation.configILoc(
        globals.WAREHOUSE_TEST_USER.NAME
      );
      await configUserPage.clickAutomateButton();
      expect(page.getByText('Sync Inventory', { exact: true })).toBeTruthy();
    });

    await test.step('Verify that the Sync Inventory is running', async () => {
      await automatePage.clickCheckImportProducts();
      await automatePage.clickCheckImportSynsets();
      await automatePage.clickRadioImportSkuTranslator();
      await automatePage.clickWebhooks();
      await automatePage.clickButtonSyncInventory();
      await expect(page.getByText('The process is running.')).toBeVisible();
    });

    await test.step('Verify that the Inventory was Synchronized', async () => {
      await configUserPage.clickInventoryButton();
      await inventoryPage.refreshInventory();
      const cells = await page.getByRole('cell').all();
      expect(cells.length).toBeGreaterThan(0);
      await configUserPage.clickClosePage();
    });
  });
});
