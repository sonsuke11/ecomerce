import React from "react"

import "./Button.scss"
const Button = ({
  children,
  variant = "primary",
  className,
  onClick,
  ...props
}) => {
  const classNames = ["button__group", className, variant].join(" ")
  return (
    <button className={classNames} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
