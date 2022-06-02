import * as types from "../types"
export const getComment = (params) => {
  return { type: types.FETCH_COMMENT, payload: params }
}
export const updateComment = (params) => {
  return { type: types.UPDATE_COMMENT, payload: params }
}
export const replyComment = (params) => {
  return { type: types.REPLY_COMMENT, payload: params }
}
export const postComment = (params) => {
  return { type: types.POST_COMMENT, payload: params }
}
