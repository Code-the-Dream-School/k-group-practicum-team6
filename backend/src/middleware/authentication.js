const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to the req for the routes to use after authentication 
    req.user = { userId: payload.userId, name: payload.name };
    next();   // invoke to go to the next route
  } catch(error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
}

module.exports = auth;