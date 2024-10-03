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
      message: 'Tests de regresión ejecutados correctamente.',
      results: response.data.results || response.data.stdout,
    });
  } catch (error) {
    console.error('Error al iniciar las pruebas de regresión:', error.message);
    res.status(200).json({
      message: 'Pruebas de regresión ejecutadas con errores.',
      error: error.response?.data?.error || error.message,
    });
  }
};
