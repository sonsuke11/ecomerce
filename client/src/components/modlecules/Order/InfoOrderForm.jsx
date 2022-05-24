import React from "react"
import styled from "styled-components"
import useCart from "../../../hooks/useCart"
import { ShipPrice } from "../../../utils/constants"
import { formatCurrent } from "../../../utils/helpers"
import Input from "../../atoms/Input/Input"
import "./InfoOrderForm.scss"

const InfoOrderForm = ({ dataOrder, setDataOrder, onSave }) => {
  const { cartData } = useCart()
  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.product?.price * product?.qty
    }
    const totalPrice = cartData?.data?.productsOfCart?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice ?? 0
  }
  const totalPrice = caculateTotalPrice()

  const totalPayment = totalPrice + ShipPrice
  return (
    <>
      <h1 className=" col c-12 order__title">Thông tin giao hàng</h1>
      <div className="col c-8">
        <div className="order__block">
          <Input
            placeholder="Họ và Tên"
            value={dataOrder?.name}
            onChange={(value) => setDataOrder({ ...dataOrder, name: value })}
          />
          <br />
          <div className="row sm-gutter">
            <div className="col c-8">
              <Input
                placeholder="Email"
                value={dataOrder?.email}
                onChange={(value) =>
                  setDataOrder({ ...dataOrder, email: value })
                }
              />
            </div>
            <div className="col c-4">
              <Input
                placeholder="Số điện thoại"
                value={dataOrder?.phone}
                onChange={(value) =>
                  setDataOrder({ ...dataOrder, phone: value })
                }
              />
            </div>
          </div>
          <br />
          <Input
            placeholder="Địa chỉ"
            value={dataOrder?.address}
            onChange={(value) => setDataOrder({ ...dataOrder, address: value })}
          />
        </div>
      </div>
      <div
        className="col c-4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <ContentCurrency>
          <p>Tổng tiền hàng</p>
          <p>{formatCurrent(totalPrice)}</p>
        </ContentCurrency>
        <ContentCurrency>
          <p>Tổng tiền hàng</p>
          <p>{formatCurrent(ShipPrice)}</p>
        </ContentCurrency>
        <ContentCurrency>
          <p>Tổng tiền hàng</p>
          <p>{formatCurrent(totalPayment)}</p>
        </ContentCurrency>
      </div>
    </>
  )
}

export default InfoOrderForm

const ContentCurrency = styled.div`
  display: flex;
  align-items: center;
  height: 42px;
  justify-content: space-between;
`
