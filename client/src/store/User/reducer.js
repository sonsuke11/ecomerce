import { LOGOUT, SET_LIST_USER, SET_USER_INFO } from "../types"

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, auth: { ...action.payload } }
    case SET_LIST_USER:
      return { ...state, userList: { ...action.payload } }
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default userReducer
