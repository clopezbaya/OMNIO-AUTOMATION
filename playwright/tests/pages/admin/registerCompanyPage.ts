import { type Page, type Locator } from '@playwright/test';

export class RegisterCompanyPage {
  page: Page;
  firstName: Locator;
  lastName: Locator;
  email: Locator;
  password: Locator;
  companyName: Locator;
  contactFullName: Locator;
  country: Locator;
  stateProvince: Locator;
  city: Locator;
  address: Locator;
  phone: Locator;
  postalCode: Locator;
  checkBoxConfirmation: Locator;
  signUpConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByLabel('First Name');
    this.lastName = page.getByLabel('Last Name');
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password', { exact: true });
    this.companyName = page.getByLabel('Company Name');
    this.contactFullName = page.getByLabel('Contact Full Name');
    this.country = page.getByLabel('Country');
    this.stateProvince = page.getByLabel('State/Province');
    this.city = page.getByLabel('City');
    this.address = page.getByLabel('Address 1');
    this.phone = page.getByLabel('Phone');
    this.postalCode = page.getByLabel('Postal Code');
    this.checkBoxConfirmation = page.locator(
      '.v-input--selection-controls__ripple'
    );
    this.signUpConfirmation = page.getByText('Sign Up');
  }

  async fillFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.email.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async fillCompanyName(companyName: string) {
    await this.companyName.fill(companyName);
  }

  async fillContactFullName(contactFullName: string) {
    await this.contactFullName.fill(contactFullName);
  }

  async selectCountry(country: string) {
    await this.country.click();
    await this.page.getByText(country).click();
  }

  async fillStateProvince(stateProvince: string) {
    await this.stateProvince.fill(stateProvince);
  }

  async fillCity(city: string) {
    await this.city.fill(city);
  }

  async fillAddress(address: string) {
    await this.address.fill(address);
  }

  async fillPhone(phone: number) {
    await this.phone.fill(phone.toString());
  }

  async fillPostalCode(postalCode: number) {
    await this.postalCode.fill(postalCode.toString());
  }

  async checkTermns() {
    await this.checkBoxConfirmation.click();
  }

  async clickSignUpConfirmation() {
    await this.signUpConfirmation.click();
  }
}
