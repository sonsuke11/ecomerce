import React from "react"
import Icon from "../Icon/icon"

import "./Button.scss"
const Button = ({
  children,
  variant = "primary",
  className,
  onClick,
  icon,
  ...props
}) => {
  const classNames = ["button__group", className, variant].join(" ")
  return (
    <button className={classNames} onClick={onClick} {...props}>
      {icon && <Icon icon={icon} className="button__icon" />}
      &nbsp;
      {children}
    </button>
  )
}

export default Button
