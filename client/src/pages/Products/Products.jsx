import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import Paginate from "../../components/atoms/Paginate/Paginate"

import CartProduct from "../../components/modlecules/CartProduct/CartProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import useCart from "../../hooks/useCart"
import useProduct from "../../hooks/useProduct"
import images from "../../themes/image"
import "./product.scss"

const Products = () => {
  const [products, setProducts] = useState([])
  const { searchProduct } = useProduct()
  const { setCartDataToStore, cartData } = useCart()

  const [searchParams] = useSearchParams()
  const searchKeyword = searchParams.get("word")
  const type = searchParams.get("type")

  const [paramSearch, setParamSearch] = useState({})
  useEffect(() => {
    handleSearch()
  }, [searchKeyword, type])

  const handleSearch = (params) => {
    const search = { ...paramSearch, ...params }

    if (searchKeyword) {
      search[`name`] = searchKeyword
    } else {
      delete search[`name`]
    }

    if (type) {
      search["categoryId"] = type
    } else {
      delete search[`categoryId`]
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
    <Layout>
      <div className="grid wide container__product">
        {/* <SideBar /> */}
        {/* <div className="col c-10 "> */}
        <br />
        <br />
        {products?.list?.length === 0 && (
          <NoData>
            <img src={images.icNoOrder} />
            Chưa có sản phẩm nào
          </NoData>
        )}
        {products?.list?.length > 0 && (
          <>
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
          </>
        )}
        <br />
        <br />
      </div>
    </Layout>
  )
}

export default Products

const NoData = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  & img {
    width: 14rem;
    margin-bottom: 2rem;
  }
`
