const User = require("../model/userSchema");
const Doctor = require("../model/doctorschema");
const riskPredictorController = require('../controllers/riskpredictor');




const express  = require("express")
const patientRouter = express.Router() ;
const {mentalHealthBuddy} = require("../controllers/mindcare")



patientRouter.post("/mindcare",mentalHealthBuddy);
patientRouter.post('/risk', riskPredictorController.estimateRisk);
// patientRouter.post("/problem-chat",problemchat);

module.exports = patientRouter

