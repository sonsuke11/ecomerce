import { useDispatch } from "react-redux"
import actions from "../store/PlaceSeach/actions"
const PlaceSeach = () => {
  const dispatch = useDispatch()

  const searchAllCity = (onSuccess, onError) => {
    return dispatch(actions.getAllCity({ onSuccess, onError }))
  }
  const searchDistricts = (params, onSuccess, onError) => {
    return dispatch(actions.searchDistricts({ params, onSuccess, onError }))
  }
  return { searchAllCity, searchDistricts }
}

export default PlaceSeach
