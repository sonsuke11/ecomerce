import { combineReducers } from "redux"
import cartReducer from "./Cart/reducer"
import productReducer from "./Product/reducer"
import userReducer from "./User/reducer"
import categoryReducer from "./Category/reducer"

const rootReducer = combineReducers({
  product: productReducer,
  userData: userReducer,
  cartData: cartReducer,
  categoryData: categoryReducer,
})
export default rootReducer
