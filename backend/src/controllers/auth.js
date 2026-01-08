const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

//-- Register new user
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();   // createJWT method is from User model

  res.status(StatusCodes.CREATED).json({
    user: { user: user.name },
    token
  });
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