import _ from "lodash"
import api from "../index"

const config = {
  headers: { "Content-Type": "multipart/form-data" },
}

const searchProduct = (params) => {
  return api.post("/product/search", params)
}
const viewProductById = (id) => {
  return api.get(`/product/${id}`)
}
const createProduct = (params) => {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    if (key === "images") {
      params[key].forEach((i) => {
        formData.append(key, i)
      })
    } else {
      formData.append(key, params[key])
    }
  })
  return api.post("/product", formData, config)
}
const deleteProduct = (id) => {
  return api.delete("/product", { data: { id } })
}
const updateProduct = (params) => {
  const formData = new FormData()

  Object.keys(params).forEach((key) => {
    if (key === "images") {
      params[key].forEach((i, index) => {
        if (key !== "file") {
          formData.append(`images`, i.fileName ? new File(null) : i)
        }
      })
    } else {
      formData.append(key, params[key])
    }
  })

  return api.post("/product/edit", formData, config)
}
const productApi = {
  updateProduct,
  searchProduct,
  viewProductById,
  createProduct,
  deleteProduct,
}
export default productApi
