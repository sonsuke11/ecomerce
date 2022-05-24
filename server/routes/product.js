const express = require("express")
const multer = require("multer")
const {
  searchProduct,
  createProduct,
  viewProductById,
  updateProduct,
  deleteProduct,
  getTopSellProduct,
} = require("../controllers/product")
const admin = require("../middlewares/admin")
const authorize = require("../middlewares/auth")
const upload = require("../middlewares/upload")
const router = express.Router()

// normal user
router.route("/search").post(authorize, searchProduct)
router.route("/top-sell-product").post(authorize, getTopSellProduct)
router.route("/:id").get(authorize, viewProductById)

// admin user
router
  .route("/")
  .post(admin, upload.array("images", 12), createProduct)
  .delete(admin, deleteProduct)

router.route("/edit").post(admin, upload.any(), updateProduct)
module.exports = router
