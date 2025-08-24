import { useForm } from "react-hook-form";
import { useState } from "react";

export default function TestBooking() {
  const [bookingResult, setBookingResult] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log("Booking Data:", data);

    // Simulate API response with a small delay
    setTimeout(() => {
      setBookingResult(
        `✅ Your ${data.testName.replace("_", " ")} is booked for ${data.testDate}`
      );
    }, 500);
  };

  const testOptions = [
    { value: "blood_test", label: "Blood Test" },
    { value: "cholesterol_test", label: "Cholesterol Test" },
    { value: "blood_sugar", label: "Blood Sugar Test" },
    { value: "ecg", label: "ECG" },
    { value: "xray", label: "X-Ray" },
  ];

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">
        Book a Test
      </h2>

      {bookingResult === null ? (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Test</label>
            <select
              {...register("testName", { required: "Please select a test" })}
              className="w-full border border-gray-300 rounded-lg p-2 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select a test</option>
              {testOptions.map((test) => (
                <option key={test.value} value={test.value}>
                  {test.label}
                </option>
              ))}
            </select>
            {errors.testName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.testName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Preferred Date</label>
            <input
              type="date"
              {...register("testDate", { required: "Please select a date" })}
              className="w-full border border-gray-300 rounded-lg p-2 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {errors.testDate && (
              <p className="text-red-500 text-sm mt-1">{errors.testDate.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition duration-200"
          >
            Book Test
          </button>
        </form>
      ) : (
        <div className="text-center p-6 bg-green-100 rounded-lg space-y-4">
          <p className="text-green-800 font-semibold">{bookingResult}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => setBookingResult(null)}
          >
            Book Another Test
          </button>
        </div>
      )}
    </div>
  );
}
