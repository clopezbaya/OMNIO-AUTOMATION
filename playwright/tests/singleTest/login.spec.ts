import { test, expect } from '@playwright/test';
import { login } from '../helpers/authAdmin';
import { globals } from '../../globals';

(async () => {
  test.describe('Login to Omnio', () => {
    test('Verify te correct login to Omnio', async ({ page }) => {
      await login(page, 'admin@shipedge.com', 'Admin123');
      await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
      expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
    });
  });
})();
