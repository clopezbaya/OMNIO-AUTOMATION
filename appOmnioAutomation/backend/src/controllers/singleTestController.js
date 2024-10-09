const axios = require('axios');

// Controlador para ejecutar pruebas individuales
exports.runTestSingle = async (req, res) => {
  const testId = req.params.testId;
  console.log(
    `Enviando solicitud al servicio de Playwright para la prueba individual con ID: ${testId}...`
  );

  const playwrightServiceUrl = `http://localhost:3002/single/${testId}`;

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
