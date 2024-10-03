import { runTest } from '../utils/testRunner.js';

export const runRegressionTestService = () => {
  return runTest('npm', ['run', 'test:regression']);
};
