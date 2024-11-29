import { type Page, type Locator } from '@playwright/test';

export class ListCompanyPage {
  page: Page;
  companySelected: Locator;
  warehouseButton: Locator;
  createButton: Locator;
  wareHouseSelected: Locator;
  buttonAssing: Locator;
  buttonDeleteAssigned: Locator;
  confirmModal: Locator;
  userSelectDropdown: Locator;
  userOption: Locator;
  loginButton: Locator;

  constructor(page: Page, company: string, warehouseSelected: string) {
    this.page = page;
    this.companySelected = page.getByRole('button', { name: company });
    this.warehouseButton = page.getByRole('tab', { name: 'Warehouses' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.wareHouseSelected = page
      .getByRole('row', { name: warehouseSelected })
      .locator('div')
      .nth(2);
    this.buttonAssing = page.getByRole('button', { name: 'assign(1)' });
    this.buttonDeleteAssigned = page.getByRole('button', { name: 'Delete' });
    this.confirmModal = page.getByRole('button', { name: 'Confirm' });
    this.userSelectDropdown = page.getByRole('button', {
      name: 'Users',
      exact: true,
    });
    this.userOption = page.getByText(company);
    this.loginButton = page.getByRole('button', { name: 'Login Now' });
  }

  async clickCompanySelected() {
    await this.companySelected.scrollIntoViewIfNeeded();
    await this.companySelected.click();
  }

  async clickWarehouses() {
    await this.warehouseButton.click();
  }

  async clickCreateConection() {
    await this.createButton.click();
  }

  async selectkWarehuseConnection() {
    await this.wareHouseSelected.scrollIntoViewIfNeeded();
    await this.wareHouseSelected.click();
  }

  async clickButtonAssigned() {
    await this.buttonAssing.scrollIntoViewIfNeeded();
    await this.buttonAssing.click();
  }

  async clickDeleteConnection() {
    await this.buttonDeleteAssigned.click();
    await this.confirmModal.click();
  }

  async loginUser() {
    await this.userSelectDropdown.click();
    await this.userOption.click();
    await this.loginButton.click();
  }
}
