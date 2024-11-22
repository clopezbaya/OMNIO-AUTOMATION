import { type Page, type Locator } from '@playwright/test';

export class ProductsPage {
  page: Page;
  createNewProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewProductButton = page.getByRole('link', {
      name: 'New Product',
    });
  }

  async clickCreateNewProduct() {
    await this.createNewProductButton.waitFor({ state: 'visible' });
    await this.createNewProductButton.click();
  }
}
