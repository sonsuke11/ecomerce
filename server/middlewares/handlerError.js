const ErrorResponse = require("../utils/errorResponse")

const handlerError = (err, req, res, next) => {
  let error = { ...err }
  if (err.code === 11000) {
    const message = "Lỗi trùng lặp dữ liệu"
    error = new ErrorResponse(400, message)
  }
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message)
    error = new ErrorResponse(400, message)
  }
  console.log("err", err)
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Lỗi máy chủ" })
}

module.exports = handlerError
