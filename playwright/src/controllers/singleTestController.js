import { runSingleTestService } from '../services/singleTestService.js';
import { getReportUrl } from '../utils/responseHelper.js';

export const runSingleTest = async (req, res) => {
  const { test } = req.params; // Obtén el parámetro de la solicitud

  try {
    const results = await runSingleTestService(test); // Pasa el parámetro al servicio
    const reportUrl = getReportUrl(req);

    if (results.success) {
      res.status(200).json({
        message: `Single test '${test}' ejecutado correctamente.`,
        reportUrl: reportUrl,
      });
    } else {
      res.status(500).json({
        message: `Single test '${test}' ejecutado con errores.`,
        reportUrl: reportUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar el single test.',
      error: error.message,
    });
  }
};
