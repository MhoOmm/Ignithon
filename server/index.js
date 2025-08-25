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


app.use(express.json());
app.use(cookieParser());
// CORS: allow production frontend and localhost during development
const allowedOrigins = [
  'https://sanjeevni-frontend-asef.onrender.com',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

app.use(cors({
    origin: function(origin, callback){
        // allow REST clients or same-origin requests with no origin
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            console.warn('Blocked CORS request from origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Origin', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204
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
        const server = app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running at port: ${PORT}`);
        });

        // Handle server errors
        server.on('error', (error) => {
            console.error('Server Error:', error);
            process.exit(1);
        });

        // Handle unhandled rejections
        process.on('unhandledRejection', (error) => {
            console.error('Unhandled Rejection:', error);
            process.exit(1);
        });

    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
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
