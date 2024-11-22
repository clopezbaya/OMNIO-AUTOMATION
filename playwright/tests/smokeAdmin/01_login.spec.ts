import { expect } from '@playwright/test';
import { test } from '../fixturesAdmin';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { globals } from '../../globals';

test.describe('Login to Omnio', () => {
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });

  test('smokeAdmin: Verify the correct login to Omnio', async ({
    isLoggedIn,
    page,
  }) => {
    expect(isLoggedIn).toBe(true);
    await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
    expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
  });
});
