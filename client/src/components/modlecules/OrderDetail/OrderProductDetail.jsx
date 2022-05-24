import React from "react"
import styled from "styled-components"
import { formatCurrent } from "../../../utils/helpers"

const OrderProductDetail = ({ data }) => {
  return (
    <Wrap className="col c-12">
      <Title>Sản phẩm</Title>
      <table style={{ width: "100%" }}>
        <tr>
          <Th>Sản phẩm</Th>
          <Th>Đơn giá</Th>
          <Th>Số lượng</Th>
          <Th>Thành tiền</Th>
        </tr>
        {data?.products?.map((product) => (
          <tr>
            <Td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Img
                  src={`data:image/png;base64,${product.productId.images[0].file}`}
                  alt="product"
                />
                &nbsp;&nbsp;&nbsp;
                <p>{product.productId.name}</p>
              </div>
            </Td>
            <Td>{formatCurrent(product.productId.price)}</Td>
            <Td>{product.quantity}</Td>
            <Td>{formatCurrent(product.productId.price * product.quantity)}</Td>
          </tr>
        ))}
      </table>
      <br />
    </Wrap>
  )
}

export default OrderProductDetail

const Wrap = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 5px;
`

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
