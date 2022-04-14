import { all } from "redux-saga/effects"
import productSaga from "./Product/sagas"
import userSaga from "./User/sagas"

export default function* rootSaga() {
  yield all([productSaga(), userSaga()])
}
