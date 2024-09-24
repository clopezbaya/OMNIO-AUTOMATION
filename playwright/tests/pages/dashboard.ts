import { type Page, type Locator } from '@playwright/test';

export class Dashboard {
  page: Page;
  companyButton: Locator;
  listBUtton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyButton = page.getByText('Companies');
    this.listBUtton = page.getByText('List');
  }

  async clickCompanyButton() {
    await this.companyButton.click();
  }

  async clickListButton() {
    await this.listBUtton.click();
  }
}
