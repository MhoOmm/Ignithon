import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorBooking() {
  const [doctors, setDoctors] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);

  // Fetch all doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("https://sanjeevni-backend.onrender.com/doctor/all", {
          withCredentials: true,
        });
        setDoctors(response.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // Book doctor
  const handleBooking = async (doctorId) => {
    setLoadingDoctorId(doctorId);
    try {
      const response = await axios.post(
        `https://sanjeevni-backend.onrender.com/doctor/book/${doctorId}`,
        {},
        { withCredentials: true }
      );
      setBookingResult(
        response.data.message || "✅ Appointment booked successfully!"
      );
    } catch (err) {
      console.error("Error booking doctor:", err);
      if (err.response?.data?.message) {
        setBookingResult(`❌ ${err.response.data.message}`);
      } else {
        setBookingResult("❌ Failed to book the appointment.");
      }
    }
    setLoadingDoctorId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-700">
        Book a Doctor
      </h2>

      {/* Result message */}
      {bookingResult && (
        <div className="text-center p-4 bg-green-100 rounded-lg">
          <p className="font-semibold text-green-800">{bookingResult}</p>
          <button
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setBookingResult(null)}
          >
            Book Another Doctor
          </button>
        </div>
      )}

      {/* Doctor list */}
      {doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{doc.user.fullName}</h3>
              <p className="text-gray-600">
                <b>Email:</b> {doc.user.email}
              </p>
              <p className="text-gray-600">
                <b>Role:</b> {doc.user.role}
              </p>
              <button
                disabled={loadingDoctorId === doc._id}
                className={`mt-3 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ${
                  loadingDoctorId === doc._id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleBooking(doc._id)}
              >
                {loadingDoctorId === doc._id
                  ? "Booking..."
                  : "Book Appointment"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
