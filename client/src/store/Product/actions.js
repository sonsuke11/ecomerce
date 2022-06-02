import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT_BOUGHT,
  GET_TOP_SELL_PRODUCT,
  SEARCH_PRODUCT,
  UPDATE_PRODUCT,
  VIEW_PRODUCT_BY_ID,
} from "../types"

const searchProduct = (params) => {
  return { type: SEARCH_PRODUCT, payload: params }
}

const viewProductById = (id) => {
  return { type: VIEW_PRODUCT_BY_ID, payload: id }
}

const createProduct = (params) => {
  return { type: CREATE_PRODUCT, payload: params }
}

const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, payload: id }
}

const updateProduct = (params) => {
  return { type: UPDATE_PRODUCT, payload: params }
}

const getProductBought = (params) => {
  return { type: GET_PRODUCT_BOUGHT, payload: params }
}
const getTopSellProduct = (params) => {
  return { type: GET_TOP_SELL_PRODUCT, payload: params }
}

const actions = {
  updateProduct,
  searchProduct,
  viewProductById,
  createProduct,
  deleteProduct,
  getProductBought,
  getTopSellProduct,
}

export default actions
