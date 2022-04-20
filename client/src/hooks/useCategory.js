import { useDispatch, useSelector } from "react-redux"
import * as actions from "../store/Category/actions"
const useCategory = () => {
  const dispatch = useDispatch()
  const categoryData = useSelector((state) => state.categoryData)
  const getAllCategory = (params, onSuccess, onError) => {
    return dispatch(actions.getAllCategory({ params, onSuccess, onError }))
  }
  const deleteCategory = (params, onSuccess, onError) => {
    return dispatch(actions.deleteCategory({ params, onSuccess, onError }))
  }
  const getDetailCategory = (id, onSuccess, onError) => {
    return dispatch(actions.getDetailCategory({ id, onSuccess, onError }))
  }
  const editCategory = (params, onSuccess, onError) => {
    return dispatch(actions.editCategory({ params, onSuccess, onError }))
  }
  const addCategory = (params, onSuccess, onError) => {
    return dispatch(actions.addCategory({ params, onSuccess, onError }))
  }
  return {
    addCategory,
    getAllCategory,
    categoryData,
    deleteCategory,
    getDetailCategory,
    editCategory,
  }
}
export default useCategory
