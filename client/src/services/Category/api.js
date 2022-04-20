import api from ".."

const getListCategory = (params) => {
  return api.post("/category/search", params)
}
const addCategory = (params) => {
  return api.post("/category", params)
}

const deleteCategory = (params) => {
  return api.delete("/category", { data: params })
}
const editCategory = (params) => {
  return api.put("/category", params)
}
const getDetailCategory = (id) => {
  return api.get("/category/" + id)
}
const categoryApi = {
  getListCategory,
  addCategory,
  deleteCategory,
  editCategory,
  getDetailCategory,
}
export default categoryApi
