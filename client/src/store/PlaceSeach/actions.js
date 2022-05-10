const { SEARCH_ALL_CITY } = require("../types")

const actions = {
  getAllCity: (params) => {
    return { type: SEARCH_ALL_CITY, payload: params }
  },
  searchDistricts: (params) => {
    return { type: SEARCH_ALL_CITY, payload: params }
  },
}
export default actions
