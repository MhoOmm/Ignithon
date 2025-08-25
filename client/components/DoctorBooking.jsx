import { useEffect, useState } from "react";
import axiosInstance from "../src/axiosConfig";

export default function DoctorBooking() {
  const [doctors, setDoctors] = useState([]);
  const [bookingResult, setBookingResult] = useState(null);
  const [loadingDoctorId, setLoadingDoctorId] = useState(null);

  // Fetch all doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/doctor/all");
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
      const response = await axiosInstance.post(
        `/doctor/book/${doctorId}`,
        {}
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
    <div className="max-w-5xl mx-auto p-6 space-y-6">
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
              {/* Profile Photo */}
              {doc.user?.profilePhotoUrl && (
                <img
                  src={doc.user.profilePhotoUrl}
                  alt={doc.user.fullName}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
              )}

              {/* User info */}
              <h3 className="text-xl font-bold text-center">
                {doc.user?.fullName || "Unknown Doctor"}
              </h3>
              <p className="text-gray-600 text-center">
                <b>Email:</b> {doc.user?.email || "N/A"}
              </p>
              <p className="text-gray-600 text-center">
                <b>Role:</b> {doc.user?.role || "N/A"}
              </p>

              {/* Doctor-specific info */}
              <p className="text-gray-700 mt-2">
                <b>Specialization:</b> {doc.specialization || "N/A"}
              </p>
              <p className="text-gray-700 mt-1">
                <b>Bio:</b> {doc.bio || "N/A"}
              </p>

              {doc.hospital?.length > 0 && (
                <div className="mt-2">
                  <b>Hospital(s):</b>
                  <ul className="list-disc ml-6">
                    {doc.hospital.map((hosp, idx) => (
                      <li key={idx}>
                        {hosp.name || "N/A"} - {hosp.location || "N/A"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking button */}
              <button
                disabled={loadingDoctorId === doc._id}
                className={`mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ${
                  loadingDoctorId === doc._id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleBooking(doc._id)}
              >
                {loadingDoctorId === doc._id ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
