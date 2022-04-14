import api from "../index"

const loginApi = (params) => {
  return api.post("/auth/login", params)
}
const getUserInfo = () => {
  return api.get("/auth/user-info")
}

const userApi = {
  loginApi,
  getUserInfo,
}

export default userApi
