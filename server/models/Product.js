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
      type: mongoose.Types.Decimal128,
      default: 0,
      get: (value) => {
        if (value) {
          return parseFloat(value?.toString())
        }
        return 0
      },
    },
    numOfViews: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { getters: true },
    timestamps: {
      createdAt: "createdAt",
      updateAt: "updateAt",
    },
  }
)

const arrayLimit = (val, limit) => {
  return val?.length >= limit
}
module.exports = mongoose.model("Product", Product)
