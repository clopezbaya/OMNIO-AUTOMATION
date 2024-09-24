import { test, expect } from '@playwright/test';
import { login, logoutUser, registerCompany } from '../helpers/auth';
import { Dashboard } from '../pages/dashboard';
import { DashboardList } from '../pages/dashboardList';
import { globals } from '../../globals';
import { Login } from '../pages/login';

let nameCompany = 'David Company';
let warehouseSelected = globals.WAREHOUSE;

test.describe('Company connect with Shippedge', async () => {
  test('Verify that we can connect the new company with warehouse in Shipedge', async ({
    page,
  }) => {
    const loginPage = new Login(page);
    const dashboard = new Dashboard(page);
    const dashboardList = new DashboardList(
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
      await dashboard.clickCompanyButton();
      await dashboard.clickListButton();
      await dashboardList.clickCompanySelected();
      await dashboardList.clickWarehouses();
      expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
    });

    await test.step('Verify that the user can select the WMS to connect', async () => {
      await dashboardList.clickCreateConection();
      await dashboardList.selectkWarehuseConnection();
      await dashboardList.clickButtonAssigned();
      expect(await page.getByText('qa17', { exact: true })).toBeVisible();
      await dashboardList.loginUser();
      await page.waitForURL(globals.DASHBOARD_URL);
      expect(page.url()).toBe(globals.DASHBOARD_URL);
    });

    await test.step('Verify that the user can logout', async () => {
      const firstLetter = nameCompany.charAt(0);
      firstLetter.toUpperCase();
      await logoutUser(page, firstLetter);
      await page.waitForURL(globals.LOGIN_URL);
      expect(page.url()).toBe(globals.LOGIN_URL);
    });

    await test.step('Cleanning Register', async () => {
      await loginPage.userEmailField.isVisible();
      await loginPage.fillUserEmailField('admin@shipedge.com');
      await loginPage.fillPasswordField('Admin123');
      await loginPage.clickLogin();
      await dashboard.clickCompanyButton();
      await dashboard.clickListButton();
      await dashboardList.clickCompanySelected();
      await dashboardList.clickWarehouses();
      await dashboardList.clickDeleteConnection();
      expect(await page.getByText(globals.WAREHOUSE)).toHaveCount(0);
    });
  });
});
