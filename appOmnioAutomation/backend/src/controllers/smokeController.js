const axios = require('axios');

// Controlador para ejecutar pruebas de humo
exports.runTestSmoke = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para pruebas Smoke...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/smoke';

  try {
    const response = await axios.get(playwrightServiceUrl);
    res.status(200).json({
      message: 'Tests executed successfully',
      results: response.data.reportUrl,
    });
  } catch (error) {
    console.error('Error to init tests', error.message);
    res.status(200).json({
      message: 'Tests executed with errors',
      error: error.response?.data?.reportUrl,
    });
  }
};
