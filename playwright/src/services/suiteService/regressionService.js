import { runTest } from '../../utils/testRunner.js';

export const runRegressionTestService = async () => {
  return await runTest('npm', ['run', 'test:regression']);
};
