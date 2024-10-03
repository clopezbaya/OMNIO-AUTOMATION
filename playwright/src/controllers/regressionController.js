import { runRegressionTestService } from '../services/regressionService.js';
import { getReportUrl } from '../utils/responseHelper.js';

export const runRegressionTests = async (req, res) => {
  try {
    const results = await runRegressionTestService();
    const reportUrl = getReportUrl(req);

    if (results.success) {
      res.status(200).json({
        message: 'Regression tests ejecutados correctamente.',
        reportUrl: reportUrl,
      });
    } else {
      res.status(500).json({
        message: 'Regression tests ejecutados con errores.',
        reportUrl: reportUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar los regression tests.',
      error: error.message,
    });
  }
};
