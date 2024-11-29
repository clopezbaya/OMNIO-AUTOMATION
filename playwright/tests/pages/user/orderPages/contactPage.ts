import { type Page, type Locator } from '@playwright/test';

export class ContactPage {
  page: Page;
  newContactButton: Locator;
  companyField: Locator;
  checkMainDirection: Locator;
  firstNameField: Locator;
  lastNameField: Locator;
  addressField: Locator;
  emailField: Locator;
  countryDropdown: Locator;
  stateField: Locator;
  cityField: Locator;
  postalCodeField: Locator;
  saveButton: Locator;
  closeButtonContacts: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newContactButton = page.getByRole('button', { name: 'New Contact' });
    this.companyField = page.getByRole('textbox', { name: 'Company' });
    this.checkMainDirection = page.locator(
      '.v-input--selection-controls__ripple'
    );
    this.firstNameField = page.getByLabel('First Name');
    this.lastNameField = page.getByLabel('Last name');
    this.addressField = page.getByLabel('Address 1');
    this.emailField = page.getByRole('textbox', { name: 'Email' });
    this.countryDropdown = page.getByRole('textbox', { name: 'Country' });
    this.stateField = page.getByRole('textbox', { name: 'State' });
    this.cityField = page.getByRole('textbox', { name: 'City' });
    this.postalCodeField = page.getByLabel('Postal code');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.closeButtonContacts = page.getByRole('button', { name: 'Close' });
  }

  async clickNewContact() {
    await this.newContactButton.waitFor({ state: 'visible' });
    await this.newContactButton.click();
  }

  async clickCloseContactsSection() {
    await this.closeButtonContacts.waitFor({ state: 'visible' });
    await this.closeButtonContacts.click();
  }

  async newContact(
    company: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    country: string,
    state: string,
    city: string,
    postalCode: string
  ) {
    await this.companyField.fill(company);
    await this.checkMainDirection.click();
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.addressField.fill(address);
    await this.emailField.fill(email);
    await this.countryDropdown.click();
    await this.page.getByText(country, { exact: true }).click();
    await this.stateField.fill(state);
    await this.cityField.fill(city);
    await this.postalCodeField.fill(postalCode);
    await this.saveButton.click();
  }
}
