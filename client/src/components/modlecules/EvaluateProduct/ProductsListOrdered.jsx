import React, { memo, useContext } from "react"
import { ToastContext } from "../../../App"
import useComment from "../../../hooks/useComment"
import ProductItemOrder from "./ProductItemOrder"

const ProductsListOrdered = ({ data, refeshData }) => {
  const { postComment } = useComment()
  const { toast } = useContext(ToastContext)
  const handlePostComment = (id, params, orderItemId, cb) => {
    postComment(
      { product: id, orderItemId, ...params },
      () => {
        refeshData()
        toast("success", "Gửi đánh giá thành công.")
        cb()
      },
      () => {}
    )
  }
  return (
    <>
      {data?.map((product) => (
        <ProductItemOrder
          product={product}
          onClickEvaluate={handlePostComment}
        />
      ))}
    </>
  )
}

export default memo(ProductsListOrdered)
