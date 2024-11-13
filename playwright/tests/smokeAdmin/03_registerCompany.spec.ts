import { expect } from '@playwright/test';
import { test } from '../fixtures';
import { closeBrowserIfNoTests } from '../../setupContext/context';

(async () => {
  test.describe('Register in Omnio', () => {
    test.afterAll(async () => {
      await closeBrowserIfNoTests();
    });
    test('smokeAdmin: Verify the correct Register to Omnio', async ({
      isOpenBrowser,
      companyCreated,
    }) => {
      await test.step('Fill Sign Up Form', async () => {
        expect(isOpenBrowser).toBe(true);
        expect(companyCreated).toBe(true);
      });
    });
  });
})();
