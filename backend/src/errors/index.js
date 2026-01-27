/*
  Reference this index.js in your file to get these errors as default exports:
    Ex: 
      const { CustomAPIError } = require("../errors");
*/

const CustomAPIError = require("./custom-error");
const UnauthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");
const BadRequestError = require("./bad-request");
const ForbiddenError = require("./forbidden-error");

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
}