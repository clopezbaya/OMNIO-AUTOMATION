import { test } from '../fixtures';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { ListWarehousePage } from '../pages/admin/listWarehousePage';
import { expect } from '@playwright/test';
import { globals } from '../../globals';
import { closeBrowserIfNoTests } from '../../setupContext/context';

test.describe('Register and Connect Warehouse', () => {
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });
  test('smoke: Verify correct register and connection of new Warehouse', async ({
    isLoggedIn,
    warehouseCreated,
    warehouseConnected,
    page,
  }) => {
    const dashboardAdmin = new DashAdminPage(page);
    const listWarehousePage = new ListWarehousePage(
      page,
      globals.WAREHOUSE_CONNECTION_DATA.NAME
    );

    await test.step('Verify correct Warehouse creation', async () => {
      expect(isLoggedIn).toBe(true);
      expect(warehouseCreated).toBe(true); // Verifica que el warehouse haya sido creado
      await expect(page.getByText('Connection create successly')).toBeVisible(); // Mueve este expect al test
    });

    await test.step('Verify correct Warehouse connection', async () => {
      expect(warehouseConnected).toBe(true); // Verifica que la conexión al warehouse fue exitosa
      await dashboardAdmin.clickListWarehousesButton();
      await listWarehousePage.clickCheckConnectionIloc();
      await expect(page.getByText('Success connection')).toBeVisible(); // Mueve este expect al test
    });
  });
});

// await test.step('Cleanning Register', async () => {
//   await listWarehousePage.clickDeleteConection();
//   await expect(
//     page.getByText('Warehouse removed successly')
//   ).toBeVisible();
//   await browserContext.close();
// });
