const Entry = require("../models/Entry");
//cursor pagination
async function fetchEntries({ cursor, limit, userId }) {
  //convert query from string to ObjectId
  const query = { createdBy: userId };
  //cursor = last entry's createdAt (or _id)
  if (cursor) query.createdAt = { $lt: new Date(cursor) };

  const entries = await Entry.find(query)
    .sort({ createdAt: -1 }) //newest -> oldest
    .limit(limit + 1); //fetch one extra

  let nextCursor = null;

  if (entries.length > limit) {
    nextCursor = entries[limit - 1].createdAt;
    entries.pop(); //remove extra
  }
  console.log("FETCH query FINAL:", query);

  return {
    entries,
    nextCursor,
  };
}

module.exports = { fetchEntries };
