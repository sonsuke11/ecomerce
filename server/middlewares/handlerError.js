const ErrorResponse = require("../utils/errorResponse");;

const handlerError = (err, req, res, next) => {
  let error = { ...err };;
  console.log(err);;
  if (err.code === 11000) {
    const message = "Duplicate field value";;
    error = new ErrorResponse(400, message);;
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);;
    error = new ErrorResponse(400, message);;
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Internal Server Error" });;
};;

module.exports = handlerError;;
