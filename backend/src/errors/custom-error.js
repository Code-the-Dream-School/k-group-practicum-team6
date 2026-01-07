class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
  }
}

module.exports = CustomAPIError;

// class CustomAPIError extends Error {
//   constructor(message, statusCode) {
//     super(message);
//     this.statusCode = statusCode;
//   }
// }

// // Create custom error function
// const createCustomError = (msg, statusCode) => {
//   return new CustomAPIError(msg, statusCode);
// }

// module.exports = { createCustomError, CustomAPIError };