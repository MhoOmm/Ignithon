const express = require("express");
const authRouter = express.Router();
const authMiddleware = require("../middleware/authmiddle")

const {login,register,logout}  = require("../controllers/authControllers")



authRouter.post("/login",login);
authRouter.post("/register",register);
authRouter.post("/logout",authMiddleware,logout)


module.exports = authRouter

