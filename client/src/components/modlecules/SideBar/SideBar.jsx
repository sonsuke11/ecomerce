import React from "react"
import images from "../../../themes/image"
import Icon from "../../atoms/Icon/icon"
import Input from "../../atoms/Input/Input"
import "./Sidebar.scss"

const SideBar = () => {
  return (
    <div className="col c-2 filter__block">
      <div className="filter__head">
        <Icon icon={images.icFilter} className="filter__icon" />
        <div className="filter__heading">Filter</div>
      </div>
      <div className="filter__price"></div>
      <div className="filter__rating">
        <div className="filter__rating--item">
          <Icon></Icon>
        </div>
      </div>
    </div>
  )
}

export default SideBar
