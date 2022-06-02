import { SET_CART_DATA } from "../types"

const cartReducer = (state = [], action) => {
  switch (action?.type) {
    case SET_CART_DATA:
      return action?.payload?.params
    default:
      return state
  }
}
export default cartReducer
