import api from ".."

export const addToCart = (params) => {
  return api.post("/cart", params)
}
export const viewCart = () => {
  return api.get("/cart")
}
