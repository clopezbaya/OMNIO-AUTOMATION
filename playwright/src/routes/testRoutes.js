import express from 'express';
import { runSmokeTests } from '../controllers/suiteController/smokeController.js';
import { runRegressionTests } from '../controllers/suiteController/regressionController.js';
import { runE2ETests } from '../controllers/suiteController/e2eController.js';
import { runLoginTest } from '../controllers/singleWithDataController/loginController.js';

const router = express.Router();

router.get('/smoke', runSmokeTests);
router.get('/regression', runRegressionTests);
router.get('/e2e', runE2ETests);
router.post('/login', runLoginTest);

export default router;
