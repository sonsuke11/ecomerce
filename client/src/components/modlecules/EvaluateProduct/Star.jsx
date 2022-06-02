import React from "react"
import styled from "styled-components"
import images from "../../../themes/image"

const Star = ({ fill, onHover, index, onClick, ...props }) => {
  return (
    <>
      <Img
        src={fill ? images.icStarFill : images.icStar}
        onMouseOver={() => onHover(index)}
        onClick={() => onClick(index)}
        {...props}
      />
    </>
  )
}

export default Star

const Img = styled.img`
  width: 2rem;
  &:not(:first-child) {
    margin-left: 3px;
  }
`
