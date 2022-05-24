const mongoose = require("mongoose")

const Product = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    instock: {
      type: Number,
      default: 1,
    },
    images: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Image",
      validate: [
        (val) => arrayLimit(val, 1),
        "Length of image must be greater than 1",
      ],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rootPrice: {
      type: Number,
      required: [true, "Hãy cung cấp một giá nhập"],
    },
    totalRootPrice: {
      type: Number,
    },
    rank: {
      type: Number,
      default: 0,
    },
    numOfViews: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

const arrayLimit = (val, limit) => {
  return val?.length >= limit
}
module.exports = mongoose.model("Product", Product)
