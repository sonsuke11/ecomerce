import React from "react"
import "./Paginate.scss"

const Paginate = ({ size, onChangePage, active }) => {
  const arrPage = [...Array(size).fill("")]
  return (
    <ul className="pagination">
      <li
        onClick={() => {
          if (active > 1) onChangePage(active - 1)
        }}
      >
        &laquo;
      </li>
      {arrPage.map((_item, index) => (
        <li
          onClick={() => onChangePage(index + 1)}
          className={active === index + 1 ? "active" : ""}
        >
          {index + 1}
        </li>
      ))}

      <li
        onClick={() => {
          if (active < size) onChangePage(active + 1)
        }}
      >
        &raquo;
      </li>
    </ul>
  )
}

export default Paginate
