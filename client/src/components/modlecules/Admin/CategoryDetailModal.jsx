import React, { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../App"
import useCategory from "../../../hooks/useCategory"
import Input from "../../atoms/Input/Input"
import Modal from "../../atoms/Modal/Modal"

const CategoryDetailModal = ({ isOpen, title, id, setModal }) => {
  const [dataDetail, setDataDetail] = useState()
  const { getDetailCategory, editCategory } = useCategory()
  const { toast } = useContext(ToastContext)
  const handleFetchData = () => {
    getDetailCategory(
      id,
      (res) => {
        setDataDetail(res)
      },
      () => {}
    )
  }
  useEffect(() => {
    if (isOpen) handleFetchData()
  }, [isOpen])

  const handleCancel = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  const handleSave = () => {
    editCategory(
      dataDetail,
      () => {
        toast("success", "Update Succesfully")
        setModal((prev) => ({ ...prev, isOpen: false }))
      },
      () => {}
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onCancel={handleCancel}
      onSave={handleSave}
    >
      <br />
      <br />
      <Input
        label="Category Name"
        value={dataDetail?.name}
        onChange={(value) => setDataDetail({ ...dataDetail, name: value })}
      />
      <br />
      <Input
        label="Category Path"
        value={dataDetail?.path}
        onChange={(value) => setDataDetail({ ...dataDetail, path: value })}
      />
      <br />
      <Input
        label="Category Description"
        value={dataDetail?.description}
        onChange={(value) =>
          setDataDetail({ ...dataDetail, description: value })
        }
      />
    </Modal>
  )
}

export default CategoryDetailModal
