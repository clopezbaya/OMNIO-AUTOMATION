import fs from 'fs/promises'; // Asegúrate de usar fs/promises para funciones asíncronas
import path from 'path';
import { fileURLToPath } from 'url'; // Para obtener __dirname en un módulo ES

// Obtener __filename y __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON generado por Playwright
const reportPath = path.resolve(
  __dirname,
  '../playwright-report',
  'playwright-report.json'
);

// Función principal para procesar el reporte
export const processReport = async () => {
  try {
    // Leer el archivo JSON generado por Playwright
    const reportData = await fs.readFile(reportPath, 'utf8');
    const report = JSON.parse(reportData);

    // Transformar los resultados
    const formattedResults = report.suites
      .flatMap((suite) => suite.suites) // Acceder al array interno de suites
      .flatMap((innerSuite) =>
        innerSuite.specs.flatMap((spec) =>
          spec.tests.map((test) => {
            const result = test.results[0].status;
            // Adjuntar el path del primer attachment si existe
            let attachmentPath = 'No attachments';
            if (
              test.results[0].attachments &&
              test.results[0].attachments.length > 0
            ) {
              attachmentPath = test.results[0].attachments[0].path; // Solo el path del primer adjunto
            }

            return {
              Test: innerSuite.title, // Acceder a innerSuite.title para el título del test
              result: result.charAt(0).toUpperCase() + result.slice(1), // Capitalizamos el resultado
              attachments: attachmentPath, // Agregamos el path o 'No attachments'
            };
          })
        )
      );

    // Guardar el resultado transformado en un archivo JSON
    const outputFilePath = path.join(
      __dirname,
      '../playwright-report/formatted-test-results.json'
    );
    await fs.writeFile(
      outputFilePath,
      JSON.stringify(formattedResults, null, 2)
    );

    console.log('Reporte procesado y guardado en:', outputFilePath);
  } catch (error) {
    console.error('Error al procesar el reporte:', error);
  }
};
