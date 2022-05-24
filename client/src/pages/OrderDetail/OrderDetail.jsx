import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import Button from "../../components/atoms/Button/Button"
import Layout from "../../components/modlecules/Layout/Layout"
import OrderProductDetail from "../../components/modlecules/OrderDetail/OrderProductDetail"
import PaymentDetail from "../../components/modlecules/OrderDetail/PaymentDetail"
import useOrder from "../../hooks/useOrder"
import images from "../../themes/image"
import { ShipPrice } from "../../utils/constants"

const OrderDetail = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const { getOrderById } = useOrder()
  const [dataDetail, setDataDetail] = useState()

  const handleFetchDetail = () => {
    getOrderById(
      id,
      (res) => {
        setDataDetail(res?.data)
      },
      () => {
        // do nothing
      }
    )
  }
  console.log("dataDetail", dataDetail)
  useEffect(() => {
    handleFetchDetail()
  }, [])

  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.productId?.price * product?.quantity
    }
    const totalPrice = dataDetail?.products?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice ?? 0
  }
  const priceOrder = caculateTotalPrice()
  const totalPrice = priceOrder + ShipPrice
  return (
    <Layout>
      <br />
      <div className="grid wide">
        <div className="row">
          <Wrap className="col c-12">
            <div
              style={{
                borderRadius: "5px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Border />
              <AddressWrap>
                <TitleBlock>
                  <Location src={images.icLocation} />
                  <AddressTitle>Địa chỉ nhận hàng</AddressTitle>
                </TitleBlock>
                <Block>
                  <Address>
                    <div>
                      {dataDetail?.name} ({dataDetail?.phone})
                    </div>
                    <div>{dataDetail?.address}</div>
                  </Address>
                  <Button variant="outline">Thay đổi</Button>
                </Block>
              </AddressWrap>
            </div>
            <br />
            <OrderProductDetail data={dataDetail} />
            <br />
            <PaymentDetail priceOrder={priceOrder} totalPrice={totalPrice} />
          </Wrap>
        </div>
      </div>
      <br />
    </Layout>
  )
}

export default OrderDetail

const Wrap = styled.div``

const Border = styled.div`
  position: absolute;
  top: 0;
  height: 3px;
  width: 100%;
  background-position-x: -30px;
  background-size: 116px 3px;
  background-image: repeating-linear-gradient(
    45deg,
    rgb(111, 166, 214),
    rgb(111, 166, 214) 33px,
    transparent 0px,
    transparent 41px,
    rgb(241, 141, 155) 0px,
    rgb(241, 141, 155) 74px,
    transparent 0px,
    transparent 82px
  );
`
const AddressWrap = styled.div`
  padding: 2rem;
  background-color: white;
`
const TitleBlock = styled.div`
  display: flex;
  align-items: center;
`

const Location = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`

const AddressTitle = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 5px;
`

const Address = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  & div:not(:first-child) {
    margin-left: 3rem;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
`
