import { expect } from '@playwright/test';
import { test } from '../fixturesAdmin';
import { closeBrowserIfNoTests } from '../../setupContext/context';

(async () => {
  test.describe('Register in Omnio', () => {
    test.afterAll(async () => {
      await closeBrowserIfNoTests();
    });
    test('smokeAdmin: Verify the correct Creaction of company in OMNIO', async ({
      isOpenBrowser,
      companyCreated,
      page,
    }) => {
      await test.step('Fill Sign Up Form', async () => {
        expect(isOpenBrowser).toBe(true);
        expect(companyCreated).toBe(true);
        //await expect(page.getByText('User Logged in Success!')).toBeVisible();
      });
    });
  });
})();
