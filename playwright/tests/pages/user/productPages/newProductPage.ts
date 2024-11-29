import { type Page, type Locator } from '@playwright/test';

export class NewProductPage {
  page: Page;
  productNameField: Locator;
  descriptionField: Locator;
  skuNameField: Locator;
  tipeDropDown: Locator;
  upcField: Locator;
  hsCodeField: Locator;
  weightField: Locator;
  widthField: Locator;
  heightField: Locator;
  lengthField: Locator;
  ilocDropDown: Locator;
  optionLocal: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameField = page.getByLabel('Product Name');
    this.descriptionField = page.locator('.editr--content');
    this.skuNameField = page.getByLabel('SKU', { exact: true });
    this.weightField = page
      .locator('div')
      .filter({ hasText: /^Weight$/ })
      .locator('#txt_product_attrib-6');
    this.widthField = page
      .locator('div')
      .filter({ hasText: /^Width$/ })
      .locator('#txt_product_attrib-6');
    this.heightField = page
      .locator('div')
      .filter({ hasText: /^Height$/ })
      .locator('#txt_product_attrib-6');
    this.lengthField = page
      .locator('div')
      .filter({ hasText: /^Length$/ })
      .locator('#txt_product_attrib-6');
    this.ilocDropDown = page.getByRole('button', { name: 'iLocs' });
    this.optionLocal = page.getByRole('option', { name: 'local' }).locator('i');
    this.saveButton = page.getByRole('button', { name: 'Save Product' });
  }

  async newProduct(
    productName: string,
    description: string,
    weightField: number,
    widthField: number,
    heightField: number,
    lengthField: number
  ) {
    await this.productNameField.fill(productName);
    await this.descriptionField.fill(description);
    await this.skuNameField.scrollIntoViewIfNeeded();
    await this.skuNameField.fill(productName);
    await this.weightField.fill(weightField.toString());
    await this.widthField.fill(widthField.toString());
    await this.heightField.fill(heightField.toString());
    await this.lengthField.fill(lengthField.toString());
    await this.ilocDropDown.click();
    await this.optionLocal.click();
    await this.saveButton.click();
  }
}
