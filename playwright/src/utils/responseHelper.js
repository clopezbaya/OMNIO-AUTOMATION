import fs from 'fs/promises'; // Usa fs/promises aquí también
import path from 'path';
import { fileURLToPath } from 'url';
import { processReport } from '../proccessReport.js';

export const getReportUrl = (req) => {
  return `${req.protocol}://${req.get('host')}/reports/index.html`;
};

export const getReportJson = async () => {
  try {
    await processReport(); // Asegúrate de que esto se complete antes de leer el archivo

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const reportPath = path.resolve(
      __dirname,
      '../../playwright-report',
      'formatted-test-results.json'
    );

    const data = await fs.readFile(reportPath, 'utf8'); // Lee el archivo de forma asíncrona
    return JSON.parse(data); // Devuelve el JSON parseado
  } catch (error) {
    console.error('Error al obtener el reporte JSON:', error);
    throw error; // Vuelve a lanzar el error para que el llamador lo maneje
  }
};
