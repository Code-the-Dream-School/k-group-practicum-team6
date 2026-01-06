const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again" });
}

module.exports = errorHandlerMiddleware;


// const errorHandlerMiddleware = async (err, req, res, next) => {
//     return res.status(500).json({ msg: "Something went wrong. Try again later"});
//     // return res.status(err.statusCode).json({ msg: err.message });
// }

// module.exports = errorHandlerMiddleware;