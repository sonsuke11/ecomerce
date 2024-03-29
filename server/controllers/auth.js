const UserSchema = require("../models/User")
const _ = require("lodash")
const ErrorResponse = require("../utils/errorResponse")
const sendMail = require("../utils/sendMail")
const crypto = require("crypto")
const User = require("../models/User")

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  if (!(email && password))
    return next(new ErrorResponse(400, "Missing email or password"))
  try {
    const user = await UserSchema.findOne({ email })
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
  try {
    const user = await UserSchema.findOne({ email })
    if (!user) {
      return next(new ErrorResponse(404, "Email not found"))
    }
    const resetToken = user.getResetPasswordToken()
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

exports.getUserInfo = async (req, res, next) => {
  const userReq = req.user
  try {
    const user = _.pick(userReq, ["username", "role", "email"])
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}

exports.updateUser = async (req, res, next) => {
  const params = req.body
  try {
    const userDB = await User.findById(params._id)
    if (!userDB) {
      return next(new ErrorResponse(404, "User not found"))
    }
    const userUpdated = await User.findByIdAndUpdate(
      { _id: userDB._id },
      { ...params },
      { new: true }
    )
    res.status(200).json({ success: true, data: userUpdated })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  const { _id } = req.body
  try {
    const userFindedFromDB = await User.findById(_id)
    if (!userFindedFromDB) {
      return next(new ErrorResponse(404, "User not found"))
    }
    await User.findByIdAndDelete(_id)
    res.status(200).json({ success: true, message: "User delete successfully" })
  } catch (error) {
    next(error)
  }
}
exports.searchUser = async (req, res, next) => {
  const { page, size } = req.body
  try {
    let pageList = page
    let pageSize = size
    if (!pageList) {
      pageList = 1
    }
    if (!pageSize) {
      pageSize = 10
    }
    const listUser = await User.find({})
    const totalPage = Math.ceil(listUser.length / pageSize)
    res.status(200).json({
      success: true,
      list: listUser.slice(pageList * pageSize - pageSize, pageList * pageSize),
      page: pageList,
      size: pageSize,
      totalPage,
    })
  } catch (error) {
    next(error)
  }
}

exports.getUserById = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await User.findById(id)
    if (!user) {
      return next(new ErrorResponse(404, "User not found"))
    }
    res.status(200).json({ success: true, data: user })
  } catch (error) {
    next(error)
  }
}
