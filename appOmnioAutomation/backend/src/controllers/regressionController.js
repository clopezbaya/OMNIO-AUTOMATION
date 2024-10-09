const axios = require('axios');

// Controlador para ejecutar pruebas de regresión
exports.runTestRegresion = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para pruebas de regresión...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/regression';

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
