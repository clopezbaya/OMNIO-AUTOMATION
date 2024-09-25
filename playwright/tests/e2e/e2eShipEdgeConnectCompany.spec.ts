import { test, expect } from '@playwright/test';
import {
  login,
  logoutAdmin,
  logoutUser,
  registerCompany,
} from '../helpers/authAdmin';
import { loginShipedgeIloc } from '../helpers/authUser';
import { DashboardAdmin } from '../pages/admin/dashboardAdmin';
import { DashboardListAdmin } from '../pages/admin/dashboardListAdmin';
import { globals } from '../../globals';
import { Login } from '../pages/admin/login';
import { DashboardUser } from '../pages/user/dashboardUser';
import { DashboardNewInventoryLocationUser } from '../pages/user/dashboardNewInventoryLocationUser';
import { ILocShipedgePopUp } from '../pages/user/iLocShipedgePopUp';

test.describe('Company connect with Shippedge', async () => {
  test('Verify that we can connect the new company with warehouse in Shipedge', async ({
    page,
  }) => {
    const loginPage = new Login(page);
    const dashboardAdmin = new DashboardAdmin(page);
    const dashboardListAdmin = new DashboardListAdmin(
      page,
      globals.COMPANYTEST.COMPANY,
      globals.WAREHOUSE
    );

    const dashboardUser = new DashboardUser(page);
    const dashboardNewInventoryLocation = new DashboardNewInventoryLocationUser(
      page,
      globals.ILOCSHIPEDGE.NAME
    );
    const iLocShipedgePopUp = new ILocShipedgePopUp(page);

    await test.step('Surfing to Omnio web', async () => {
      await page.goto('/');
      await expect(page).toHaveTitle('OmniOrders - Ecommerce Automation');
    });

    await test.step('Entering to Sign Up Form', async () => {
      loginPage.clickSignUp();
    });

    await test.step('Verify that the user can register new Company', async () => {
      await registerCompany(
        page,
        'David',
        'Pizarro Villca',
        'david1@gmail.com',
        'Shipedge123.',
        globals.COMPANYTEST.COMPANY,
        'David Pizarro Villca',
        'United States',
        'New York',
        'Rochester',
        '1000 Genesee St',
        85839284,
        14611
      );
    });

    await test.step('Verify that the user can Login', async () => {
      await login(page, 'admin@shipedge.com', 'Admin123');
      await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
      expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
    });

    await test.step('Verify that the user can go to List Company', async () => {
      await dashboardAdmin.clickCompanyButton();
      await dashboardAdmin.clickListButton();
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
      await iLocShipedgePopUp.clickDropDownWarehouse(globals.WAREHOUSE);
      await loginShipedgeIloc(
        page,
        globals.ILOCSHIPEDGE.USERNAME,
        globals.ILOCSHIPEDGE.PASSWORD
      );
      await expect(page.getByText('Save succesfully')).toBeVisible();
    });

    await test.step('Deleting Connection', async () => {
      await dashboardNewInventoryLocation.deleteILoc(globals.WAREHOUSE);
      await expect(page.getByText('Remove succesfully')).toBeVisible();
    });

    await test.step('Verify that the user can logout', async () => {
      const firstLetter = globals.COMPANYTEST.COMPANY.charAt(0);
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
      await dashboardAdmin.clickListButton();
      await dashboardListAdmin.clickCompanySelected();
      await dashboardListAdmin.clickWarehouses();
      await dashboardListAdmin.clickDeleteConnection();
      await expect(page.getByText(globals.WAREHOUSE)).toHaveCount(0);
      await logoutAdmin(page);
      await page.waitForURL(globals.LOGIN_URL);
      await expect(page.url()).toBe(globals.LOGIN_URL);
    });
  });
});
