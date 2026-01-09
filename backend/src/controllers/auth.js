const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

//-- Register new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();   // createJWT method is from '../models/User'

  res.status(StatusCodes.CREATED).json({
    user: { user: user.name },
    token
  });
}

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
  // Use our created middleware UserSchema method comparePassword from '../models/User'
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  // Middleware UserSchema method createJWT from '../models/User'
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    name: { name: user.name },
    token
  });
}

module.exports = {
  register,
  login
}