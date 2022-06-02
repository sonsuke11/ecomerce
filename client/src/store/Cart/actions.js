import {
  DELETE_ITEMS_IN_CART,
  SET_CART_DATA,
  UPDATE_CART_ITEMS,
} from "../types"

export const setCartDataToStore = (params) => {
  return { type: SET_CART_DATA, payload: params }
}
export const deleteItemsInCart = (params) => {
  return { type: DELETE_ITEMS_IN_CART, payload: params }
}
export const updateCartItems = (params) => {
  return { type: UPDATE_CART_ITEMS, payload: params }
}
