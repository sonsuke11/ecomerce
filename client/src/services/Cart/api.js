import api from ".."

export const addToCart = (params) => {
  return api.post("/cart", params)
}
export const viewCart = () => {
  return api.get("/cart")
}

export const deleteItemsInCart = (params) => {
  return api.delete("/cart", { data: params })
}
export const updateCartItems = (params) => {
  return api.put("/cart", params)
}
