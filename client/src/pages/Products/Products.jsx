import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import CartProduct from "../../components/modlecules/CartProduct/CartProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import SideBar from "../../components/modlecules/SideBar/SideBar"
import useCart from "../../hooks/useCart"
import useProduct from "../../hooks/useProduct"
import "./product.scss"

const Products = () => {
  const [products, setProducts] = useState([])
  const { searchProduct } = useProduct()
  const { addToCart, viewCartByUser } = useCart()

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const params = {}
    const searchKeyword = searchParams.get("word")
    if (searchKeyword) {
      params[`name`] = searchKeyword
    }
    searchProduct(
      params,
      (res) => {
        console.log("res", res)
        setProducts(res)
      },
      () => {
        //do nothing
      }
    )
  }, [searchParams])

  const refreshCartData = () => {
    viewCartByUser(
      () => {
        // do nothing
      },
      () => {}
    )
  }
  const handleAddToCart = (product) => {
    addToCart(
      product,
      () => {
        // do nothing
        refreshCartData()
      },
      () => {
        // do nothing
      }
    )
  }
  return (
    <Layout>
      <div className="grid wide container__product">
        <div className="row product__margin">
          <SideBar />
          <div className="col c-10 ">
            <div style={{ display: "flex" }}>
              {products?.list?.map((product) => (
                <CartProduct
                  key={product._id}
                  product={product}
                  onAddToCartClick={handleAddToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
