import { all, takeLatest, call, put } from "redux-saga/effects"
import { ADD_TO_CART, DELETE_ITEMS_IN_CART, VIEW_CART_BY_USER } from "../types"
import * as api from "../../services/Cart/api"
import { setCartData } from "./actions"

function* addToCart(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    yield call(api.addToCart, params)
    if (onSuccess) {
      onSuccess()
    }
  } catch (error) {
    onError(error)
  }
}
export function* viewCart(action) {
  const { onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.viewCart)
    yield put(setCartData({ data: res?.data?.data }))
    if (onSuccess) {
      onSuccess(res)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
export function* deleteItemsInCart(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.deleteItemsInCart, params)
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
    takeLatest(ADD_TO_CART, addToCart),
    takeLatest(VIEW_CART_BY_USER, viewCart),
    takeLatest(DELETE_ITEMS_IN_CART, deleteItemsInCart),
  ])
}
