require('dotenv').config();
const User = require("../model/userSchema");
const Doctor = require("../model/doctorschema");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// Verify environment variables
if (!process.env.NM_Id || !process.env.NM_Auth) {
  console.error('Warning: Email configuration is missing. Please set NM_Id and NM_Auth environment variables.');
}

// Nodemailer transporter (hardcoded for now)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ommtripathi046@gmail.com",
    pass: "yvbn uwys swlu pxcx",
  },
});

// Verify transporter on startup and log result
transporter.verify((err, success) => {
  if (err) {
    console.error('Nodemailer verification failed:', err);
  } else {
    console.log('Nodemailer transporter ready');
  }
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
    // 1. Token Verification
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required. Please login." });
    }

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        "d9cc6805b6757f777411cede9009e0a8ffb6f3589855903b83fa714361690959"
      );
    } catch (jwtError) {
      console.error('JWT Verification failed:', jwtError);
      return res.status(401).json({ message: "Invalid or expired token. Please login again." });
    }
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

    try {
      const info = await transporter.sendMail(mailToDoctor);
      console.log('Email sent:', info);
      res.status(200).json({ message: "Appointment request sent to doctor successfully!", info });
    } catch (mailErr) {
      console.error('Failed to send email to doctor:', mailErr);
      return res.status(500).json({ message: 'Appointment created but failed to notify doctor by email', error: mailErr.message });
    }

  } catch (err) {
    console.error("Error booking doctor:", err);
    res.status(500).json({ message: "Error booking doctor", error: err.message });
  }
};

module.exports = { getAllDoctors, bookDoctor };
