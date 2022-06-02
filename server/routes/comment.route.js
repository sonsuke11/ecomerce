const express = require("express")
const authorize = require("../middlewares/auth")
const controllers = require("../controllers/comment.controller")
const router = express.Router()

router
  .route("/")
  .post(controllers.searchComment)
  .put(authorize, controllers.updateComment)
router.route("/post-comment").post(authorize, controllers.postComment)
router
  .route("/reply-comment/:comment")
  .post(authorize, controllers.replyComment)
module.exports = router
