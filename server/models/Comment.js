const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Must be provide content of comment"],
    },
    replies: [this],
    like: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Must be provide author"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Must be provide product"],
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updateAt" } }
)

module.exports = mongoose.model("Comment", CommentSchema)
