import { all, takeLatest, call } from "redux-saga/effects"
import api from "../../services/Product/api"
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
  VIEW_PRODUCT_BY_ID,
} from "../types"

export function* searchProduct(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.searchProduct, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* viewProductById(action) {
  const { id, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.viewProductById, id)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    onError(error)
  }
}
function* createProduct(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.createProduct, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    onError(error)
  }
}
function* deleteProduct(action) {
  const { id, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.deleteProduct, id)
    if (onSuccess) {
      onSuccess(res)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* updateProduct(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.updateProduct, params)
    if (onSuccess) {
      onSuccess(res)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

export default function* settingSaga() {
  yield all([
    takeLatest(SEARCH_PRODUCT, searchProduct),
    takeLatest(VIEW_PRODUCT_BY_ID, viewProductById),
    takeLatest(CREATE_PRODUCT, createProduct),
    takeLatest(DELETE_PRODUCT, deleteProduct),
    takeLatest(UPDATE_PRODUCT, updateProduct),
  ])
}
