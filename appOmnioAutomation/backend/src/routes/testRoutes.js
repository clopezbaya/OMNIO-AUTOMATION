const express = require('express');
const smokeController = require('../controllers/suiteController/smokeController.js');
const regressionController = require('../controllers/suiteController/regressionController.js');
const e2eController = require('../controllers/suiteController/e2eController');
const loginController = require('../controllers/singleWithDataController/loginController.js');
const environmentController = require('../controllers/dbControllers/environmentController.js');
const testResultsController = require('../controllers/dbControllers/testResultsController.js');

const router = express.Router();
//TESTS SUITES
router.post('/smoke', smokeController.runTestSmoke);
router.post('/regresion', regressionController.runTestRegresion);
router.post('/e2e', e2eController.runTestE2E);
router.post('/login', loginController.runTestLogin);
//DB ENVIRONMENT
router.post('/environment', environmentController.createEnvironment);
router.get('/environments', environmentController.getEnvironments);
router.delete('/environment/:id', environmentController.deleteEnvironment);
router.put('/environment/:id', environmentController.updateEnvironment);
//DB TEST RESULTS
router.get('/testResults', testResultsController.getResults);
router.get('/testResults/:id', testResultsController.getResultsByID);
router.delete('/testResults/:id', testResultsController.deleteResults);

module.exports = router;
