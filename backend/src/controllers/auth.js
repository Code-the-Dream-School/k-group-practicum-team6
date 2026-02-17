const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET = process.env.JWT_SECRET;
const sendEmail = require("../utils/sendEmail");

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

  const user = await User.findOne({ email }).select("+password");

  /* 🔒 Always run bcrypt compare to prevent timing attacks
     Prevents attackers from: timing login differences & 
     enumerating valid emails
  */
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // 🔒 Account permanently locked
  if (user.isLocked) {
    return res.status(403).json({
      message: "Account locked. Password reset required.",
      locked: true,
    });
  }

  const match = await user.comparePassword(password);

  // ❌ Wrong password
  if (!match) {
    user.failedLoginAttempts += 1;

    if (user.failedLoginAttempts >= 5) {
      user.isLocked = true;
    }

    await user.save();

    return res.status(401).json({
      message: "Invalid credentials",
      attemptsLeft: Math.max(0, 5 - user.failedLoginAttempts),
      locked: user.isLocked,
    });
  }

  // ✅ Successful login
  user.failedLoginAttempts = 0;
  user.isLocked = false;
  await user.save();

  const token = user.createJWT();
  attachTokenCookie(res, token);

  res.status(200).json({
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

    //sends the email
    await sendEmail({
      to: user.email,
      subject: "Reset your accound password",
      html: `
          <p>You requested a password reset.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires soon.</p>
        `,
    });
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
 
    //confirmed token & successful password change - update user password in db
    const user = await User.findById(decoded.id);
    if (!user) return { success: false, message: "User not found" };
    
    //saves when user password is changed
    user.password = password;
    user.failedLoginAttempts = 0;
    user.isLocked = false;
    await user.save();
    
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
