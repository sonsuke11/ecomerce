const express = require("express")
const {
  login,
  resetPassword,
  register,
  forgotPassword,
  getUserInfo,
  updateUser,
  deleteUser,
  searchUser,
  getUserById,
} = require("../controllers/auth")
const admin = require("../middlewares/admin")
const authorize = require("../middlewares/auth")

const router = express.Router()
router.route("/login").post(login)
router.route("/register").post(register)
router.route("/forgotpassword").post(forgotPassword)
router.route("/resetpassword/:resetToken").put(resetPassword)
router.route("/user-info").get(authorize, getUserInfo)

//admin user
router
  .route("/")
  .put(admin, updateUser)
  .delete(admin, deleteUser)
  .post(admin, searchUser)
router.route("/:id").get(admin, getUserById)
module.exports = router
