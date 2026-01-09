const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
  },
});


//-- Mongo Middleware to hash the password
UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//-- Create Mongo Middleware methods to use in controller
//-- Method: createJWT to get the token
UserSchema.methods.createJWT = function() {
  return token = jwt.sign(
    { userId: this._id, name: this.name },  // _id and name are from 'this' Mongo User document
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME });
};

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(
    candidatePassword,  // password from user logging in: '../controllers/auth'
    this.password       // hashed password stored in database: MongoDB User document
  );
  return isMatch;
}


module.exports = mongoose.model("User", UserSchema);