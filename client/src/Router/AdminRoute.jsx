import React from "react"
import { Navigate } from "react-router-dom"
import useUser from "../hooks/useUser"
import { ADMIN } from "../utils/constants"

const AdminRouter = ({ children }) => {
  const { userData } = useUser()

  return localStorage.getItem("user") && userData?.auth?.role === ADMIN ? (
    children
  ) : (
    <Navigate to="/login" />
  )
}

export default AdminRouter
