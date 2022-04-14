import axios from "axios"
import { BASE_URL } from "../utils/constants"

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user"),
  },
})

export default api
