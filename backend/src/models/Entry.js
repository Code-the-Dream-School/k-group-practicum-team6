const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      require: true,
      default: Date.now,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    duration: {
      type: Number,
      required: true,
      min: 0,
    },

    mood: {
      type: String,
      required: true,
      enum: ["amazing", "good", "meh", "bad", "awful"],
    },

    focus: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    details: {
      type: String,
      trim: true,
      maxlength: 10000,
    },

    // Maybe add tags and isPrivate at later stage
    // tags: {},
    // isPrivate: {},
  },

  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
