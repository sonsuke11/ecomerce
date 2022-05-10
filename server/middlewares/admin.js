const ErrorResponse = require("../utils/errorResponse")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { ADMIN } = require("../utils/constants")
const admin = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1]
  console.log("first")
  try {
    console.log("id", jwt.verify(token, process.env.SECRET_KEY))
    const { id } = await jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(id)
    if (!user) {
      return next(new ErrorResponse(401, "Invalid token"))
    }
    if (user.role !== ADMIN) {
      return next(new ErrorResponse(403, "Not permission"))
    }
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}
module.exports = admin
