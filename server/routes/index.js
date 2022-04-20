const authRoute = require("./auth")
const productRoute = require("./product")
const cartRoute = require("./cart")
const categoryRoute = require("./category")
const orderRoute = require("./order")
const appRoutes = {
  authRoute,
  productRoute,
  cartRoute,
  categoryRoute,
  orderRoute,
}

module.exports = appRoutes
