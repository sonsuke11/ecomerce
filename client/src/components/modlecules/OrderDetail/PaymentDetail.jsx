import React from "react"
import styled from "styled-components"
import { ShipPrice } from "../../../utils/constants"
import { formatCurrent } from "../../../utils/helpers"

const PaymentDetail = ({ priceOrder, totalPrice }) => {
  return (
    <Wrap>
      <Title>Thanh toán</Title>
      <Block>
        <PriceItem>Tổng tiền hàng: {formatCurrent(priceOrder)}</PriceItem>
        <PriceItem>Phí ship: {formatCurrent(ShipPrice)}</PriceItem>
        <PriceItem>Tổng thanh toán: {formatCurrent(totalPrice)}</PriceItem>
      </Block>
    </Wrap>
  )
}

export default PaymentDetail

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
const Block = styled.div``

const PriceItem = styled.div`
  text-align: right;
  padding-block: 2rem;
  &:not(:first-child) {
    border-top: 2px solid #f5f5f5;
  }
`
