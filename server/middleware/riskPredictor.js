
const PCE_COEFFICIENTS = {
    male: {
      white: {
        meanLP: 26.1234,
        s0: 0.9144, 
        bAge: 0.1,
        bLogTotalChol: 0.2,
        bLogHdlChol: -0.3,
        bLogSbp: 0.4,
        bOnTreatment: 0.5,
        bSmoker: 0.6,
        bDiabetes: 0.7,
        bAgeXLogTotalChol: 0.05
      },
      african_american: {
        meanLP: 26.1234,
        s0: 0.9144, 
        bAge: 0.1,
        bLogTotalChol: 0.2,
        bLogHdlChol: -0.3,
        bLogSbp: 0.4,
        bOnTreatment: 0.5,
        bSmoker: 0.6,
        bDiabetes: 0.7,
        bAgeXLogTotalChol: 0.05
      }
    },
    female: {
      white: {
        meanLP: 26.1234, 
        s0: 0.9144, 
        bAge: 0.1,
        bLogTotalChol: 0.2,
        bLogHdlChol: -0.3,
        bLogSbp: 0.4,
        bOnTreatment: 0.5,
        bSmoker: 0.6,
        bDiabetes: 0.7,
        bAgeXLogTotalChol: 0.05
      },
      african_american: {
        meanLP: 26.1234, // TODO: Replace with actual value
        s0: 0.9144, // TODO: Replace with actual value
        bAge: 0.1,
        bLogTotalChol: 0.2,
        bLogHdlChol: -0.3,
        bLogSbp: 0.4,
        bOnTreatment: 0.5,
        bSmoker: 0.6,
        bDiabetes: 0.7,
        bAgeXLogTotalChol: 0.05
      }
    }
  };
  
  /**
   * @param {{ageYears:number, sex:string, race:string, totalCholesterolMgDl:number, hdlCholesterolMgDl:number, systolicBpMmHg:number, onHypertensionTreatment:boolean, diabetes:boolean, currentSmoker:boolean}} input
   * @returns {{tenYearRiskPercent: number, modelUsed: string, debug: { lp: number, s0: number, meanLP: number }}}
   */
  const computeAscvdTenYearRisk = (input) => {
    const {
      ageYears,
      sex,
      race,
      totalCholesterolMgDl,
      hdlCholesterolMgDl,
      systolicBpMmHg,
      onHypertensionTreatment,
      diabetes,
      currentSmoker,
    } = input;
  
    const modelKey = `${sex}.${race}`;
    const model = PCE_COEFFICIENTS[sex][race];
    if (!model) {
      throw new Error(`Unsupported race/sex combination: ${modelKey}`);
    }
  
    const {
      meanLP,
      s0,
      bAge,
      bLogTotalChol,
      bLogHdlChol,
      bLogSbp,
      bOnTreatment,
      bSmoker,
      bDiabetes,
      bAgeXLogTotalChol
    } = model;
  
    const logTotalChol = Math.log(totalCholesterolMgDl);
    const logHdlChol = Math.log(hdlCholesterolMgDl);
    const logSbp = Math.log(systolicBpMmHg);
  
    const lp = (
      bAge * ageYears +
      bLogTotalChol * logTotalChol +
      bLogHdlChol * logHdlChol +
      bLogSbp * logSbp +
      bOnTreatment * (onHypertensionTreatment ? 1 : 0) +
      bSmoker * (currentSmoker ? 1 : 0) +
      bDiabetes * (diabetes ? 1 : 0) +
      bAgeXLogTotalChol * ageYears * logTotalChol
    );
  
    const risk = 1 - s0 ** Math.exp(lp - meanLP);
    const tenYearRiskPercent = Math.max(0, Math.min(100, risk * 100)); // Cap between 0-100%
  
    return {
      tenYearRiskPercent
    };
  };
  
  const categorizeRisk = (tenYearRiskPercent) => {
    if (tenYearRiskPercent < 5) {
      return 'low';
    } else if (tenYearRiskPercent < 7.5) {
      return 'borderline';
    } else if (tenYearRiskPercent < 20) {
      return 'intermediate';
    } else {
      return 'high';
    }
  };
  
  module.exports = { computeAscvdTenYearRisk, categorizeRisk };