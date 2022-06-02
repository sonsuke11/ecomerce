import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { createPortal } from "react-dom"
import images from "../../../themes/image"
import IconButton from "../../atoms/IconButton/IconButton"
import "./CartShoping.scss"
import useCart from "../../../hooks/useCart"
import { formatCurrent } from "../../../utils/helpers"
import Button from "../../atoms/Button/Button"
import { useNavigate } from "react-router-dom"
import _ from "lodash"
import useUser from "../../../hooks/useUser"

const CartShoping = ({ show, onClose }) => {
  const history = useNavigate()
  const { cartData, setCartDataToStore } = useCart()
  const { userData } = useUser()
  const [dataPage, setDataPage] = useState()

  useEffect(() => {
    setDataPage(cartData)
  }, [cartData])

  const caculateTotalPrice = () => {
    const caculatePriceOneProduct = (product) => {
      return product?.price * product?.qty
    }
    const totalPrice = dataPage?.reduce(
      (prev, curr) => prev + caculatePriceOneProduct(curr),
      0
    )
    return totalPrice
  }

  const handleDeleteItem = (index) => {
    let params = cartData

    params = params.filter((_item, indx) => index !== indx)
    setCartDataToStore(params)
  }

  const handleClickPayment = () => {
    if (_.isEmpty(userData)) {
      history("/login")
    } else {
      history("/order")
    }
  }

  if (!show) return null

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
          {dataPage?.map((item, index) => (
            <div className="cart__block" key={item?._id}>
              <div className="cart__item--wrap">
                <div
                  className="cart__img"
                  style={{
                    backgroundImage: `url("data:image/png;base64,${item?.images?.[0]?.file}")`,
                  }}
                ></div>
                <div className="cart__info">
                  <p className="cart__product--name">{item?.name}</p>
                  <p className="cart__product--price">
                    {formatCurrent(item?.price)}
                  </p>
                  <CartButton
                    src={images.icTrash}
                    onClick={() => handleDeleteItem(index)}
                  />
                </div>
              </div>
              <div className="cart__qty--block">
                <div className="cart__qty">
                  <div
                    className="cart__qty--btn"
                    onClick={() => {
                      if (item?.qty > 1) {
                        const newObject = {
                          ...dataPage[index],
                          qty: parseInt(dataPage[index].qty - 1),
                        }
                        const newData = dataPage?.map((i, indx) => {
                          if (index === indx) {
                            return newObject
                          }
                          return i
                        })
                        setDataPage(newData)
                      }
                    }}
                  >
                    -
                  </div>
                  <input
                    className="cart__qty--num"
                    value={item?.qty}
                    type="number"
                    onChange={(e) => {
                      const newObject = {
                        ...dataPage[index],
                        qty: parseInt(e.target.value),
                      }
                      const newData = dataPage?.map((i, indx) => {
                        if (index === indx) {
                          return newObject
                        }
                        return i
                      })
                      setDataPage(newData)
                    }}
                  />
                  <div
                    className="cart__qty--btn"
                    onClick={() => {
                      if (item?.qty < 10) {
                        const newObject = {
                          ...dataPage[index],
                          qty: parseInt(dataPage[index].qty + 1),
                        }
                        const newData = dataPage?.map((i, indx) => {
                          if (index === indx) {
                            return newObject
                          }
                          return i
                        })
                        setDataPage(newData)
                      }
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__footer">
          {Boolean(caculateTotalPrice()) && (
            <Button
              className="cart__footer--button"
              onClick={handleClickPayment}
            >
              Đặt hàng {formatCurrent(caculateTotalPrice())}
            </Button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CartShoping

const CartButton = styled.img`
  width: 2rem;
  height: 2rem;
  position: absolute;
  right: -28px;
  top: 35px;
`
