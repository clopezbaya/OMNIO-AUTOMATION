import { test, expect, BrowserContext, Page } from '@playwright/test';
import { login, logoutAdmin } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

(async () => {
  test.describe('Logout to Omnio', () => {
    test('smoke: Verify the correct logout to Omnio', async () => {
      await test.step('Login to Omnio', async () => {
        await login(page, 'aadmin@shipedge.com', 'Admin123');
        await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
        expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
      });

      await test.step('Logout to Omnio', async () => {
        await logoutAdmin(page);
        await page.waitForURL(globals.LOGIN_URL);
        expect(page.url()).toBe(globals.LOGIN_URL);
        await page.close();
        await browserContext.close();
      });
    });
  });
})();
