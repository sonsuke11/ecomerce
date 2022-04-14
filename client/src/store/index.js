import { createStore, applyMiddleware } from "redux"
import rootReducer from "./root_reducer"
import rootSaga from "./root_saga"
import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

export default store
