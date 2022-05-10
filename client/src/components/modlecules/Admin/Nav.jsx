import React from "react"
import { Link } from "react-router-dom"
import images from "../../../themes/image"
import "./Nav.scss"
import NavItem from "./NavItem"

const Nav = () => {
  const navList = [
    {
      icon: images.icLineChart,
      title: "DashBoard",
      path: "/admin/dashboard",
    },
    {
      icon: images.icList,
      title: "Category",
      child: [
        {
          path: "/admin/category-list",
          content: "Category List",
        },
        {
          path: "/admin/category-create",
          content: "Add Category",
        },
      ],
    },
    {
      icon: images.icUser,
      title: "User",
      child: [
        {
          path: "/admin/user-list",
          content: "User List",
        },
        {
          path: "/admin/user-edit",
          content: "User Edit",
        },
      ],
    },
    {
      icon: images.icProduct,
      title: "Product",
      child: [
        {
          path: "/admin/product-list",
          content: "Product List",
        },
        {
          path: "/admin/product-create",
          content: "Add Product",
        },
      ],
    },
  ]
  return (
    <div className="col c-2">
      <div
        className="nav__wrapper"
        style={{ backgroundColor: "#fff", minHeight: "100vh" }}
      >
        <div className="nav__logo" style={{ padding: "2.4rem" }}>
          <img src={images.logo} alt="logo" />
        </div>
        {navList.map((nav) => (
          <NavItem icon={nav.icon} title={nav.title} path={nav.path}>
            {nav?.child?.length > 0 &&
              nav.child.map((item) => (
                <Link to={item.path} className="nav__link--item">
                  {item.content}
                </Link>
              ))}
          </NavItem>
        ))}
      </div>
    </div>
  )
}

export default Nav
