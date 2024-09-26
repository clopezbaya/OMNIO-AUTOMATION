import { test, expect } from '@playwright/test';
import { login, logoutAdmin } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

(async () => {
  test.describe('Logout to Omnio', () => {
    test('smoke: Verify the correct logout to Omnio', async ({ page }) => {
      await test.step('Login to Omnio', async () => {
        await login(page, 'admin@shipedge.com', 'Admin123');
        await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
        expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
      });

      await test.step('Logout to Omnio', async () => {
        await logoutAdmin(page);
        await page.waitForURL(globals.LOGIN_URL);
        expect(page.url()).toBe(globals.LOGIN_URL);
      });
    });
  });
})();
