import React, { useEffect, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import Modal from "../../../components/atoms/Modal/Modal"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import CategoryDetailModal from "../../../components/modlecules/Admin/CategoryDetailModal"
import CategoryTable from "../../../components/modlecules/Admin/CategoryTable"
import useCategory from "../../../hooks/useCategory"
import { editCategory } from "../../../store/Category/actions"
import { APP_ROUTES } from "../../../utils/constants"
import "./CategoryList.scss"

const CategoryList = () => {
  const [id, setId] = useState(null)
  const { getAllCategory, deleteCategory } = useCategory()
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
        title={modal.title}
        setModal={setModal}
      />
    </>
  )
}

export default CategoryList
