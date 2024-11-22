import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
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
      .locator('#tab-4')
      .getByLabel('Name')
      .getByRole('textbox');
  }

  async refreshInventory() {
    await this.nameFilter.click();
    await this.nameFilter.press('Enter');
  }
}
