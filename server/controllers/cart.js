const Cart = require("../models/Cart")
const _ = require("lodash")
const CartItem = require("../models/CartItem")

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
        console.log("productFined", productFined)
        // comparing two ObjectId

        if (!_.isEmpty(productFined)) {
          const totalQty = productFined.qty + (product?.qty ? product.qty : 1)
          await CartItem.findOneAndUpdate(
            { product: productFined },
            {
              qty: totalQty,
            }
          )
          return res
            .status(200)
            .json({ success: true, message: "succcessfull" })
        } else {
          const cartItemCreated = await CartItem.create({
            ...product,
            product: product._id,
          })
          const cartUpdated = await Cart.findByIdAndUpdate(cart._id, {
            productsOfCart: [
              ...cart.productsOfCart.map((i) => i._id),
              cartItemCreated,
            ],
          })
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
}

module.exports = cartController
