import { takeLatest, all, call } from "redux-saga/effects"
import { GET_USER_INFO, LOGIN } from "../types"
import api from "../../service/User/api"

export function* login(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.loginApi, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

export function* getUserInfo(action) {
  const { onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.getUserInfo)
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
  yield all([takeLatest(LOGIN, login), takeLatest(GET_USER_INFO, getUserInfo)])
}
