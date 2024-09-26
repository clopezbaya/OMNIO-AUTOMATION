import { type Page, type Locator } from '@playwright/test';

export class NewILocPage {
  page: Page;
  iLocSelected: Locator;
  deleteILocButton: Locator;
  confirmDeleteIloc: Locator;

  constructor(page: Page, iLocSelected: string) {
    this.page = page;
    this.iLocSelected = page.getByText(iLocSelected);
    this.confirmDeleteIloc = page.getByRole('button', { name: 'Yes' });
  }

  async clickILocSelected() {
    await this.iLocSelected.click();
  }

  async deleteILoc(warehouse) {
    this.deleteILocButton = this.page.locator(
      `//tr//td//div//div[contains(text(),${warehouse})]/../../..//td//button[2]`
    );
    await this.deleteILocButton.click();
    await this.confirmDeleteIloc.click();
  }
}
