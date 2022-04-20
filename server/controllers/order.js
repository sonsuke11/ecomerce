const Order = require("../models/Order")
const OrderItem = require("../models/OrderItem")
const ErrorResponse = require("../utils/errorResponse")
const async = require("async")
const request = require("request")

const OrderController = {
  createOrder: async (req, res, next) => {
    const orderFromReq = req.body
    const { _id } = req.user

    try {
      if (!orderFromReq?.products || orderFromReq?.products?.length < 1) {
        return next(new ErrorResponse(403, "Must provide product"))
      }
      const orderItems = await OrderItem.insertMany(orderFromReq.products)
      const idOrderItems = orderItems.map((orderItem) => orderItem._id)
      const orderCreated = await Order.create({
        ...orderFromReq,
        userId: _id,
        products: idOrderItems,
      })
      res.status(200).json({ success: true, data: orderCreated })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  updateOrder: async (req, res, next) => {
    const orderFromReq = req.body

    try {
      const orderFinedById = await Order.findById(orderFromReq._id)
      if (!orderFinedById) {
        return next(new ErrorResponse(404, `Not found order with this id`))
      }
      const orderUpdated = await Order.findByIdAndUpdate(
        orderFromReq._id,
        {
          status: orderFromReq.status,
        },
        { new: true }
      )

      res.status(200).json({
        success: true,
        data: orderUpdated,
      })
    } catch (error) {
      next(error)
    }
  },
  searchOrderByUser: async (req, res, next) => {
    const { _id } = req.user
    try {
      const orders = await Order.find({ userId: _id }).populate("products", [
        "productId",
        "quantity",
      ])
      res.status(200).json({ success: true, data: orders })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  getAllCity: async (req, res, next) => {
    try {
      request(
        {
          method: "GET",
          uri: "https://provinces.open-api.vn/api/?depth=2",
        },
        (err, response, body) => {
          const data = JSON.parse(body)
          res.status(200).json({ success: true, data })
        }
      )
    } catch (error) {
      next(error)
    }
  },
  searchDistricts: async (req, res, next) => {
    const { q } = req.body
    try {
      request(
        {
          method: "GET",
          uri: `https://provinces.open-api.vn/api/d/search/?q=${q}`,
        },
        (err, response, body) => {
          const data = JSON.parse(body)
          res.status(200).json({ success: true, data })
        }
      )
    } catch (error) {
      next(error)
    }
  },
}
module.exports = OrderController
