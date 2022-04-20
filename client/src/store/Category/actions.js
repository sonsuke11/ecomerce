import * as actions from "../types"

export const getAllCategory = (params) => {
  return { type: actions.GET_ALL_CATEGORY, payload: params }
}
export const setDataCategory = (params) => {
  return { type: actions.SET_DATA_CATEGORY, payload: params }
}
export const deleteCategory = (params) => {
  return { type: actions.DELETE_CATEGORY, payload: params }
}

export const getDetailCategory = (params) => {
  return { type: actions.GET_DETAIL_CATEGORY, payload: params }
}

export const editCategory = (params) => {
  return { type: actions.EDIT_CATEGORY, payload: params }
}
export const addCategory = (params) => {
  return { type: actions.ADD_CATEGORY, payload: params }
}
