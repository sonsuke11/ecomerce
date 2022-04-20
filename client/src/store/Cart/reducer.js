import { SET_CART_DATA } from "../types"

const cartReducer = (state = {}, action) => {
  switch (action?.type) {
    case SET_CART_DATA:
      return { ...state, ...action?.payload }
    default:
      return state
  }
}
export default cartReducer
