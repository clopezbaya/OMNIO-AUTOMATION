import { test, expect, BrowserContext, Page } from '@playwright/test';
import {
  login,
  registerWarehouse,
  registerConnectionWarehouse,
} from '../helpers/authAdminHelper';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { ListWarehousePage } from '../pages/admin/listWarehousePage';
import { globals } from '../../globals';
import { WarehouseEditPage } from '../pages/admin/warehouseEditPage';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

(async () => {
  test.describe('Register new Warehouse', () => {
    test('smoke: Verify te correct register of new Warehouse', async () => {
      const dashboardAdmin = new DashAdminPage(page);
      const listWarehousePage = new ListWarehousePage(
        page,
        globals.WAREHOUSE_CONNECTION_DATA.NAME
      );
      const warehouseEditPage = new WarehouseEditPage(page);
      await test.step('Login to Omnio', async () => {
        await login(page, 'admin@shipedge.com', 'Admin123');
        await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
        expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
      });

      await test.step('Go to New Warehouse View', async () => {
        await dashboardAdmin.clickWarehousesButton();
        await dashboardAdmin.clickNewWarehousesButton();
        await page.waitForURL(globals.WAREHOUSE_CREATE);
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
        await expect(
          page.getByText('Warehouse create successly')
        ).toBeVisible();
        await page.waitForURL(globals.WAREHOUSES_LIST);
        expect(page.url()).toBe(globals.WAREHOUSES_LIST);
      });

      await test.step('Register data of Database of Connection', async () => {
        await listWarehousePage.clickEditConection();
        await warehouseEditPage.clickConnectionButton();
        await registerConnectionWarehouse(
          page,
          globals.WAREHOUSE_CONNECTION_DATA.NAME,
          globals.WAREHOUSE_CONNECTION_DATA.TYPE_DATA_BASE,
          globals.WAREHOUSE_CONNECTION_DATA.HOST,
          globals.WAREHOUSE_CONNECTION_DATA.PORT,
          globals.WAREHOUSE_CONNECTION_DATA.DATABASE,
          globals.WAREHOUSE_CONNECTION_DATA.USERNAME,
          globals.WAREHOUSE_CONNECTION_DATA.PASSWORD,
          globals.WAREHOUSE_CONNECTION_DATA.CHARACTER,
          globals.WAREHOUSE_CONNECTION_DATA.COLLATION,
          globals.WAREHOUSE_CONNECTION_DATA.TIME_ZONE
        );
        await expect(
          page.getByText('Connection create successly')
        ).toBeVisible();
      });

      await test.step('Verify Correct Connection', async () => {
        await dashboardAdmin.clickListWarehousesButton();
        await listWarehousePage.clickCheckConnectionIloc();
        await expect(page.getByText('Success connection')).toBeVisible();
        await page.close();
        await browserContext.close();
      });

      // await test.step('Cleanning Register', async () => {
      //   await listWarehousePage.clickDeleteConection();
      //   await expect(
      //     page.getByText('Warehouse removed successly')
      //   ).toBeVisible();
      //   await browserContext.close();
      // });
    });
  });
})();
