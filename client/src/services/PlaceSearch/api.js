import api from "../"

const placeSearch = {
  getAllcity: () => {
    return api.get("/order/get-all-city")
  },
  searchDistricts: (params) => {
    return api.post("/order/search-district", params)
  },
}

export default placeSearch
