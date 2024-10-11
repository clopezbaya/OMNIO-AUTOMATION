import { getReportUrl, getReportJson } from '../utils/responseHelper.js';

export const runTests = async (testService, req, res, flag) => {
  try {
    const results = await (flag == 'single'
      ? testService(req.body)
      : testService());
    const reportUrl = await getReportUrl(req);
    const reportJSON = await getReportJson();

    if (results.success) {
      res.status(200).json({
        message: `Tests executed successfully`,
        reportUrl: reportUrl,
        reportJSON: reportJSON,
      });
    } else {
      res.status(500).json({
        message: `Tests executed with errors`,
        reportUrl: reportUrl,
        reportJSON: reportJSON,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Unexpected error in test execution',
      error: error.message,
    });
  }
};
