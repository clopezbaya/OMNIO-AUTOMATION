import { runRegressionTestService } from '../../services/suiteService/regressionService.js';
import { runTests } from '../testController.js';

export const runRegressionTests = async (req, res) => {
  await runTests(runRegressionTestService, req, res, 'regression');
};
