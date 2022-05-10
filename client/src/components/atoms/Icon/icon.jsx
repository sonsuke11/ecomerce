import React from "react"
import "./Icon.scss"

const Icon = ({ icon, onClick, ...props }) => {
  return <img src={icon} alt="" onClick={onClick} {...props} />
}

export default Icon
