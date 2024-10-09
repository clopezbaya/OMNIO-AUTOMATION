import express from 'express';
import { runSmokeTests } from '../controllers/smokeController.js';
import { runRegressionTests } from '../controllers/regressionController.js';
import { runE2ETests } from '../controllers/e2eController.js';
import { runSingleTest } from '../controllers/singleTestController.js';
import { runLoginTest } from '../controllers/singleWithDataController/loginController.js';

const router = express.Router();

router.get('/smoke', runSmokeTests);
router.get('/regression', runRegressionTests);
router.get('/e2e', runE2ETests);
router.get('/single:test', runSingleTest);
router.post('/login', runLoginTest);

export default router;
