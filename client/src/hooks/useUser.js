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
  const register = (params, onSuccess, onError) => {
    return dispatch(actions.register({ params, onSuccess, onError }))
  }
  const forgotPassword = (params, onSuccess, onError) => {
    return dispatch(actions.forgotPassword({ params, onSuccess, onError }))
  }
  const resetPassword = (params, onSuccess, onError) => {
    return dispatch(actions.resetPassword({ params, onSuccess, onError }))
  }
  return {
    forgotPassword,
    login,
    register,
    getUserInfo,
    userData,
    searchUser,
    getUserById,
    updateUser,
    resetPassword,
  }
}
export default useUser
