const pagEntries = (mongooseQuery, reqQuery) => {
  const page = Math.max(Number(reqQuery.page) || 1, 1);
  const limit = Math.min(Math.max(Number(reqQuery.limit) || 5, 1), 50);
  const skip = (page - 1) * limit;

  const query = mongooseQuery.skip(skip).limit(limit);

  return {
    query,
    page,
    limit,
  };
};
module.exports = pagEntries;
