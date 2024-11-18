import { Locator, Page } from '@playwright/test';

export class ListWarehousePage {
  checkConnectionButton: Locator;
  actionConnectionButton: Locator;
  editConnectionButton: Locator;
  deleteConnectionButton: Locator;
  confirmDeleteButton: Locator;

  constructor(page: Page, warehouse: string) {
    this.checkConnectionButton = page.locator(
      `(//tr//td[text()="${warehouse}"]/..//button)[2]`
    );
    this.actionConnectionButton = page.locator(
      `(//tr//td[text()="${warehouse}"]/..//button)[1]`
    );
    this.editConnectionButton = page.getByRole('menuitem', { name: 'Edit' });
    this.deleteConnectionButton = page.getByRole('menuitem', {
      name: 'Delete',
    });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Confirm' });
  }

  async clickCheckConnectionIloc() {
    await this.checkConnectionButton.click();
  }

  async clickEditConection() {
    await this.actionConnectionButton.scrollIntoViewIfNeeded();
    await this.actionConnectionButton.click();
    await this.editConnectionButton.click();
  }

  async clickDeleteConection() {
    await this.actionConnectionButton.scrollIntoViewIfNeeded();
    await this.actionConnectionButton.click();
    await this.deleteConnectionButton.click();
    await this.confirmDeleteButton.click();
  }
}
