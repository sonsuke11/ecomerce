import React, { useEffect, useRef, useState } from "react"
import images from "../../../themes/image"
import "./Select.scss"

const Select = ({ value, onChange, label, options }) => {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [displayValue, setDisplayValue] = useState(value?.label)
  const [displayOptions, setDisplayOptions] = useState(options)
  useEffect(() => {
    setDisplayValue(value?.label)
  }, [value])
  useEffect(() => {
    setDisplayOptions(options)
  }, [options])

  const onSearchOption = (value) => {
    setDisplayOptions(
      options.filter((option) =>
        !value
          ? options
          : option.label.toLowerCase().includes(value.toLowerCase())
      )
    )
  }
  return (
    <div className="select__block" ref={ref}>
      {label && <label>{label}</label>}
      <div className="select__list" onClick={() => setIsOpen(!isOpen)}>
        <input
          value={displayValue}
          onChange={(e) => {
            onSearchOption(e.target.value)
            setDisplayValue(e.target.value)
          }}
        />
        <img className="select__icon" src={images.icCarretDown} alt="" />
      </div>
      <div
        className="select__item"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {displayOptions?.map((item) => (
          <span
            onClick={() => {
              onChange(item)
              setIsOpen(false)
            }}
            className={item.value === value?.value ? "active" : ""}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Select
