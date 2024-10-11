import { globals } from '../../../globals.js';
import { runTest } from '../../utils/testRunner.js';

export const runLoginTestService = async (req) => {
  const username = req.username || globals.LOGIN_ADMIN_OMNIO.USERNAME;
  const password = req.password || globals.LOGIN_ADMIN_OMNIO.PASSWORD;

  return await runTest('npm', ['run', 'test:login'], {
    env: {
      ...process.env,
      LOGIN_USERNAME: username,
      LOGIN_PASSWORD: password,
    },
  });
};
