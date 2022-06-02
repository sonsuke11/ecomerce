import React, { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import DetailInfoProduct from "../../components/modlecules/DetailProduct/DetailInfoProduct"
import Layout from "../../components/modlecules/Layout/Layout"
import useCart from "../../hooks/useCart"
import useProduct from "../../hooks/useProduct"
import "./Detail.scss"
import { ToastContext } from "../../App"
import { getMessageError } from "../../utils/helpers"
import DescriptionProduct from "../../components/modlecules/DetailProduct/DescriptionProduct"
import useComment from "../../hooks/useComment"
import ProductComment from "../../components/modlecules/DetailProduct/ProductComment"
import _ from "lodash"

const Detail = () => {
  const [searchParams] = useSearchParams()
  const { viewProductById } = useProduct()
  const [productDetail, setProductDetail] = useState({})
  const { cartData, viewCartByUser, setCartDataToStore } = useCart()
  const { toast } = useContext(ToastContext)
  const { getComment } = useComment()
  const [commentData, setCommentData] = useState()
  const fetchComment = () => {
    getComment(
      { product: searchParams.get("id"), rootComment: true },
      (res) => {
        setCommentData(res?.data)
      },
      () => {}
    )
  }

  useEffect(() => {
    viewProductById(
      searchParams.get("id"),
      (res) => {
        setProductDetail(res?.data)
      },
      () => {
        // do nothing
      }
    )
    fetchComment()
  }, [])
  const refreshCartData = () => {
    viewCartByUser(
      () => {
        // do nothing
      },
      () => {}
    )
  }
  const handleAddToCart = (product) => {
    const isExist = cartData.some((item) => item._id === product._id)

    let params = cartData
    if (isExist) {
      params = params.map((item) => {
        if (item._id === product._id) {
          return { ...item, qty: item.qty + product.qty }
        }
        return item
      })
    } else {
      params = [...params, { ...product }]
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
      <div
        className="grid wide "
        style={{ minHeight: "50vh", paddingBlock: "2.4rem" }}
      >
        <div className="row detail__wrapper">
          <DetailInfoProduct
            product={productDetail}
            onAddToCartClick={handleAddToCart}
          />
        </div>
        <br />
        <div className="row detail__wrapper">
          <DescriptionProduct product={productDetail} />
        </div>
        <br />
        <div className="row detail__wrapper">
          <ProductComment
            id={searchParams.get("id")}
            data={commentData}
            fetchComment={fetchComment}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Detail
