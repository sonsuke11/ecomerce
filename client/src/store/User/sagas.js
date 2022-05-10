import { takeLatest, all, call, put, takeLeading } from "redux-saga/effects"
import {
  GET_USER_BY_ID,
  GET_USER_INFO,
  LOGIN,
  SEARCH_USER,
  UPDATE_USER,
} from "../types"
import { setListUser, setUserInfo } from "./actions"
import api from "../../services/User/api"

export function* login(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.loginApi, params)
    yield put(setUserInfo(res?.data))
    if (onSuccess) {
      yield onSuccess(res?.data)
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
    yield put(setUserInfo(res?.data?.data))
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

function* searchUser(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.searchUser, params)
    yield put(setListUser(res?.data))
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* getUserById(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.getUserById, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* updateUser(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.updateUser, params)
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
    takeLatest(LOGIN, login),
    takeLatest(GET_USER_INFO, getUserInfo),
    takeLatest(SEARCH_USER, searchUser),
    takeLatest(GET_USER_BY_ID, getUserById),
    takeLatest(UPDATE_USER, updateUser),
  ])
}
