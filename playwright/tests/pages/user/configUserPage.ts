import { type Page, type Locator } from '@playwright/test';

export class ConfigUserPage {
  page: Page;
  automateButton: Locator;
  inventoryButton: Locator;
  closePageButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.automateButton = page.getByRole('tab', { name: 'Automation' });
    this.inventoryButton = page.getByRole('tab', {
      name: 'Inventory',
      exact: true,
    });
    this.closePageButton = page
      .locator('header')
      .filter({ hasText: 'qa17(user:oms2)--' })
      .getByRole('button');
  }

  async clickAutomateButton() {
    await this.automateButton.click();
  }

  async clickInventoryButton() {
    await this.inventoryButton.click();
  }

  async clickClosePage() {
    await this.closePageButton.click();
  }
}
