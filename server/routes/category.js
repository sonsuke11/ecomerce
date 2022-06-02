const express = require("express")
const authorize = require("../middlewares/auth")
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  detailCategory,
} = require("../controllers/category")
const admin = require("../middlewares/admin")
const upload = require("../middlewares/upload")
const fs = require("fs")
const Image = require("../models/Image")
const _ = require("lodash")
const ErrorResponse = require("../utils/errorResponse")

const router = express.Router()

router
  .route("/")
  .post(admin, createCategory)
  .put(admin, updateCategory)
  .delete(admin, deleteCategory)
router.route("/search").post(getAllCategories)
router.route("/:id").get(admin, detailCategory)

router
  .route("/upload")
  .post(upload.array("images", 12), async (req, res, next) => {
    const { files, ...data } = req
    if (!files || _.isEmpty(files)) {
      return next(new ErrorResponse(401, "Must provide images"))
    }
    const filesWithEncode = files.map((file) => {
      const img = fs.readFileSync(file.path)
      const encodeImg = img.toString("base64")
      return {
        fileName: file.filename,
        file: encodeImg,
      }
    })

    const filesSaved = await Image.insertMany(filesWithEncode)
    res.status(200).json(filesSaved)
  })
module.exports = router
