import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/User/actions"
const useUser = () => {
  const dispatch = useDispatch()
  const login = (params, onSuccess, onError) => {
    return dispatch(actions.login({ params, onSuccess, onError }))
  }
  const getUserInfo = (onSuccess, onError) => {
    return dispatch(actions.getUserInfo({ onSuccess, onError }))
  }
  return { login, getUserInfo }
}
export default useUser
