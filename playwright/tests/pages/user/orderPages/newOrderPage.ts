import { type Page, type Locator } from '@playwright/test';

export class NewOrderPage {
  page: Page;
  createNewContactButton: Locator;
  channelButton: Locator;
  productButton: Locator;
  shippingInformationButton: Locator;
  saveOrderButton: Locator;
  cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewContactButton = page.getByRole('button', {
      name: 'Add Contact',
    });
    this.channelButton = page.getByText('No Channel Order');
    this.productButton = page.getByRole('button', { name: 'Add product' });
    this.shippingInformationButton = page.getByRole('button', {
      name: 'Shipping Information',
    });
    this.saveOrderButton = page.getByRole('button', { name: 'Save Order' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async clickCreateNewContact() {
    await this.createNewContactButton.waitFor({ state: 'visible' });
    await this.createNewContactButton.click();
  }
}
