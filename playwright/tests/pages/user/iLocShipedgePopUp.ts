import { Locator, Page } from '@playwright/test';

export class ILocShipedgePopUp {
  page: Page;
  warehouseDropdown: Locator;
  warehouseSelected;
  usernameField: Locator;
  passwordField: Locator;
  connectButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.warehouseDropdown = page.getByLabel('Select Warehouses');
    this.usernameField = page.getByLabel('Username');
    this.passwordField = page.getByLabel('Password', { exact: true });
    this.connectButton = page.getByRole('button', { name: 'Connect' });
  }

  async clickDropDownWarehouse(warehouse: string) {
    await this.warehouseDropdown.click();
    await this.page.getByText(warehouse).click();
  }

  async fillUsernameField(username: string) {
    await this.usernameField.fill(username);
  }

  async fillPasswordField(password: string) {
    await this.passwordField.fill(password);
  }

  async clickConnect() {
    await this.connectButton.click();
  }
}
