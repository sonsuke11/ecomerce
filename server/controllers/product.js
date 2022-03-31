const Product = require("../models/Product")

exports.viewListProduct = async function (req, res, next) {
  try {
    const products = await Product.find({})
    res.status(200).json({ success: true, data: products })
  } catch (error) {
    next(error)
  }
}
