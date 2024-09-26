import { test, expect } from '@playwright/test';
import { login, logoutAdmin } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

test.describe('Test e2e login - logout', () => {
  test('Verify that the user can perform login and logout', async ({
    page,
  }) => {
    await test.step('Verify that the user can login', async () => {
      await login(page, 'admin@shipedge.com', 'Admin123');
      await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
      expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
    });

    await test.step('Verify that the user can logout', async () => {
      await logoutAdmin(page);
      await page.waitForURL(globals.LOGIN_URL);
      expect(page.url()).toBe(globals.LOGIN_URL);
    });
  });
});
