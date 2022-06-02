import api from ".."

const OrderApi = {
  searchOrder: (params) => {
    return api.post("/order/search", params)
  },
  searchAllOrder: (params) => {
    return api.post("/order/search-all-order", params)
  },
  updateOrer: (params) => {
    return api.put("/order", params)
  },
  createOrer: (params) => {
    return api.post("/order", params)
  },
  getOrderById: (id) => {
    return api.get(`/order/${id}`)
  },
  getDataOrderEveryDay: (params) => {
    return api.post(`/order/data-order-chart`, params)
  },
}

export default OrderApi
