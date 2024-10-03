import { runTest } from '../utils/testRunner.js';

export const runE2ETestService = () => {
  return runTest('npm', ['run', 'test:e2e']);
};
