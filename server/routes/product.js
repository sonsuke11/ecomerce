const express = require("express")
const multer = require("multer")
const {
  searchProduct,
  createProduct,
  viewProductById,
  updateProduct,
  deleteProduct,
  getTopSellProduct,
  getProductBoughtByUser,
} = require("../controllers/product")
const admin = require("../middlewares/admin")
const authorize = require("../middlewares/auth")
const upload = require("../middlewares/upload")
const router = express.Router()

// normal user
router.route("/search").post(searchProduct)
router.route("/top-sell-product").post(getTopSellProduct)
router.route("/:id").get(viewProductById)
router.route("/bought").post(authorize, getProductBoughtByUser)

// admin user
router
  .route("/")
  .post(admin, upload.array("images", 12), createProduct)
  .delete(admin, deleteProduct)

router.route("/edit").post(authorize, upload.any(), updateProduct)

module.exports = router
