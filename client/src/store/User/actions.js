import * as types from "../types"

export const login = (params) => {
  return { type: types.LOGIN, payload: params }
}
export const getUserInfo = (params) => {
  return { type: types.GET_USER_INFO, payload: params }
}
export const setUserInfo = (params) => {
  return { type: types.SET_USER_INFO, payload: params }
}

export const searchUser = (params) => {
  return { type: types.SEARCH_USER, payload: params }
}

export const setListUser = (params) => {
  return { type: types.SET_LIST_USER, payload: params }
}
export const getUserById = (params) => {
  return { type: types.GET_USER_BY_ID, payload: params }
}
export const updateUser = (params) => {
  return { type: types.UPDATE_USER, payload: params }
}
