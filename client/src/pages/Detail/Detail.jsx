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

const Detail = () => {
  const [searchParams] = useSearchParams()
  const { viewProductById } = useProduct()
  const [productDetail, setProductDetail] = useState({})
  const { addToCart, viewCartByUser } = useCart()
  const { toast } = useContext(ToastContext)

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
    addToCart(
      product,
      () => {
        refreshCartData()
        toast("success", "Thêm vào giỏ hàng thành công")
      },
      (error) => {
        toast("error", getMessageError(error))
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
        <div className="row detail__wrapper" style={{ marginTop: "1.5rem" }}>
          <DescriptionProduct product={productDetail} />
        </div>
      </div>
    </Layout>
  )
}

export default Detail
