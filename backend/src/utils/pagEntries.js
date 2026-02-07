const pagEntries = (mongooseQuery, reqQuery) => {
    const page = Number(reqQuery.page) || 1;
    const limit = Number(reqQuery.limit) || 5;
    const skip = (page - 1) * limit;

    return mongooseQuery.skip(skip).limit(limit);
}
module.exports = pagEntries;