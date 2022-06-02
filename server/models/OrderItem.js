const mongoose = require("mongoose")

const OrderItem = mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Must provide a product"],
    },
    quantity: {
      type: Number,
      required: [true, "Must provide a quantity"],
    },
    isEvaluated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("OrderItem", OrderItem)
