import React, { useState } from "react"
import images from "../../../themes/image"
import { formatCurrent } from "../../../utils/helpers"
import Button from "../../atoms/Button/Button"
import IconButton from "../../atoms/IconButton/IconButton"
import "./DetailInfoProduct.scss"

const DetailInfoProduct = ({ product, onAddToCartClick }) => {
  const [orderNumber, setOrderNumber] = useState(1)
  const arrRank = new Array(5)
    .fill(0)
    .map((i, index) => (index <= product?.rank ? 1 : i))
  const renderRank = () => {
    return arrRank.map((item, index) =>
      item === 0 ? (
        <IconButton
          icon={images.icStar}
          className="detail__icon--rank"
          key={index}
        />
      ) : (
        <IconButton
          icon={images.icStarFill}
          className="detail__icon--rank"
          key={index}
        />
      )
    )
  }

  return (
    <>
      <div
        className="col c-5 detail__img"
        style={{
          backgroundImage: `url("data:image/png;base64,${product?.images?.[0]?.file}")`,
        }}
      ></div>
      <div className="col c-7 detail__content">
        <div className="detail__content--heading">{product?.name}</div>
        <div className="detail__content--rank">{renderRank()}</div>
        <div className="detail__content--price">
          <p className="detail__content--price-title">Giá:</p>
          <p className="detail__content--price-num">
            {formatCurrent(product?.price)}
          </p>
        </div>
        <br />
        <div className="content__qty">
          <div className="content__qty--title">Số lượng:</div>
          <div className="content__qty--order">
            <span
              onClick={() => {
                if (orderNumber > 1) setOrderNumber(orderNumber - 1)
              }}
            >
              -
            </span>
            <input
              type="number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(parseInt(e.target.value))}
            />
            <span onClick={() => setOrderNumber(orderNumber + 1)}>+</span>
          </div>
          <Button
            onClick={() => onAddToCartClick({ ...product, qty: orderNumber })}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </>
  )
}

export default DetailInfoProduct
