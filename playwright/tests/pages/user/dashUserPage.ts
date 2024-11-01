import { type Page, type Locator } from '@playwright/test';

export class DashUserPage {
  page: Page;
  settingsButton: Locator;
  newInventoryLocationBUtton: Locator;
  closeBannerLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = page.getByText('Settings');
    this.newInventoryLocationBUtton = page.getByText('New Inventory Location');
    this.closeBannerLocator = page.getByLabel('Close Stonly banner');
  }

  async clickSettings() {
    await this.settingsButton.click();
  }

  async clickNewInventoryLocation() {
    await this.newInventoryLocationBUtton.scrollIntoViewIfNeeded();
    await this.newInventoryLocationBUtton.click();
  }

  async closeBanner() {
    await this.closeBannerLocator.click();
  }
}
