import React, { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import ProductTable from "../../../components/modlecules/Admin/ProductTable"
import useProduct from "../../../hooks/useProduct"

const ProductList = () => {
  const { searchProduct, deleteProduct } = useProduct()
  const [productData, setProductData] = useState()
  const history = useNavigate()
  const [searchParams, setSearchParams] = useState({})
  const fetchData = (params) => {
    const search = { ...searchParams, ...params }
    searchProduct(
      search,
      (res) => {
        setProductData(res)
        setSearchParams(search)
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
  const onPageChange = (page) => {
    fetchData({ ...searchParams, page })
  }
  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Danh sách sản phẩm</h4>
        {/* <p>Wellcome to Admin Category List </p> */}
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
