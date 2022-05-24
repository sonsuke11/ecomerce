import { all } from "redux-saga/effects"
import productSaga from "./Product/sagas"
import userSaga from "./User/sagas"
import cartSaga from "./Cart/sagas"
import categorySaga from "./Category/sagas"
import placeSearchSaga from "./PlaceSeach/sagas"
import orderSaga from "./Order/sagas"

export default function* rootSaga() {
  yield all([
    productSaga(),
    userSaga(),
    cartSaga(),
    categorySaga(),
    placeSearchSaga(),
    orderSaga(),
  ])
}
