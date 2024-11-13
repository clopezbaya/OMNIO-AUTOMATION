import { test } from '../fixtures';
import { DashAdminPage } from '../pages/admin/dashAdminPage';
import { ListWarehousePage } from '../pages/admin/listWarehousePage';
import { expect } from '@playwright/test';
import { globals } from '../../globals';
import { closeBrowserIfNoTests } from '../../setupContext/context';

test.describe('Register and Connect Warehouse', () => {
  // Cierra el navegador después de todos los tests
  test.afterAll(async () => {
    await closeBrowserIfNoTests();
  });

  test('smokeAdmin: Verify correct register and connection of new Warehouse', async ({
    isLoggedIn,
    warehouseCreated,
    warehouseConnected,
    page,
  }) => {
    const dashboardAdmin = new DashAdminPage(page);
    const listWarehousePage = new ListWarehousePage(
      page,
      globals.WAREHOUSE_TEST.NAME
    );

    await test.step('Verify correct Warehouse creation', async () => {
      expect(isLoggedIn).toBe(true);
      expect(warehouseCreated).toBe(true);
      await expect(page.getByText('Connection create successly')).toBeVisible();
    });

    await test.step('Verify correct Warehouse connection', async () => {
      expect(warehouseConnected).toBe(true);
      await dashboardAdmin.clickListWarehousesButton();
      await listWarehousePage.clickCheckConnectionIloc();
      await expect(page.getByText('Success connection')).toBeVisible();
    });
  });
});
