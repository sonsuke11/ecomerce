import React from "react"
import styled from "styled-components"
import images from "../../../themes/image"
import {
  Cancel,
  OrderStatusOption,
  ShipPrice,
  Waitting,
  Completed,
} from "../../../utils/constants"
import { formatCurrent } from "../../../utils/helpers"
import Button from "../../atoms/Button/Button"
import OrderProductItem from "./OrderProductItem"

const OrderHistoryList = ({
  data,
  onCancelOrder,
  onDetailOrderClick,
  onClickReBuy,
}) => {
  const mapStatus = (status) => {
    return OrderStatusOption.find((item) => item.value === status)?.label
  }
  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.productId?.price * product?.quantity
    }
    const totalPrice = data?.products?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice + ShipPrice
  }

  const productLength = data?.products?.length
  return (
    <Wrap>
      <StatusBlock>{mapStatus(data?.status)}</StatusBlock>
      <hr />
      <br />
      {data?.products?.map((product, index) => (
        <div
          onClick={() => onDetailOrderClick(data._id)}
          style={{ cursor: "pointer" }}
          key={data._id}
        >
          <OrderProductItem product={product} onClick={onDetailOrderClick} />
          {index !== productLength && <br />}
        </div>
      ))}

      <br />
      <hr />
      <br />
      <PriceBlock>
        <Image src={images?.icCoin} />
        <TotalPrice>{formatCurrent(caculateTotalPrice())}</TotalPrice>
      </PriceBlock>
      <br />
      <ButtonGroup>
        {(data.status === Cancel || data.status === Completed) && (
          <Button onClick={() => onClickReBuy(data._id)}>Mua lại</Button>
        )}
        {data.status === Waitting && (
          <Button variant="outline" onClick={() => onCancelOrder(data._id)}>
            Hủy đơn
          </Button>
        )}
      </ButtonGroup>
    </Wrap>
  )
}

export default OrderHistoryList

const Wrap = styled.div`
  border-radius: 5px;
  margin-block: 2rem;
  background-color: white;
  padding: 2rem;
  box-shadow: 4px 4px 10px #ccc;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  & button:not(:first-child) {
    margin-left: 0.8rem;
  }
`

const StatusBlock = styled.div`
  text-align: right;
  font-size: 1.3rem;
  font-weight: bold;
`
const TotalPrice = styled.div`
  font-size: 2rem;
  margin-left: 0.2rem;
`
const Image = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`

const PriceBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
