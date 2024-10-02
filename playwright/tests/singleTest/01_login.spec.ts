import { test, expect, BrowserContext, Page } from '@playwright/test';
import { login } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

(async () => {
  test.describe('Login to Omnio', () => {
    test('smoke: Verify the correct login to Omnio', async () => {
      await login(page, 'aadmin@shipedge.com', 'Admin123');
      await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
      expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
      await page.close();
      await browserContext.close();
    });
  });
})();
