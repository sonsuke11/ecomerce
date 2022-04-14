const express = require("express")
const {
  login,
  resetPassword,
  register,
  forgotPassword,
  getUserInfo,
} = require("../controllers/auth")
const authorize = require("../middlewares/auth")
const router = express.Router()
router.route("/login").post(login)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:resetToken").put(resetPassword)
router.route("/user-info").get(authorize, getUserInfo)

module.exports = router
