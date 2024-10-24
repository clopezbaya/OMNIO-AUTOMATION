import { setupContext } from './context';

async function globalSetup() {
  // Inicializa el contexto global antes de las pruebas
  await setupContext();
}

export default globalSetup;
