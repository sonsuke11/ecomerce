const UserSchema = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")
const sendMail = require("../utils/sendMail")
const crypto = require("crypto")

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  if (!(email && password))
    return next(new ErrorResponse(400, "Missing email or password"))
  try {
    const user = await UserSchema.findOne({ email })
    console.log(user)
    if (!user)
      return next(new ErrorResponse(404, "Not found user with this email"))
    const isMatch = await user.isMatchPassword(password)
    if (!isMatch) return next(new ErrorResponse(404, "Invalid Password"))
    const accessToken = await user.generateAccessToken()
    res.status(200).json({ success: true, accessToken })
  } catch (error) {
    next(error)
  }
}

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body
  try {
    const user = await UserSchema.create({ username, email, password })
    const accessToken = await user.generateAccessToken()
    res.status(200).json({ success: true, accessToken })
  } catch (error) {
    next(error)
  }
}

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body
  console.log(email)
  try {
    const user = await UserSchema.findOne({ email })
    if (!user) {
      console.log("no user")
      return next(new ErrorResponse(404, "Email not found"))
    }
    const resetToken = user.getResetPasswordToken()
    console.log(resetToken)
    await user.save()
    const options = {
      from: "yuriNguen102@gmail.com",
      to: "sonsuper102@gmail.com",
      subject: "Reset password",
      html: `<h1>Hear is the link to active:</h1>
      <a href='http://localhost:3000/resetpassword/${resetToken}'>http://localhost:3000/resetpassword/${resetToken}</a>
      `,
    }
    await sendMail(options)
    res.status(200).json({ success: true, message: "Mail sent" })
  } catch (error) {
    console.log(error)
  }
}

exports.resetPassword = async (req, res, next) => {
  const { password } = req.body
  const { resetToken } = req.params
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

  try {
    const user = await UserSchema.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })

    if (!user) {
      return next(new ErrorResponse(404, "Invalid Token"))
    }

    user.resetPasswordToken = null
    user.resetPasswordExpire = null
    user.password = password
    await user.save()

    res.status(200).json({ success: true, message: "Reset Password Success" })
  } catch (error) {}
}
