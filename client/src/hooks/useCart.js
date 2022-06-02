import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/Cart/actions"
const useCart = () => {
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartData)

  const setCartDataToStore = (params, onSuccess, onError) => {
    return dispatch(actions.setCartDataToStore({ params, onSuccess, onError }))
  }
  const deleteItemsInCart = (params) => {
    return dispatch(actions.deleteItemsInCart({ params }))
  }
  const updateCartItems = (params) => {
    return dispatch(actions.updateCartItems({ params }))
  }
  return {
    setCartDataToStore,
    cartData,
    deleteItemsInCart,
    updateCartItems,
  }
}

export default useCart
