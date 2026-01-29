const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // Get token from HTTP‑only cookie instead of Authorization header
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the req for the routes to use after authentication 
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch(error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
}

module.exports = auth;