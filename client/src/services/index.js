import axios from "axios"
import { BASE_URL } from "../utils/constants"
const api = axios.create({
  baseURL: BASE_URL,
})
api.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("user")}`
  }

  return req
})

export default api
