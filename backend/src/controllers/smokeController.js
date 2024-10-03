const axios = require('axios');

// Controlador para ejecutar pruebas de humo
exports.runTestSmoke = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para pruebas de humo...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/smoke';

  try {
    const response = await axios.post(playwrightServiceUrl);
    res.status(200).json({
      message: 'Tests de humo ejecutados correctamente.',
      results: response.data.results || response.data.stdout,
    });
  } catch (error) {
    console.error('Error al iniciar los tests de humo:', error.message);
    res.status(200).json({
      message: 'Tests de humo ejecutados con errores.',
      error: error.response?.data?.error || error.message,
    });
  }
};
