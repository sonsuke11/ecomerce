const authRoute = require("./auth")
const productRoute = require("./product")
const cartRoute = require("./cart")
const categoryRoute = require("./category")
const orderRoute = require("./order")
const commentRoute = require("./comment.route")
const appRoutes = {
  authRoute,
  productRoute,
  cartRoute,
  categoryRoute,
  orderRoute,
  commentRoute,
}

module.exports = appRoutes
