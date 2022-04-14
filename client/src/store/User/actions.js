import * as types from "../types"

export const login = (params) => {
  return { type: types.LOGIN, payload: params }
}
export const getUserInfo = (params) => {
  return { type: types.GET_USER_INFO, payload: params }
}
