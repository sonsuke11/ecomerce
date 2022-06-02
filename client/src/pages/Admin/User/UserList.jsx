import React, { useContext, useEffect, useState } from "react"
import { ToastContext } from "../../../App"
import AdminLayout from "../../../components/modlecules/Admin/AdminLayout"
import UserDetailModal from "../../../components/modlecules/Admin/UserDetailModal"
import UserTable from "../../../components/modlecules/Admin/UserTable"
import useUser from "../../../hooks/useUser"

const UserList = () => {
  const { searchUser, userData, getUserById, updateUser } = useUser()
  const { toast } = useContext(ToastContext)

  const [modal, setModal] = useState({
    isOpen: false,
    title: "User Detail",
  })
  const [dataDetail, setDataDetail] = useState({})
  const [id, setId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    if (id) {
      getUserById(
        id,
        (res) => {
          setDataDetail(res?.data)
        },
        () => {}
      )
    }
  }, [id])
  const fetchUserData = (params) => {
    searchUser(
      params,
      () => {
        setCurrentPage(params.page)
      },
      () => {}
    )
  }
  useEffect(() => {
    fetchUserData({ page: currentPage })
  }, [])

  const handleEditClick = (param) => {
    setId(param)
    setModal({ ...modal, isOpen: true })
  }

  const handleChangePageClick = (page) => {
    // handle change page
    fetchUserData({ page })
  }

  const handleSave = () => {
    // handle save
    updateUser(dataDetail, () => {
      toast("success", "User updated")
      handleCloseModal()
      fetchUserData({ page: currentPage })
    })
  }

  const handleCloseModal = () => {
    setModal({ ...modal, isOpen: false })
    setDataDetail({})
    setId(null)
  }
  const handleCancel = () => {
    // handle cancel
    handleCloseModal()
  }

  return (
    <>
      <AdminLayout>
        <div className="title__block">
          <h4>Danh sách danh mục</h4>
        </div>
        <br />
        <br />
        <UserTable
          listData={userData?.userList}
          handleEdit={handleEditClick}
          onChangePage={handleChangePageClick}
        />
      </AdminLayout>
      <UserDetailModal
        isOpen={modal?.isOpen}
        title={modal?.title}
        onSave={handleSave}
        data={dataDetail}
        setData={setDataDetail}
        onCancel={handleCancel}
      />
    </>
  )
}

export default UserList
