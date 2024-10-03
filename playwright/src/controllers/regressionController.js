import { runRegressionTestService } from '../services/regressionService.js';

export const runRegressionTests = async (req, res) => {
  try {
    const results = await runRegressionTestService();
    if (results.success) {
      res.status(200).json({
        message: 'Regression tests ejecutados correctamente.',
        results: results.stdout,
      });
    } else {
      res.status(500).json({
        message: 'Regression tests ejecutados con errores.',
        error: results.stderr,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar los regression tests.',
      error: error.message,
    });
  }
};
