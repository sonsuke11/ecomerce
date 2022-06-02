import { all, call, takeLatest } from "redux-saga/effects"
import api from "../../services/Comment/api"
import * as types from "../types"

function* getComment(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.getComment, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* updateComment(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.editComment, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

function* replyComment(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.replyComment, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    onError(error)
  }
}

function* postComment(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.postComment, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    onError(error)
  }
}
export default function* settingSaga() {
  yield all([
    takeLatest(types.FETCH_COMMENT, getComment),
    takeLatest(types.UPDATE_COMMENT, updateComment),
    takeLatest(types.REPLY_COMMENT, replyComment),
    takeLatest(types.POST_COMMENT, postComment),
  ])
}
