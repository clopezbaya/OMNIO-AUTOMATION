import { globals } from '../../../globals.js';
import { runTest } from '../../utils/testRunner.js';

export const runLoginTestService = async (req) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    username = globals.LOGIN_ADMIN_OMNIO.USERNAME;
    password = globals.LOGIN_ADMIN_OMNIO.PASSWORD;
  }

  return await runTest('npm', ['run', 'test:login'], {
    env: {
      ...process.env,
      LOGIN_USERNAME: username,
      LOGIN_PASSWORD: password,
    },
  });
};
