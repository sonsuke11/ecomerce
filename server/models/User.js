const mongoose = require("mongoose")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
  username: {
    required: [true, "Please provide a username"],
    type: String,
  },
  email: {
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "please provide a valid email"],
    required: [true, "Please provide a email"],
    type: String,
    unique: true,
  },
  password: {
    required: [true, "Please provide a password"],
    type: String,
  },
  address: String,
  avartar: String,
  phoneNum: String,
  role: {
    type: Number,
    enum: [1, 2],
    default: 1,
  },
  enable: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex")
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
  this.resetPasswordExpire = Date.now() + 1000 * 60 * 10
  return resetToken
}

UserSchema.methods.isMatchPassword = function (password) {
  return bcrypt.compare(password, this.password)
}
module.exports = mongoose.model("User", UserSchema)
