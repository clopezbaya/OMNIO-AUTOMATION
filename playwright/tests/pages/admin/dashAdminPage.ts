import { type Page, type Locator } from '@playwright/test';

export class DashAdminPage {
  page: Page;
  companyButton: Locator;
  listCompanies: Locator;
  warehousesButton: Locator;
  listWarehouses: Locator;
  newWarehouse: Locator;

  constructor(page: Page) {
    this.page = page;
    this.companyButton = page.getByText('Companies');
    this.listCompanies = page.getByText('List');
    this.warehousesButton = page.getByText('Warehouses');
    this.listWarehouses = page.getByRole('link', { name: 'List', exact: true });
    this.newWarehouse = page.getByRole('link', { name: 'New', exact: true });
  }

  async clickCompanyButton() {
    await this.companyButton.click();
  }

  async clickListCompaniesButton() {
    await this.listCompanies.click();
  }

  async clickWarehousesButton() {
    await this.warehousesButton.click();
  }

  async clickListWarehousesButton() {
    await this.listWarehouses.click();
  }

  async clickNewWarehousesButton() {
    await this.newWarehouse.click();
  }
}
