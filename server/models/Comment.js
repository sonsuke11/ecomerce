const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Must be provide content of comment"],
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Must be provide author"],
    },
    vote: Number,
    rootComment: Boolean,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Must be provide product"],
    },
  },
  { timestamps: { createdAt: "createdAt", updateAt: "updatedAt" } }
)

module.exports = mongoose.model("Comment", CommentSchema)
