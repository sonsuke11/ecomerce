import React, { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../App"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import CategoryDetailModal from "../../../components/modlecules/Admin/CategoryDetailModal"
import CategoryTable from "../../../components/modlecules/Admin/CategoryTable"
import useCategory from "../../../hooks/useCategory"
import "./CategoryList.scss"

const CategoryList = () => {
  const { toast } = useContext(ToastContext)
  const [id, setId] = useState(null)
  const { getAllCategory, deleteCategory, editCategory } = useCategory()
  const [modal, setModal] = useState({
    isOpen: false,
    title: "Category Edit",
  })
  const handleFetchCategoryData = (params) => {
    getAllCategory(
      params,
      () => {},
      () => {
        //do nothing
      }
    )
  }
  useEffect(() => {
    handleFetchCategoryData({ page: 1 })
  }, [])
  const handleEdit = (id) => {
    setId(id)
    setModal({ ...modal, isOpen: true })
  }
  const handleDelete = (id) => {
    deleteCategory(
      { _id: id },
      () => {
        handleFetchCategoryData()
      },
      () => {}
    )
  }
  const handleChangePage = (page) => {
    getAllCategory(
      { page },
      () => {},
      () => {}
    )
  }

  const handleSave = (dataDetail) => {
    editCategory(
      dataDetail,
      () => {
        toast("success", "Update Succesfully")
        setModal((prev) => ({ ...prev, isOpen: false }))
        handleFetchCategoryData()
      },
      () => {}
    )
  }
  return (
    <>
      <AdminLayout>
        <div className="title__block">
          <h4>Category List</h4>
          <p>Wellcome to Admin Category List </p>
        </div>
        <br />
        <br />
        <CategoryTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          onChangePage={handleChangePage}
        />
      </AdminLayout>
      <CategoryDetailModal
        isOpen={modal.isOpen}
        id={id}
        handleSave={handleSave}
        title={modal.title}
        setModal={setModal}
      />
    </>
  )
}

export default CategoryList
