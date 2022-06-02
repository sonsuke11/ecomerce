import React from "react"
import styled from "styled-components"
import useCart from "../../../hooks/useCart"
import images from "../../../themes/image"
import { formatCurrent } from "../../../utils/helpers"

const OrderProduct = ({ dataOrder, id, onClickDelete }) => {
  const { cartData } = useCart()

  const list = id ? dataOrder?.products : cartData

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
        {list?.map((product, index) => (
          <tr>
            <Td>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Img
                  src={`data:image/png;base64,${
                    product?.images?.[0]?.file ||
                    product?.productId?.images?.[0]?.file
                  }`}
                  alt="product"
                />
                &nbsp;&nbsp;&nbsp;
                <p>{product?.name || product?.productId?.name}</p>
              </div>
            </Td>
            <Td>
              {formatCurrent(product?.price || product?.productId?.price)}
            </Td>
            <Td>{product?.qty || product?.quantity}</Td>
            <Td>
              {formatCurrent(
                (product?.price || product?.productId?.price) *
                  (product?.qty || product?.quantity)
              )}
            </Td>
            {/* <Td>
              <Icon src={images.icTrash} onClick={() => onClickDelete(index)} />
            </Td> */}
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
  border: 1px solid #ccc;
`

const Icon = styled.img`
  width: 2rem;
`
