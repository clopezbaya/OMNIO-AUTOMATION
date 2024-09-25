import { type Page, type Locator } from '@playwright/test';

export class DashboardUser {
  page: Page;
  settingsButton: Locator;
  newInventoryLocationBUtton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = page.getByText('Settings');
    this.newInventoryLocationBUtton = page.getByText('New Inventory Location');
  }

  async clickSettings() {
    await this.settingsButton.click();
  }

  async clickNewInventoryLocation() {
    await this.newInventoryLocationBUtton.click();
  }
}
