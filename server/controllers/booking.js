const User = require("../model/userSchema");
const Doctor = require("../model/doctorschema");

const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ommtripathi046@gmail.com", 
    pass: "yvbn uwys swlu pxcx",     
  },
});


const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "fullName email role");
    res.status(200).json({ doctors });
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors", error: err.message });
  }
};

const bookDoctor = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctorId } = req.params;
    const patient = await User.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    const doctor = await Doctor.findById(doctorId).populate("user", "fullName email");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const dummyAppointment = {
      date: "2025-08-25",
      time: "10:00 AM",
    };

    // Mail to doctor
    const mailToDoctor = {
      from: "ommtripathi046@gmail.com",
      to: doctor.user.email,
      subject: `Appointment Request for ${doctor.user.fullName}`,
      html: `
        <h2>New Appointment Request</h2>
        <p>Dear ${doctor.user.fullName},</p>
        <p>${patient.fullName} has requested an appointment with you.</p>
        <p><b>Patient Details:</b></p>
        <ul>
          <li><b>Name:</b> ${patient.fullName}</li>
          <li><b>Email:</b> ${patient.email}</li>
          <li><b>Date:</b> ${dummyAppointment.date}</li>
          <li><b>Time:</b> ${dummyAppointment.time}</li>
        </ul>
        <p>Please confirm at your earliest convenience.</p>
      `,
    };

    await transporter.sendMail(mailToDoctor);

    res.status(200).json({ message: "Appointment request sent to doctor successfully!" });

  } catch (err) {
    console.error("Error booking doctor:", err);
    res.status(500).json({ message: "Error booking doctor", error: err.message });
  }
};

module.exports = { getAllDoctors, bookDoctor };
