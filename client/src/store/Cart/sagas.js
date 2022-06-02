import { all, takeLatest, call } from "redux-saga/effects"
import { DELETE_ITEMS_IN_CART, UPDATE_CART_ITEMS } from "../types"
import * as api from "../../services/Cart/api"

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
export function* updateCartItems(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.updateCartItems, params)
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
    takeLatest(DELETE_ITEMS_IN_CART, deleteItemsInCart),
    takeLatest(UPDATE_CART_ITEMS, updateCartItems),
  ])
}
