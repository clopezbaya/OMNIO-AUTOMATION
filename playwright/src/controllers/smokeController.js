import { runSmokeTestService } from '../services/smokeService.js';
import { getReportUrl } from '../utils/responseHelper.js';

export const runSmokeTests = async (req, res) => {
  try {
    const results = await runSmokeTestService();
    const reportUrl = getReportUrl(req);

    if (results.success) {
      res.status(200).json({
        message: 'Smoke tests ejecutados correctamente.',
        reportUrl: reportUrl,
      });
    } else {
      res.status(500).json({
        message: 'Smoke tests ejecutados con errores.',
        reportUrl: reportUrl,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar los smoke tests.',
      error: error.message,
    });
  }
};
