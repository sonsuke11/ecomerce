const express = require("express")
const orderControllers = require("../controllers/order")
const authorize = require("../middlewares/auth")

const router = express.Router()

router
  .route("/")
  .post(authorize, orderControllers.createOrder)
  .put(authorize, orderControllers.updateOrder)
router.route("/get-all-city").get(authorize, orderControllers.getAllCity)
router
  .route("/search-districts")
  .post(authorize, orderControllers.searchDistricts)
router.route("/search").post(authorize, orderControllers.searchOrderByUser)
module.exports = router
