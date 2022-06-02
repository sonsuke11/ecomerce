import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../../App"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import FileElement from "../../../components/modlecules/Admin/FileElement"
import ProductCreateForm from "../../../components/modlecules/Admin/ProductCreateForm"
import useProduct from "../../../hooks/useProduct"
import { getMessageError } from "../../../utils/helpers"

const AddProduct = () => {
  const [dataProduct, setDataProduct] = useState({ images: [null] })
  const { createProduct } = useProduct()
  const { toast } = useContext(ToastContext)
  const history = useNavigate()

  const [arrayFileElement, setArrayFileElement] = useState([FileElement])
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
      createProduct(
        dataProduct,
        () => {
          toast("success", "Tạo thành công sản phẩm")
          history("/admin/product-list")
        },
        (error) => {
          toast("error", getMessageError(error))
        }
      )
    }
  }

  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Tạo sản phẩm</h4>
        {/* <p>Wellcome to Create Product Page </p> */}
      </div>
      <br />
      <br />
      <ProductCreateForm
        data={dataProduct}
        setData={setDataProduct}
        onClickSave={handleSave}
        arrayFileElement={arrayFileElement}
        error={validateErrors}
        setError={setValidateErrors}
        setArrayFileElement={setArrayFileElement}
      />
    </AdminLayout>
  )
}

export default AddProduct
