import React, { useEffect } from "react"
import Footer from "../Footer/Footer"

import Header from "../Header/Header"
import Navbar from "../Navbar/Navbar"
import useUser from "../../../hooks/useUser"

const Layout = ({ children }) => {
  const { getUserInfo } = useUser()
  useEffect(() => {
    getUserInfo(
      (res) => {
        console.log(res)
      },
      (err) => {}
    )
  }, [])

  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
