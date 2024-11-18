// globalTeardown.ts

import { teardownContext } from './context';
import test from '@playwright/test';

async function globalTeardown() {
  // Obtén la información del test
  const testInfo = test.info();

  // Limpia el contexto global después de todas las pruebas
  await teardownContext(testInfo);
}

export default globalTeardown;
