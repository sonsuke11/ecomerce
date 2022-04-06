import React from "react"
import "./Icon.scss"

const Icon = ({ icon, ...props }) => {
  return <img src={icon} alt="" {...props} />
}

export default Icon
