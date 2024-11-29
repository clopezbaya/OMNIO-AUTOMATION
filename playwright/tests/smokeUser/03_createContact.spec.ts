import { expect } from '@playwright/test';
import { test } from '../fixturesUser';
import { closeBrowserIfNoTests } from '../../setupContext/context';
import { query, closePool } from '../../tests/db';
import { globals } from '../../globals';

test.describe('Create New Contact', async () => {
  test.afterAll(async ({ page }) => {
    try {
      await query('BEGIN');

      // Usar parámetros para evitar inyección de SQL
      await query(
        `DELETE FROM shipedge_omnio_1732791739841.addresses WHERE addresses.id = (SELECT address_id FROM shipedge_omnio_1732791739841.contacts WHERE contacts.first_name = $1)`,
        [globals.CONTACT_TEST.FIRST_NAME]
      );

      await query(
        `DELETE FROM shipedge_omnio_1732791739841.contacts WHERE contacts.first_name = $1`,
        [globals.CONTACT_TEST.FIRST_NAME]
      );

      await query(
        `DELETE FROM shipedge_omnio_1732791739841.organizations WHERE organizations."name" = $1`,
        [`${globals.CONTACT_TEST.FIRST_NAME} ${globals.CONTACT_TEST.LAST_NAME}`]
      );

      await query('COMMIT');
    } catch (error) {
      console.error('Error during database cleanup:', error);
      await query('ROLLBACK'); // En caso de error, revertir la transacción
    } finally {
      await closePool();
      await closeBrowserIfNoTests();
    }
  });

  test('smokeUser: Verify the correct creation of contact in Omnio', async ({
    isLoggedIn,
    isContactCreated,
    page,
  }) => {
    await test.step('Preconditions', async () => {
      expect(isLoggedIn).toBe(true);
    });

    await test.step('Create contact', async () => {
      expect(isContactCreated).toBe(true);
      await expect(page.getByText('Save succesfully')).toBeVisible();
    });
  });
});
