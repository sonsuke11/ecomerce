import { useDispatch } from "react-redux"
import * as actions from "../store/Comment/actions"

const useComment = () => {
  const dispatch = useDispatch()
  const getComment = (params, onSuccess, onError) => {
    return dispatch(actions.getComment({ params, onSuccess, onError }))
  }
  const updateComment = (params, onSuccess, onError) => {
    return dispatch(actions.updateComment({ params, onSuccess, onError }))
  }
  const replyComment = (params, onSuccess, onError) => {
    return dispatch(actions.replyComment({ params, onSuccess, onError }))
  }
  const postComment = (params, onSuccess, onError) => {
    return dispatch(actions.postComment({ params, onSuccess, onError }))
  }
  return { getComment, updateComment, replyComment, postComment }
}

export default useComment
