import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/Cart/actions"
const useCart = () => {
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartData)

  const viewCartByUser = (onSuccess, onError) => {
    return dispatch(actions.viewCartByUser({ onSuccess, onError }))
  }
  const addToCart = (params, onSuccess, onError) => {
    return dispatch(actions.addToCart({ params, onSuccess, onError }))
  }
  const deleteItemsInCart = (params, onSuccess, onError) => {
    return dispatch(actions.deleteItemsInCart({ params, onSuccess, onError }))
  }
  return { viewCartByUser, addToCart, cartData, deleteItemsInCart }
}

export default useCart
