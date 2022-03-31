import React from "react"

import { footerRules } from "../../../utils/constants"
import "./Footer.scss"
const Footer = () => {
  return (
    <div className="footer__fluid">
      <div className="footer__rules--block">
        {footerRules.map((item) => (
          <div className="footer__rules--item">
            <img src={item.icon} alt="" className="footer__rules--icon" />
            <h5 className="footer__rules--heading">{item.heading}</h5>
            <p className="footer__rules--content">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
