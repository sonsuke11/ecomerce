import _ from "lodash"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ToastContext } from "../../../App"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import FileElement from "../../../components/modlecules/Admin/FileElement"
import ProductCreateForm from "../../../components/modlecules/Admin/ProductCreateForm"
import useProduct from "../../../hooks/useProduct"
import { getMessageError } from "../../../utils/helpers"

const ProductEdit = () => {
  const [dataProduct, setDataProduct] = useState({ images: [null] })

  const history = useNavigate()
  const { viewProductById, updateProduct } = useProduct()
  const [arrayFileElement, setArrayFileElement] = useState([FileElement])
  const { toast } = useContext(ToastContext)
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const [validateErrors, setValidateErrors] = useState()

  const validate = () => {
    let errors = {}
    let flag = true

    if (!dataProduct?.name?.trim()) {
      errors.name = "Vui lòng không để trống trường này"
      flag = false
    }

    if (!dataProduct?.price) {
      errors.price = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!dataProduct?.instock) {
      errors.instock = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!dataProduct?.rootPrice) {
      errors.rootPrice = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!dataProduct?.description?.trim()) {
      errors.description = "Vui lòng không để trống trường này"
      flag = false
    }
    if (!dataProduct?.categoryId?.trim()) {
      errors.categoryId = "Vui lòng không để trống trường này"
      flag = false
    }
    setValidateErrors(errors)

    return flag
  }

  const handleSave = () => {
    if (validate()) {
      updateProduct(
        _.omit(dataProduct, ["images"]),
        () => {
          toast("success", "Cập nhật sản phẩm thành công")
          history("/admin/product-list")
        },
        (error) => {
          toast("error", getMessageError(error))
        }
      )
    }
  }
  useEffect(() => {
    if (id) {
      viewProductById(
        id,
        (res) => {
          const { data } = res
          setArrayFileElement([...Array(data.images.length).fill(FileElement)])
          setDataProduct(data)
        },
        () => {}
      )
    }
  }, [])
  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Cập nhật sản phẩm</h4>
        {/* <p>Wellcome to Create Product Page </p> */}
      </div>
      <br />
      <br />
      <ProductCreateForm
        data={dataProduct}
        setData={setDataProduct}
        onClickSave={handleSave}
        showBase64
        error={validateErrors}
        setError={setValidateErrors}
        arrayFileElement={arrayFileElement}
        setArrayFileElement={setArrayFileElement}
        detailPage
      />
    </AdminLayout>
  )
}

export default ProductEdit
