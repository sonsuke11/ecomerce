import React from "react"
import useCategory from "../../../hooks/useCategory"
import images from "../../../themes/image"
import Paginate from "../../atoms/Paginate/Paginate"
import "./CategoryTable.scss"

const CategoryTable = ({ handleEdit, handleDelete, onChangePage }) => {
  const { categoryData } = useCategory()

  return (
    <div className="table__block">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Category Name</th>
            <th>Path</th>
            <th>Description</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {categoryData?.list?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.path}</td>
              <td></td>
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
        size={categoryData?.totalPage}
        active={categoryData?.page}
        onChangePage={onChangePage}
      />
    </div>
  )
}

export default CategoryTable
