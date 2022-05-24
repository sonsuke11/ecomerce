const express = require("express")
const authorize = require("../middlewares/auth")
const controllers = require("../controllers/comment.controller")
const router = express.Router()

router.route("/").post(authorize, controllers.searchComment)
router.route("/comment").post(authorize, controllers.postComment)
module.exports = router
