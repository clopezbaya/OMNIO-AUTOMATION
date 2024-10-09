import { runLoginTestService } from '../../services/singleWithDataService/loginService.js';
import { getReportUrl } from '../../utils/responseHelper.js';

export const runLoginTest = async (req, res) => {
  try {
    const results = await runLoginTestService(req.body);
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
