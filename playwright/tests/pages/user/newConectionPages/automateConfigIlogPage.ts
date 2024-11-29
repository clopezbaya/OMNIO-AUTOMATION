import { type Page, type Locator } from '@playwright/test';

export class AutomatePage {
  page: Page;
  checkImportProducts: Locator;
  checkImportUOM: Locator;
  checkImportSynsets: Locator;
  radioImportSkuTranslator: Locator;
  radioImportSynset: Locator;
  radioImportSku: Locator;
  buttonSyncInventory: Locator;
  whInventoryCorrections: Locator;
  whInventoryChanges: Locator;
  whOrderCanceled: Locator;
  whOrderShipped: Locator;
  whReturnCompleted: Locator;
  whOrderDivided: Locator;
  whOrderPending: Locator;
  whOrderBackorder: Locator;
  whPOTransfers: Locator;
  disabledContainer: string;

  constructor(page: Page) {
    this.page = page;
    this.checkImportProducts = page.getByText('Import products', {
      exact: true,
    });
    this.checkImportUOM = page.getByText('Import PackSKUs (UOM)');
    this.checkImportSynsets = page.getByText('Import Synsets');
    this.radioImportSkuTranslator = page.getByText('Import as skus with');
    this.radioImportSynset = page.getByText('Import as synsets Import');
    this.radioImportSku = page.getByText('Import as skus', { exact: true });
    this.buttonSyncInventory = page.getByRole('button', {
      name: 'Run Sync Inventory',
    });
    this.whInventoryCorrections = page.locator(
      '//div[text()="Inventory Corrections"]//..//..//div//input'
    );
    this.whInventoryChanges = page.locator(
      '//div[text()="Inventory Changes"]//..//..//div//input'
    );
    this.whOrderCanceled = page.locator(
      '//div[text()="Orders Canceled"]//..//..//div//input'
    );
    this.whOrderShipped = page.locator(
      '//div[text()="Orders shipped"]//..//..//div//input'
    );
    this.whReturnCompleted = page.locator(
      '//div[text()="Returns Completed"]//..//..//div//input'
    );
    this.whOrderDivided = page.locator(
      '//div[text()="Order Divided"]//..//..//div//input'
    );
    this.whOrderPending = page.locator(
      '//div[text()="Order Pending"]//..//..//div//input'
    );
    this.whOrderBackorder = page.locator(
      '//div[text()="Order Backorder"]//..//..//div//input'
    );
    this.whPOTransfers = page.locator(
      '//div[text()="PO & Transfers Received"]//..//..//div//input'
    );
    this.disabledContainer = 'div.v-card--disabled';
  }

  async clickCheckImportProducts() {
    await this.checkImportProducts.check();
  }

  async clickCheckImportUOM() {
    await this.checkImportUOM.check();
  }

  async clickCheckImportSynsets() {
    await this.checkImportSynsets.check();
  }

  async clickRadioImportSkuTranslator() {
    await this.radioImportSkuTranslator.check();
  }

  async clickRadioImportSynset() {
    await this.radioImportSynset.check();
  }

  async clickRadioImportSku() {
    await this.radioImportSku.check();
  }

  async clickButtonSyncInventory() {
    await this.buttonSyncInventory.click();
  }

  async chargueContainerDisabled() {
    await this.page.waitForSelector(this.disabledContainer, {
      state: 'detached',
    });
  }

  async clickWebhooks() {
    await this.whInventoryCorrections.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whInventoryChanges.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whOrderCanceled.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whOrderShipped.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whReturnCompleted.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whOrderDivided.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whOrderPending.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whOrderBackorder.check({ force: true });
    await this.chargueContainerDisabled();
    await this.whPOTransfers.check({ force: true });
  }
}
