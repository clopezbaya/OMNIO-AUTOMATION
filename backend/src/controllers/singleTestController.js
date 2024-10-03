const axios = require('axios');

// Controlador para ejecutar pruebas individuales
exports.runTestSingle = async (req, res) => {
  const testId = req.params.testId;
  console.log(
    `Enviando solicitud al servicio de Playwright para la prueba individual con ID: ${testId}...`
  );

  const playwrightServiceUrl = `http://localhost:3002/single/${testId}`;

  try {
    const response = await axios.post(playwrightServiceUrl);
    res.status(200).json({
      message: 'Test individual ejecutado correctamente.',
      results: response.data.results || response.data.stdout,
    });
  } catch (error) {
    console.error(
      `Error al iniciar la prueba individual con ID ${testId}:`,
      error.message
    );
    res.status(200).json({
      message: 'Test individual ejecutado con errores.',
      error: error.response?.data?.error || error.message,
    });
  }
};
