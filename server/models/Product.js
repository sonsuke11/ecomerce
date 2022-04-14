const mongoose = require("mongoose")

const Product = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    default: 0,
  },
  numOfViews: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model("Product", Product)
