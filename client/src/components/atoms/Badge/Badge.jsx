import React from "react"
import "./Badge.scss"
const Badge = ({ children, qty, ...props }) => {
  return (
    <div className="badge__wrap" {...props}>
      {children}
      <span className="badge__num">({qty})</span>
    </div>
  )
}

export default Badge
