import test, {
  Browser,
  BrowserContext,
  Page,
  chromium,
} from '@playwright/test';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;
let isLoggedIn = false;

export async function setupContext() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }

  if (!context) {
    context = await browser.newContext();
  }

  if (!page) {
    page = await context.newPage();
  }

  return { page };
}

export async function teardownContext(testInfo: any) {
  console.log(`Test Title: ${testInfo.title}`);
  console.log(`Test Tags: ${testInfo.tags}`);

  // Aquí puedes agregar lógica para verificar el tipo de test
  if (testInfo.tags.includes('smoke')) {
    // Realiza las acciones necesarias para limpiar registros de pruebas smoke
  } else if (testInfo.tags.includes('regression')) {
    // Realiza las acciones necesarias para limpiar registros de pruebas de regresión
  } else if (testInfo.tags.includes('e2e')) {
    // Realiza las acciones necesarias para limpiar registros de pruebas E2E
  }

  if (page) {
    await page.close();
    page = null;
  }

  if (context) {
    await context.close();
    context = null;
  }
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    isLoggedIn = false;
  }
}

export async function closeBrowserIfNoTests() {
  if (browser) {
    const testInfo = test.info();
    if (!testInfo.retry && !testInfo.title) {
      await closeBrowser();
    }
  }
}
