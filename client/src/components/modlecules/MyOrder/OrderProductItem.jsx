import React from "react"
import styled from "styled-components"
import { formatCurrent } from "../../../utils/helpers"

const OrderProductItem = ({ product }) => {
  const productObject = product?.productId
  return (
    <ProductBlock>
      <Img
        style={{
          backgroundImage: `url(data:image/png;base64,${productObject.images[0]?.file})`,
        }}
      />
      <div style={{ flex: 1 }}>
        <ProductContent>{productObject?.name}</ProductContent>
        <br />
        <ProductContent>x{product?.quantity}</ProductContent>
      </div>
      <Price>{formatCurrent(productObject?.price * product?.quantity)}</Price>
    </ProductBlock>
  )
}

export default OrderProductItem

const ProductBlock = styled.div`
  display: flex;
  align-items: center;
`

const Img = styled.div`
  width: 8rem;
  padding-top: 8rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #ccc;
`

const ProductContent = styled.div`
  margin-left: 1.6rem;
`
const Price = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
`
