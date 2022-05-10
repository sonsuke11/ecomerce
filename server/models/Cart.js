const mongoose = require("mongoose")

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    productsOfCart: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "CartItem",
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("Cart", CartSchema)
