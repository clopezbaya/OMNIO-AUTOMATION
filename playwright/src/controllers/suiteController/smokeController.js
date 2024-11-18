import {
  runSmokeAdminTestService,
  runSmokeUserTestService,
} from '../../services/suiteService/smokeService.js';
import { runTests } from '../testController.js';

export const runSmokeAdminTests = async (req, res) => {
  await runTests(runSmokeAdminTestService, req, res, 'smokeAdmin');
};

export const runSmokeUserTests = async (req, res) => {
  await runTests(runSmokeUserTestService, req, res, 'smokeUser');
};
