const axios = require('axios');

// Controlador para ejecutar pruebas E2E
exports.runTestE2E = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para pruebas E2E...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/e2e';

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
