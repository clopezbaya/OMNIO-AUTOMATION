const { runTestController } = require('../testController'); // Asegúrate de que la ruta sea correcta

// Controlador para ejecutar pruebas de humo
exports.runTestE2E = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/e2e';
  return runTestController(playwrightServiceUrl, req, res, 'E2E');
};
