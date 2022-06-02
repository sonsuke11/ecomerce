const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Vui lòng không để trống trường này"],
    },
    description: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("category", CategorySchema)
