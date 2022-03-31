import React from "react"
import "./CartProduct.scss"
const CartProduct = ({ product }) => {
  return (
    <div className="cart__wrap">
      <div
        className="product__image"
        style={{ backgroundImage: `url(${product.imageUrl})` }}
      ></div>
      <div className="product__name">{product.name}</div>
      <p className="product__quantity">{product.quantity}</p>
    </div>
  )
}

export default CartProduct
