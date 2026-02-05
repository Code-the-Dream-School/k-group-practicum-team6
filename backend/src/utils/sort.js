const sortEntries = (reqQuery) => {
  //sorting
const { sort } = reqQuery;
   let sortBy;

   // your override logic
   if (sort) {
     const allowedFields = ["createdAt", "updatedAt", "subject"];
     const field = sort.replace("-", "");//overall sorting

     if (allowedFields.includes(field)) {
       sortBy = sort; // override ONLY if valid
     }
   }
   return sortBy;
};

module.exports = { sortEntries };