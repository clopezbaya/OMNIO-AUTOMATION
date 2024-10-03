import { runE2ETestService } from '../services/e2eService.js';

export const runE2ETests = async (req, res) => {
  try {
    const results = await runE2ETestService();
    if (results.success) {
      res.status(200).json({
        message: 'E2E tests ejecutados correctamente.',
        results: results.stdout,
      });
    } else {
      res.status(500).json({
        message: 'E2E tests ejecutados con errores.',
        error: results.stderr,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar los E2E tests.',
      error: error.message,
    });
  }
};
