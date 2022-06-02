const Product = require("../models/Product")
const Order = require("../models/Order")
const _ = require("lodash")
const ErrorResponse = require("../utils/errorResponse")
const { checkIdExist } = require("../utils/helpers")
const fs = require("fs")
const Image = require("../models/Image")

exports.searchProduct = async function (req, res, next) {
  const { page, size, ...params } = req.body

  let pageList = page
  let pageSize = size
  if (!page) {
    pageList = 1
  }
  if (!size) {
    pageSize = 10
  }

  let query = { ...params }
  delete query?.curentPage
  delete query?.to
  if (query?.name) {
    query.name = { $regex: ".*" + query.name + ".*", $options: "$i" }
  }

  try {
    const products = await Product.find(query).populate("images")
    const totalPage = Math.ceil(products.length / pageSize)

    res.status(200).json({
      success: true,
      list: products.slice(pageList * pageSize - pageSize, pageList * pageSize),
      page: pageList,
      size: pageSize,
      totalPage,
    })
  } catch (error) {
    next(error)
  }
}

exports.createProduct = async function (req, res, next) {
  const { files } = req
  try {
    if (!files || _.isEmpty(files)) {
      return next(new ErrorResponse(401, "Hãy cung cấp hình ảnh"))
    }
    const filesWithEncode = files.map((file) => {
      const img = fs.readFileSync(file.path)
      const encodeImg = img.toString("base64")
      return {
        fileName: file.filename,
        file: encodeImg,
      }
    })
    const images = await Image.insertMany(filesWithEncode)

    const product = await Product.create({
      ...req.body,
      images: images.map((i) => i._id),
    })
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

exports.viewProductById = async function (req, res, next) {
  const { id } = req.params
  try {
    const product = await Product.findById(id).populate("images")
    if (!product) {
      return next(new ErrorResponse(404, "Not found product with this id"))
    }
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  const product = req.body
  let newProduct = { ..._.omit(product, ["_id"]) }

  try {
    if (product.images) {
      const files = JSON.parse(product.images)

      const filesWithEncode = files.map((file) => {
        if (file?.lastModified) {
          const img = fs.readFileSync(file.path)
          const encodeImg = img.toString("base64")

          return {
            fileName: file.filename,
            file: encodeImg,
          }
        }

        return file
      })

      newProduct = { ...newProduct, images: filesWithEncode }
    }

    if (newProduct?.rootPrice && newProduct?.instock) {
      newProduct.totalRootPrice = newProduct.rootPrice * newProduct.instock
    }

    const productFinedFromDB = await Product.findById(product._id)

    if (!productFinedFromDB) {
      return next(new ErrorResponse(404, "Product not found"))
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        ...newProduct,
        updateAt: Date.now(),
      },
      {
        new: true,
      },
      checkIdExist
    ).clone()

    res.status(200).json({ success: true, data: updatedProduct })
  } catch (error) {
    console.log("error", error)
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.body
  try {
    await Product.findByIdAndDelete(id, {}, checkIdExist).clone()
    res.status(200).json({ success: true, message: "Delete successfully" })
  } catch (error) {
    next(error)
  }
}

exports.getTopSellProduct = async (req, res, next) => {
  const params = req.body

  let query = [
    { $match: { status: 4 } },
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
      $project: {
        quantity: "$products.quantity",
        products: "$products",
      },
    },
    {
      $lookup: {
        from: "products",
        as: "products",
        localField: "products.productId",
        foreignField: "_id",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $project: {
        price: { $multiply: ["$products.price", "$quantity"] },
        product: "$products",
        quantity: 1,
      },
    },
    {
      $group: {
        _id: "$product._id",
        price: { $sum: "$price" },
        quantity: { $sum: "$quantity" },
      },
    },
    {
      $lookup: {
        from: "products",
        as: "products",
        localField: "_id",
        foreignField: "_id",
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "images",
        as: "products.images",
        localField: "products.images",
        foreignField: "_id",
      },
    },
    {
      $sort: {
        quantity: -1,
      },
    },
  ]

  try {
    const topOrderList = await Order.aggregate(query)
    res.status(200).json({
      success: true,
      data: topOrderList,
      totalElement: topOrderList.length,
    })
  } catch (error) {
    next(error)
  }
}
exports.getProductBoughtByUser = async (req, res, next) => {
  const user = req.user
  try {
    const products = await Order.aggregate([
      {
        $lookup: {
          from: "orderitems",
          as: "products",
          localField: "products",
          foreignField: "_id",
        },
      },
      {
        $match: {
          status: 4,
          userId: user._id,
        },
      },
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          as: "products.productId",
          localField: "products.productId",
          foreignField: "_id",
        },
      },
      { $unwind: "$products.productId" },
      {
        $lookup: {
          from: "images",
          as: "products.productId.images",
          localField: "products.productId.images",
          foreignField: "_id",
        },
      },
      {
        $group: {
          _id: "$userId",
          products: { $push: "$products" },
        },
      },
    ])

    res.status(200).json({ data: products })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
