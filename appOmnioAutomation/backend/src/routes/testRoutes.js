const express = require('express');
const smokeController = require('../controllers/suiteController/smokeController.js');
const regressionController = require('../controllers/suiteController/regressionController.js');
const e2eController = require('../controllers/suiteController/e2eController');
const loginController = require('../controllers/singleWithDataController/loginController.js');
const environmentController = require('../controllers/environmentController.js');

const router = express.Router();

router.post('/smoke', smokeController.runTestSmoke);
router.post('/regresion', regressionController.runTestRegresion);
router.post('/e2e', e2eController.runTestE2E);
router.post('/login', loginController.runTestLogin);

//DB
router.post('/environment', environmentController.createEnvironment);
router.get('/environments', environmentController.getEnvironments);

module.exports = router;
