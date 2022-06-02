import { useDispatch } from "react-redux"
import actions from "../store/Product/actions"
const useProduct = () => {
  const dispatch = useDispatch()
  const searchProduct = (params, onSuccess, onError) => {
    return dispatch(actions.searchProduct({ params, onSuccess, onError }))
  }
  const viewProductById = (id, onSuccess, onError) => {
    return dispatch(actions.viewProductById({ id, onSuccess, onError }))
  }
  const createProduct = (params, onSuccess, onError) => {
    return dispatch(actions.createProduct({ params, onSuccess, onError }))
  }
  const deleteProduct = (id, onSuccess, onError) => {
    return dispatch(actions.deleteProduct({ id, onSuccess, onError }))
  }
  const updateProduct = (params, onSuccess, onError) => {
    return dispatch(actions.updateProduct({ params, onSuccess, onError }))
  }

  const getProductBought = (params, onSuccess, onError) => {
    return dispatch(actions.getProductBought({ params, onSuccess, onError }))
  }
  const getTopSellProduct = (onSuccess, onError) => {
    return dispatch(actions.getTopSellProduct({ onSuccess, onError }))
  }

  return {
    searchProduct,
    getTopSellProduct,
    updateProduct,
    viewProductById,
    createProduct,
    deleteProduct,
    getProductBought,
  }
}
export default useProduct
