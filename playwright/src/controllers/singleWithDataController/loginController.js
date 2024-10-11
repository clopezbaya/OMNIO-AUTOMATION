import { runLoginTestService } from '../../services/singleWithDataService/loginService.js';
import { runTests } from '../testController.js';

export const runLoginTest = async (req, res) => {
  await runTests(runLoginTestService, req, res, 'single');
};
