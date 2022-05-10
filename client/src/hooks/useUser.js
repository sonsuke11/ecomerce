import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/User/actions"

const useUser = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.userData)
  const login = (params, onSuccess, onError) => {
    return dispatch(actions.login({ params, onSuccess, onError }))
  }
  const getUserInfo = (onSuccess, onError) => {
    return dispatch(actions.getUserInfo({ onSuccess, onError }))
  }
  const searchUser = (params, onSuccess, onError) => {
    return dispatch(actions.searchUser({ params, onSuccess, onError }))
  }
  const getUserById = (params, onSuccess, onError) => {
    return dispatch(actions.getUserById({ params, onSuccess, onError }))
  }
  const updateUser = (params, onSuccess, onError) => {
    return dispatch(actions.updateUser({ params, updateUser, onSuccess }))
  }
  return { login, getUserInfo, userData, searchUser, getUserById, updateUser }
}
export default useUser
