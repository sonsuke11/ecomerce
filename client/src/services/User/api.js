import api from "../index"

const config = {
  headers: { "Content-Type": "multipart/form-data" },
}

const loginApi = (params) => {
  return api.post("/auth/login", params)
}

const getUserInfo = () => {
  return api.get("/auth/user-info")
}

const register = (params) => {
  return api.post("/auth/register", params)
}

const resetPassword = (params) => {
  const { password, token } = params
  return api.put(`/auth/resetpassword/${token}`, { password })
}

const forgotpassword = (params) => {
  return api.post("/auth/forgotpassword", params)
}

const searchUser = (params) => {
  return api.post("/auth", params)
}

const getUserById = (id) => {
  return api.get("/auth/" + id)
}

const updateInfo = (params) => {
  const formData = new FormData()
  Object.keys(params).forEach((key) => {
    if (key === "avatar" && params["isChangeFile"]) {
      formData.append(key, params[key])
    } else if (key !== "avatar") {
      formData.append(key, params[key])
    }
  })
  return api.put("/auth/update-info", formData, config)
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
  register,
  forgotpassword,
  resetPassword,
  updateInfo,
}

export default userApi
