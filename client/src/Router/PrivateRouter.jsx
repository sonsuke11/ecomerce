import React from "react"
import { Navigate } from "react-router-dom"
import useUser from "../hooks/useUser"
import { USER } from "../utils/constants"
const PrivateRouter = ({ children }) => {
  const { userData } = useUser()
  return localStorage.getItem("user") && userData?.auth?.role === USER ? (
    children
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRouter
