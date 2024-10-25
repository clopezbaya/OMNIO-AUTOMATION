const axios = require('axios');
const sendReportEmail = require('../sendMail.cjs');
const { saveTestResult } = require('../db/services/testResultService');
const Environment = require('../db/models/environment'); // Asegúrate de que el modelo Environment esté importado

exports.runTestController = async (serviceUrl, req, res, testType) => {
  console.log(
    `Enviando solicitud al servicio de Playwright para pruebas ${testType}...`
  );

  let resultMail;

  let { environment } = req.body;

  let environmentId = null; // Definir aquí la variable

  try {
    // Busca el environment por nombre
    if (environment && environment.name) {
      const environmentDoc = await Environment.findOne({
        name: environment.name,
      });
      if (environmentDoc) {
        environmentId = environmentDoc._id; // Asignar el ID del entorno existente
      }
    }
    const response = await (testType == 'Single'
      ? axios.post(serviceUrl, req.body)
      : axios.post(serviceUrl));
    const reportJSON = response.data.reportJSON;

    resultMail = await sendReportEmail(reportJSON, testType);

    // Guarda el TestResult en caso de éxito
    const savedTestId = await saveTestResult(
      testType,
      reportJSON,
      environmentId, // Puede ser null si no existe el entorno
      environment && !environmentId
        ? { name: environment.name, description: environment.description }
        : null // Pasa un objeto si no se encuentra el entorno
    );

    // Responde con el mensaje de éxito
    res.status(200).json({
      message: 'Tests executed successfully',
      results: response.data.reportUrl,
      reportJSON: reportJSON,
      savedTestId: savedTestId,
      resultMail: resultMail,
    });
  } catch (error) {
    // Maneja el caso de error y extrae los detalles del error
    const reportJSON = error.response?.data?.reportJSON || {}; // Puede ser undefined si no viene en la respuesta
    resultMail = await sendReportEmail(reportJSON, testType);
    const errorMessage =
      error.response?.data?.message || error.message || 'Error inesperado';

    // Guarda el TestResult incluso cuando hay un error
    const savedTestId = await saveTestResult(
      testType,
      reportJSON,
      environmentId, // Ahora environmentId está definido aquí
      environment && !environmentId
        ? { name: environment.name, description: environment.description }
        : null // Pasa un objeto si no se encuentra el entorno
    );

    // Responde con el mensaje de error
    res.status(200).json({
      message: 'Tests executed with errors',
      results: error.response?.data?.reportUrl,
      reportJSON: reportJSON,
      error: errorMessage,
      savedTestId: savedTestId,
      resultMail: resultMail,
    });
  }
};
