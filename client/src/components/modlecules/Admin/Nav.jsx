import React from "react"
import { Link } from "react-router-dom"
import useUser from "../../../hooks/useUser"
import images from "../../../themes/image"
import "./Nav.scss"
import NavItem from "./NavItem"

const Nav = () => {
  const { userData, logout } = useUser()
  const navList = [
    {
      icon: images.icLineChart,
      title: "Thống kê",
      path: "/admin/dashboard",
    },
    {
      icon: images.icList,
      title: "Danh mục",
      child: [
        {
          path: "/admin/category-list",
          content: "Bảng danh mục",
        },
        {
          path: "/admin/category-create",
          content: "Tạo danh mục",
        },
      ],
    },
    {
      icon: images.icUser,
      title: "Người dùng",
      child: [
        {
          path: "/admin/user-list",
          content: "Danh sách người dùng",
        },
      ],
    },
    {
      icon: images.icProduct,
      title: "Sản phẩm ",
      child: [
        {
          path: "/admin/product-list",
          content: "Danh sách sản phẩm",
        },
        {
          path: "/admin/product-create",
          content: "Tạo sản phẩm",
        },
      ],
    },
    {
      icon: images.icProduct,
      title: "Đơn hàng",
      child: [
        {
          path: "/admin/order-list",
          content: "Danh sách đơn hàng",
        },
        // {
        //   path: "/admin/product-create",
        //   content: "Add Product",
        // },
      ],
    },
    {
      title: userData?.auth?.username,
      avatar: userData?.auth?.avatar,

      child: [
        {
          path: "/login",
          content: "Đăng xuất",
          onClick: () => {
            localStorage.removeItem("user")
            logout()
          },
        },
        // {
        //   path: "/admin/product-create",
        //   content: "Add Product",
        // },
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
          <NavItem
            avatar={nav?.avatar}
            icon={nav?.icon}
            title={nav.title}
            path={nav.path}
          >
            {nav?.child?.length > 0 &&
              nav.child.map((item) => (
                <Link
                  to={item.path}
                  className="nav__link--item"
                  onClick={item?.onClick}
                >
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
