import { test, expect } from '@playwright/test';
import { login, logoutAdmin, logoutUser } from '../helpers/authAdminHelper';
import { loginShipedgeIloc } from '../helpers/authUserHelper';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { ListCompanyPage } from '../pages/admin/listCompanyPage';
import { globals } from '../../globals';
import { LoginPage } from '../pages/admin/loginPage';
import { DashUserPage } from '../pages/user/dashUserPage';
import { NewILocPage } from '../pages/user/newILocPage';
import { ILocShipedgePopUpPage } from '../pages/user/iLocShipedgePopUpPage';

test.describe('Company connect with Shippedge', async () => {
  test('smoke: Verify te correct connection Company - Iloc', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
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

    await test.step('Verify that the user can Login', async () => {
      await login(page, 'admin@shipedge.com', 'Admin123');
      await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
      expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
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
    });

    await test.step('Verify that the user can logout', async () => {
      const firstLetter = globals.COMPANY_TEST.COMPANY.charAt(0);
      firstLetter.toUpperCase();
      await logoutUser(page, firstLetter);
      await page.waitForURL(globals.LOGIN_URL);
      await expect(page.url()).toBe(globals.LOGIN_URL);
    });

    await test.step('Cleanning Register Company', async () => {
      await loginPage.userEmailField.isVisible();
      await loginPage.fillUserEmailField('admin@shipedge.com');
      await loginPage.fillPasswordField('Admin123');
      await loginPage.clickLogin();
      await dashboardAdmin.clickCompanyButton();
      await dashboardAdmin.clickListCompaniesButton();
      await dashboardListAdmin.clickCompanySelected();
      await dashboardListAdmin.clickWarehouses();
      await dashboardListAdmin.clickDeleteConnection();
      await expect(page.getByText(globals.WAREHOUSE_TEST.NAME)).toHaveCount(0);
      await logoutAdmin(page);
      await page.waitForURL(globals.LOGIN_URL);
      await expect(page.url()).toBe(globals.LOGIN_URL);
    });
  });
});
