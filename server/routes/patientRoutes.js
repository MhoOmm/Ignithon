const express = require('express');
const router = express.Router();
const riskPredictorController = require('../controllers/riskpredictor');

router.post('/risk', riskPredictorController.estimateRisk);

module.exports = router;
