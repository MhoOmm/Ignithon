import { useForm } from "react-hook-form";
import axios from "axios";

export default function RiskPredictorForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 👇 mark this as async
  const submitHandler = async (data) => {
    console.log("Form Submitted:", data);

    if (onSubmit) onSubmit(data);

    try {
      const response = await axios.post(
        "http://localhost:4000/patient/problemchat",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Server Response:", response.data);
      alert("✅ " + response.data.message);
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("❌ Failed to submit form");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4"
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
        <label className="block font-medium">
          Total Cholesterol (mg/dL)
        </label>
        <input
          type="number"
          min="130"
          max="320"
          {...register("totalCholesterolMgDl", {
            required: "Total cholesterol is required",
          })}
          className="w-full border rounded p-2"
        />
        {errors.totalCholesterolMgDl && (
          <p className="text-red-500 text-sm">
            {errors.totalCholesterolMgDl.message}
          </p>
        )}
      </div>

      {/* HDL Cholesterol */}
      <div>
        <label className="block font-medium">
          HDL Cholesterol (mg/dL)
        </label>
        <input
          type="number"
          min="20"
          max="100"
          {...register("hdlCholesterolMgDl", {
            required: "HDL cholesterol is required",
          })}
          className="w-full border rounded p-2"
        />
        {errors.hdlCholesterolMgDl && (
          <p className="text-red-500 text-sm">
            {errors.hdlCholesterolMgDl.message}
          </p>
        )}
      </div>

      {/* Systolic BP */}
      <div>
        <label className="block font-medium">Systolic BP (mmHg)</label>
        <input
          type="number"
          min="90"
          max="200"
          {...register("systolicBpMmHg", {
            required: "Systolic BP is required",
          })}
          className="w-full border rounded p-2"
        />
        {errors.systolicBpMmHg && (
          <p className="text-red-500 text-sm">
            {errors.systolicBpMmHg.message}
          </p>
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
  );
}
