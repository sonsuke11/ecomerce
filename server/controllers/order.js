const Order = require("../models/Order")
const OrderItem = require("../models/OrderItem")
const Image = require("../models/Image")
const ErrorResponse = require("../utils/errorResponse")
const request = require("request")
const Product = require("../models/Product")
const { getDaysInCurrentMonth } = require("../utils/helpers")

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
        totalRootPrice: orderFromReq.rootPrice * orderFromReq.instock,
        userId: _id,
        products: idOrderItems,
      })
      orderFromReq.products?.forEach(async (item) => {
        const product = await Product.findById(item.productId)
        product.instock -= item.quantity
        if (product.instock > 0) {
          await product.save()
        } else {
          return next(
            new ErrorResponse(
              400,
              "Số lượng đặt không vượt quá số lượng trong kho"
            )
          )
        }
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
      let objectUpdate = {
        status: orderFromReq.status,
        updateAt: Date.now(),
      }
      const orderFinedById = await Order.findById(orderFromReq._id).populate(
        "products"
      )

      if (!orderFinedById) {
        return next(new ErrorResponse(404, `Not found order with this id`))
      }

      if (orderFromReq?.status === 4) {
        objectUpdate = { ...objectUpdate, paymentDate: Date.now() }
      }

      const orderUpdated = await Order.findByIdAndUpdate(
        orderFromReq._id,
        objectUpdate,
        { new: true }
      )
      if (
        orderFromReq?.status !== orderFinedById?.status &&
        orderFromReq?.status === 0
      ) {
        orderFinedById?.products?.forEach(async (item) => {
          const product = await Product.findById(item.productId)
          product.instock += item.quantity
          await product.save()
        })
      }

      res.status(200).json({
        success: true,
        data: orderUpdated,
      })
    } catch (error) {
      next(error)
    }
  },
  searchOrder: async (req, res, next) => {
    const { searchByUser, size, page, startDate, endDate, ...params } = req.body
    const { _id } = req.user
    let query = { ...params }

    if (searchByUser) {
      query.userId = _id
    }

    if (startDate) {
      query.paymentDate = { ...query.paymentDate, $gt: startDate }
    }
    if (endDate) {
      query.paymentDate = { ...query.paymentDate, $lt: endDate }
    }

    try {
      let sort = { createdAt: -1 }

      const orders = await Order.find(query)
        .populate({
          path: "products",
          populate: {
            path: "productId",
            populate: { path: "images" },
          },
        })
        .populate({ path: "userId", select: "username" })
        .sort(sort)

      let pageList = page
      let pageSize = size

      if (!page) {
        pageList = 1
      }

      if (!size) {
        pageSize = 10
      }

      const totalPage = Math.ceil(orders.length / pageSize)

      const totalElement = orders?.length

      res.status(200).json({
        success: true,
        data: {
          list: orders.slice(
            pageList * pageSize - pageSize,
            pageList * pageSize
          ),
          page: pageList,
          size: pageSize,
          totalPage,
          totalElement,
        },
      })
    } catch (error) {
      next(error)
    }
  },
  searchAllOrder: async (req, res, next) => {
    const { searchByUser, startDate, endDate, ...params } = req.body
    const { _id } = req.user
    let query = { ...params }

    if (searchByUser) {
      query.userId = _id
    }

    if (startDate) {
      const dateArr = startDate.split("-").map((item) => Number(item))

      query.paymentDate = {
        ...query.paymentDate,
        $gte: new Date(dateArr[0], dateArr[1] - 1, dateArr[2] + 1),
      }
    }
    if (endDate) {
      const dateArr = endDate.split("-").map((item) => Number(item))

      query.paymentDate = {
        ...query.paymentDate,
        $lte: new Date(dateArr[0], dateArr[1] - 1, dateArr[2] + 1),
      }
    }
    console.log("query", query)
    try {
      let sort = { createdAt: -1 }

      const orders = await Order.find(query)
        .populate({
          path: "products",
          populate: {
            path: "productId",
            populate: { path: "images" },
          },
        })
        .populate({ path: "userId", select: "username" })
        .sort(sort)

      const totalElement = orders?.length

      res.status(200).json({
        success: true,
        data: {
          list: orders,
          totalElement,
        },
      })
    } catch (error) {
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
  getDataOrderForChart: async (req, res, next) => {
    const params = req.body

    let query = [
      {
        $match: {
          status: 4,
          // paymentDate: { $gt: moment().subtract(30, "days") },
        },
      },
      {
        $lookup: {
          from: "orderitems",
          as: "products",
          localField: "products",
          foreignField: "_id",
        },
      },
      {
        $unwind: "$products",
      },

      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          quantity: { $sum: "$products.quantity" },
          totalPrice: { $sum: "$totalPrice" },
        },
      },
      {
        $project: {
          date: "$_id",
          quantity: 1,
          totalPrice: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]

    try {
      const data = await Order.aggregate(query)

      const days = getDaysInCurrentMonth()
      const arrDate = Array.from({ length: days }, (_, i) => i + 1)
      const newData = arrDate.map((date) => {
        const finedDate = data.find((i) => i.date === date)
        if (finedDate) {
          return finedDate
        }
        return { date, quantity: 0, totalPrice: 0 }
      })

      res.status(200).json({ success: true, data: newData })
    } catch (error) {
      next(error)
    }
  },
  fetchSingleImage: async (req, res, next) => {
    const { id } = req.params
    try {
      const image = await Image.findById(id)
      if (!image) {
        return next(new ErrorResponse(404, "Không tìm thấy ảnh"))
      }
      res.status(200).json({ success: true, data: image })
    } catch (error) {
      next(error)
    }
  },
  getOrderById: async (req, res, next) => {
    const { id } = req.params
    try {
      const order = await Order.findById(id).populate({
        path: "products",
        populate: { path: "productId", populate: { path: "images" } },
      })
      if (!order) {
        return next(new ErrorResponse(404, "Không tìm thấy đơn hàng"))
      }
      res.status(200).json({ success: true, data: order })
    } catch (error) {
      next(error)
    }
  },
}
module.exports = OrderController
