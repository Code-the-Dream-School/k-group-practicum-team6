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
  let focusSum = 0;
  let moodCount = {};
  let maxCount = 0;

  entries.forEach(({ duration, focus, mood }) => {
    //sum total minutes
    totalMinutes += duration || 0;
    // sum focus
    focusSum += focus || 0;
    //sum mood counts
    moodCount[mood] = (moodCount[mood] || 0) + 1;
  });

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Average Focus

  const averageFocus = Math.round(focusSum / entries.length);

  // Overall Mood
  let overallMood;
  Object.keys(moodCount).forEach((mood) => {
    if ((moodCount[mood] ?? 0) >= maxCount) {
      overallMood = mood;
      maxCount = moodCount[mood];
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
