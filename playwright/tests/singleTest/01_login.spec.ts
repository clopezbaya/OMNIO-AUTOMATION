import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { globals } from '../../globals';

test.describe('smoke: Login to Omnio', () => {
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });

  test('smoke: Verify the correct login to Omnio', async ({
    isLoggedIn,
    page,
  }) => {
    expect(isLoggedIn).toBe(true);
    await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
    expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
  });
});
