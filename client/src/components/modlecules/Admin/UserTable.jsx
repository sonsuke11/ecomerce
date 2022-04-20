import React from "react"
import images from "../../../themes/image"
import { APP_ROLES } from "../../../utils/constants"
import Paginate from "../../atoms/Paginate/Paginate"

const UserTable = ({ listData, handleEdit, handleDelete, onChangePage }) => {
  const renderRole = (data) => {
    let role = ""
    Object.keys(APP_ROLES).forEach((key) => {
      if (APP_ROLES[key] === data) {
        role = key
      }
    })
    return role
  }

  return (
    <div className="table__block">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {listData?.list?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{renderRole(item.role)}</td>
              <td>{item.email}</td>
              <td className="table__icon">
                <img
                  src={images.icEdit}
                  alt=""
                  onClick={() => handleEdit(item._id)}
                />
                <img
                  src={images.icTrash}
                  alt=""
                  onClick={() => handleDelete(item._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <Paginate
        size={listData?.totalPage}
        active={listData?.page}
        onChangePage={onChangePage}
      />
    </div>
  )
}

export default UserTable
