import React from "react"
import { createPortal } from "react-dom"
import images from "../../../themes/image"
import IconButton from "../../atoms/IconButton/IconButton"
import "./CartShoping.scss"
import useCart from "../../../hooks/useCart"
import { formatCurrent } from "../../../utils/helpers"
import Button from "../../atoms/Button/Button"
import { useNavigate } from "react-router-dom"

const CartShoping = ({ show, onClose }) => {
  const history = useNavigate()
  const { cartData } = useCart()
  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.product?.price * product?.qty
    }
    const totalPrice = cartData?.data?.productsOfCart?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice
  }
  if (!show) return null
  console.log(
    "item?.images?.[0]?.file",
    cartData?.data?.product?.[0].images?.[0]?.file
  )
  return createPortal(
    <div className="modal__overlay">
      <div className="modal__wrapper">
        <div className="cart__header">
          <h5 className="cart__title">GIỎ HÀNG</h5>
          <IconButton
            icon={images.icClose}
            className="cart__close"
            onClick={onClose}
          />
        </div>
        <div className="cart__body">
          {cartData?.data?.productsOfCart?.map((item) => (
            <div className="cart__block" key={item?._id}>
              <div className="cart__item--wrap">
                <div
                  className="cart__img"
                  style={{
                    backgroundImage: `url("data:image/png;base64,${item?.product?.images?.[0]?.file}")`,
                  }}
                ></div>
                <div className="cart__info">
                  <p className="cart__product--name">{item?.product?.name}</p>
                  <p className="cart__product--price">
                    {formatCurrent(item?.product?.price)}
                  </p>
                </div>
              </div>
              <div className="cart__qty--block">
                <div className="cart__qty">
                  <div className="cart__qty--btn">-</div>
                  <div className="cart__qty--num">{item?.qty}</div>
                  <div className="cart__qty--btn">+</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__footer">
          <Button
            className="cart__footer--button"
            onClick={() => history("/order")}
          >
            Đặt hàng {formatCurrent(caculateTotalPrice())}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CartShoping
