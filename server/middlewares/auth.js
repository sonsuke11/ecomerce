const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")
const authorize = async (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.authorization.split(" ")[1]
  try {
    const { id } = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(id)
    if (!user) {
      return next(new ErrorResponse(401, "Invalid token"))
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = authorize
