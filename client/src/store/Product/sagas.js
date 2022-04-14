import { all, takeLatest, call } from "redux-saga/effects"
import api from "../../service/Product/api"
import { VIEW_LIST_PRODUCT } from "../types"

export function* viewListProduct(action) {
  const { onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.viewListProduct)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
export default function* settingSaga() {
  yield all([takeLatest(VIEW_LIST_PRODUCT, viewListProduct)])
}
