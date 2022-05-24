import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import Paginate from "../../components/atoms/Paginate/Paginate"

import CartProduct from "../../components/modlecules/CartProduct/CartProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import useCart from "../../hooks/useCart"
import useProduct from "../../hooks/useProduct"
import "./product.scss"

const Products = () => {
  const [products, setProducts] = useState([])
  const { searchProduct } = useProduct()
  const { addToCart, viewCartByUser } = useCart()

  const [searchParams] = useSearchParams()
  const searchKeyword = searchParams.get("word")

  const [paramSearch, setParamSearch] = useState({})
  useEffect(() => {
    handleSearch()
  }, [searchKeyword])

  const handleSearch = (params) => {
    const search = { ...paramSearch, ...params }
    if (searchKeyword) {
      search[`name`] = searchKeyword
    } else {
      delete search[`name`]
    }
    searchProduct(
      search,
      (res) => {
        setProducts(res)
        setParamSearch(search)
      },
      () => {
        //do nothing
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
  const handleAddToCart = (product) => {
    addToCart(
      { ..._.omit(product, ["images"]), qty: 1 },
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
        <div className=" product__margin">
          {/* <SideBar /> */}
          {/* <div className="col c-10 "> */}
          <div className="row" style={{ rowGap: 24 }}>
            {products?.list?.map((product) => (
              <CartProduct
                key={product._id}
                product={product}
                onAddToCartClick={handleAddToCart}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
        <br />
        <br />
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paginate
            size={products?.totalPage}
            onChangePage={(page) => {
              handleSearch({ ...searchParams, page })
            }}
            active={products?.page}
          />
        </div>
        <br />
        <br />
      </div>
    </Layout>
  )
}

export default Products
