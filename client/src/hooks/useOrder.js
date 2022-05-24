import { useDispatch } from "react-redux"
import actions from "../store/Order/actions"
const useOrder = () => {
  const dispatch = useDispatch()

  const searchOrder = (params, onSuccess, onError) => {
    return dispatch(actions.searchOrder({ params, onSuccess, onError }))
  }
  const updateOrder = (params, onSuccess, onError) => {
    return dispatch(actions.updateOrder({ params, onSuccess, onError }))
  }
  const createOrder = (params, onSuccess, onError) => {
    return dispatch(actions.createOrder({ params, onSuccess, onError }))
  }
  const getOrderById = (id, onSuccess, onError) => {
    return dispatch(actions.getOrderById({ id, onSuccess, onError }))
  }
  const getDataOrderEveryDay = (params, onSuccess, onError) => {
    return dispatch(
      actions.getDataOrderEveryDay({ params, onSuccess, onError })
    )
  }
  return {
    searchOrder,
    updateOrder,
    createOrder,
    getOrderById,
    getDataOrderEveryDay,
  }
}

export default useOrder
