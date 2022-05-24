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
      enum: [1, 2, 3, 4],
      default: 1,
      validate: [
        (val) => [1, 2, 3, 4].some((item) => item === val),
        "Value of status invalid",
      ],
    },
    address: {
      type: String,
      required: [true, "Please provide a address"],
    },
    email: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    phone: {
      type: String,
      required: [true, "Please provide phone"],
    },
    paymentDate: Date,
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("Order", OrderSchema)
