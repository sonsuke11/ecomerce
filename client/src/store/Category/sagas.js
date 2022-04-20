import * as actions from "../types"
import { all, takeLatest, call, put } from "redux-saga/effects"
import categoryApi from "../../services/Category/api"
import { setDataCategory } from "./actions"

function* getaAllCategory(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(categoryApi.getListCategory, params)
    yield put(setDataCategory(res?.data))
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* deleteCategory(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(categoryApi.deleteCategory, params)
    if (onSuccess) {
      onSuccess(res)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* getDetailCategory(action) {
  const { id, onSuccess, onError } = action.payload
  try {
    const res = yield call(categoryApi.getDetailCategory, id)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* editCategory(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    yield call(categoryApi.editCategory, params)
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    onError(error)
  }
}
function* addCategory(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(categoryApi.addCategory, params)
    if (onSuccess) {
      onSuccess(res)
    }
  } catch (error) {
    onError(error)
  }
}
export default function* settingSaga() {
  yield all([
    takeLatest(actions.GET_ALL_CATEGORY, getaAllCategory),
    takeLatest(actions.DELETE_CATEGORY, deleteCategory),
    takeLatest(actions.GET_DETAIL_CATEGORY, getDetailCategory),
    takeLatest(actions.EDIT_CATEGORY, editCategory),
    takeLatest(actions.ADD_CATEGORY, addCategory),
  ])
}
