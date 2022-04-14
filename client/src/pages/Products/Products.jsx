import React, { useEffect, useState } from "react"

import CartProduct from "../../components/modlecules/CartProduct/CartProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import useProduct from "../../hooks/useProduct"
import "./product.scss"

const Products = () => {
  const [products, setProducts] = useState([])
  const { viewListProduct } = useProduct()
  useEffect(() => {
    viewListProduct(
      (res) => {
        console.log("res", res)
        setProducts(res?.data)
      },
      () => {
        //do nothing
      }
    )
  }, [])

  return (
    <Layout>
      <div className="grid wide">
        <div className="row product__margin">
          {products.map((product) => (
            <CartProduct key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Products
