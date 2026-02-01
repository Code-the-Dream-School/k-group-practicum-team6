const Entry = require("../models/Entry");
const { StatusCodes } = require("http-status-codes");

const getDashboardStats = async (req, res) => {
  const userId = req.user.userId;

  // get all entries for the user
  const entries = await Entry.find({ createdBy: userId });

  // if no entries, return zeros
  if (entries.length === 0) {
    return res.status(StatusCodes.OK).json({
      timeSpent: { hours: 0, minutes: 0 },
      averageFocus: 0,
      overallMood: null,
    });
  }

  // Time Spent
  let totalMinutes = 0;

  entries.forEach((entry) => {
    totalMinutes += entry.duration || 0;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Average Focus
  let focusSum = 0;

  entries.forEach((entry) => {
    focusSum += entry.focus || 0;
  });

  const averageFocus = Math.round(focusSum / entries.length);

  // Overall Mood
  const moodCount = {};
  let overallMood = null;
  let maxCount = 0;

  entries.forEach(({ mood }) => {
    moodCount[mood] = (moodCount[mood] || 0) + 1;

    if (moodCount[mood] > maxCount) {
      maxCount = moodCount[mood];
      overallMood = mood;
    }
  });

  res.status(StatusCodes.OK).json({
    timeSpent: { hours, minutes },
    averageFocus,
    overallMood,
  });
};

module.exports = {
  getDashboardStats,
};
