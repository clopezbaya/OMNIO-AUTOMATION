export const getReportUrl = (req) => {
  return `${req.protocol}://${req.get('host')}/reports/index.html`;
};
