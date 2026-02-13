const sortEntries = (reqQuery) => {
  //sorting
const { sort } = reqQuery;
   let sortBy;
   const allowedFields = ["createdAt", "updatedAt", "subject", "duration", "mood", "focus"];

   if (sort) {
     // Strip leading '-' so we can validate the field name.
     // Mongoose uses '-' to indicate descending sort.
     const field = sort.replace("-", "");
     if (allowedFields.includes(field)) {
       sortBy = sort; // override ONLY if valid
     }
   }
   return sortBy;
};

module.exports = { sortEntries };