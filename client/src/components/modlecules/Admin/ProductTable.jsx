import React from "react"
import images from "../../../themes/image"
import Paginate from "../../atoms/Paginate/Paginate"
import "./ProductTable.scss"

const ProductTable = ({ data, handleDelete, handleEdit, onChangePage }) => {
  return (
    <div className="table__block">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Views</th>
            <th>Rank</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {data?.list?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.numOfViews}</td>
              <td>{item.rank}</td>
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
        size={data?.totalPage}
        active={data?.page}
        onChangePage={onChangePage}
      />
    </div>
  )
}

export default ProductTable
