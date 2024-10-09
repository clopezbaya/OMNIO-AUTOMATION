import { runE2ETestService } from '../services/e2eService.js';
import { getReportUrl } from '../utils/responseHelper.js';

export const runE2ETests = async (req, res) => {
  try {
    const results = await runE2ETestService();
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
