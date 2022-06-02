import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import useCart from "../../../hooks/useCart"
import CartProduct from "../CartProduct/CartProduct"

const FeatureProducts = ({ data }) => {
  const ref = useRef()
  const [currentChild, setCurrentChild] = useState(0)
  const lengthOfProducts = data?.length
  const { setCartDataToStore, cartData } = useCart()

  const handleAddToCart = (product) => {
    const isExist = cartData.some((item) => item._id === product._id)

    let params = cartData
    if (isExist) {
      params = params.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty + 1 }
        }
        return item
      })
    } else {
      params = [...params, { ...product, qty: 1 }]
    }

    setCartDataToStore(
      params,
      () => {
        // do nothing
      },
      () => {
        // do nothing
      }
    )
  }
  return (
    <div className="col c-12">
      <br />
      <Title>Sản phẩm bán chạy</Title>
      <br />
      <Wrap>
        <button
          className="btn"
          style={{ left: 2 }}
          onClick={() => {
            if (currentChild >= 0) {
              ref.current.children[currentChild - 1].style.display = "block"
              setCurrentChild(currentChild - 1)
            }
          }}
        >
          &#10094;
        </button>
        <Block className="row" ref={ref}>
          {data?.map((product) => (
            <CartProduct
              onAddToCartClick={handleAddToCart}
              product={{
                ...product?.products,
                rank: parseFloat(
                  product?.products?.rank?.$numberDecimal?.toString()
                ),
              }}
            />
          ))}
        </Block>
        <button
          style={{ right: 2 }}
          className="btn"
          onClick={() => {
            if (currentChild <= lengthOfProducts - 5) {
              ref.current.children[currentChild].style.display = "none"
              setCurrentChild(currentChild + 1)
            }
          }}
        >
          &#10095;
        </button>
      </Wrap>
    </div>
  )
}

export default FeatureProducts

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
`
const Wrap = styled.div`
  position: relative;
  overflow: hidden;
  & .btn {
    position: absolute;
    padding: 1rem 1.8rem;
    top: calc(50% - 2rem);
    border: none;
    font-size: 1.8rem;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }
`

const Block = styled.div`
  flex-wrap: nowrap;
`
