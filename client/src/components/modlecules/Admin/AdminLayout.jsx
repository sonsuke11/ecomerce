import React from "react"
import Nav from "./Nav"
import "./AdminLayout.scss"

const AdminLayout = ({ children }) => {
  return (
    <div className="grid">
      <div className="row">
        <Nav />
        <div className="col c-9 admin__body">{children}</div>
      </div>
    </div>
  )
}

export default AdminLayout
