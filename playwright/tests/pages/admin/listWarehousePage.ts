import { Locator, Page } from '@playwright/test';

export class ListWarehousePage {
  checkConnectionButton: Locator;
  actionConnectionButton: Locator;
  editConnectionButton: Locator;
  deleteConnectionButton: Locator;

  constructor(page: Page, warehouse: string) {
    this.checkConnectionButton = page.locator(
      `()=${warehouse}]/..//button)[2]`
    );
    this.actionConnectionButton = page.locator(
      `()=${warehouse}]/..//button)[1]`
    );
    this.editConnectionButton = page.getByRole('menuitem', { name: 'Edit' });
    this.deleteConnectionButton = page.getByRole('menuitem', {
      name: 'Delete',
    });
  }

  async clickCheckConnectionIloc() {
    await this.checkConnectionButton.click();
  }

  async clickEditConection() {
    await this.actionConnectionButton.click();
    await this.editConnectionButton.click();
  }

  async clickDeleteonection() {
    await this.actionConnectionButton.click();
    await this.deleteConnectionButton.click();
  }
}
