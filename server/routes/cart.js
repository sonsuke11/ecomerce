const express = require("express")
const cartController = require("../controllers/cart")
const authorize = require("../middlewares/auth")

const router = express.Router()

router
  .route("/")
  .post(authorize, cartController.addToCart)
  .get(authorize, cartController.viewCart)
module.exports = router
