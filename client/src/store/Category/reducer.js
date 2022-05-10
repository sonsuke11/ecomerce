import { SET_DATA_CATEGORY } from "../types"
const categoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DATA_CATEGORY:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default categoryReducer
