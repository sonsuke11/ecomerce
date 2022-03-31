import React from "react"

import "./Input.scss"
import "../../../sass/_base.scss"

const Input = ({
  button,
  onChange,
  required,
  label,
  error,
  variant,
  ...props
}) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }
  return (
    <div className="input__block">
      <div className="input__label">
        {label}
        {required && <small>&nbsp;*</small>}
      </div>
      <input
        onChange={handleChange}
        className={["input", variant ?? "", error ? "error" : ""]
          .join(" ")
          .trim()}
        {...props}
      />
      {error && <div className="input__error--text">{error}</div>}
    </div>
  )
}

export default Input
