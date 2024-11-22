import { test as base, Page } from '@playwright/test';
import { login } from './helpers/authAdminHelper';
import { globals } from '../globals';
import { setupContext } from '../setupContext/context';
import { ProductsPage } from './pages/user/productsPage';
import { NewProductPage } from './pages/user/newProductPage';
import { DashUserPage } from './pages/user/dashUserPage';

type TestFixtures = {
  isOpenBrowser: boolean;
  isProductCreated: boolean;
  isLoggedIn: boolean;
  page: Page;
};

let openBrowser = false;
let loggedIn = false;
let productCreated = false;

const test = base.extend<TestFixtures>({
  page: async ({}, use) => {
    const { page } = await setupContext(); // Llama a setupContext para obtener la página
    await use(page);
  },
  isLoggedIn: async ({ page }, use) => {
    const username = globals.COMPANY_TEST.EMAIL;
    const password = globals.COMPANY_TEST.PASSWORD;

    if (!loggedIn) {
      await login(page, username, password);
      loggedIn = true;
      openBrowser = true;
    }

    await use(loggedIn);
  },

  isOpenBrowser: async ({ page }, use) => {
    if (!openBrowser) {
      await page.goto('/');
      openBrowser = true;
    }

    await use(openBrowser);
  },

  isProductCreated: async ({ page }, use) => {
    if (!productCreated) {
      const productsPage = new ProductsPage(page);
      const newProductPage = new NewProductPage(page);
      const dashUserPage = new DashUserPage(page);
      await dashUserPage.clickProducts();
      await dashUserPage.clickInventory();
      await productsPage.clickCreateNewProduct();
      await newProductPage.newProduct(
        globals.PRODUCT_TEST.PRODUCT_NAME,
        globals.PRODUCT_TEST.DESCRIPTION,
        globals.PRODUCT_TEST.WEIGHT,
        globals.PRODUCT_TEST.WIDTH,
        globals.PRODUCT_TEST.HEIGHT,
        globals.PRODUCT_TEST.LENGTH
      );
      productCreated = true;
    }

    await use(productCreated);
  },
});

export { test };
