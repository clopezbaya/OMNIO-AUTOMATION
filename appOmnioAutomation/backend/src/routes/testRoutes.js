const express = require('express');
const smokeController = require('../controllers/smokeController');
const regressionController = require('../controllers/regressionController');
const singleTestController = require('../controllers/singleTestController');
const e2eController = require('../controllers/e2eController');
const loginController = require('../controllers/loginController');

const router = express.Router();

router.get('/smoke', smokeController.runTestSmoke);
router.get('/regresion', regressionController.runTestRegresion);
router.get('/single-test/:testId', singleTestController.runTestSingle);
router.get('/e2e', e2eController.runTestE2E);
router.post('/login', loginController.runTestLogin);

module.exports = router;
