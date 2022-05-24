const Category = require("../models/Category")
const ErrorResponse = require("../utils/errorResponse")

exports.getAllCategories = async (req, res, next) => {
  const { page, size } = req.body
  try {
    const categoryList = await Category.find({})

    let pageList = page
    let pageSize = size
    if (!page) {
      pageList = 1
    }
    if (!size) {
      pageSize = 10
    }
    const totalPage = Math.ceil(categoryList.length / pageSize)
    res.status(200).json({
      success: true,
      list: categoryList.slice(
        pageList * pageSize - pageSize,
        pageList * pageSize
      ),
      page: pageList,
      size: pageSize,
      totalPage,
    })
  } catch (error) {
    next(error)
  }
}
exports.createCategory = async (req, res, next) => {
  const categoryFromReq = req.body
  try {
    const categoryCreated = await Category.create({
      ...categoryFromReq,
      updateAt: null,
    })
    res.status(201).json({ success: true, data: categoryCreated })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
exports.updateCategory = async (req, res, next) => {
  const { updateAt, ...categoryFromReq } = req.body
  const checkIdExist = (_err, model) => {
    if (!model) {
      return next(new ErrorResponse(404, `Not found category with this id`))
    } else {
      return model
    }
  }
  if (!categoryFromReq._id) {
    return next(new ErrorResponse(401, "Must provide a id of product"))
  }
  try {
    const categoryUpdated = await Category.findByIdAndUpdate(
      categoryFromReq._id,
      { ...categoryFromReq, updateAt: Date.now() },
      { new: true },
      checkIdExist
    ).clone()
    res.status(200).json({ success: true, data: categoryUpdated })
  } catch (error) {
    console.log("error", error)
    next(error)
  }
}
exports.deleteCategory = async (req, res, next) => {
  const { _id } = req.body

  try {
    const categoryFinedById = await Category.findById(_id)
    if (!categoryFinedById) {
      return next(new ErrorResponse(404, `Not found category with this id`))
    }
    await Category.findByIdAndDelete(_id, { new: true })
    res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
}

exports.detailCategory = async (req, res, next) => {
  const { id } = req.params
  try {
    const categoryFinedById = await Category.findById(id)
    if (!categoryFinedById) {
      return next(new ErrorResponse(404, `Not found category with this id`))
    }
    const category = await Category.findById(id)
    res.status(200).json(category)
  } catch (error) {
    next(error)
  }
}
