const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
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
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
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

module.exports = mongoose.model("User", UserSchema);
