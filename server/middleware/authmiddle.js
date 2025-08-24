const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
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

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
