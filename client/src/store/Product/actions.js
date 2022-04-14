import { VIEW_LIST_PRODUCT } from "../types"

const viewListProduct = (params) => {
  return { type: VIEW_LIST_PRODUCT, payload: params }
}
const actions = {
  viewListProduct,
}

export default actions
