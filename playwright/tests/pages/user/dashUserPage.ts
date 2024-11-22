import { type Page, type Locator } from '@playwright/test';

export class DashUserPage {
  page: Page;
  settingsButton: Locator;
  productsButton: Locator;
  inventoryButton: Locator;
  newInventoryLocationBUtton: Locator;
  closeBannerLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsButton = page.getByText('Settings');
    this.newInventoryLocationBUtton = page.getByText('New Inventory Location');
    this.productsButton = page.getByText('Products', { exact: true });
    this.inventoryButton = page.getByRole('link', {
      name: 'Inventory',
      exact: true,
    });
    this.closeBannerLocator = page.getByLabel('Close Stonly banner');
  }

  async clickSettings() {
    await this.settingsButton.click();
  }

  async clickNewInventoryLocation() {
    await this.newInventoryLocationBUtton.scrollIntoViewIfNeeded();
    await this.newInventoryLocationBUtton.click();
  }

  async clickProducts() {
    await this.productsButton.click();
  }

  async clickInventory() {
    await this.inventoryButton.click();
  }

  async closeBanner() {
    if (await this.closeBannerLocator.isVisible()) {
      await this.closeBannerLocator.click();
    }
  }
}
