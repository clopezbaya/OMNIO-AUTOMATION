import { test, expect } from '@playwright/test';
import { login, registerWarehouse } from '../helpers/authAdminHelper';
import { NewWarehousePage } from '../pages/admin/newWarehousePage';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { globals } from '../../globals';

(async () => {
  test.describe('Register new Warehouse', () => {
    test('Verify te correct register of new Warehouse', async ({ page }) => {
      const newWarehouseAdmin = new NewWarehousePage(page);
      const dashboardAdmin = new DashAdminPage(page);
      await test.step('Login to Omnio', async () => {
        await login(page, 'admin@shipedge.com', 'Admin123');
        await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
        expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
      });

      await test.step('Go to New Warehouse View', async () => {
        await dashboardAdmin.clickWarehousesButton();
        await dashboardAdmin.clickNewWarehousesButton();
        expect(page.url()).toBe(globals.WAREHOUSE_CREATE);
      });

      await test.step('Register Data of Warehouse', async () => {
        await registerWarehouse(
          page,
          globals.WAREHOUSE_TEST.NAME,
          globals.WAREHOUSE_TEST.SERVER_NAME,
          globals.WAREHOUSE_TEST.FIRST_ADDRESS,
          globals.WAREHOUSE_TEST.PREFIX,
          globals.WAREHOUSE_TEST.SECOND_ADDRESS,
          globals.WAREHOUSE_TEST.URL,
          globals.WAREHOUSE_TEST.URL_IMAGES,
          globals.WAREHOUSE_TEST.FIRST_PHONE,
          globals.WAREHOUSE_TEST.SECOND_PHONE,
          globals.WAREHOUSE_TEST.COUNTRY,
          globals.WAREHOUSE_TEST.STATE,
          globals.WAREHOUSE_TEST.CITY,
          globals.WAREHOUSE_TEST.POSTAL_CODE,
          globals.WAREHOUSE_TEST.DESCRIPTION,
          globals.WAREHOUSE_TEST.FAX,
          globals.WAREHOUSE_TEST.CORPORAT_EMAIL
        );
        await newWarehouseAdmin.clickSave();
        await expect(
          page.getByText('Warehouse created successly')
        ).toBeVisible();
      });
    });
  });
})();
