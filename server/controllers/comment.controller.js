const Comment = require("../models/Comment")
const mongoose = require("mongoose")
const Product = require("../models/Product")
const OrderItem = require("../models/OrderItem")
const ObjectId = mongoose.Types.ObjectId

const controller = {
  searchComment: async (req, res, next) => {
    const params = req.body

    const selectAuthorQuery = ["username", "avatar", "_id", "role"]
    try {
      const comments = await Comment.find({ ...params })
        .populate([
          { path: "author", model: "User", select: selectAuthorQuery },
          {
            path: "replies",
            populate: [
              {
                path: "author",
                model: "User",
                select: selectAuthorQuery,
              },
            ],
          },
        ])
        .sort({
          createdAt: -1,
        })

      res.status(200).json({ success: true, data: comments })
    } catch (error) {
      console.log(error)

      next(error)
    }
  },
  postComment: async (req, res, next) => {
    const params = req.body
    const { _id } = req.user

    try {
      const comment = await Comment.create({
        ...params,
        author: _id,
        rootComment: true,
      })

      const productRankCalc = await Comment.aggregate([
        {
          $match: { product: ObjectId(params.product), rootComment: true },
        },
        {
          $group: { _id: "$product", rank: { $avg: "$vote" } },
        },
        { $project: { rank: { $round: ["$rank", 1] } } },
      ])
      const product = await Product.findByIdAndUpdate(params.product, {
        rank: productRankCalc[0].rank,
      })

      await OrderItem.findByIdAndUpdate(params.orderItemId, {
        isEvaluated: true,
      })
      res.status(200).json({ success: true, data: product })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },
  replyComment: async (req, res, next) => {
    const params = req.body
    const { _id } = req.user
    const { comment } = req.params

    try {
      const childComment = await Comment.create({ ...params, author: _id })
      const parentComment = await Comment.findById(comment)
      parentComment.replies = [...parentComment.replies, childComment._id]
      parentComment.save()
      res.status(200).json({ success: true, data: parentComment })
    } catch (error) {
      next(error)
    }
  },
  updateComment: async (req, res, next) => {
    const params = req.body
    const { _id } = req.user

    try {
      const updatedComment = await Comment.findById(params._id)

      if (params?.likes) {
        updatedComment.likes = params.likes
        updatedComment.save()
      }

      res.status(200).json({ success: true, data: updatedComment })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = controller
