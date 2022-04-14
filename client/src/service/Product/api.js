import api from "../index"

const viewListProduct = () => {
  return api.get("/product/view")
}
const productApi = {
  viewListProduct,
}
export default productApi
