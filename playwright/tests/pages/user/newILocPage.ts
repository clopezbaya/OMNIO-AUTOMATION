import { type Page, type Locator } from '@playwright/test';

export class NewILocPage {
  page: Page;
  iLocSelected: Locator;
  deleteILocButton: Locator;
  confirmDeleteIloc: Locator;
  configureIloc: Locator;
  closePopUpIlocs: Locator;
  actionsButton: Locator;
  createNewILocButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmDeleteIloc = page.getByRole('button', { name: 'Yes' });
    this.closePopUpIlocs = page.getByRole('button', { name: 'Close' });
    this.actionsButton = page.getByRole('button', { name: 'Actions' });
    this.createNewILocButton = page.getByRole('menuitem', {
      name: 'Create Inventory Location',
    });
  }

  async clickILocSelected(iLocSelected: string) {
    this.iLocSelected = this.page.getByText(iLocSelected);
    await this.iLocSelected.click();
  }

  async deleteILoc(warehouse: string) {
    this.deleteILocButton = this.page.locator(
      `//tr[contains(., '${warehouse}')]//button[2]`
    );
    if (await this.deleteILocButton.isVisible()) {
      await this.deleteILocButton.click();
      await this.confirmDeleteIloc.click();
    }
  }

  async configILoc(warehouse: string) {
    this.configureIloc = this.page.locator(
      `//tr[contains(., '${warehouse}')]//td//button[1]`
    );
    await this.configureIloc.click();
  }

  async closePopUpIloc() {
    await this.closePopUpIlocs.scrollIntoViewIfNeeded();
    await this.closePopUpIlocs.click();
  }

  async clickCreateNewILoc() {
    await this.actionsButton.click();
    await this.createNewILocButton.click();
  }
}
