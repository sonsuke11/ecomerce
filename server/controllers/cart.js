const Cart = require("../models/Cart")
const _ = require("lodash")
const CartItem = require("../models/CartItem")
const { default: mongoose } = require("mongoose")
const ErrorResponse = require("../utils/errorResponse")

const cartController = {
  addToCart: async (req, res, next) => {
    const product = req.body
    const user = req.user
    try {
      const cart = await Cart.findOne({ userId: user._id }).populate({
        path: "productsOfCart",
        populate: { path: "product" },
      })
      if (_.isEmpty(cart)) {
        const cartItemsCreated = await CartItem.create({
          ...product,
          product: product._id,
        })
        const idCartItemCreated = cartItemsCreated._id
        const newCart = await Cart.create({
          userId: user._id,
          productsOfCart: [idCartItemCreated],
        })
        return res.status(201).json({ success: true, data: newCart })
      } else {
        // res.json(cart)

        const productFined = cart.productsOfCart.find((prod) => {
          return String(prod.product._id) === String(product._id)
        })
        // comparing two ObjectId

        if (!_.isEmpty(productFined)) {
          const totalQty = productFined.qty + (product?.qty ? product.qty : 1)
          console.log("productFined", productFined)

          await CartItem.findByIdAndUpdate(
            productFined._id,
            {
              qty: totalQty,
            },
            { new: true }
          )
          const newCart = await Cart.findByIdAndUpdate(
            cart._id,
            { updateAt: Date.now() },
            { new: true }
          )
          return res.status(200).json({ success: true, data: newCart })
        } else {
          const cartItemCreated = await CartItem.create({
            ...product,
            product: product._id,
            _id: new mongoose.Types.ObjectId(),
          })
          const cartUpdated = await Cart.findByIdAndUpdate(
            cart._id,
            {
              productsOfCart: [
                ...cart.productsOfCart.map((i) => i._id),
                cartItemCreated,
              ],
            },
            { new: true }
          )
          return res.status(200).json({ success: true, data: cartUpdated })
        }
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  viewCart: async (req, res, next) => {
    const user = req.user
    try {
      const cart = await Cart.findOne({ userId: user._id }).populate({
        path: "productsOfCart",
        populate: { path: "product", populate: { path: "images" } },
      })
      res.status(200).json({ success: true, data: cart })
    } catch (error) {
      console.log("error", error)
      next(error)
    }
  },
  deleteCartItem: async (req, res, next) => {
    const { ids } = req.body
    if (_.isEmpty(ids)) {
      return next(
        new ErrorResponse(403, "Thiếu thông tin định danh item cần xóa")
      )
    }
    try {
      await CartItem.deleteMany({ _id: { $in: ids } })
      res
        .status(200)
        .json({ success: true, message: "Cart item deleted successfully" })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = cartController
