const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;

// Helper to send JWT(token) in cookie
const attachTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 * 30, // set to 30 days to match JWT_LIFETIME
  });
};

//-- Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = user.createJWT(); // createJWT method is from '../models/User'

  attachTokenCookie(res, token); // send token in cookie

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
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // create JWT
  const token = user.createJWT();
  attachTokenCookie(res, token); // send token in cookie

  res.status(StatusCodes.OK).json({
    user: { name: user.name },
  });
};

//-- Logout
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

//-- Me: get current user
const me = async (req, res) => {
  res.status(StatusCodes.OK).json({
    user: req.user, // req.user is from authenticateUser
  });
};

// only set email in controller
const sendResetPasswordLink = async (email) => {
  try {
    //check if email exists - gets data from frontend in array form
    const user = await User.findOne({ email });
    //if there's no user found - throw message
    if (!user) return { success: false, message: "User not found" };
    //create token encrypt user data
    const resetToken = jwt.sign({ id: user._id, email: user.email }, SECRET, {
      expiresIn: process.env.JWT_LIFETIME || "1h",
    });
    //may need to be changed for deployment
    const resetLink = `http://localhost:5173/resetPassword?token=${resetToken}`;
    console.log(resetLink);

    return {
      success: true,
      message: "Reset password email sent successfully",
      resetLink,
    };
  } catch (error) {
    console.error("Reset error:", error);
    return { success: false, message: "Login failed. Please try again later." };
  }
};

const resetPasswordService = async (token, password) => {
  try {
    //verify token - if token's verified then user info will appear
    const decoded = jwt.verify(token, SECRET);
    const hashedPassword = await bcrypt.hash(password, 10);
    //confirmed token & successful password change - update user password in db
    const user = await User.findById(decoded.id);
    console.log("Decoded user: ", user);
    if (!user) return { success: false, message: "User not found" };
    console.log("User found?", user);
    user.password = hashedPassword;
    console.log("Hashed password: ", user.password);
    await user.save();
    console.log("Saved user", user.save());
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    return { success: false, message: "Reset failed. Please try again later." };
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  //  validate required fields
  if (!email)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Email is required" });
  try {
    const response = await sendResetPasswordLink(email);
    if (response.success) return res.status(StatusCodes.OK).json(response);
    else return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  } catch (error) {
    console.error("Error logging the user in:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Login failed. Please try again later.",
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  //  validate required fields
  if (!token || !password)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Password is required" });

  try {
    const response = await resetPasswordService(token, password);
    if (response.success) return res.status(StatusCodes.OK).json(response);
    else return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
  } catch (error) {
    console.error("Error logging the user in:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Reset failed. Please try again later.",
    });
  }
};

module.exports = { register, login, logout, me, forgotPassword, resetPassword };
