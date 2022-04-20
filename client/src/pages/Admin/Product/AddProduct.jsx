import React, { useState } from "react"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import FileElement from "../../../components/modlecules/Admin/FileElement"
import ProductCreateForm from "../../../components/modlecules/Admin/ProductCreateForm"
import useProduct from "../../../hooks/useProduct"

const AddProduct = () => {
  const [dataProduct, setDataProduct] = useState({ images: [null] })
  const { createProduct } = useProduct()
  const [arrayFileElement, setArrayFileElement] = useState([FileElement])
  const handleSave = () => {
    createProduct(
      dataProduct,
      () => {},
      () => {}
    )
  }

  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Create Product</h4>
        <p>Wellcome to Create Product Page </p>
      </div>
      <br />
      <br />
      <ProductCreateForm
        data={dataProduct}
        setData={setDataProduct}
        onClickSave={handleSave}
        arrayFileElement={arrayFileElement}
        setArrayFileElement={setArrayFileElement}
      />
    </AdminLayout>
  )
}

export default AddProduct
