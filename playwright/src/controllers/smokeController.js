import { runSmokeTestService } from '../services/smokeService.js';

export const runSmokeTests = async (req, res) => {
  try {
    const results = await runSmokeTestService();
    if (results.success) {
      res.status(200).json({
        message: 'Smoke tests ejecutados correctamente.',
        results: results.stdout,
      });
    } else {
      res.status(500).json({
        message: 'Smoke tests ejecutados con errores.',
        error: results.stderr,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error inesperado al ejecutar los smoke tests.',
      error: error.message,
    });
  }
};
