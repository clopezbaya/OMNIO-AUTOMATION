import { test as base, Page } from '@playwright/test';
import { login } from './helpers/authAdminHelper';
import { globals } from '../globals';
import { setupContext } from '../setupContext/context';
import { InventoryPage } from './pages/user/productPages/inventoryPage';
import { NewProductPage } from './pages/user/productPages/newProductPage';
import { DashUserPage } from './pages/user/dashUserPage';
import { ContactPage } from './pages/user/orderPages/contactPage';
import { OrderPage } from './pages/user/orderPages/orderPage';
import { NewOrderPage } from './pages/user/orderPages/newOrderPage';

type TestFixtures = {
  isOpenBrowser: boolean;
  isProductCreated: boolean;
  isContactCreated: boolean;
  isLoggedIn: boolean;
  page: Page;
};

let openBrowser = false;
let loggedIn = false;
let productCreated = false;
let contactCreated = false;

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
      const productsPage = new InventoryPage(page);
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

  isContactCreated: async ({ page }, use) => {
    if (!contactCreated) {
      const orderPage = new OrderPage(page);
      const newOrderPage = new NewOrderPage(page);
      const contactPage = new ContactPage(page);
      const dashUserPage = new DashUserPage(page);
      await dashUserPage.clickOrders();
      await dashUserPage.clickOrdersSubmenu();
      await orderPage.clickCreateNewOrder();
      await newOrderPage.clickCreateNewContact();
      await contactPage.clickNewContact();
      await contactPage.newContact(
        globals.CONTACT_TEST.COMPANY,
        globals.CONTACT_TEST.FIRST_NAME,
        globals.CONTACT_TEST.LAST_NAME,
        globals.CONTACT_TEST.ADDRESS,
        globals.CONTACT_TEST.EMAIL,
        globals.CONTACT_TEST.COUNTRY,
        globals.CONTACT_TEST.STATE,
        globals.CONTACT_TEST.CITY,
        globals.CONTACT_TEST.POSTAL_CODE
      );
      contactCreated = true;
    }

    await use(contactCreated);
  },
});

export { test };
