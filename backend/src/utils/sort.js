const sortEntries = (reqQuery) => {
  //sorting
const { sort } = reqQuery;
   let sortBy;
   const allowedFields = ["createdAt", "updatedAt", "subject"];

   if (sort) {
     const field = sort.replace("-", "");//overall sorting
     if (allowedFields.includes(field)) {
       sortBy = sort; // override ONLY if valid
     }
   }
   return sortBy;
};

module.exports = { sortEntries };