import { combineReducers } from "redux"
import productReducer from "./Product/reducer"
const rootReducer = combineReducers({ productReducer })
export default rootReducer
