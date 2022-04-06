import React from "react"
import Icon from "../Icon/icon"
import "./IconButton.scss"
const IconButton = ({ icon, className, ...props }) => {
  return (
    <div className={["icon__button--img", className].join(" ")}>
      <Icon icon={icon} {...props} />
    </div>
  )
}

export default IconButton
