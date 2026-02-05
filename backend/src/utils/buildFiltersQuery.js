const buildFiltersQuery = (filters) => {
  const query = {};

  if (filters.mood) {
    query.mood = filters.mood;
  }

  if (filters.focus) {
    query.focus = filters.focus;
  }
  return query;
};

module.exports = buildFiltersQuery;
