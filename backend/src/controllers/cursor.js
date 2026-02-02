const Entry = require("../models/Entry");
//cursor pagination
async function fetchEntries({ cursor, limit }) {
    const query = {};
    //cursor = last entry's createdAt (or _id)
    if (cursor) query.createdAt = { $lt: new Date(cursor) };
    const entries = await Entry.find(query)
        .sort({ createdAt: -1 })//newest -> oldest
        .limit(limit + 1);//fetch one extra

    let nextCursor = null;

    if (entries.length > limit) {
        const lastEntry = entries[limit - 1];
        nextCursor = lastEntry.createdAt;
        entries.pop(); //remove extra
    }
    console.log("QUERY:", query);

    return {
        entries, nextCursor,
    }
}

module.exports = { fetchEntries };