import { test, expect } from '@playwright/test';
import {
  login,
  logoutAdmin,
  logoutUser,
  registerCompany,
} from '../helpers/auth';
import { DashboardAdmin } from '../pages/dashboardAdmin';
import { DashboardListAdmin } from '../pages/dashboardListAdmin';
import { globals } from '../../globals';
import { Login } from '../pages/login';

let nameCompany = 'David Company';
let warehouseSelected = globals.WAREHOUSE;

test.describe('Company connect with Shippedge', async () => {
  test('Verify that we can connect the new company with warehouse in Shipedge', async ({
    page,
  }) => {
    const loginPage = new Login(page);
    const dashboardAdmin = new DashboardAdmin(page);
    const dashboardListAdmin = new DashboardListAdmin(
      page,
      nameCompany,
      warehouseSelected
    );

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
        nameCompany,
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

    await test.step('Verify that the user can logout', async () => {
      const firstLetter = nameCompany.charAt(0);
      firstLetter.toUpperCase();
      await logoutUser(page, firstLetter);
      await page.waitForURL(globals.LOGIN_URL);
      await expect(page.url()).toBe(globals.LOGIN_URL);
    });

    await test.step('Cleanning Register', async () => {
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
