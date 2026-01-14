const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// Helper to send JWT(token) in cookie
const attachTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 * 30     // set to 30 days to match JWT_LIFETIME
  });
};

//-- Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.createJWT();   // createJWT method is from '../models/User'

  attachTokenCookie(res, token);    // send token in cookie

  res.status(StatusCodes.CREATED).json({
    user: { name: user.name },
  });
};

//-- Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // Search for user
  const user = await User.findOne({ email });
  if (!user){
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // create JWT
  const token = user.createJWT();
  attachTokenCookie(res, token);    // send token in cookie

  res.status(StatusCodes.OK).json({
    name: { name: user.name },
  });
}

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};


module.exports = {
  register,
  login,
  logout
}