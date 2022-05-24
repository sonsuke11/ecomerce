import React, { useEffect, useState } from "react"
import useCategory from "../../../hooks/useCategory"
import Input from "../../atoms/Input/Input"
import Modal from "../../atoms/Modal/Modal"

const CategoryDetailModal = ({ isOpen, title, id, setModal, handleSave }) => {
  const [dataDetail, setDataDetail] = useState()
  const { getDetailCategory } = useCategory()
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

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onCancel={() => {
        handleCancel()
        setDataDetail({})
      }}
      onSave={() => {
        handleSave(dataDetail)
        setDataDetail({})
      }}
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
