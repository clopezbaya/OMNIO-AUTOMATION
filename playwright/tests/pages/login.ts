import { type Page, type Locator } from '@playwright/test';

export class Login {
  page: Page;
  userEmailField: Locator;
  passwordField: Locator;
  loginButton: Locator;
  signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userEmailField = page.locator('#userEmail');
    this.passwordField = page.locator('#userPassword');
    this.loginButton = page.locator('#loginOauth');
    this.signUpButton = page.getByRole('link', { name: 'Sign Up' });
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async fillUserEmailField(username: string) {
    await this.userEmailField.fill(username);
  }

  async fillPasswordField(password: string) {
    await this.passwordField.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}
