import _ from "lodash"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import FileElement from "../../../components/modlecules/Admin/FileElement"
import ProductCreateForm from "../../../components/modlecules/Admin/ProductCreateForm"
import useProduct from "../../../hooks/useProduct"

const ProductEdit = () => {
  const [dataProduct, setDataProduct] = useState({ images: [null] })

  const { viewProductById, updateProduct } = useProduct()
  const [arrayFileElement, setArrayFileElement] = useState([FileElement])
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const handleSave = () => {
    updateProduct(
      dataProduct,
      () => {},
      () => {}
    )
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
        <h4>Create Product</h4>
        <p>Wellcome to Create Product Page </p>
      </div>
      <br />
      <br />
      <ProductCreateForm
        data={dataProduct}
        setData={setDataProduct}
        onClickSave={handleSave}
        showBase64
        arrayFileElement={arrayFileElement}
        setArrayFileElement={setArrayFileElement}
        detailPage
      />
    </AdminLayout>
  )
}

export default ProductEdit
