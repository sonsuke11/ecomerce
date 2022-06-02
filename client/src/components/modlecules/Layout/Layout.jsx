import React, { useEffect, useState } from "react"
import Footer from "../Footer/Footer"

import Header from "../Header/Header"
import Navbar from "../Navbar/Navbar"
import useUser from "../../../hooks/useUser"
import useCart from "../../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import CartShoping from "../CartShopping/CartShoping"

const Layout = ({ children }) => {
  const { getUserInfo, userData } = useUser()
  const [showCart, setShowCart] = useState(false)
  const { viewCartByUser } = useCart()
  const navigation = useNavigate()
  // const fetchUserInfo = () => {
  //   getUserInfo(
  //     () => {
  //       // do nothing
  //     },
  //     () => {
  //       navigation("/login")
  //     }
  //   )
  // }
  const fetchCartByUser = () => {
    viewCartByUser(
      () => {
        // do nothing
      },
      () => {
        // do nothing
      }
    )
  }
  useEffect(() => {
    // fetchUserInfo()
    // fetchCartByUser()
  }, [])
  const handleCloseCart = () => {
    setShowCart(false)
  }
  const handleToggleCart = () => {
    setShowCart(!showCart)
  }
  return (
    <>
      <Header userName={userData?.auth?.username} onToggle={handleToggleCart} />
      <Navbar />
      <div style={{ minHeight: "60vh" }}>{children}</div>
      <Footer />
      <CartShoping show={showCart} onClose={handleCloseCart} />
    </>
  )
}

export default Layout
