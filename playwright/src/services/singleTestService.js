import { runTest } from '../utils/testRunner.js';

export const runSingleTestService = (test) => {
  // Aquí, el argumento 'test' se usará para ejecutar el comando correspondiente
  return runTest('npm', ['run', 'test:single', test]); // Suponiendo que el comando incluye el nombre de la prueba
};
