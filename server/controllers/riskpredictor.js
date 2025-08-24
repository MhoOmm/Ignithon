// controllers/riskPredictor.controller.js

const { computeAscvdTenYearRisk, categorizeRisk } = require('../middleware/riskPredictor');

const RiskPredictorInput = require('../model/riskpredictorSchema.js');

exports.estimateRisk = async (req, res) => {
  try {
    const input = req.body;

    // Call the middleware functions to compute risk and categorize it
    const { tenYearRiskPercent, modelUsed, debug } = computeAscvdTenYearRisk(input);
    const riskCategory = categorizeRisk(tenYearRiskPercent);

    let savedInputId = null;
    if (req.query.saveInput === 'true') {
      // Save the input to the database
      const riskPredictorInput = new RiskPredictorInput(input);
      await riskPredictorInput.save();
      savedInputId = riskPredictorInput._id;
    }

    res.status(200).json({
      tenYearRiskPercent: tenYearRiskPercent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.reassessRisk = (req, res) => {
  try {
    const { previous, current } = req.body;

    const previousResult = computeAscvdTenYearRisk(previous);
    const currentResult = computeAscvdTenYearRisk(current);

    const absoluteDelta = currentResult.tenYearRiskPercent - previousResult.tenYearRiskPercent;
    const relativeDeltaPct = ((absoluteDelta / previousResult.tenYearRiskPercent) * 100) || 0; // Avoid division by zero

    res.status(200).json({
      previousTenYearRiskPercent: previousResult.tenYearRiskPercent,
      currentTenYearRiskPercent: currentResult.tenYearRiskPercent,
      absoluteDelta: absoluteDelta,
      relativeDeltaPct: relativeDeltaPct,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

exports.therapyImpact = (req, res) => {
  res.status(501).json({ message: 'Therapy impact scenarios not implemented' });
};
