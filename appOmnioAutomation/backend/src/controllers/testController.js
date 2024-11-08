const axios = require('axios');
const sendReportEmail = require('../sendMail.cjs');
const { saveTestResult } = require('../db/services/testResultService');
const Environment = require('../db/models/environment');

exports.runTestController = async (serviceUrl, req, res, testType) => {
  console.log(
    `Enviando solicitud al servicio de Playwright para pruebas ${testType}...`
  );

  let resultMail;
  let responseMessage;
  let resultsUrl;
  let reportJSON;
  let savedTestId;
  let errorMessage = null;
  let { environment } = req.body;
  let environmentId = null;

  try {
    if (environment && environment.name) {
      const environmentDoc = await Environment.findOne({
        name: environment.name,
      });
      if (environmentDoc) {
        environmentId = environmentDoc._id;
      }
    }

    const response = await (testType == 'Single'
      ? axios.post(serviceUrl, req.body)
      : axios.post(serviceUrl));
    reportJSON = response.data.reportJSON;
    resultsUrl = response.data.reportUrl;
    responseMessage = 'Tests executed successfully';

    // Guarda el TestResult en caso de éxito
    savedTestId = await saveTestResult(
      testType,
      reportJSON,
      environmentId,
      environment && !environmentId
        ? { name: environment.name, description: environment.description }
        : null
    );
  } catch (error) {
    reportJSON = error.response?.data?.reportJSON || {};
    resultsUrl = error.response?.data?.reportUrl;
    errorMessage =
      error.response?.data?.message || error.message || 'Error inesperado';
    responseMessage = 'Tests executed with errors';

    // Guarda el TestResult en caso de error
    savedTestId = await saveTestResult(
      testType,
      reportJSON,
      environmentId,
      environment && !environmentId
        ? { name: environment.name, description: environment.description }
        : null
    );
  }

  // Envía el correo solo una vez
  resultMail = await sendReportEmail(reportJSON, testType);

  // Responde al cliente con éxito o error
  res.status(200).json({
    message: responseMessage,
    results: resultsUrl,
    reportJSON: reportJSON,
    error: errorMessage,
    savedTestId: savedTestId,
    resultMail: resultMail,
  });
};
