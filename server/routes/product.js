const express = require("express")
const { viewListProduct } = require("../controllers/product")
const router = express.Router()

router.route("/view").get(viewListProduct)

module.exports = router
