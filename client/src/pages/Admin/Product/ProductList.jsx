import React, { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import ProductTable from "../../../components/modlecules/Admin/ProductTable"
import useProduct from "../../../hooks/useProduct"

const ProductList = () => {
  const { searchProduct, deleteProduct } = useProduct()
  const [productData, setProductData] = useState()
  const history = useNavigate()
  const fetchData = () => {
    searchProduct(
      {},
      (res) => {
        setProductData(res)
      },
      () => {}
    )
  }

  useEffect(() => {
    fetchData()
  }, [])
  const handleDelete = (id) => {
    deleteProduct(
      id,
      () => {
        fetchData()
      },
      () => {}
    )
  }
  const handleEdit = (id) => {
    history({
      pathname: "/admin/product-edit",
      search: createSearchParams({
        id,
      }).toString(),
    })
  }
  const onPageChange = () => {}
  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Category List</h4>
        <p>Wellcome to Admin Category List </p>
      </div>
      <br />
      <br />
      <ProductTable
        data={productData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        onChangePage={onPageChange}
      />
    </AdminLayout>
  )
}

export default ProductList
