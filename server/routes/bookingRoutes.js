const express = require("express");
const bookrouter = express.Router();
const { getAllDoctors, bookDoctor } = require("../controllers/booking");
const authMiddleware = require("../middleware/authmiddle");

// Fetch all doctors (no auth required if you want, else keep auth)
bookrouter.get("/all", getAllDoctors);

// Book a doctor (requires logged-in patient)
bookrouter.post("/book/:doctorId", authMiddleware, bookDoctor);

module.exports = bookrouter;
