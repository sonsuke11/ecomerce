import _ from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ToastContext } from "../../App"
import Button from "../../components/atoms/Button/Button"
import Layout from "../../components/modlecules/Layout/Layout"
import InfoOrderForm from "../../components/modlecules/Order/InfoOrderForm"
import OrderProduct from "../../components/modlecules/Order/OrderProduct"
import useCart from "../../hooks/useCart"
import useOrder from "../../hooks/useOrder"
import { ShipPrice, Waitting } from "../../utils/constants"

const OrderPage = () => {
  const { cartData, setCartDataToStore } = useCart()
  const { createOrder, getOrderById } = useOrder()
  const { toast } = useContext(ToastContext)
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const history = useNavigate()

  const [dataOrder, setDataOrder] = useState()
  const [validateError, setValidateError] = useState()

  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.price * product?.qty
    }
    const productList = cartData
    const totalPrice = productList?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice
  }

  const handleDeleteItemsInCart = () => {
    setCartDataToStore([])
  }

  const validate = () => {
    const errors = {}
    let flag = true
    const errorText = "Vui lòng không để trống trường này"

    if (!dataOrder?.name?.trim()) {
      errors.name = errorText
      flag = false
    }

    if (!dataOrder?.phone?.trim()) {
      errors.phone = errorText
      flag = false
    }

    if (!dataOrder?.address?.trim()) {
      errors.address = errorText
      flag = false
    }

    setValidateError(errors)

    return flag
  }

  const handleSave = () => {
    if (validate()) {
      // if (id) {
      //   updateOrder(
      //     {
      //       status: 1,
      //       ..._.pick(dataOrder, ["address", "name", "phone", "email", "_id"]),
      //     },
      //     () => {
      //       toast("success", "Đặt hàng thành công")
      //       history(-1)
      //     },
      //     () => {
      //       // do nothing
      //     }
      //   )
      // } else {
      const params = { ..._.omit(dataOrder, ["_id"]), status: Waitting }
      if (id) {
        params.products = dataOrder?.products?.map((item) => ({
          productId: item?.productId?._id,
          quantity: item?.quantity,
        }))
      } else {
        console.log("dataOrder", dataOrder)
        params.products = dataOrder?.products?.map((item) => ({
          productId: item?._id,
          quantity: item?.qty,
        }))
      }
      createOrder(
        _.omit(params, ["createdAt", "updateAt"]),
        () => {
          toast("success", "Đặt hàng thành công")
          handleDeleteItemsInCart()
          history("/my-order")
        },
        () => {}
      )
      // }
    }
  }

  const fetchOrderDetail = () => {
    getOrderById(
      id,
      (res) => {
        setDataOrder(res?.data)
      },
      () => {
        // do nothing
      }
    )
  }

  const handleClickDelete = (index) => {
    const newProducts = dataOrder?.products?.filter(
      (item, indx) => index !== indx
    )
    const newDataOrder = { ...dataOrder, products: newProducts }
    setDataOrder(newDataOrder)
  }
  console.log("dataOrder", dataOrder)

  useEffect(() => {
    if (id) {
      fetchOrderDetail()
    } else {
      setDataOrder({
        totalPrice: caculateTotalPrice() + ShipPrice,
        status: 1,
        products: cartData,
      })
    }
  }, [id])

  return (
    <Layout>
      <div
        className="grid wide"
        style={{
          backgroundColor: "white",
          marginBlock: "2.4rem",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: " 4px 4px 10px #ccc",
        }}
      >
        <div className="row">
          <OrderProduct
            dataOrder={dataOrder}
            id={id}
            onClickDelete={handleClickDelete}
          />
          <InfoOrderForm
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
            onSave={handleSave}
            id={id}
            validateError={validateError}
            setValidateError={setValidateError}
          />
        </div>
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" onClick={handleSave}>
            Đặt hàng
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default OrderPage
