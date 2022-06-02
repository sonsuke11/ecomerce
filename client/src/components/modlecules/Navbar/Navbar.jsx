import React, { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import useCategory from "../../../hooks/useCategory"
import "./Navbar.scss"

const Navbar = () => {
  const { getAllCategory } = useCategory()
  const [navItems, setNavItems] = useState()
  const location = useLocation()

  const getPath = () => {
    return location.pathname + location.search
  }

  const fetchCategory = () => {
    getAllCategory(
      {},
      (res) => {
        const categories = res?.list?.map((category) => ({
          label: category?.name,
          path: `/search?type=${category._id}`,
        }))
        setNavItems([{ label: "Trang chủ", path: "/" }, ...categories])
      },
      () => {}
    )
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  return (
    <div className="navbar__fluid">
      <div className="navbar__containter">
        {navItems?.map((item, index) => (
          <StyledNavLink
            to={item.path}
            key={index}
            className={[
              "navbar__item",
              getPath() === item.path ? "actived" : "",
            ].join(" ")}
          >
            {item.label}
          </StyledNavLink>
        ))}
      </div>
    </div>
  )
}

export default Navbar

const StyledNavLink = styled(NavLink)`
  display: block;
  color: white;
  &.actived {
    &:after {
      content: "";
      display: block;
      width: 100%;
      border-bottom: 2px solid white;
    }
  }
`
