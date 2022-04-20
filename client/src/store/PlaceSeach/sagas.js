import { all, call, takeLatest } from "redux-saga/effects"
import { SEARCH_ALL_CITY, SEARCH_DISTRICTS } from "../types"
import api from "../../services/PlaceSearch/api"

function* getAllCity(action) {
  const { onSuccess, onError } = action.payload
  try {
    const res = yield call(api.getAllcity)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* searchDistricts(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.searchDistricts, params)
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
  yield all([
    takeLatest(SEARCH_ALL_CITY, getAllCity),
    takeLatest(SEARCH_DISTRICTS, searchDistricts),
  ])
}
