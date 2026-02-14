const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");
const mongoose = require("mongoose");

const auth = async (req, res, next) => {
  // Get token from HTTP‑only cookie instead of Authorization header
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!mongoose.Types.ObjectId.isValid(payload.userId)) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    // Attach user to the req for the routes to use after authentication
    req.user = {
      userId: new mongoose.Types.ObjectId(String(payload.userId)),
      name: payload.name,
      role: payload.role,
      email: payload.email,
    };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
