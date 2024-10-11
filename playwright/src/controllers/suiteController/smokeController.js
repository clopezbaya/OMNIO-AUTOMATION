import { runSmokeTestService } from '../../services/suiteService/smokeService.js';
import { runTests } from '../testController.js';

export const runSmokeTests = async (req, res) => {
  await runTests(runSmokeTestService, req, res, 'smoke');
};
