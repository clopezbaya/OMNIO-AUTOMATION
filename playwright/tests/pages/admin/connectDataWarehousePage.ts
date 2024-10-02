import { Locator, Page } from '@playwright/test';

export class ConnectDataWarehousePage {
  page: Page;
  nameConnection: Locator;
  typeDatabase: Locator;
  host: Locator;
  port: Locator;
  database: Locator;
  username: Locator;
  password: Locator;
  characterSet: Locator;
  collation: Locator;
  timezone: Locator;
  containerTimezone: Locator;
  cancelButton: Locator;
  createButton: Locator;
  clearButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameConnection = page.getByRole('textbox', {
      name: 'Name',
      exact: true,
    });
    this.typeDatabase = page.getByRole('button', {
      name: 'Database adminitrator',
    });

    this.host = page.getByLabel('Host');
    this.port = page.getByLabel('Port');
    this.database = page.getByLabel('Database', { exact: true });
    this.username = page.getByLabel('Username');
    this.password = page.getByLabel('Password');
    this.characterSet = page.getByRole('button', {
      name: 'Select character set',
    });
    this.collation = page.getByRole('button', { name: 'Collation' });
    this.timezone = page.getByLabel('Timezone');
    this.containerTimezone = page.locator('//*[@id="inspire"]/div[5]');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.createButton = page.getByRole('button', { name: 'Create' });
    this.clearButton = page.getByRole('button', { name: 'Clear' });
  }

  async fillNameConnection(name: string) {
    await this.nameConnection.fill(name);
  }

  async selectTypeDataBase(databaseType: string) {
    let databaseSelected = this.page.getByRole('option', {
      name: databaseType,
    });
    await this.typeDatabase.click();
    await databaseSelected.scrollIntoViewIfNeeded();
    await databaseSelected.click();
  }

  async fillHost(host: string) {
    await this.host.fill(host);
  }

  async fillPort(port: string) {
    await this.port.fill(port);
  }

  async fillDatabase(database: string) {
    await this.database.fill(database);
  }

  async fillUsername(username: string) {
    await this.username.fill(username);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async selectCharacter(character: string) {
    let characterSelected = this.page.getByRole('option', {
      name: character,
      exact: true,
    });
    await this.characterSet.click();
    await characterSelected.scrollIntoViewIfNeeded();
    await characterSelected.click();
  }

  async selectCollation(collation: string) {
    let collationSelected = this.page.getByRole('option', {
      name: collation,
      exact: true,
    });
    await this.collation.click();
    await collationSelected.scrollIntoViewIfNeeded();
    await collationSelected.click();
  }

  async selectTimeZone(timeZone: string) {
    let timeZoneSelected = this.page.getByRole('option', {
      name: timeZone,
    });
    await this.timezone.click();
    while (!(await timeZoneSelected.isVisible())) {
      await this.containerTimezone.hover();
      this.page.mouse.wheel(0, 600);
    }
    await timeZoneSelected.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickClearButton() {
    await this.clearButton.click();
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}
