import api from "../index"

const loginApi = (params) => {
  return api.post("/auth/login", params)
}
const getUserInfo = () => {
  return api.get("/auth/user-info")
}

const searchUser = (params) => {
  return api.post("/auth", params)
}
const getUserById = (id) => {
  return api.get("/auth/" + id)
}
const updateUser = (params) => {
  return api.put("/auth", params)
}
const userApi = {
  loginApi,
  getUserInfo,
  searchUser,
  getUserById,
  updateUser,
}

export default userApi
