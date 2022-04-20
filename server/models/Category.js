const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
  },
  // path: {
  //   type: String,
  //   required: [true, "Path is required"],
  //   unique: true,
  // },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("category", CategorySchema)
