import React from "react"
import styled from "styled-components"

const DescriptionProduct = ({ product }) => {
  return (
    <div className="col c-12">
      <Title>Mô tả sản phẩm</Title>
      <br />
      <pre style={{ lineHeight: 1.3, whiteSpace: "pre-wrap" }}>
        {product.description}
      </pre>
    </div>
  )
}

export default DescriptionProduct
const Title = styled.h4`
  font-size: 2rem;
  font-weight: bold;
`
