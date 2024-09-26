import { type Page, type Locator } from '@playwright/test';

export class LogoutAdminPage {
  avatar: Locator;
  logoutButton: Locator;

  constructor(page: Page) {
    this.avatar = page.locator('.v-avatar');
    this.logoutButton = page.getByText('Log Out');
  }

  async logOut() {
    await this.avatar.click();
    await this.logoutButton.click();
  }
}
