import { type Page, type Locator } from '@playwright/test';

export class LogoutUserPage {
  avatar: Locator;
  logoutButton: Locator;

  constructor(page: Page, firstWord: string) {
    this.avatar = page.getByText(firstWord, { exact: true });
    this.logoutButton = page.getByText('Log Out');
  }

  async logOut() {
    await this.avatar.click();
    await this.logoutButton.click();
  }
}
