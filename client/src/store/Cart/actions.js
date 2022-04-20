import { ADD_TO_CART, SET_CART_DATA, VIEW_CART_BY_USER } from "../types"

export const addToCart = (params) => {
  return { type: ADD_TO_CART, payload: params }
}
export const viewCartByUser = (params) => {
  return { type: VIEW_CART_BY_USER, payload: params }
}
export const setCartData = (params) => {
  return { type: SET_CART_DATA, payload: params }
}
