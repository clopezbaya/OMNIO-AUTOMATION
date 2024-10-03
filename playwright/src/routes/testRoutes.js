import express from 'express';
import { runSmokeTests } from '../controllers/smokeController.js';
import { runRegressionTests } from '../controllers/regressionController.js';
import { runE2ETests } from '../controllers/e2eController.js';
import { runSingleTest } from '../controllers/singleTestController.js';

const router = express.Router();

router.post('/smoke', runSmokeTests);
router.post('/regression', runRegressionTests);
router.post('/e2e', runE2ETests);
router.post('/single:test', runSingleTest);

export default router;
