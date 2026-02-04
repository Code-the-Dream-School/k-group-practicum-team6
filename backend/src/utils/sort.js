const sortEntries = (reqQuery) => {
  //sorting
const { sort } = reqQuery;
   let sortBy;

   // your override logic
   if (sort) {
     const allowedFields = ["createdAt", "updatedAt", "title"];
     const field = sort.replace("-", "");

     if (allowedFields.includes(field)) {
       sortBy = sort; // override ONLY if valid
     }
   }
   return sortBy;
};

module.exports = { sortEntries };