import { runTest } from '../../utils/testRunner.js';

export const runSmokeTestService = async () => {
  return await runTest('npm', ['run', 'test:smoke']);
};
