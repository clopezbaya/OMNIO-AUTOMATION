import { test, expect, BrowserContext, Page } from '@playwright/test';
import { login } from '../helpers/authAdminHelper';
import { globals } from '../../globals';

let browserContext: BrowserContext;
let page: Page;

test.beforeAll(async ({ browser }) => {
  console.log('Iniciando Test');
  browserContext = await browser.newContext();
  page = await browserContext.newPage();
});

test.describe('Login to Omnio', () => {
  test('smoke: Verify the correct login to Omnio', async () => {
    console.log('Iniciando Test');
    await login(page, 'admin@shipedge.com', 'Admin123');
    await page.waitForURL(globals.DASHBOARD_ADMIN_URL);
    expect(page.url()).toBe(globals.DASHBOARD_ADMIN_URL);
  });
});

test.afterAll(async () => {
  console.log('finalizando test');
  await page.close();
  await browserContext.close();
});
