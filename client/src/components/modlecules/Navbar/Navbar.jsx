import React, { useState } from "react"

import "./Navbar.scss"

const Navbar = () => {
  const navItems = [
    {
      label: "nam",
    },
    {
      label: "nữ",
      class: 0,
    },
    {
      label: "new",
      class: 0,
    },
    {
      label: "sale",
      class: 0,
    },
    {
      label: "bán chạy",
      class: 0,
    },
  ]
  return (
    <div className="navbar__fluid">
      <div className="navbar__containter">
        {navItems.map((item) => (
          <div className="navbar__item">{item.label}</div>
        ))}
      </div>
    </div>
  )
}

export default Navbar
