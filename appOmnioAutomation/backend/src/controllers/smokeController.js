const axios = require('axios');

// Controlador para ejecutar pruebas de humo
exports.runTestSmoke = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para pruebas Smoke...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/smoke';

  try {
    const response = await axios.post(playwrightServiceUrl);
    res.status(200).json({
      message: 'Tests Smoke ejecutados correctamente.',
      results: response.data.reportUrl,
    });
  } catch (error) {
    console.error('Error al iniciar los tests Smoke:', error.message);
    res.status(200).json({
      message: 'Tests Smoke ejecutados con errores.',
      error: error.response?.data?.reportUrl,
    });
  }
};
