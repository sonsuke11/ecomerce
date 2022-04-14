import React from "react"
import Icon from "../Icon/icon"
import "./IconButton.scss"
const IconButton = ({ icon, className, children, variant, ...props }) => {
  const classNames = ["icon__button--img", className, variant]
    .filter((x) => x)
    .join(" ")
  return (
    <div className={classNames}>
      <Icon icon={icon} {...props} />
      {children}
    </div>
  )
}

export default IconButton
