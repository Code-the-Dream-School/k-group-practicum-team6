const buildSearchQuery = (searchParams) => {
  if (!searchParams) {
    return {};
  }

  const regex = new RegExp(searchParams, "i"); // case-insensitive search
  return {
    $or: [{ subject: { $regex: regex } }, { details: { $regex: regex } }],
  };
};
module.exports = buildSearchQuery;
