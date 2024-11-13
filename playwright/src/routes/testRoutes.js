import express from 'express';
import {
  runSmokeAdminTests,
  runSmokeUserTests,
} from '../controllers/suiteController/smokeController.js';
import { runRegressionTests } from '../controllers/suiteController/regressionController.js';
import { runE2ETests } from '../controllers/suiteController/e2eController.js';
import { runLoginTest } from '../controllers/singleWithDataController/loginController.js';

const router = express.Router();

router.post('/smokeAdmin/', runSmokeAdminTests);
router.post('/smokeUser/', runSmokeUserTests);
router.post('/regression/', runRegressionTests);
router.post('/e2e/', runE2ETests);
router.post('/login/', runLoginTest);

export default router;
