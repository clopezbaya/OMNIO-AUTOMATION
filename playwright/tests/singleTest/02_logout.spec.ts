import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { logoutAdmin } from '../helpers/authAdminHelper';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { globals } from '../../globals';

test.describe('Logout to Omnio', () => {
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });

  test('smoke: Verify the correct logout to Omnio', async ({
    page,
    isLoggedIn,
    setLoggedIn,
  }) => {
    expect(isLoggedIn).toBe(true);
    await logoutAdmin(page);
    await page.waitForURL(globals.LOGIN_URL);
    expect(page.url()).toBe(globals.LOGIN_URL);
    setLoggedIn(false);
  });
});
