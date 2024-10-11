import { runE2ETestService } from '../../services/suiteService/e2eService.js';
import { runTests } from '../testController.js';

export const runE2ETests = async (req, res) => {
  await runTests(runE2ETestService, req, res, 'smoke');
};
