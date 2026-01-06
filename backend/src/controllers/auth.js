const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors/bad-request");
// const CustomAPIError = require("../errors/custom-error");
const { createCustomError, CustomAPIError } = require("../errors/custom-error");

//-- Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    // throw new BadRequestError("Please provide name, email and password.");
  }
  const user = await User.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ user });
}

//-- Login user
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }
  // res.send('login user');
}

module.exports = {
  register,
  login
}