import React, { forwardRef } from "react"

import "./Input.scss"
import Icon from "../Icon/icon"
import "../../../sass/_base.scss"
import styled from "styled-components"

const Input = forwardRef(
  (
    {
      onChange,
      required,
      label,
      error,
      icon,
      variant,
      onClickIcon,

      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      onChange(e.target.value)
    }

    const classNames = [
      "input",
      variant ?? "",
      error ? "error" : "",
      icon ? "has__icon" : "",
    ]
      .join(" ")
      .trim()

    return (
      <div className="input__block">
        {label && (
          <div className="input__label">
            {label}
            {required && <small>&nbsp;*</small>}
          </div>
        )}
        <StyledInput
          onChange={handleChange}
          className={classNames}
          {...props}
        />
        {icon && (
          <Icon
            className="input__icon--right"
            icon={icon}
            onClick={onClickIcon}
          />
        )}
        {error && <div className="input__error--text">{error}</div>}
      </div>
    )
  }
)
export default Input

const StyledInput = styled.input`
  &:disabled {
    background: #ccc;
  }
`
