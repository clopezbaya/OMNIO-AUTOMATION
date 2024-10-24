import { test as base, Page } from '@playwright/test';
import {
  login,
  registerCompany,
  registerWarehouse,
  registerConnectionWarehouse,
} from './helpers/authAdminHelper';
import { globals } from '../globals';
import { setupContext } from '../setupContext/context';
import { LoginPage } from './pages/admin/loginPage';
import { DashAdminPage } from './pages/admin/dashAdminPage';
import { ListWarehousePage } from './pages/admin/listWarehousePage';
import { WarehouseEditPage } from './pages/admin/warehouseEditPage';

type TestFixtures = {
  isLoggedIn: boolean;
  isOpenBrowser: boolean;
  setLoggedIn: (status: boolean) => void;
  companyCreated: boolean;
  warehouseCreated: boolean;
  warehouseConnected: boolean;
  page: Page;
};

let openBrowser = false;
let loggedIn = false;
let companyCreated = false;
let warehouseCreated = false;
let warehouseConnected = false;

const test = base.extend<TestFixtures>({
  page: async ({}, use) => {
    const { page } = await setupContext(); // Llama a setupContext para obtener la página
    await use(page);
  },

  isLoggedIn: async ({ page }, use) => {
    const username =
      process.env.LOGIN_USERNAME || globals.LOGIN_ADMIN_OMNIO.USERNAME;
    const password =
      process.env.LOGIN_PASSWORD || globals.LOGIN_ADMIN_OMNIO.PASSWORD;

    if (!loggedIn) {
      await login(page, username, password);
      loggedIn = true;
      openBrowser = true;
    }

    await use(loggedIn);
  },

  setLoggedIn: async ({}, use) => {
    const setLoggedInFn = (status: boolean) => {
      loggedIn = status;
    };

    await use(setLoggedInFn);
  },

  isOpenBrowser: async ({ page }, use) => {
    if (!openBrowser) {
      await page.goto('/');
      openBrowser = true;
    }

    await use(openBrowser);
  },

  companyCreated: async ({ page }, use) => {
    if (!companyCreated) {
      const login = new LoginPage(page);
      await login.clickSignUp();
      await registerCompany(
        page,
        globals.COMPANY_TEST.FIRST_NAME,
        globals.COMPANY_TEST.LAST_NAME,
        globals.COMPANY_TEST.EMAIL,
        globals.COMPANY_TEST.PASSWORD,
        globals.COMPANY_TEST.COMPANY,
        globals.COMPANY_TEST.CONTACT_FULL_NAME,
        globals.COMPANY_TEST.COUNTRY,
        globals.COMPANY_TEST.STATE,
        globals.COMPANY_TEST.CITY,
        globals.COMPANY_TEST.ADDRESS,
        globals.COMPANY_TEST.PHONE,
        globals.COMPANY_TEST.POSTAL_CODE
      );
      companyCreated = true;
    }

    await use(companyCreated);
  },

  warehouseCreated: async ({ page }, use) => {
    if (!warehouseCreated) {
      const dashboardAdmin = new DashAdminPage(page);
      await dashboardAdmin.clickWarehousesButton();
      await dashboardAdmin.clickNewWarehousesButton();
      await page.waitForURL(globals.WAREHOUSE_CREATE);

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
      warehouseCreated = true;
    }

    await use(warehouseCreated);
  },

  warehouseConnected: async ({ warehouseCreated, page }, use) => {
    if (warehouseCreated) {
      const listWarehousePage = new ListWarehousePage(
        page,
        globals.WAREHOUSE_CONNECTION_DATA.NAME
      );
      const warehouseEditPage = new WarehouseEditPage(page);

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
      warehouseConnected = true;
    }

    await use(warehouseConnected);
  },
});

export { test };
