const { runTestController } = require('../testController'); // Asegúrate de que la ruta sea correcta

// Controlador para ejecutar pruebas de humo
exports.runTestSmokeAdmin = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/smokeAdmin';
  return runTestController(playwrightServiceUrl, req, res, 'SmokeAdmin');
};

exports.runTestSmokeUser = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/smokeUser';
  return runTestController(playwrightServiceUrl, req, res, 'SmokeUser');
};
