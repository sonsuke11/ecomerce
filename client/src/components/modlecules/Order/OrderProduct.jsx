import React from "react"
import styled from "styled-components"
import useCart from "../../../hooks/useCart"
import { formatCurrent } from "../../../utils/helpers"

const OrderProduct = () => {
  const { cartData } = useCart()

  return (
    <div className="col c-12">
      <Title>Sản phẩm</Title>
      <table style={{ width: "100%" }}>
        <tr>
          <Th>Sản phẩm</Th>
          <Th>Đơn giá</Th>
          <Th>Số lượng</Th>
          <Th>Thành tiền</Th>
        </tr>
        {cartData?.data?.productsOfCart.map((product) => (
          <tr>
            <Td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Img
                  src={`data:image/png;base64,${product.product.images[0].file}`}
                  alt="product"
                />
                &nbsp;&nbsp;&nbsp;
                <p>{product.product.name}</p>
              </div>
            </Td>
            <Td>{formatCurrent(product.product.price)}</Td>
            <Td>{product.qty}</Td>
            <Td>{formatCurrent(product.product.price * product.qty)}</Td>
          </tr>
        ))}
      </table>
      <br />
      <br />
      <br />
      <hr />
    </div>
  )
}

export default OrderProduct

const Title = styled.h3`
  display: block;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`
const Td = styled.td`
  text-align: center;
  padding: 1rem;
  vertical-align: middle;
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`
const Th = styled.th`
  &:first-child {
    text-align: left;
  }
  &:last-child {
    text-align: right;
  }
`

const Img = styled.img`
  width: 6rem;
  object-fit: contain;
`
