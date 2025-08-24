import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import FancyButton from "./FancyButton";
import { NavLink } from "react-router";

export default function RiskPredictorForm() {
  const [riskScore, setRiskScore] = useState(null);
  const [userData, setUserData] = useState(null); // store submitted form data
  const [dietPlan, setDietPlan] = useState(null); // Store diet plan

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log("Form Submitted:", data);
    setUserData(data); // store form data

    try {
      const response = await axios.post(
        "http://localhost:4000/patient/risk",
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Server Response:", response.data);
      setRiskScore(response.data.tenYearRiskPercent); // store risk score
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Failed to submit form");
    }
  };

  const getDietPlan = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/patient/plan",
        {
          user_data: userData,
          message: "Generate a diet plan based on my risk assessment.",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Diet Plan Response:", response.data);
      setDietPlan(response.data.dietPlan); // Store the diet plan
    } catch (error) {
      console.error("Error fetching diet plan:", error);
      alert("❌ Failed to fetch diet plan");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Show form only if riskScore is null */}
      {riskScore === null && (
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-xl font-bold text-center">ASCVD Risk Predictor</h2>

          {/* Age */}
          <div>
            <label className="block font-medium">Age (years)</label>
            <input
              type="number"
              min="40"
              max="79"
              {...register("ageYears", { required: "Age is required" })}
              className="w-full border rounded p-2"
            />
            {errors.ageYears && (
              <p className="text-red-500 text-sm">{errors.ageYears.message}</p>
            )}
          </div>

          {/* Sex */}
          <div>
            <label className="block font-medium">Sex</label>
            <select
              {...register("sex", { required: "Sex is required" })}
              className="w-full border rounded p-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && (
              <p className="text-red-500 text-sm">{errors.sex.message}</p>
            )}
          </div>

          {/* Race */}
          <div>
            <label className="block font-medium">Race</label>
            <select
              {...register("race", { required: "Race is required" })}
              className="w-full border rounded p-2"
            >
              <option value="">Select</option>
              <option value="white">White</option>
              <option value="african_american">African American</option>
            </select>
            {errors.race && (
              <p className="text-red-500 text-sm">{errors.race.message}</p>
            )}
          </div>

          {/* Total Cholesterol */}
          <div>
            <label className="block font-medium">Total Cholesterol (mg/dL)</label>
            <input
              type="number"
              min="130"
              max="320"
              {...register("totalCholesterolMgDl", { required: "Total cholesterol is required" })}
              className="w-full border rounded p-2"
            />
            {errors.totalCholesterolMgDl && (
              <p className="text-red-500 text-sm">{errors.totalCholesterolMgDl.message}</p>
            )}
          </div>

          {/* HDL Cholesterol */}
          <div>
            <label className="block font-medium">HDL Cholesterol (mg/dL)</label>
            <input
              type="number"
              min="20"
              max="100"
              {...register("hdlCholesterolMgDl", { required: "HDL cholesterol is required" })}
              className="w-full border rounded p-2"
            />
            {errors.hdlCholesterolMgDl && (
              <p className="text-red-500 text-sm">{errors.hdlCholesterolMgDl.message}</p>
            )}
          </div>

          {/* Systolic BP */}
          <div>
            <label className="block font-medium">Systolic BP (mmHg)</label>
            <input
              type="number"
              min="90"
              max="200"
              {...register("systolicBpMmHg", { required: "Systolic BP is required" })}
              className="w-full border rounded p-2"
            />
            {errors.systolicBpMmHg && (
              <p className="text-red-500 text-sm">{errors.systolicBpMmHg.message}</p>
            )}
          </div>

          {/* Boolean fields */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("onHypertensionTreatment")} />
            <label>On Hypertension Treatment</label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("diabetes")} />
            <label>Diabetes</label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" {...register("currentSmoker")} />
            <label>Current Smoker</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      )}

      {/* Show Risk Score and FancyButton when riskScore exists */}
      {riskScore !== null && (
        <div className="mt-6 text-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Predicted 10-Year Risk</h3>
            <p className="text-2xl text-indigo-600 mt-2">{riskScore ? riskScore.toFixed(2) : 0}%</p>
          </div>

          <button
            onClick={getDietPlan}
            className="w-full bg-green-500 text-white rounded-lg p-2 hover:bg-green-600 mt-4"
          >
            Get Diet Plan
          </button>

          {dietPlan && (
            <div className="mt-4 bg-white p-4 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold">Diet Plan</h3>
              {dietPlan.split(/\*\*Breakfast\*\*|\*\*Lunch\*\*|\*\*Dinner\*\*|\*\*Snacks \(choose 1-2\)\*\*/)
                .filter(Boolean)
                .map((section, index) => {
                  const title = section.match(/^\s*([^\n]+)\s*\n/);
                  const content = section.replace(/^\s*[^\n]+\s*\n/, "").trim();

                  return (
                    <div key={index} className="mb-4">
                      {title && <h4 className="text-md font-semibold">{title[1]}</h4>}
                      <ul className="list-disc list-inside">
                        {content.split(". ")
                          .map((item, itemIndex) => (
                            <li key={itemIndex}>{item.trim()}</li>
                          ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
