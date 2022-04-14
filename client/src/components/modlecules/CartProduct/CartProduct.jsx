import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import images from "../../../themes/image"
import { formatCurrent } from "../../../utils/helpers"
import IconButton from "../../atoms/IconButton/IconButton"
import Button from "../../atoms/Button/Button"
import "./CartProduct.scss"
const CartProduct = ({ product }) => {
  const history = useNavigate()
  const [isLike, setIsLike] = useState(false)
  const arrRank = new Array(5)
    .fill(0)
    .map((i, index) => (index <= product.rank ? 1 : i))
  const renderRank = () => {
    return arrRank.map((item, index) =>
      item === 0 ? (
        <IconButton
          icon={images.icStar}
          className="product__icon--rank"
          key={index}
        />
      ) : (
        <IconButton
          icon={images.icStarFill}
          className="product__icon--rank"
          key={index}
        />
      )
    )
  }
  return (
    <div className="col c-3 margin__cart">
      <div className="cart__wrap">
        <div
          className="product__image"
          style={{ backgroundImage: `url(${product.images[0]})` }}
        ></div>
        <div className="product__info">
          <div className="product__name mb-10">{product.name}</div>
          <div className="product__price mb-10">
            {formatCurrent(product.price)}
          </div>
          <div className="product__evaluate mb-10">
            <IconButton
              onClick={() => setIsLike(!isLike)}
              icon={!isLike ? images.icHeart : images.icHeartFill}
              className="product__icon"
            />
            <div style={{ display: "flex" }}>{renderRank()}</div>
          </div>
        </div>
        <div className="product__action">
          <IconButton icon={images.icView} onClick={() => history("/")} />
          <Button>Add to cart</Button>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
