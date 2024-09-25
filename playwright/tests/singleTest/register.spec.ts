import { test, Browser, expect, Page } from '@playwright/test';
import { registerCompany } from '../helpers/authAdmin';
import { Login } from '../pages/admin/login';

(async () => {
  test.describe('Register in Omnio', () => {
    test('smoke: Verify the correct Register to Omnio', async ({ page }) => {
      let login = new Login(page);
      await test.step('Surfing to Omnio web', async () => {
        await page.goto('/');
        await expect(page).toHaveTitle('OmniOrders - Ecommerce Automation');
      });

      await test.step('Entering to Sign Up Form', async () => {
        login.clickSignUp();
      });

      await test.step('Fill form', async () => {
        await registerCompany(
          page,
          'David',
          'Pizarro Villca',
          'david1@gmail.com',
          'Shipedge123.',
          'David Company',
          'David Pizarro Villca',
          'United States',
          'New York',
          'Rochester',
          '1000 Genesee St',
          85839284,
          14611
        );
      });

      //   await test.step('Regigster new Company', async () => {
      //     await expect(page.getByText('Dashboard Admin')).toBeVisible();
      //   });
    });
  });
})();
