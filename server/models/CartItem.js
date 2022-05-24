const mongoose = require("mongoose")
const CartItem = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    qty: {
      default: 1,
      type: Number,
    },
    discount: Number,
    note: String,
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("CartItem", CartItem)
