import fs from 'fs/promises'; // Usa fs/promises aquí también
import path from 'path';
import { fileURLToPath } from 'url';
import { processReport } from '../proccessReport.js';

export const getReportUrl = (req) => {
  return `${req.protocol}://${req.get('host')}/reports/index.html`;
};

export const getReportJson = async () => {
  try {
    await processReport();

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const reportPath = path.resolve(
      __dirname,
      '../../playwright-report',
      'formatted-test-results.json'
    );

    const data = await fs.readFile(reportPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al obtener el reporte JSON:', error);
    throw error;
  }
};
