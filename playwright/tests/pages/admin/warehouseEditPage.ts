import { Page, Locator } from '@playwright/test';

export class WarehouseEditPage {
  warehouseButton: Locator;
  connectionButton: Locator;
  constructor(page: Page) {
    this.warehouseButton = page.getByRole('tab', { name: 'Warehouse' });
    this.connectionButton = page.getByRole('tab', { name: 'Connection' });
  }

  async clickWarehouseButton() {
    await this.warehouseButton.click();
  }

  async clickConnectionButton() {
    await this.connectionButton.click();
  }
}
