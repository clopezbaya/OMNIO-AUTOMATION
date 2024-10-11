import { runTest } from '../../utils/testRunner.js';

export const runE2ETestService = async () => {
  return await runTest('npm', ['run', 'test:e2e']);
};
