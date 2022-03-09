import React from "react"
import "./IconButton.scss"
const IconButton = ({ icon, className, ...props }) => {
  return (
    <img
      src={icon}
      alt=""
      className={["icon__button--img", className].join(" ")}
      {...props}
    />
  )
}

export default IconButton
