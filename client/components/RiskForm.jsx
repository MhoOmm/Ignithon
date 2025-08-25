import { useState } from "react";
import axiosInstance from "../src/axiosConfig";
import FancyButton from "./FancyButton"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RiskForm() {
  const [formData, setFormData] = useState({
    ageYears: "",
    sex: "male",
    race: "white",
    totalCholesterolMgDl: "",
    hdlCholesterolMgDl: "",
    systolicBpMmHg: "",
    onHypertensionTreatment: false,
    diabetes: false,
    currentSmoker: false,
  });

  

  const [riskResult, setRiskResult] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  try {
    // Convert string values to numbers
    const numericFormData = {
      ...formData,
      ageYears: Number(formData.ageYears),
      totalCholesterolMgDl: Number(formData.totalCholesterolMgDl),
      hdlCholesterolMgDl: Number(formData.hdlCholesterolMgDl),
      systolicBpMmHg: Number(formData.systolicBpMmHg)
    };

    const response = await axiosInstance.post("/patient/risk", numericFormData);
    if (response.data && response.data.risk) {
      setRiskResult(response.data);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (err) {
    console.error("Error calculating risk:", err);
    setError(err.response?.data?.message || "Failed to calculate risk. Please try again.");
  }
};

const getDietPlan = async () => {
  try {
    if (!riskResult) {
      setError("Please calculate your risk assessment first.");
      return;
    }

    // Clear previous state and show loading
    setError("Generating your personalized diet plan...");
    setDietPlan(null);

    // Prepare user data with all necessary information
    const dietPlanRequest = {
      user_data: {
        ...formData,
        ageYears: Number(formData.ageYears),
        totalCholesterolMgDl: Number(formData.totalCholesterolMgDl),
        hdlCholesterolMgDl: Number(formData.hdlCholesterolMgDl),
        systolicBpMmHg: Number(formData.systolicBpMmHg),
        risk: riskResult.risk,
        conditions: {
          diabetes: formData.diabetes,
          hypertension: formData.onHypertensionTreatment,
          smoking: formData.currentSmoker
        }
      },
      message: `Generate a detailed diet plan for a ${formData.ageYears}-year-old ${formData.sex} with ${riskResult.risk}% heart risk. 
                Health factors: Total Cholesterol ${formData.totalCholesterolMgDl}mg/dL, HDL ${formData.hdlCholesterolMgDl}mg/dL, 
                Blood Pressure ${formData.systolicBpMmHg}mmHg. 
                ${formData.diabetes ? 'Has diabetes. ' : ''}
                ${formData.onHypertensionTreatment ? 'On hypertension treatment. ' : ''}
                ${formData.currentSmoker ? 'Current smoker.' : ''}`
    };

    const response = await axiosInstance.post("/patient/plan", dietPlanRequest);

    // Validate and process response
    const planText = response.data?.dietPlan || response.data;
    
    if (!planText || typeof planText !== 'string') {
      throw new Error('Invalid diet plan format received');
    }

    // Ensure the plan has the required sections
    const requiredSections = ['Introduction', 'Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const hasSections = requiredSections.every(section => 
      planText.includes(`**${section}**`)
    );

    if (!hasSections) {
      throw new Error('Diet plan is missing required sections');
    }

    setDietPlan(planText);
    setError(null);

  } catch (error) {
    console.error("Diet plan error:", error);
    setError(error.response?.data?.message || error.message || "Failed to generate diet plan. Please try again.");
    setDietPlan(null);
  }
};



  const COLORS = ["#e74c3c", "#2ecc71"]; // Risk = red, Safe = green

  const chartData = riskResult
    ? [
        { name: "Risk", value: parseFloat(riskResult.risk) },
        { name: "Safe", value: 100 - parseFloat(riskResult.risk) },
      ]
    : [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-[#6366f1] mb-6">
          Heart Risk Calculator
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="number"
            name="ageYears"
            placeholder="Age"
            value={formData.ageYears}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select
            name="race"
            value={formData.race}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="white">White</option>
            <option value="african_american">Black / African American</option>
          </select>

          <input
            type="number"
            name="totalCholesterolMgDl"
            placeholder="Total Cholesterol (mg/dL)"
            value={formData.totalCholesterolMgDl}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="hdlCholesterolMgDl"
            placeholder="HDL Cholesterol (mg/dL)"
            value={formData.hdlCholesterolMgDl}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="number"
            name="systolicBpMmHg"
            placeholder="Systolic BP (mmHg)"
            value={formData.systolicBpMmHg}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Checkboxes full width */}
          <div className="col-span-2 space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="onHypertensionTreatment"
                checked={formData.onHypertensionTreatment}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
              />
              <span>On Hypertension Treatment</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="diabetes"
                checked={formData.diabetes}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
              />
              <span>Diabetes</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="currentSmoker"
                checked={formData.currentSmoker}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
              />
              <span>Current Smoker</span>
            </label>
          </div>

          {/* Submit Button full width, centered */}
        <div className="col-span-2 flex justify-center mt-4">
          <FancyButton
            label="Calculate Risk"
            backgroundColor="#6366f1"
            text="white"
            color="black"
            type="submit"
          />
        </div>

        </form>

       {/* Result */}
        {riskResult && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              {riskResult.message}
            </h3>

            {/* Chart */}
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Diet Plan Button */}
            <div className="col-span-2 flex justify-center mt-4">
              <FancyButton
                label="Get Personalized Diet Plan"
                backgroundColor="#6366f1"
                text="white"
                color="black"
                onClick={getDietPlan}
                type="button"
              />
            </div>

            {/* Diet Plan Result */}
            {/* Diet Plan Result */}
{dietPlan && (
  <div className="mt-6 bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg text-left border border-indigo-100">
    <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-black to-[#6366f1] bg-clip-text text-transparent">
      Your Personalized Diet Plan
    </h3>
    
    <div className="space-y-6">
      {dietPlan
        .split(/\*\*([^*]+)\*\*/)
        .filter((_, index) => index % 2 === 1) // Get only section titles
        .map((sectionTitle) => {
          const sectionPattern = new RegExp(`\\*\\*${sectionTitle}\\*\\*([^*]+)`);
          const match = dietPlan.match(sectionPattern);
          const content = match ? match[1].trim() : '';

          if (!content) return null;

          return (
            <div key={sectionTitle} className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition duration-200">
              <h4 className="text-lg font-bold text-[#6366f1] mb-4">
                {sectionTitle}
              </h4>
              <div className="text-gray-700 leading-relaxed space-y-3">
                {content
                  .split('\n')
                  .filter(line => line.trim())
                  .map((line, index) => (
                    <div key={index} className="flex items-start">
                      <span className="mr-3 text-[#6366f1] text-lg">•</span>
                      <span className="flex-1">{line.trim()}</span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
    </div>
    
    {/* Add a close button */}
    <div className="mt-6 flex justify-center">
      <button
        onClick={() => setDietPlan(null)}
        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Close Diet Plan
      </button>
    </div>
                  {/* single close button above */}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
}
