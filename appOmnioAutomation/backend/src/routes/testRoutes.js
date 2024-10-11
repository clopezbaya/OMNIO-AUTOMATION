const express = require('express');
const smokeController = require('../controllers/suiteController/smokeController.js');
const regressionController = require('../controllers/suiteController/regressionController.js');
const e2eController = require('../controllers/suiteController/e2eController');
const loginController = require('../controllers/singleWithDataController/loginController.js');

const router = express.Router();

router.get('/smoke', smokeController.runTestSmoke);
router.get('/regresion', regressionController.runTestRegresion);
router.get('/e2e', e2eController.runTestE2E);
router.post('/login', loginController.runTestLogin);

module.exports = router;
