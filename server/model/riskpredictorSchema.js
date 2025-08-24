const mongoose = require('mongoose');
const { Schema } = mongoose;

const RiskPredictorSchema = new Schema(
  {
    ageYears: {
      type: Number,
      required: true,
      min: [40, 'Age must be between 40 and 79 for 10-year ASCVD risk'],
      max: [79, 'Age must be between 40 and 79 for 10-year ASCVD risk'],
    },
    sex: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    race: {
      type: String,
      required: true,
      enum: ['white', 'african_american', 'other'],
    },

    totalCholesterolMgDl: {
      type: Number,
      required: true,
      min: [130, 'Total cholesterol must be between 130 and 320 mg/dL'],
      max: [320, 'Total cholesterol must be between 130 and 320 mg/dL'],
    },
    hdlCholesterolMgDl: {
      type: Number,
      required: true,
      min: [20, 'HDL must be between 20 and 100 mg/dL'],
      max: [100, 'HDL must be between 20 and 100 mg/dL'],
    },

    systolicBpMmHg: {
      type: Number,
      required: true,
      min: [90, 'SBP must be between 90 and 200 mmHg'],
      max: [200, 'SBP must be between 90 and 200 mmHg'],
    },
    onHypertensionTreatment: {
      type: Boolean,
      required: true,
    },

  
    diabetes: {
      type: Boolean,
      required: true,
    },
    currentSmoker: {
      type: Boolean, 
      required: true,
    },
  },
  {
    collection: 'risk_predictor_inputs',
    versionKey: false,
    strict: 'throw',
    timestamps: false
  }
);

module.exports = mongoose.model('RiskPredictorInput', RiskPredictorSchema);

