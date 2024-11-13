import { runTest } from '../../utils/testRunner.js';

export const runSmokeAdminTestService = async () => {
  return await runTest('npm', ['run', 'test:smokeAdmin']);
};

export const runSmokeUserTestService = async () => {
  return await runTest('npm', ['run', 'test:smokeUser']);
};
