const axios = require('axios');

exports.runTestController = async (serviceUrl, res, testType) => {
  console.log(
    `Enviando solicitud al servicio de Playwright para pruebas ${testType}...`
  );

  try {
    const response = await axios.get(serviceUrl);
    res.status(200).json({
      message: 'Tests executed successfully',
      results: response.data.reportUrl,
      reportJSON: response.data.reportJSON, // Asegúrate de que también se devuelve el reportJSON
    });
  } catch (error) {
    console.error('Error to init tests', error.message);
    res.status(200).json({
      // Cambia el estado a 500 en caso de error
      message: 'Tests executed with errors',
      results: error.response?.data?.reportUrl,
      reportJSON: error.response?.data?.reportJSON, // Asegúrate de que también se devuelve el reportJSON
      error: error.response?.data?.message, // Manejo robusto del error
    });
  }
};
