import React, { useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import CategoryEditInfo from "../../../components/modlecules/Admin/CategoryEditInfo"
import useCategory from "../../../hooks/useCategory"
import { ToastContext } from "../../../App"

const CategoryEdit = () => {
  const { getDetailCategory, editCategory, addCategory } = useCategory()
  const [detailData, setDetailData] = useState()
  const [searchParams] = useSearchParams()
  const [validateError, setValidateError] = useState()
  const { toast } = useContext(ToastContext)

  const id = searchParams.get("id")
  const handleFetchData = () => {
    getDetailCategory(
      id,
      (res) => {
        setDetailData(res)
      },
      () => {}
    )
  }
  useEffect(() => {
    if (id) {
      handleFetchData()
    } else {
      setDetailData({})
    }
  }, [searchParams])
  const validate = () => {
    const errors = {}
    let flag = true
    if (!detailData?.name?.trim()) {
      errors.name = "Vui lòng không để trống trường này"
      flag = false
    }

    setValidateError(errors)
    return flag
  }
  const handleSaveCategory = () => {
    if (id) {
      editCategory(
        detailData,
        () => {
          toast("success", "Update successfull")

          handleFetchData()
        },
        () => {}
      )
    } else {
      addCategory(
        detailData,
        () => {
          toast("success", "Create successfull")
        },
        () => {}
      )
    }
  }
  const handleSave = () => {
    if (validate()) {
      handleSaveCategory()
    }
  }
  return (
    <AdminLayout>
      <div className="title__block">
        <h4>Thêm mới sản phẩm</h4>
      </div>
      <br />
      <br />
      <CategoryEditInfo
        data={detailData}
        setData={setDetailData}
        onClickSave={handleSave}
        error={validateError}
      />
    </AdminLayout>
  )
}

export default CategoryEdit
