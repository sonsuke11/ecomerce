import React from "react"
import "./Badge.scss"
const Badge = ({ children, qty }) => {
  return (
    <div className="badge__wrap">
      {children}
      <span className="badge__num">({qty})</span>
    </div>
  )
}

export default Badge
