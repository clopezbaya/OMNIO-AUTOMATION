import { type Page, type Locator } from '@playwright/test';

export class InventoryPage {
  page: Page;
  createNewProductButton: Locator;
  actionButton: Locator;
  discontinueOption: Locator;
  confirmationModalDiscontinue: Locator;
  confirmationModalDelete: Locator;
  deleteOption: Locator;
  filterStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createNewProductButton = page.getByRole('link', {
      name: 'New Product',
    });
    this.actionButton = page.getByRole('button', { name: 'Actions' });
    this.discontinueOption = page.getByRole('menuitem', {
      name: 'Discontinue SKU',
    });
    this.confirmationModalDiscontinue = page.getByRole('button', {
      name: 'Continue',
    });
    this.confirmationModalDelete = page.getByRole('button', {
      name: 'Confirm',
    });
    this.deleteOption = page.getByRole('menuitem', { name: 'Delete' });
    this.filterStatus = page.getByLabel('Status').getByRole('combobox');
  }

  async clickCreateNewProduct() {
    await this.createNewProductButton.waitFor({ state: 'visible' });
    await this.createNewProductButton.click();
  }

  async checkProductInventory(product: string) {
    const locCheckProduct = this.page.locator(
      `(//div[text()='${product}']//..//..//..//..//..//div//div)[1]`
    );
    await locCheckProduct.click();
  }

  async selectDiscontinuedFilterOption() {
    await this.filterStatus.selectOption('DISCONTINUED');
  }

  async clickActionButton() {
    await this.actionButton.click();
  }

  async clickDescontinueOption() {
    await this.discontinueOption.click();
    await this.confirmationModalDiscontinue.click();
  }

  async clickDeleteOption() {
    await this.deleteOption.click();
    await this.confirmationModalDelete.click();
  }
}
