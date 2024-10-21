import { test, Browser, expect, Page, BrowserContext } from '@playwright/test';
import { registerCompany } from '../helpers/authAdminHelper';
import { LoginPage } from '../pages/admin/loginPage';
import { globals } from '../../globals';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

(async () => {
  test.describe('Register in Omnio', () => {
    test('smoke: Verify the correct Register to Omnio', async () => {
      let login = new LoginPage(page);
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
          globals.COMPANY_TEST.FIRST_NAME,
          globals.COMPANY_TEST.LAST_NAME,
          globals.COMPANY_TEST.EMAIL,
          globals.COMPANY_TEST.PASSWORD,
          globals.COMPANY_TEST.COMPANY,
          globals.COMPANY_TEST.CONTACT_FULL_NAME,
          globals.COMPANY_TEST.COUNTRY,
          globals.COMPANY_TEST.STATE,
          globals.COMPANY_TEST.CITY,
          globals.COMPANY_TEST.ADDRESS,
          globals.COMPANY_TEST.PHONE,
          globals.COMPANY_TEST.POSTAL_CODE
        );
        await page.close();
        await browserContext.close();
      });

      //   await test.step('Regigster new Company', async () => {
      //     await expect(page.getByText('Dashboard Admin')).toBeVisible();
      //   });
    });
  });
})();
