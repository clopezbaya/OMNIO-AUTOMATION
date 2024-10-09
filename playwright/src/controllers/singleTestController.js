import { runSingleTestService } from '../services/singleTestService.js';
import { getReportUrl } from '../utils/responseHelper.js';

export const runSingleTest = async (req, res) => {
  const { test } = req.params; // Obtén el parámetro de la solicitud

  try {
    const results = await runSingleTestService(test); // Pasa el parámetro al servicio
    const reportUrl = getReportUrl(req);

    if (results.success) {
      res.status(200).json({
        message: `Tests executed successfully`,
        reportUrl: reportUrl,
      });
    } else {
      res.status(500).json({
        message: `Tests executed with errors`,
        reportUrl: reportUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Unexpected error in test execution',
      error: error.message,
    });
  }
};
