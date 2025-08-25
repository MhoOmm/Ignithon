require('dotenv').config();
const User = require("../model/userSchema");
const Doctor = require("../model/doctorschema");

const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NM_Id, 
    pass: process.env.NM_Auth,     
  },
});


const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}, "specialization bio hospital") 
      .populate("user", "fullName email role profilePhotoUrl phone dob location");

    res.status(200).json({ doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching doctors", error: err.message });
  }
};


const bookDoctor = async (req, res) => {
  try {
    const token =
          req.cookies?.token || req.headers.authorization?.split(" ")[1];
    
        if (!token) {
          return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(
          token,
          "d9cc6805b6757f777411cede9009e0a8ffb6f3589855903b83fa714361690959"
        );
        req.user = {
          id: decoded._id,
          email: decoded.email,
          role: decoded.role,
        };
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
      from: process.env.NM_Id,
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
