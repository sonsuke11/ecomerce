import { all, call, takeLatest } from "redux-saga/effects"
import {
  CREATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDER_EVERY_DAY,
  SEARCH_ORDER,
  UPDATE_ORDER,
} from "../types"
import api from "../../services/Order/api"

function* searchOrder(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.searchOrder, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* updateOrder(action) {
  const { params, onSuccess, onError } = action?.payload

  try {
    const res = yield call(api.updateOrer, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* createOrder(action) {
  const { params, onSuccess, onError } = action?.payload
  try {
    const res = yield call(api.createOrer, params)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}

function* getOrderById(action) {
  const { id, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.getOrderById, id)
    if (onSuccess) {
      onSuccess(res?.data)
    }
  } catch (error) {
    if (onError) {
      onError(error)
    }
  }
}
function* getDataOrderEveryDay(action) {
  const { params, onSuccess, onError } = action.payload
  try {
    const res = yield call(api.getDataOrderEveryDay, params)
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
    takeLatest(SEARCH_ORDER, searchOrder),
    takeLatest(UPDATE_ORDER, updateOrder),
    takeLatest(CREATE_ORDER, createOrder),
    takeLatest(GET_ORDER_BY_ID, getOrderById),
    takeLatest(GET_ORDER_EVERY_DAY, getDataOrderEveryDay),
  ])
}
