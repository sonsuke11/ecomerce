import { createStore, applyMiddleware } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import rootReducer from "./root_reducer"
import rootSaga from "./root_saga"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"
import persistStore from "redux-persist/es/persistStore"

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userData"],
}
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  persistReducer(persistConfig, rootReducer),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

const reduxStore = { store, persistor }
export default reduxStore
