import { runTest } from '../utils/testRunner.js';

export const runSmokeTestService = () => {
  return runTest('npm', ['run', 'test:smoke']);
};
