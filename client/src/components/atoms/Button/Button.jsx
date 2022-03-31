import React from "react"

import "./Button.scss"
const Button = ({ children }) => {
  return <button className="button__group">{children}</button>
}

export default Button
