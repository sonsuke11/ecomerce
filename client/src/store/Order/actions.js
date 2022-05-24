import {
  CREATE_ORDER,
  GET_ORDER_BY_ID,
  GET_ORDER_EVERY_DAY,
  SEARCH_ORDER,
  UPDATE_ORDER,
} from "../types"

const actions = {
  searchOrder: (params) => {
    return { type: SEARCH_ORDER, payload: params }
  },

  updateOrder: (params) => {
    return { type: UPDATE_ORDER, payload: params }
  },
  createOrder: (params) => {
    return { type: CREATE_ORDER, payload: params }
  },
  getOrderById: (params) => {
    return { type: GET_ORDER_BY_ID, payload: params }
  },
  getDataOrderEveryDay: (params) => {
    return { type: GET_ORDER_EVERY_DAY, payload: params }
  },
}
export default actions
