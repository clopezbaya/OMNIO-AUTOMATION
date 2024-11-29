import { type Page, type Locator } from '@playwright/test';

export class OrderPage {
  page: Page;
  createNewOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewOrderButton = page.getByRole('link', { name: 'New Order' });
  }

  async clickCreateNewOrder() {
    await this.createNewOrderButton.waitFor({ state: 'visible' });
    await this.createNewOrderButton.click();
  }
}
