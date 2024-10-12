const { runTestController } = require('../testController');

// Controlador para ejecutar pruebas de humo
exports.runTestLogin = (req, res) => {
  const playwrightServiceUrl = 'http://localhost:3002/login';
  return runTestController(playwrightServiceUrl, req, res, 'single');
};
