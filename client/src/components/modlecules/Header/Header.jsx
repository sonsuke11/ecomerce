import React, { useEffect, useState } from "react"
import { createSearchParams, Link, useNavigate } from "react-router-dom"
import useCart from "../../../hooks/useCart"

import images from "../../../themes/image"
import Badge from "../../atoms/Badge/Badge"
import Button from "../../atoms/Button/Button"
import IconButton from "../../atoms/IconButton/IconButton"
import Input from "../../atoms/Input/Input"
import "./Header.scss"

const Header = ({ userName, onToggle }) => {
  const { cartData } = useCart()
  const [totalQty, setTotalQty] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const history = useNavigate()
  const cartQuantity = () => {
    const caclTotal = cartData?.data?.productsOfCart?.reduce(
      (prev, curr) => prev + curr.qty,
      0
    )
    setTotalQty(caclTotal)
  }
  useEffect(() => {
    cartQuantity()
  }, [cartData])
  const handleSearch = () => {
    history({
      pathname: "/search",
      search: createSearchParams({ word: searchInput }).toString(),
    })
  }
  return (
    <header className="header__wrapper">
      <div className="header__block containter">
        <Link to="#" className="header__logo--link">
          <img src={images.logo} alt="header__logo--icon" />
        </Link>
        <div className="header__search--area">
          <Input
            variant="radius"
            placeholder="Search..."
            value={searchInput}
            onChange={(value) => setSearchInput(value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
          <IconButton
            className="button__input"
            icon={images.icSeach}
            onClick={handleSearch}
          />
        </div>
        <div className="header__action">
          <Link to="/products">
            <Button variant="cicle">
              <i className="fa-solid fa-phone"></i>
              0393230064
            </Button>
          </Link>
          <Button variant="cicle">
            <i className="fa-solid fa-user"></i>
            {userName ? userName : "Login / Register"}
          </Button>
          <Badge qty={totalQty || 0}>
            <Button variant="cicle" onClick={onToggle}>
              <i className="fa-solid fa-cart-shopping"></i>
            </Button>
          </Badge>
        </div>
      </div>
    </header>
  )
}

export default Header
