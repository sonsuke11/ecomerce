const Product = require("../models/Product")

exports.viewListProduct = async function (_req, res, next) {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}
exports.createProduct = async function (req, res, next) {
  try {
    const products = await Product.create({ ...req.body })
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}
