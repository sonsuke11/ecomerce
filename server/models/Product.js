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
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model("Product", Product)
