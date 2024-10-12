const { runTestController } = require('../testController'); // Asegúrate de que la ruta sea correcta

// Controlador para ejecutar pruebas de humo
exports.runTestRegresion = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/regression';
  return runTestController(playwrightServiceUrl, req, res, 'Regression');
};
