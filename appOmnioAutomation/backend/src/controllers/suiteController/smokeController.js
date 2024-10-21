const { runTestController } = require('../testController'); // Asegúrate de que la ruta sea correcta

// Controlador para ejecutar pruebas de humo
exports.runTestSmoke = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/smoke';
  return runTestController(playwrightServiceUrl, req, res, 'Smoke');
};
