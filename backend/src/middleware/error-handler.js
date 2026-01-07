const { StatusCodes } = require("http-status-codes");
const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
}

module.exports = errorHandlerMiddleware;


// const errorHandlerMiddleware = async (err, req, res, next) => {
//     return res.status(500).json({ msg: "Something went wrong. Try again later"});
//     // return res.status(err.statusCode).json({ msg: err.message });
// }

// module.exports = errorHandlerMiddleware;