const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
      required: true,
    },
  },

  { timestamps: true }
);


//-- Mongo Middleware to hash the password
UserSchema.pre("save", async function() {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

//-- Create Mongo Middleware methods to use in controller
//-- Method: createJWT to get the token
UserSchema.methods.createJWT = function() {
  return token = jwt.sign(
    { userId: this._id, name: this.name },  // _id and name are from 'this' Mongo User document
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME });
};

//-- Method: comparePassword
UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(
    candidatePassword,  // password from user logging in: '../controllers/auth'
    this.passwordHash   // hashed password stored in database: MongoDB User document
  );
  return isMatch;
}

module.exports = mongoose.model("User", UserSchema);
