import React, { useContext, useState } from "react"
import { ToastContext } from "../../App"
import Button from "../../components/atoms/Button/Button"
import Layout from "../../components/modlecules/Layout/Layout"
import InfoOrderForm from "../../components/modlecules/Order/InfoOrderForm"
import OrderProduct from "../../components/modlecules/Order/OrderProduct"
import useCart from "../../hooks/useCart"
import useOrder from "../../hooks/useOrder"
import { ShipPrice } from "../../utils/constants"

const OrderPage = () => {
  const { cartData, deleteItemsInCart, viewCartByUser } = useCart()
  const { createOrder } = useOrder()
  const { toast } = useContext(ToastContext)
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
  const [dataOrder, setDataOrder] = useState({
    totalPrice: caculateTotalPrice() + ShipPrice,
    status: 1,
  })
  console.log("dataOrder", dataOrder)
  const handleDeleteItemsInCart = () => {
    const params = cartData?.data?.productsOfCart?.map((product) => product._id)
    deleteItemsInCart(
      { ids: params },
      () => {
        // do nothing
        refreshCartData()
      },
      () => {
        // do nothing
      }
    )
  }
  const refreshCartData = () => {
    viewCartByUser(
      () => {
        // do nothing
      },
      () => {}
    )
  }
  const handleSave = () => {
    createOrder(
      {
        ...dataOrder,
        products: cartData?.data?.productsOfCart?.map((item) => ({
          productId: item?.product?._id,
          quantity: item?.qty,
        })),
      },
      () => {
        toast("success", "Tạo đơn thành công")
        handleDeleteItemsInCart()
      },
      () => {}
    )
  }

  return (
    <Layout>
      <div
        className="grid wide"
        style={{
          backgroundColor: "white",
          marginBlock: "2.4rem",
          padding: "2rem",
          borderRadius: "5px",
        }}
      >
        <div className="row">
          <OrderProduct />
          <InfoOrderForm
            dataOrder={dataOrder}
            setDataOrder={setDataOrder}
            onSave={handleSave}
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
