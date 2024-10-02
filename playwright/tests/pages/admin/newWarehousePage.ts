import { type Page, type Locator } from '@playwright/test';

export class NewWarehousePage {
  page: Page;
  name: Locator;
  serverName: Locator;
  firstAddress: Locator;
  prefix: Locator;
  secondAddress: Locator;
  url: Locator;
  urlImages: Locator;
  firstPhone: Locator;
  secondPhone: Locator;
  country: Locator;
  state: Locator;
  city: Locator;
  postalCode: Locator;
  description: Locator;
  fax: Locator;
  corporateMail: Locator;
  saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.getByLabel('Name', { exact: true });
    this.serverName = page.getByLabel('Server Name');
    this.firstAddress = page.getByLabel('First Address');
    this.prefix = page.getByLabel('Prefix', { exact: true });
    this.secondAddress = page.getByLabel('Second Address');
    this.url = page.getByLabel('Url', { exact: true });
    this.urlImages = page.getByLabel('Url Images');
    this.firstPhone = page.getByLabel('First Phone');
    this.secondPhone = page.getByLabel('Second Phone');
    this.country = page.getByLabel('Country');
    this.state = page.getByLabel('State');
    this.city = page.getByLabel('City');
    this.postalCode = page.getByLabel('Postal Code');
    this.description = page.getByLabel('Description');
    this.fax = page.getByLabel('Fax');
    this.corporateMail = page.getByLabel('Corporate Mail');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async fillName(name: string) {
    await this.name.fill(name);
  }

  async fillServerName(serverName: string) {
    await this.serverName.fill(serverName);
  }

  async fillFirstAddress(firstAddress: string) {
    await this.firstAddress.fill(firstAddress);
  }

  async fillPrefix(prefix: string) {
    await this.prefix.fill(prefix);
  }

  async fillSecondAddress(secondAddress: string) {
    await this.secondAddress.fill(secondAddress);
  }

  async fillUrl(url: string) {
    await this.url.fill(url);
  }

  async fillUrlImage(urlImage: string) {
    await this.urlImages.fill(urlImage);
  }

  async fillFirstPhone(firstPhone: number) {
    await this.firstPhone.fill(firstPhone.toString());
  }

  async fillSecondPhone(secondPhone: number) {
    await this.secondPhone.fill(secondPhone.toString());
  }

  async selectCountry(country: string) {
    await this.country.click();
    await this.page.getByText(country).click();
  }

  async fillState(state: string) {
    await this.state.fill(state);
  }

  async fillCity(city: string) {
    await this.city.fill(city);
  }

  async fillPostalCode(postalCode: number) {
    await this.postalCode.fill(postalCode.toString());
  }

  async fillDescription(description: string) {
    await this.description.fill(description);
  }

  async fillFax(fax: string) {
    await this.fax.fill(fax);
  }

  async fillCorporateEmail(corporateMail: string) {
    await this.corporateMail.fill(corporateMail);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
