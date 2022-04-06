import React, { useState } from "react"
import images from "../../../themes/image"
import IconButton from "../../atoms/IconButton/IconButton"
import "./CartProduct.scss"
const CartProduct = ({ product }) => {
  const [isLike, setIsLike] = useState(false)
  const arrRank = new Array(5)
    .fill(0)
    .map((i, index) => (index <= product.rank ? 1 : i))
  const renderRank = () => {
    return arrRank.map((item) =>
      item === 0 ? (
        <IconButton icon={images.icStar} className="product__icon--rank" />
      ) : (
        <IconButton icon={images.icStarFill} className="product__icon--rank" />
      )
    )
  }
  return (
    <div className="col c-3 margin__cart">
      <div className="cart__wrap">
        <div
          className="product__image"
          style={{ backgroundImage: `url(${product.imageUrl})` }}
        ></div>
        <div className="product__info">
          <div className="product__name mb-10">{product.name}</div>
          <div className="product__price mb-10">{product.price}</div>
          <div className="product__evaluate mb-10">
            <IconButton
              onClick={() => setIsLike(!isLike)}
              icon={!isLike ? images.icHeart : images.icHeartFill}
              className="product__icon"
            />
            <div style={{ display: "flex" }}>{renderRank()}</div>
          </div>
          <div className="product__quantity">{product.quantity}</div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
