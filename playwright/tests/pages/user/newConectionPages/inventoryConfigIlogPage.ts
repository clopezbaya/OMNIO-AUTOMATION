import { type Page, type Locator } from '@playwright/test';

export class InventoryConfigIlocPage {
  page: Page;
  pagination: Locator;
  skuFilter: Locator;
  nameFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pagination = page.getByRole('button', { name: 'Total visible' });
    this.skuFilter = page
      .getByLabel('SKU', { exact: true })
      .getByRole('textbox');
    this.nameFilter = page
      .getByLabel('SKU', { exact: true })
      .getByRole('textbox');
  }

  async refreshInventory() {
    await this.nameFilter.click();
    await this.nameFilter.press('Enter');
  }
}
