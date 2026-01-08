const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
// const CustomAPIError = require("../errors/custom-error");
// const { createCustomError, CustomAPIError } = require("../errors/custom-error");
const bcrypt = require("bcryptjs");

//-- Register new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(StatusCodes.CREATED).json({ user });
}

//-- Login user
const login = async (req, res) => {
  // const { username, password } = req.body;
  // console.log(username, password);

  // if (!username || !password) {
  //   throw new CustomAPIError("Please provide username and password", 400);
  // }
  res.send('login user');
}

module.exports = {
  register,
  login
}