// controllers/riskpredictor.js
exports.estimateRisk = async (req, res) => {
  try {
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
    } = req.body;

    // ✅ Force lowercase keys to avoid mismatch
    const sexKey = sex?.toLowerCase();
    const raceKey = race?.toLowerCase();

    // Example coefficients (Framingham style — adjust to ASCVD later)
    const coeffs = {
      male: {
        age: 3.06117,
        totalCholesterol: 1.12370,
        hdl: -0.93263,
        sbp_treated: 1.99881,
        sbp_untreated: 1.93303,
        smoker: 0.65451,
        diabetes: 0.57367,
        meanLP: 23.9802,
        s0: 0.88936,
      },
      female: {
        age: 2.32888,
        totalCholesterol: 1.20904,
        hdl: -0.70833,
        sbp_treated: 2.82263,
        sbp_untreated: 2.76157,
        smoker: 0.52873,
        diabetes: 0.69154,
        meanLP: 26.1931,
        s0: 0.95012,
      },
    };

    if (!coeffs[sexKey]) {
      return res.status(400).json({ error: "Invalid sex value" });
    }

    const c = coeffs[sexKey];

    // ✅ Build linear predictor (log terms)
    const lp =
      c.age * Math.log(ageYears) +
      c.totalCholesterol * Math.log(totalCholesterolMgDl) +
      c.hdl * Math.log(hdlCholesterolMgDl) +
      (onHypertensionTreatment
        ? c.sbp_treated * Math.log(systolicBpMmHg)
        : c.sbp_untreated * Math.log(systolicBpMmHg)) +
      (currentSmoker ? c.smoker : 0) +
      (diabetes ? c.diabetes : 0);

    // ✅ Risk calculation
    const risk = 1 - Math.pow(c.s0, Math.exp(lp - c.meanLP));
    const riskPct = (risk * 100).toFixed(1);

    // 🔍 Debug log
    console.log("DEBUG ASCVD CALC:", {
      sex: sexKey,
      ageYears,
      totalCholesterolMgDl,
      hdlCholesterolMgDl,
      systolicBpMmHg,
      smoker: currentSmoker,
      diabetes,
      treated: onHypertensionTreatment,
      lp,
      meanLP: c.meanLP,
      s0: c.s0,
      risk,
    });

    return res.json({
      risk: riskPct,
      message: `Estimated 10-year ASCVD risk: ${riskPct}%`,
    });
  } catch (err) {
    console.error("Error estimating risk:", err);
    return res.status(500).json({ error: "Failed to calculate risk" });
  }
};
