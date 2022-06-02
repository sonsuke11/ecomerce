import api from ".."

const apiComment = {
  getComment: (params) => {
    return api.post("/comment", params)
  },
  postComment: (params) => {
    return api.post("/comment/post-comment", params)
  },
  editComment: (params) => {
    return api.put("/comment", params)
  },
  replyComment: (params) => {
    const { id, ...rest } = params
    return api.post(`/comment/reply-comment/${id}`, rest)
  },
}
export default apiComment
