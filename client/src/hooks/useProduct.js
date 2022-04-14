import { useDispatch } from "react-redux"
import actions from "../store/Product/actions"
const useProduct = () => {
  const dispatch = useDispatch()
  const viewListProduct = (onSuccess, onError) => {
    return dispatch(actions.viewListProduct({ onSuccess, onError }))
  }
  return { viewListProduct }
}
export default useProduct
