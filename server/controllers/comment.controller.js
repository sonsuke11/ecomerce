const Comment = require("../models/Comment")

const controller = {
  searchComment: async (req, res, next) => {
    const params = req.body
    try {
      const comment = await Comment.find(params).sort("")
    } catch (error) {}
  },
  postComment: async (req, res, next) => {},
}

module.exports = controller
