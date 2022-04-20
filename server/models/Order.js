const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Must provide a user"],
    },
    products: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "OrderItem",
    },
    status: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
      validate: [
        (val) => [1, 2, 3, 4, 5].some((item) => item === val),
        "Value of status invalid",
      ],
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("Order", OrderSchema)
