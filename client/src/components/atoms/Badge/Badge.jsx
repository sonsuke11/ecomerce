import React from "react"
import "./Badge.scss"
const Badge = ({ children }) => {
  return (
    <div className="badge__wrap">
      {children}
      <span className="badge__num">(3)</span>
    </div>
  )
}

export default Badge
