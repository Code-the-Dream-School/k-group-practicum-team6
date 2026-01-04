const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

//-- Register new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user });
}

//-- Login user
const login = async (req, res) => {
  res.send('login user');
}

module.exports = {
  register,
  login
}