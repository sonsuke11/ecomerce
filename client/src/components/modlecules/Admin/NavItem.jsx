import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import images from "../../../themes/image"
import "./NavItem.scss"

const NavItem = ({ title, children, icon, path, avatar }) => {
  const [expand, setExpand] = useState(false)
  const ref = useRef(null)
  const [childHeight, setChildHeight] = useState(ref?.current?.clientHeight)
  useEffect(() => {
    const height = ref.current.clientHeight
    setChildHeight(height)
  }, [])

  return (
    <div className="nav__menu--wrap">
      <div className="nav__menu" onClick={() => setExpand(!expand)}>
        {icon && <img src={icon} alt="icon" className="nav__menu--icon" />}
        {avatar && (
          <img
            src={`data:image/png;base64,${avatar}`}
            alt="icon"
            className="nav__menu--avatar"
          />
        )}
        {children && <div className="nav__menu--content">{title}</div>}
        {!children && (
          <Link className="nav__menu--content" to={path}>
            {title}
          </Link>
        )}
        {children && (
          <img
            src={images.icCarretDown}
            alt=""
            className={["nav__expand--icon", expand ? "hide" : "show"].join(
              " "
            )}
          />
        )}
      </div>
      <div
        ref={ref}
        className="nav__link--list"
        style={{ maxHeight: !expand ? childHeight : 0 }}
      >
        {children}
      </div>
    </div>
  )
}

export default NavItem
