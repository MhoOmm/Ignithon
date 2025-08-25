const express = require("express");
require("dotenv").config();

const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const main = require("./config/db");
const authRouter = require("./routes/authRoutes");
const patientRouter = require("./routes/patientRoutes");
const bookRouter = require("./routes/bookingRoutes");
const errorHandler = require('./middleware/errorHandler');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://sanjeevni-frontend-asef.onrender.com",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['set-cookie']
}));

// Routes
app.use("/user", authRouter);
app.use("/patient", patientRouter);
app.use("/doctor", bookRouter);

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is running" });
});

const initCon = async () => {
    try {
        await main();
        console.log("Connected to DB");
        
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running at port: ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit if DB connection fails
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

initCon();
