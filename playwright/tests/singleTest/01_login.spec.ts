import { test, expect, BrowserContext, Page } from '@playwright/test';
import { login } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

test.describe('Login to Omnio', () => {
  test('smoke: Verify the correct login to Omnio', async () => {
    // Usar las variables de entorno o las de globals
    const username =
      process.env.LOGIN_USERNAME || globals.LOGIN_ADMIN_OMNIO.USERNAME;
    const password =
      process.env.LOGIN_PASSWORD || globals.LOGIN_ADMIN_OMNIO.PASSWORD;

    // Llamar al helper login con las credenciales
    await login(page, username, password);
    await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
    expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
  });
});

test.afterAll(async () => {
  await page.close();
  await browserContext.close();
});
