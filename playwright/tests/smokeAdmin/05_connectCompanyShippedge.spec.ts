import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { login, logoutAdmin } from '../helpers/authAdminHelper';
import { loginShipedgeIloc, logoutUser } from '../helpers/authUserHelper';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { ListCompanyPage } from '../pages/admin/listCompanyPage';
import { globals } from '../../globals';
import { DashUserPage } from '../pages/user/dashUserPage';
import { NewILocPage } from '../pages/user/newILocPage';
import { ILocShipedgePopUpPage } from '../pages/user/iLocShipedgePopUpPage';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { ListWarehousePage } from '../pages/admin/listWarehousePage';

test.describe('Company connect with Shippedge', async () => {
  test.afterAll(async ({ page }) => {
    await logoutUser(page, globals.COMPANY_TEST.COMPANY[0]);
    const dashboardAdmin = new DashAdminPage(page);
    const listWarehousePage = new ListWarehousePage(
      page,
      globals.WAREHOUSE_TEST.NAME
    );
    const dashboardUser = new DashUserPage(page);

    // Login as admin
    await login(page, 'admin@shipedge.com', 'Admin123');
    await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
    // Delete warehouse
    await dashboardAdmin.clickWarehousesButton();
    await dashboardAdmin.clickListWarehousesButton();
    const isVisibleBanner = await dashboardUser.closeBannerLocator.isVisible();
    if (isVisibleBanner) {
      await dashboardUser.closeBanner();
    }
    await listWarehousePage.clickDeleteConection();
    await expect(page.getByText('Warehouse removed successly')).toBeVisible();

    await closeBrowserIfNoTests();
  });

  test('smokeAdmin: Verify te correct connection Company - Iloc', async ({
    isOpenBrowser,
    companyCreated,
    isLoggedIn,
    warehouseCreated,
    warehouseConnected,
    page,
  }) => {
    const dashboardAdmin = new DashAdminPage(page);
    const dashboardListAdmin = new ListCompanyPage(
      page,
      globals.COMPANY_TEST.COMPANY,
      globals.WAREHOUSE_TEST.NAME
    );

    const dashboardUser = new DashUserPage(page);
    const dashboardNewInventoryLocation = new NewILocPage(
      page,
      globals.ILOC_SHIPEDGE.NAME
    );
    const iLocShipedgePopUp = new ILocShipedgePopUpPage(page);

    await test.step('Prerequirements done', async () => {
      expect(isOpenBrowser).toBe(true);
      expect(companyCreated).toBe(true);
      expect(isLoggedIn).toBe(true);
      expect(warehouseCreated).toBe(true);
      expect(warehouseConnected).toBe(true);
      await page.goto(globals.DASHBOARD_ADMIN_URL);
    });

    await test.step('Verify that the user can go to List Company', async () => {
      await dashboardAdmin.clickCompanyButton();
      await dashboardAdmin.clickListCompaniesButton();
      await dashboardListAdmin.clickCompanySelected();
      await dashboardListAdmin.clickWarehouses();
      expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
    });

    await test.step('Verify that the user can select the WMS to connect', async () => {
      await dashboardListAdmin.clickCreateConection();
      await dashboardListAdmin.selectkWarehuseConnection();
      await dashboardListAdmin.clickButtonAssigned();
      await expect(page.getByText('qa17', { exact: true })).toBeVisible();
      await dashboardListAdmin.loginUser();
      await page.waitForURL(globals.DASHBOARD_URL);
      await expect(page.url()).toBe(globals.DASHBOARD_URL);
    });

    await test.step('Verify that the user can connect with iLoc', async () => {
      const isVisibleBanner =
        await dashboardUser.closeBannerLocator.isVisible();
      if (isVisibleBanner) {
        await dashboardUser.closeBanner();
      }
      await dashboardUser.clickSettings();
      await dashboardUser.clickNewInventoryLocation();
      await dashboardNewInventoryLocation.clickILocSelected();
      await iLocShipedgePopUp.clickDropDownWarehouse(
        globals.WAREHOUSE_TEST.NAME
      );
      await loginShipedgeIloc(
        page,
        globals.ILOC_SHIPEDGE.USERNAME,
        globals.ILOC_SHIPEDGE.PASSWORD
      );
      await expect(page.getByText('Save succesfully')).toBeVisible();
    });

    await test.step('Deleting Connection', async () => {
      await dashboardNewInventoryLocation.deleteILoc(
        globals.WAREHOUSE_TEST.NAME
      );
      await expect(page.getByText('Remove succesfully')).toBeVisible();
      // await page.close();
      //await browserContext.close();
    });
  });
});
