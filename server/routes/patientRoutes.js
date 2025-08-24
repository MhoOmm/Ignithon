const User = require("../model/userSchema");
const Doctor = require("../model/doctorschema");
const express  = require("express")
const patientRouter = express.Router() ;
const riskPredictorController = require('../controllers/riskpredictor');
const {problemchat}= require("../controllers/problemChat")
const {mentalHealthBuddy} = require("../controllers/mindcare")

const dietPlanController = require('../controllers/dietplanner');



patientRouter.post("/mindcare",mentalHealthBuddy);
patientRouter.post('/risk', riskPredictorController.estimateRisk);
patientRouter.post("/problemchat",problemchat);
patientRouter.post('/plan', dietPlanController.generateDietPlan);

module.exports = patientRouter

