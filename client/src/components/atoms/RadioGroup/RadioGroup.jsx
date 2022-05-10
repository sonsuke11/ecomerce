import React from "react"
import "./RadioGroup.scss"
const RadioGroup = ({ value, onChange, items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <span key={index}>
          <input
            type="radio"
            name="radio"
            value={item.value}
            id={item.value}
            checked={value?.value === item.value}
            onChange={() => onChange(item)}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </span>
      ))}
    </div>
  )
}

export default RadioGroup
