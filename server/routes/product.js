const express = require("express")
const { viewListProduct, createProduct } = require("../controllers/product")
const router = express.Router()

router.route("/view").get(viewListProduct)
router.route("/create").post(createProduct)

module.exports = router
