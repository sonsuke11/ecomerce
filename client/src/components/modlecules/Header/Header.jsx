import React from "react"
import { Link } from "react-router-dom"

import images from "../../../themes/image"
import Badge from "../../atoms/Badge/Badge"
import Button from "../../atoms/Button/Button"
import IconButton from "../../atoms/IconButton/IconButton"
import Input from "../../atoms/Input/Input"
import "./Header.scss"

const Header = () => {
  return (
    <header className="header__wrapper">
      <div className="header__block containter">
        <Link to="#" className="header__logo--link">
          <img src={images.logo} alt="header__logo--icon" />
        </Link>
        <div className="header__search--area">
          <Input variant="radius" placeholder="Search..." />
          <IconButton className="button__input" icon={images.icSeach} />
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
            Login/Register
          </Button>
          <Badge>
            <Button variant="cicle">
              <i className="fa-solid fa-cart-shopping"></i>
            </Button>
          </Badge>
        </div>
      </div>
    </header>
  )
}

export default Header
