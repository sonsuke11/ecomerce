const express = require("express")
const {
  login,
  resetPassword,
  register,
  forgotPassword,
} = require("../controllers/auth")
const router = express.Router()

router.route("/login").post(login)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:resetToken").put(resetPassword)

module.exports = router
